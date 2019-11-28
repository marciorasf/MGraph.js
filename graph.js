// "use strict";

function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var MGraph = {
  initializeGraph: function(vertices, edges) {
    let graph = new Array();
    let instance = {
      graph: graph,
      printAdjacencyList() {
        for (vertex of instance.graph) {
          let vertexArr = new Array();
          let nextNode = vertex;
          while (nextNode.next != null) {
            vertexArr.push(nextNode.id);
            nextNode = nextNode.next;
          }
          vertexArr.push(nextNode.id);
          console.log(vertexArr.join(" -> "));
        }
      },
      Vertex(id, properties = null) {
        return {
          id: id,
          properties: properties,
          next: null
        };
      },
      addVertex(vertex) {
        if (!instance.graph.find(el => el.id === vertex.id)) instance.graph.push(vertex);
        else console.log(`Vertex of id=${vertex.id} already in the graph.`);
      },
      removeVertex(id) {
        let targetVertex = instance.getVertex(id);

        if (!targetVertex) {
          console.log(`Vertex of id=${id} not found`);
          return;
        }

        for (vertex of instance.graph) {
          if (vertex.id != id) {
            let previousVertex;
            let nextVertex = vertex;
            while (nextVertex.next !== null) {
              if (nextVertex.id === id) {
                previousVertex.next = nextVertex.next;
                delete nextVertex;
                break;
              }
              previousVertex = nextVertex;
              nextVertex = nextVertex.next;
            }
          } else {
            let currentVertex = vertex;
            let nextVertex;
            while (currentVertex.next != null) {
              nextVertex = currentVertex.next;
              delete currentVertex;
              currentVertex = nextVertex;
            }
            delete currentVertex;
            instance.graph = instance.graph.filter(function(el) {
              return el.id != id;
            });
          }
        }
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
      addEdge(edge) {
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

        vertexTo = instance.Vertex(vertexTo.id);
        while (vertexFrom.next != null) {
          vertexFrom = vertexFrom.next;
        }
        vertexFrom.next = vertexTo;
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
      }
    };

    for ([id, vertex] of vertices.entries()) {
      let node = instance.Vertex(id, vertex);
      instance.addVertex(node);
    }

    for (edge of edges) {
      instance.addEdge(edge);
    }

    return instance;
  }
};

let testVertices = [
  {
    type: "Feature",
    id: 1,
    geometry: {
      type: "Point",
      coordinates: [-56.296168, -14.724662]
    },
    properties: {
      id: "1",
      latitude: -56.2961681,
      longitude: -14.7246617,
      saNumber: 2,
      saConfig: [
        {
          phaseA: true,
          phaseB: false,
          phaseC: true
        }
      ],
      resistance: 0.7,
      spanLength: 7,
      gfd: 70
    }
  },
  {
    type: "Feature",
    id: 2,
    geometry: {
      type: "Point",
      coordinates: [-56.295243, -14.724058]
    },
    properties: {
      id: "2",
      latitude: -56.2952434,
      longitude: -14.7240577,
      saNumber: 2,
      saConfig: [
        {
          phaseA: true,
          phaseB: false,
          phaseC: true
        }
      ],
      resistance: 0.7,
      spanLength: 7,
      gfd: 70
    }
  },
  {
    type: "Feature",
    id: 3,
    geometry: {
      type: "Point",
      coordinates: [-56.293874, -14.723475]
    },
    properties: {
      id: "3",
      latitude: -56.293874,
      longitude: -14.7234749,
      saNumber: 2,
      saConfig: [
        {
          phaseA: true,
          phaseB: false,
          phaseC: true
        }
      ],
      resistance: 0.7,
      spanLength: 7,
      gfd: 70
    }
  },
  {
    type: "Feature",
    id: 4,
    geometry: {
      type: "Point",
      coordinates: [-56.29159, -14.721944]
    },
    properties: {
      id: "4",
      latitude: -56.2915897,
      longitude: -14.7219445,
      saNumber: 2,
      saConfig: [
        {
          phaseA: true,
          phaseB: false,
          phaseC: true
        }
      ],
      resistance: 0.7,
      spanLength: 7,
      gfd: 70
    }
  },
  {
    type: "Feature",
    id: 5,
    geometry: {
      type: "Point",
      coordinates: [-56.288621, -14.719951]
    },
    properties: {
      id: "5",
      latitude: -56.2886207,
      longitude: -14.719951,
      saNumber: 2,
      saConfig: [
        {
          phaseA: true,
          phaseB: false,
          phaseC: true
        }
      ],
      resistance: 0.7,
      spanLength: 7,
      gfd: 70
    }
  },
  {
    type: "Feature",
    id: 6,
    geometry: {
      type: "Point",
      coordinates: [-56.28619, -14.717376]
    },
    properties: {
      id: "6",
      latitude: -56.2861901,
      longitude: -14.7173759,
      saNumber: 2,
      saConfig: [
        {
          phaseA: true,
          phaseB: false,
          phaseC: true
        }
      ],
      resistance: 0.7,
      spanLength: 7,
      gfd: 70
    }
  }
];

let testEdges = [
  { from: 0, to: 1 },
  { from: 0, to: 3 },
  { from: 1, to: 2 },
  { from: 1, to: 2 }
];

var myGraph = MGraph.initializeGraph(testVertices, testEdges);
myGraph.printAdjacencyList();
console.log("------------------------------------");
myGraph.printAdjacencyList();
// export default MGraph;
