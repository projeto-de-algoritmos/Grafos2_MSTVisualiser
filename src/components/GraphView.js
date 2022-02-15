import React, { useEffect, useState } from "react";

const GraphView = (props) => {
    const [tickCount, setTickCount] = useState(0);
  
    const tick = () => {
      setTimeout(() => {
        setTickCount(new Date().getTime());
        tick();
      }, 1000);
    }
  
  
    useEffect(tick, [])
 
    return <div>{tickCount}</div>
}

export default GraphView;