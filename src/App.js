import Graph from 'directed-graph';
import './App.css';
import { useEffect, useState } from 'react';
import GraphView from './components/GraphView';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const generateGraph = () => {
  const letras='abcdefghijklmnopqrstuvxyz';
  const nVertex = getRandomArbitrary(15,20);
  var graph = new Graph();
  for(i = 0; i < nVertex; i++){
    graph.addVertex(letras[i]);
    console.log("letra: " + letras[i]);
  }
  for (var i=0; i < nVertex; i++){
    for(var j = 0; j < getRandomArbitrary(1,3); j++){
      graph.addEdge(letras[i],letras[j],getRandomArbitrary(1,10));
      console.log("aresta: " + letras[i] + ',' + letras[j]);
    } 
  }
}

function App() {
  const [graph, setGraph] = useState(generateGraph());

  return (
    <div>
      <GraphView />
    </div>
  );
}

export default App;
