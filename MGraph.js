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
      addVertex(id, properties = undefined) {
        if (!instance.graph.find(el => el.id === id)) instance.graph.push(MGraph.Vertex(id, properties));
        else messageVertexExists(vertex.id);
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
      getVertex(id) {
        let vertex = instance.graph.find(el => el.id == id);
        return vertex ? vertex : false;
      },
      existsVertex(id) {
        return instance.getVertex(id) ? true : false;
      },
      setVertexProperties(id, properties) {
        let vertex = instance.getVertex(id);
        if (vertex) vertex.properties = properties;
        else messageVertexExists(id);
      },
      findVertices(filterFunction) {
        let arr = instance.graph.map(vertex => (filterFunction(vertex) ? vertex : undefined));
        arr = arr.filter(vertex => vertex);
        return arr;
      },
      addEdge(from, to, properties = undefined) {
        if (from == to) {
          console.log(`Edge {from:${from}, to:${to}} could not be added because loops are not allowed.`);
          return;
        }

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
      getEdge(from, to) {
        let vertexFrom = instance.getVertex(from);
        let edge = vertexFrom.edges.find(el => el.to == to);
        return edge ? edge : false;
      },
      existsEdge(from, to) {
        return instance.getEdge(from, to) ? true : false;
      },
      setEdgeProperties(from, to, properties) {
        let edge = instance.getEdge(from, to);
        if (edge) edge.properties = properties;
        else messageEdgeNotExists(from, to);
      },
      findEdges(filterFunction) {
        let arr = new Array();
        instance.graph.forEach(vertex => arr.push(...vertex.edges.map(edge => (filterFunction(edge) ? edge : undefined))));
        arr = arr.filter(edge => edge);
        return arr;
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
      BFS(startId = undefined) {
        let startVertex = instance.getStartVertex(startId);
      },
      DFS(startId = undefined) {
        let startVertex = instance.getStartVertex(startId);
      },
      getStartVertex(id = undefined) {
        let startVertex;
        if (id) {
          startVertex = instance.getVertex(id);
          if (!startVertex) messageVertexNotExists(id);
        } else {
          startVertex = instance.graph[0] ? instance.graph[0] : undefined;
          if (!startVertex) console.log("Graph is empty");
        }
        return startVertex;
      },
      hasCycle() {}
    };
    for (let vertex of vertices) {
      instance.addVertex(vertex.id, vertex.props);
    }

    for (let edge of edges) {
      instance.addEdge(edge.from, edge.to, edge.props);
    }

    return instance;
  },
  Vertex(id, properties = undefined) {
    return {
      id: id,
      properties: properties,
      edges: new Array()
    };
  },
  Edge(from, to, properties = undefined, weight = undefined) {
    return { from: from, to: to, properties: properties, weight: weight };
  }
};

module.exports = MGraph;
