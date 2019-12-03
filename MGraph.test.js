const MGraph = require("./MGraph");

let testVertices = [
  {
    id: 0,
    props: {
      pV: true
    }
  },
  {
    id: 1,
    props: {
      pV: false
    }
  },
  {
    id: 2,
    props: {
      pV: true
    }
  },
  {
    id: 3,
    props: {
      pV: false
    }
  },
  {
    id: 4,
    props: {
      pV: false
    }
  },
  {
    id: 5,
    props: {
      pV: false
    }
  }
];

let testEdges = [
  {
    from: 0,
    to: 1,
    props: { pE: false }
  },
  {
    from: 0,
    to: 2,
    props: { pE: true }
  },
  {
    from: 0,
    to: 3,
    props: { pE: true }
  },
  {
    from: 3,
    to: 1,
    props: { pE: true }
  },
  {
    from: 2,
    to: 2,
    props: { pE: false }
  },
  {
    from: 2,
    to: 2,
    props: { pE: false }
  }
];

var myGraph = MGraph.initializeGraph(testVertices, testEdges);
console.log(myGraph.getAdjacencyList());
// console.log(myGraph.findVertices(el => (el.properties.pV ? true : false)));
console.log(
  myGraph.findEdges(el => {
    if (el.properties) return el.properties.pE ? true : false;
  })
);
