"use strict";

const messageVertexNotExists = id => console.log(`Vertex {id:${id}} not exists`);
const messageVertexExists = id => console.log(`Vertex {id:${vertex.id}} already in the graph.`);
const messageEdgeNotExists = (from, to) => console.log(`Edge {from:${from}, to:${to}} not exists.`);
const messageEdgeExists = (from, to) => console.log(`Edge {from:${from}, to:${to}} already exists.`);

const MGraph = {
  initializeGraph: function(vertices = [], edges = []) {
    let graph = new Array();
    let instance = {
      graph: graph,
      addVertex(id, properties = null) {
        if (!instance.graph.find(el => el.id === id)) {
          instance.graph.push(MGraph.Vertex(id, properties));
        } else messageVertexExists(vertex.id);
      },
      removeVertex(id) {
        let targetVertex = instance.getVertex(id);

        if (!targetVertex) {
          messageVertexNotExists(id);
          return;
        }

        for (let vertex of instance.graph) {
          if (vertex.id != id) {
            if (instance.existsEdge(vertex.id, id)) instance.removeEdge(vertex.id, id);
          } else {
            instance.graph = instance.graph.filter(el => el.id != id);
          }
        }
      },
      addEdge(from, to, properties = null) {
        let vertexFrom = instance.getVertex(from);
        if (!vertexFrom) {
          messageVertexNotExists(from);
          return;
        }
        let vertexTo = instance.getVertex(to);
        if (!vertexTo) {
          messageVertexNotExists(to);
          return;
        }
        if (instance.existsEdge(from, to)) {
          messageEdgeExists(from, to);
          return;
        }
        vertexFrom.edges.push(MGraph.Edge(from, to, properties));
      },
      removeEdge(from, to) {
        let vertexFrom = instance.getVertex(from);
        if (!vertexFrom) {
          messageVertexNotExists(from);
          return;
        }
        if (!instance.existsVertex(to)) {
          messageVertexNotExists(to);
          return;
        }
        if (!instance.existsEdge(from, to)) {
          messageEdgeNotExists(from, to);
          return;
        }
        vertexFrom.edges = vertexFrom.edges.filter(el => el.to != to);
      },
      existsVertex(id) {
        return instance.getVertex(id) ? true : false;
      },
      existsEdge(from, to) {
        return instance.getEdge(from, to) ? true : false;
      },
      getVertex(id) {
        let vertex = instance.graph.find(el => el.id == id);
        return vertex ? vertex : false;
      },
      getEdge(from, to) {
        let vertexFrom = instance.getVertex(from);
        let edge = vertexFrom.edges.find(el => el.to == to);
        return edge ? edge : false;
      },
      setVertexProperties(id, properties) {
        let vertex = instance.getVertex(id);
        if (vertex) vertex.properties = properties;
        else messageVertexExists(id);
      },
      setEdgeProperties(from, to, properties) {
        let edge = instance.getEdge(from, to);
        if (edge) edge.properties = properties;
        else messageEdgeNotExists(from, to);
      },
      getAdjacents(id) {
        let root = instance.getVertex(id);
        if (root) {
          return [root.id, ...root.edges.map(el => el.to)];
        }
      },
      getAdjacencyList() {
        let listString = "";
        for (let vertex of instance.graph) listString += `${instance.getAdjacents(vertex.id).join(" -> ")}\n`;
        return listString.slice(0, -1);
      },
      BFS() {},
      DFS() {}
    };

    for (let vertex of vertices) {
      instance.addVertex(vertex.id, vertex.properties);
    }

    for (let edge of edges) {
      instance.addEdge(edge.from, edge.to);
    }

    return instance;
  },
  Vertex(id, properties = null) {
    return {
      id: id,
      properties: properties,
      edges: new Array()
    };
  },
  Edge(from, to, properties = null) {
    return { from: from, to: to, properties: properties };
  }
};

module.exports = MGraph;
