const MGraph = require("./MGraph");

let testVertices = [
  {
    id: 0,
    properties: {
      latitude: -56.2961681,
      longitude: -14.7246617
    }
  },
  {
    id: 1,
    properties: {
      latitude: -56.2952434,
      longitude: -14.7240577
    }
  },
  {
    id: 2,
    properties: {
      latitude: -56.293874,
      longitude: -14.7234749
    }
  },
  {
    id: 3,
    properties: {
      latitude: -56.2915897,
      longitude: -14.7219445
    }
  },
  {
    id: 4,
    properties: {
      latitude: -56.2886207,
      longitude: -14.719951
    }
  },
  {
    id: 5,
    properties: {
      latitude: -56.2861901,
      longitude: -14.7173759
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
myGraph.removeVertex(4);
console.log(myGraph.getAdjacents(1));
console.log(myGraph.getAdjacencyList());
