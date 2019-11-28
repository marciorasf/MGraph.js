"use strict";

const MGraph = {
  initializeGraph: function(vertices = [], edges = []) {
    let graph = new Array();
    let instance = {
      graph: graph,
      addVertex(id, properties = null) {
        if (!instance.graph.find(el => el.id === id)) {
          instance.graph.push(MGraph.Vertex(id, properties));
        } else console.log(`Vertex of id=${vertex.id} already in the graph.`);
      },
      removeVertex(id) {
        let targetVertex = instance.getVertex(id);

        if (!targetVertex) {
          console.log(`Vertex of id=${id} not found`);
          return;
        }

        for (let vertex of instance.graph) {
          if (vertex.id != id) {
            let previousVertex;
            let nextVertex = vertex;
            while (nextVertex.next !== null) {
              if (nextVertex.id === id) {
                previousVertex.next = nextVertex.next;
                delete nextVertex.id;
                delete nextVertex.properties;
                delete nextVertex.next;
                break;
              }
              previousVertex = nextVertex;
              nextVertex = nextVertex.next;
            }
          } else {
            let currentVertex = vertex;
            let nextVertex;

            instance.graph = instance.graph.filter(function(el) {
              return el.id != id;
            });

            while (currentVertex.next != null) {
              nextVertex = currentVertex.next;
              delete currentVertex.id;
              delete currentVertex.properties;
              delete currentVertex.next;
              currentVertex = nextVertex;
            }
            delete currentVertex.id;
            delete currentVertex.properties;
            delete currentVertex.next;
          }
        }
      },
      addEdge(edge) {
        let vertexFrom = instance.getVertex(edge.from);
        if (!vertexFrom) {addEdge(edge) {
        let vertexFrom = instance.getVertex(edge.from);
        if (!vertexFrom) {
          console.log(`Vertex of id=${edge.from} not exists.`);
          return;
        }
        let vertexTo = instance.getVertex(edge.to);
        if (!vertexTo) {
          console.log(`Vertex of id=${edge.to} not exists.`);
          return;
        }
        if (instance.existsEdge(edge)) {
          console.log(`Edge {from:${edge.from}, to:${edge.to}} already exists.`);
          return;
        }

        vertexTo = MGraph.Vertex(vertexTo.id);
        while (vertexFrom.next != null) {
          vertexFrom = vertexFrom.next;
        }
        vertexFrom.next = vertexTo;
      },
          console.log(`Vertex of id=${edge.from} not exists.`);
          return;
        }
        let vertexTo = instance.getVertex(edge.to);
        if (!vertexTo) {
          console.log(`Vertex of id=${edge.to} not exists.`);
          return;
        }
        if (instance.existsEdge(edge)) {
          console.log(`Edge {from:${edge.from}, to:${edge.to}} already exists.`);
          return;
        }

        vertexTo = MGraph.Vertex(vertexTo.id);
        while (vertexFrom.next != null) {
          vertexFrom = vertexFrom.next;
        }
        vertexFrom.next = vertexTo;
      },
      removeEdge(edge) {
        let vertexFrom = instance.getVertex(edge.from);
        if (!vertexFrom) {
          console.log(`Vertex of id=${edge.from} not exists.`);
          return;
        }
        if (!instance.existsVertex(edge.to)) {
          console.log(`Vertex of id=${edge.to} not exists.`);
          return;
        }
        if (!instance.existsEdge(edge)) {
          console.log(`Edge {from:${edge.from}, to:${edge.to}} not exists.`);
          return;
        }

        let nextVertex = vertexFrom.next;
        let previousVertex = vertexFrom;
        while (nextVertex != null) {
          if (nextVertex.id == edge.to) {
            previousVertex.next = nextVertex.next;
            return;
          }
          previousVertex = nextVertex;
          nextVertex = nextVertex.next;
        }
      },
      existsVertex(id) {
        return instance.getVertex(id) ? true : false;
      },
      existsEdge(edge) {
        let vertexFrom = instance.getVertex(edge.from);

        if (vertexFrom && instance.existsVertex(edge.to)) {
          while (vertexFrom.next != null) {
            if (vertexFrom.id == edge.to) {
              return true;
            }
            vertexFrom = vertexFrom.next;
          }
          return vertexFrom.id == edge.to ? true : false;
        }
      },
      getVertex(id) {
        let node = instance.graph.find(el => el.id == id);
        return node ? node : false;
      },
      getAdjacents(id) {
        let root = instance.getVertex(id);
        if (root) {
          let vertexArr = new Array();
          let nextNode = root;

          while (nextNode.next != null) {
            vertexArr.push(nextNode.id);
            nextNode = nextNode.next;
          }
          vertexArr.push(nextNode.id);
          return vertexArr;
        }
      },
      getAdjacencyList() {
        let listString = "";
        for (let vertex of instance.graph) listString += `${instance.getAdjacents(vertex.id).join(" -> ")}\n`;
        return listString.slice(0, -1);
      }
    };

    for (let vertex of vertices) {
      instance.addVertex(vertex.id, vertex.properties);
    }

    for (let edge of edges) {
      instance.addEdge(edge);
    }

    return instance;
  },
  Vertex(id, properties = null) {
    return {
      id: id,
      properties: properties,
      next: null
    };
  },
  Edge(from, to) {
    return { from: from, to: to };
  }
};

module.exports = MGraph;
