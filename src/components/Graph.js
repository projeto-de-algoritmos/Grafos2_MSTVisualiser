import PriorityQueue from "js-priority-queue";
import cytoscape from 'cytoscape';
import { graphEdge, graphNode } from "../App";


export const primsMST = (nodes, startingNode) => {
    // Initialize graph that'll contain the MST
    const MST = new cytoscape();
    const MSTBlueprint = [];
    if (nodes.length === 0) {
       return MST;
    }
 
 
    // Select first node as starting node
    let s = startingNode;
 
 
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueue({comparator: function(a, b) { return b.data('weight') - a.data('weight'); }});
    let explored = new Set();
    explored.add(s);
    MST.add(graphNode(s.id(), s.position()));
    MSTBlueprint.push(graphNode(s.id(), s.position()));
    // Add all edges from this starting node to the PQ taking weights as priority
    s.connectedEdges().forEach(edge => {
        edgeQueue.queue(edge);
    });
 
 
    // Take the smallest edge and add that to the new graph
    let currentMinEdge = edgeQueue.dequeue();
    while (edgeQueue.length !== 0) {
        const isExplored = (edge) => {
            return explored.has(edge.source()) && explored.has(edge.target());
        }
        const getUnexplored = (edge) => {
            return explored.has(edge.source()) ? edge.target() : edge.source();
        }
       // COntinue removing edges till we get an edge with an unexplored node
       while (edgeQueue.length !== 0 && isExplored(currentMinEdge)) {
          currentMinEdge = edgeQueue.dequeue();
       }
       let nextNode = getUnexplored(currentMinEdge);
 
 
       // Check again as queue might get empty without giving back unexplored element
       if (!explored.has(nextNode)) {
        if(MST.getElementById(currentMinEdge.source().id()).empty()){
            MSTBlueprint.push(graphNode(currentMinEdge.source().id(), currentMinEdge.source().position()));
            MST.add(graphNode(currentMinEdge.source().id(), currentMinEdge.source().position()));
        }
        if(MST.getElementById(currentMinEdge.target().id()).empty()){            
            MSTBlueprint.push(graphNode(currentMinEdge.target().id()));
            MST.add(graphNode(currentMinEdge.target().id()));
        }   
        MSTBlueprint.push(graphEdge(currentMinEdge.source().id(), currentMinEdge.target().id(), currentMinEdge.data('weight')));
        MST.add(graphEdge(currentMinEdge.source().id(), currentMinEdge.target().id(), currentMinEdge.data('weight')));
          // Again add all edges to the PQ
          nextNode.connectedEdges().forEach(edge => {
             edgeQueue.queue(edge);
          });
 
 
          // Mark this node as explored explored.add(nextNode);
          explored.add(nextNode)
       }
    }
    return MSTBlueprint.sort((a, b) => (a.group === "edges") ? 1 : -1);
 }
 