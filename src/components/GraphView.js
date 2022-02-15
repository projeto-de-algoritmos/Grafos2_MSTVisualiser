import React, { useEffect, useState } from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use(COSEBilkent);

export const animateObject = (running= false, startingNode= null, currentNode=null, cut= [], edgesT= [], next= [], currentStep = -1) => {
  return {running,currentNode, startingNode, cut, edgesT, next, currentStep };
}

const STEPS = {
  SET_VISITED: 0,
  GET_NEIGHBOORS: 1,
}

const GraphView = (props) => {
  const [state, setState] = useState({animation:animateObject()});
  const {elements,setGraph} = props;
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

  const handleOnClick = (cy, node) => {
    if(!state.animation.running){
      setState({...state, animation:animateObject(true, node, node, null, null, null, STEPS.SET_VISITED)});
    }
  }

  const cy = cyArg => {
    cyArg.one('tap', 'node', function(evt){
      handleOnClick(cyArg, evt.target);
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
      <CytoscapeComponent cy={cy} layout={layout} elements={elements} style={style} stylesheet={stylesheet} />
    </div>
  );
}

export default GraphView;