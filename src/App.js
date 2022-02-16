import './App.css';
import { useState } from 'react';
import GraphView from './components/GraphView';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const generateGraph = () => {
  const graph = [];
  const letras='abcdefghijklmnopqrstuvxyz'.toUpperCase();
  const nVertex = getRandomArbitrary(15,20);
  for(let i = 0; i < nVertex; i++){
    graph.push({group: 'nodes', data: { id: letras[i], label: letras[i] }});
    console.log("letra: " + letras[i]);
  }
  for (let i = 0; i < nVertex; i++){
    for(var j = 0; j < getRandomArbitrary(1,3); j++){
      const rNeighboor = getRandomArbitrary(0,nVertex-1);
      if(rNeighboor !== i && !graph.find((node) => node.data.source === rNeighboor &&  node.data.target === i )){
        graph.push({group: 'edges', data: { source: letras[i], target: letras[rNeighboor], weight: getRandomArbitrary(1,10) } });
      }
    } 
  }
  console.log(graph);
  return graph;
}

function App() {
  const temp = generateGraph();
  const [graph, setGraph] = useState(temp);
  console.log(temp,graph);
  return (
    <div>
      <GraphView elements = {graph}/>
    </div>
  );
}

export default App;
