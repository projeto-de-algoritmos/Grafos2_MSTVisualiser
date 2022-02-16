import React, { useEffect, useState } from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use(COSEBilkent);

const GraphView = (props) => {
  const {elements} = props;
  const setTickCount = useState(0)[1];

  const tick = () => {
    setTimeout(() => {
      setTickCount(new Date().getTime());
      tick();
    }, 1000);
  }


  useEffect(tick, []);
  const stylesheet = [
    {
      selector: 'edge', 
      style: {
        'label': 'data(weight)', // maps to data.label
      }
    },
    {
      selector: 'node', 
      style: {
        'label': 'data(label)' // maps to data.label
      }
    }
  ]

  const layout = { name: 'cose-bilkent' };
  const style = { width: '100%', height: '100vh' };
  const cy = cyArg => {
    cyArg.on('tap', 'node', function(evt){
      var node = evt.target;
      console.log( 'tapped ' + node.id() );
    });
  }

  return (
    <div>
      <CytoscapeComponent cy={cy} layout={layout} elements={elements} style={style} stylesheet={stylesheet} />
    </div>
  );
}

export default GraphView;