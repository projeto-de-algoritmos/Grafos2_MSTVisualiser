import './App.css';
import { useState } from 'react';
import GraphView, { animateObject } from './components/GraphView';

const cidades= [
  'Águas Claras (RA XX)',
  'Arniqueira (RA XXXIII)',
  'Brazlândia (RA IV)',
  'Candangolândia (RA XIX)',
  'Ceilândia (RA IX)',
  'Cruzeiro (RA XI)',
  'Fercal (RA XXXI)',
  'Gama (RA II)',
  'Guará (RA X)',
  'Itapoã (RA XXVIII)',
  'Jardim Botânico (RA XXVII)',
  'Lago Norte (RA XVIII)',
  'Lago Sul (RA XVI)',
  'Núcleo Bandeirante (RA VIII)',
  'Paranoá (RA VII)',
  'Park Way (RA XXIV)',
  'Planaltina (RA VI)',
  'Plano Piloto (RA I)',
  'Recanto das Emas (XV)',
  'Riacho Fundo (RA XVII)',
  'Riacho Fundo II (RA XXI)',
  'Samambaia (RA XII)',
  'Santa Maria (RA XIII)',
  'São Sebastião (RA XIV)',
  'SCIA/Estrutural (RA XXV)',
  'SIA (RA XXIX)',
  'Sobradinho (RA V)',
  'Sobradinho II (RA XXVI)',
  'Sol Nascente e Pôr do Sol ( RA XXXII)',
  'Sudoeste/Octogonal (RA XXII)',
  'Taguatinga (RA III)',
  'Varjão (RA XXIII)',
  'Vicente Pires (RA XXX)'

];

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const graphEdge = (i, iNeighboor, weight ) => ({group: 'edges', data: { source: cidades[i] ? cidades[i] : i, target: cidades[iNeighboor] ? cidades[iNeighboor] : iNeighboor, weight: weight ? weight : getRandomArbitrary(1,10) } });
export const graphNode = (i, position) => ({group: 'nodes', data: { id: cidades[i] ? cidades[i] : i, label: cidades[i] ? cidades[i] : i }, position});

const generateGraph = () => {
  const graph = [];
  const nVertex = getRandomArbitrary(15,20);
  for(let i = 0; i < nVertex; i++){
    graph.push(graphNode(i));
    console.log("letra: " + cidades[i]);
  }
  for (let i = 0; i < nVertex; i++){
    for(var j = 0; j < getRandomArbitrary(1,3); j++){
      const rNeighboor = getRandomArbitrary(0,nVertex-1);
      if(rNeighboor !== i && !graph.find((node) => node.data.source === rNeighboor &&  node.data.target === i )){
        graph.push(graphEdge(i, rNeighboor, null));
      }
    } 
  }
  for (let i = 0; i < nVertex; i++){
    if(!graph.find((elem) => elem.data.source === graph[i].data.id || elem.data.target === graph[i].data.id)){
      let rNeighboor = getRandomArbitrary(0,nVertex-1);
      while(rNeighboor === i){
        rNeighboor = getRandomArbitrary(0,nVertex-1);
      }
      graph.push(graphEdge(i, rNeighboor, null));
    }
  }
  console.log(graph);
  return graph;
}

function App() {
  const [graph, setGraph] = useState( generateGraph());
  return (
    <div>
      <GraphView elements = {graph} setGraph={setGraph} />
    </div>
  );
}

export default App;
