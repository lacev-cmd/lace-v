/**
 * ══════════════════════════════════════════════════════
 * NEXUS ENGINE  v1.1.0
 * ══════════════════════════════════════════════════════
 *
 * A standalone graph analysis engine for LACE V network tools.
 * Takes nodes and edges, runs structural analysis, and returns
 * findings: degree centrality, betweenness (Brandes), clustering
 * coefficients, articulation points, cliques, and network density.
 *
 * USAGE
 * ─────
 * 1. Load this file before the shell and cartridge:
 *      <script src="nexus-core.js"></script>
 *      <script src="cartridge-org.js"></script>
 *      <script src="nexus-shell.js"></script>
 *
 * 2. In the shell:
 *      const result = NexusEngine.analyse(nodes, edges);
 *      // result contains: ranked, isolated, bridges, cliques,
 *      //                  components, density, nodeCount, edgeCount
 *
 * INPUT SCHEMA
 * ────────────
 * nodes: [{ id: string, name: string }]
 * edges: [{ from: string, to: string, weight: number }]
 *
 * OUTPUT SCHEMA
 * ─────────────
 * {
 *   nodeCount:  number,
 *   edgeCount:  number,
 *   density:    number,             // 0–1
 *   components: number,             // connected component count
 *   bridges:    string[],           // names of articulation point nodes
 *   cliques:    string[][],         // arrays of node IDs in 3+ cliques
 *   clusterCount: number,
 *   isolated:   string[],           // names of degree-1 nodes
 *   ranked:     [                   // all nodes, sorted by betweenness
 *     {
 *       id:          string,
 *       name:        string,
 *       degree:      number,
 *       degreeNorm:  number,        // 0–1 normalised
 *       betweenness: number,
 *       clustering:  number,
 *       isAP:        boolean,       // is articulation point
 *     }
 *   ]
 * }
 *
 * CARTRIDGE SCHEMA (for Nexus domain cartridges)
 * ────────────────────────────────────────────────
 * {
 *   id:           string,
 *   name:         string,
 *   nodeLabel:    string,     // UI label, e.g. "Person / Role"
 *   nodePlaceholder: string,  // input placeholder
 *   edgeLabel:    string,     // UI label, e.g. "Reports to / Works with"
 *   sampleNodes:  string[],   // names for demo data
 *   sampleEdges:  [number, number, number][],  // [fromIdx, toIdx, weight]
 *   findings: {
 *     highBetweenness: (name, pct) => string,
 *     isolated:        (name)      => string,
 *     cluster:         (names)     => string,
 *     vulnerable:      (name)      => string,
 *     dense:           ()          => string,
 *     sparse:          ()          => string,
 *   },
 *   verdict: (result) => string,
 * }
 *
 * CHANGELOG
 * ─────────
 * v1.1.0  — Extracted from nexus_v1_0.html. No functional changes.
 *           Added JSDoc, cartridge schema, and input/output documentation.
 *           Version bumped to distinguish from embedded v1.0 builds.
 * v1.0.0  — Initial embedded engine in nexus_v1_0.html.
 *
 * ══════════════════════════════════════════════════════
 */

