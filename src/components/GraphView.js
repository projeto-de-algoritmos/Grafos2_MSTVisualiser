import React, { useEffect, useState } from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import { primsMST } from "./Graph";

Cytoscape.use(COSEBilkent);

export const animateObject = (running= false, startingNode= null, currentNode=null, cut= [], edgesT= [], next= [], currentStep = -1) => {
  return {running,currentNode, startingNode, cut, edgesT, next, currentStep };
}

const STEPS = {
  SET_VISITED: 0,
  GET_NEIGHBOORS: 1,
}

const GraphView = (props) => {
  const {elements} = props;
  const [state, setState] = useState({MSTElements: [], elements, animation:animateObject()});
  console.log(state);
  const tick = () => {
    setTimeout(() => {
      let { animation } = state;
      if(animation.running){
        if(animation.currentStep === STEPS.SET_VISITED){
          animation.currentNode.cy().$('#' + animation.currentNode.id()).data("id", true);
        }
        animation.currentStep++;
      }
      setState({...state, animation: {...animation}})
      tick();
    }, 1000);
  }


  useEffect(tick, []);
  const stylesheet = [
    {
      selector: 'edge', 
      style: {
        'label': 'data(weight)',
      }
    },
    {
      selector: 'node', 
      style: {
        'label': 'data(label)' // maps to data.label
      }
    },
    {
      selector: 'node[visited]', 
      style: {
        'background-color': '#f00' // maps to data.label
      }
    }
  ]

  const layout = { name: 'cose-bilkent' };
  const style = { width: '100%', height: 'calc(100vh - 53px)' };


  const cy = cyArg => {
    cyArg.one('tap', 'node', function(evt){
      const elems = primsMST(cyArg.nodes());
      console.log("tap", elems);
      setState({...state, MSTElements: elems});
    });
  }

  const getPrintableStatus = () => {
    if(state.animation.currentStep === STEPS.SET_VISITED){
      return <p>Marcando como visitado...</p>;
    }
    else if(state.animation.currentStep === STEPS.GET_NEIGHBOORS){
      return <p>Recuperando vizinhos...</p>;
    }
    else {
      return <p>Selecione um nó...</p>;
    }
  }

  return (
    <div>
      {getPrintableStatus()}
      <CytoscapeComponent cy={cy} layout={layout} elements={state.elements} style={style} stylesheet={stylesheet} />
      {state.MSTElements.length && <CytoscapeComponent cy={cy} layout={layout} elements={state.MSTElements} style={style} stylesheet={stylesheet} />}
    </div>
  );
}

export default GraphView;