const NexusEngine = (() => {

  // ── Graph primitives ──────────────────────────────────────────────────────

  function buildAdjacency(nodes, edges) {
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.from].push({ id: e.to,   w: e.weight });
      adj[e.to  ].push({ id: e.from, w: e.weight });
    });
    return adj;
  }

  // ── Degree centrality ─────────────────────────────────────────────────────

  function degreeCentrality(nodes, edges) {
    const deg = {};
    nodes.forEach(n => deg[n.id] = 0);
    edges.forEach(e => {
      deg[e.from] += e.weight;
      deg[e.to]   += e.weight;
    });
    const maxD = Math.max(...Object.values(deg), 1);
    const norm = {};
    Object.keys(deg).forEach(k => norm[k] = +(deg[k] / maxD).toFixed(3));
    return { raw: deg, norm };
  }

  // ── Betweenness centrality (Brandes algorithm) ────────────────────────────

  function betweennessCentrality(nodes, edges) {
    const adj = buildAdjacency(nodes, edges);
    const ids = nodes.map(n => n.id);
    const cb  = {};
    ids.forEach(id => cb[id] = 0);

    ids.forEach(s => {
      const stack = [];
      const pred  = {};
      const sigma = {};
      const dist  = {};
      ids.forEach(id => { pred[id] = []; sigma[id] = 0; dist[id] = -1; });
      sigma[s] = 1; dist[s] = 0;
      const Q = [s];
      while (Q.length) {
        const v = Q.shift();
        stack.push(v);
        adj[v].forEach(({ id: w }) => {
          if (dist[w] < 0) { Q.push(w); dist[w] = dist[v] + 1; }
          if (dist[w] === dist[v] + 1) { sigma[w] += sigma[v]; pred[w].push(v); }
        });
      }
      const delta = {};
      ids.forEach(id => delta[id] = 0);
      while (stack.length) {
        const w = stack.pop();
        pred[w].forEach(v => { delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]); });
        if (w !== s) cb[w] += delta[w];
      }
    });

    const n     = ids.length;
    const scale = n > 2 ? 1 / ((n - 1) * (n - 2)) : 1;
    const norm  = {};
    ids.forEach(id => norm[id] = +(cb[id] * scale).toFixed(4));
    return norm;
  }

  // ── Clustering coefficients ───────────────────────────────────────────────

  function clusteringCoefficients(nodes, edges) {
    const adj    = buildAdjacency(nodes, edges);
    const adjSet = {};
    nodes.forEach(n => adjSet[n.id] = new Set(adj[n.id].map(e => e.id)));
    const coeff  = {};
    nodes.forEach(n => {
      const nb = [...adjSet[n.id]];
      const k  = nb.length;
      if (k < 2) { coeff[n.id] = 0; return; }
      let triangles = 0;
      for (let i = 0; i < nb.length; i++) {
        for (let j = i + 1; j < nb.length; j++) {
          if (adjSet[nb[i]]?.has(nb[j])) triangles++;
        }
      }
      coeff[n.id] = +((2 * triangles) / (k * (k - 1))).toFixed(3);
    });
    return coeff;
  }

  // ── Articulation points (Tarjan) ──────────────────────────────────────────

  function findArticulationPoints(nodes, edges) {
    const adj     = buildAdjacency(nodes, edges);
    const visited = {};
    const disc    = {};
    const low     = {};
    const parent  = {};
    const ap      = new Set();
    let   timer   = 0;

    function dfs(u) {
      visited[u] = true;
      disc[u] = low[u] = timer++;
      let childCount = 0;
      adj[u].forEach(({ id: v }) => {
        if (!visited[v]) {
          childCount++;
          parent[v] = u;
          dfs(v);
          low[u] = Math.min(low[u], low[v]);
          if (parent[u] === undefined && childCount > 1) ap.add(u);
          if (parent[u] !== undefined && low[v] >= disc[u])  ap.add(u);
        } else if (v !== parent[u]) {
          low[u] = Math.min(low[u], disc[v]);
        }
      });
    }

    nodes.forEach(n => { if (!visited[n.id]) dfs(n.id); });
    return [...ap];
  }

  // ── Connected components ──────────────────────────────────────────────────

  function connectedComponents(nodes, edges) {
    const adj      = buildAdjacency(nodes, edges);
    const ids      = nodes.map(n => n.id);
    const visited  = new Set();
    const components = [];

    function bfs(start) {
      const comp = [];
      const q    = [start];
      visited.add(start);
      while (q.length) {
        const u = q.shift();
        comp.push(u);
        adj[u].forEach(({ id: v }) => {
          if (!visited.has(v)) { visited.add(v); q.push(v); }
        });
      }
      return comp;
    }

    ids.forEach(id => { if (!visited.has(id)) components.push(bfs(id)); });
    return components;
  }

  // ── Clique detection (Bron–Kerbosch, min size 3) ─────────────────────────

  function findCliques(nodes, edges) {
    const adj    = buildAdjacency(nodes, edges);
    const adjSet = {};
    nodes.forEach(n => adjSet[n.id] = new Set(adj[n.id].map(e => e.id)));
    const cliques = [];

    function bk(R, P, X) {
      if (!P.length && !X.length) {
        if (R.length >= 3) cliques.push([...R]);
        return;
      }
      const pivot = [...P, ...X].reduce((best, v) =>
        (adjSet[v] ? [...P].filter(u => adjSet[v].has(u)).length : 0) >
        (adjSet[best] ? [...P].filter(u => adjSet[best].has(u)).length : 0)
          ? v : best,
        P[0] || X[0]
      );
      const candidates = P.filter(v => !adjSet[pivot]?.has(v));
      candidates.forEach(v => {
        bk([...R, v], P.filter(u => adjSet[v]?.has(u)), X.filter(u => adjSet[v]?.has(u)));
        P = P.filter(u => u !== v);
        X = [...X, v];
      });
    }

    bk([], nodes.map(n => n.id), []);
    return cliques;
  }

  // ── Network density ───────────────────────────────────────────────────────

  function density(nodes, edges) {
    const n = nodes.length;
    if (n < 2) return 0;
    return +(edges.length / (n * (n - 1) / 2)).toFixed(3);
  }

  // ── Full analysis ─────────────────────────────────────────────────────────

  function analyse(nodes, edges) {
    if (nodes.length < 2) return null;

    const deg    = degreeCentrality(nodes, edges);
    const btwn   = betweennessCentrality(nodes, edges);
    const clust  = clusteringCoefficients(nodes, edges);
    const aps    = findArticulationPoints(nodes, edges);
    const cliques= findCliques(nodes, edges);
    const comps  = connectedComponents(nodes, edges);
    const dens   = density(nodes, edges);

    const ranked = nodes.map(n => ({
      id:          n.id,
      name:        n.name,
      degree:      deg.raw[n.id],
      degreeNorm:  deg.norm[n.id],
      betweenness: btwn[n.id],
      clustering:  clust[n.id],
      isAP:        aps.includes(n.id),
    })).sort((a, b) => b.betweenness - a.betweenness);

    const isolated = nodes.filter(n => deg.raw[n.id] <= 1).map(n => n.name);
    const bridges  = aps.map(id => nodes.find(n => n.id === id)?.name).filter(Boolean);

    return {
      ranked,
      isolated,
      bridges,
      cliques,
      clusterCount: cliques.length,
      components:   comps.length,
      density:      dens,
      nodeCount:    nodes.length,
      edgeCount:    edges.length,
    };
  }

  // ── Public API ────────────────────────────────────────────────────────────

  return { analyse };

})();
