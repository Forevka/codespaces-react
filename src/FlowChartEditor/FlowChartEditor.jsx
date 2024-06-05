import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

import ColorSelectorNode from './ColorSelectorNode';

import { ReactFlowProvider } from 'reactflow';
import EndNode from './EndNode';
import StartNode from './StartNode';

import ButtonEdge from './ButtonEdge';

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };

const snapGrid = [20, 20];

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const nodeTypes = {
  end: EndNode,
  start: StartNode,
  selectorNode: ColorSelectorNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const initialNodes = [
  {
    id: 'start',
    type: 'start',
    data: { },
    position: { x: 0, y: 50 },
  },
  {
    id: 'end',
    type: 'end',
    data: { },
    position: { x: 650, y: 25 },
    targetPosition: 'left',
  },
  /*{
    id: '3',
    type: 'output',
    data: { label: 'Output A' },
    position: { x: 650, y: 25 },
    targetPosition: 'left',
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Output B' },
    position: { x: 650, y: 100 },
    targetPosition: 'left',
  },*/
];

const initialEdges = [
  {
    id: 'start-end',
    source: 'start',
    target: 'end',
    animated: true,
    type: 'buttonedge',
    style: { stroke: '#fff' },
  },
  /*{
    id: 'e2a-3',
    source: '2',
    target: '3',
    sourceHandle: 'a',
    animated: true,
    style: { stroke: '#fff' },
  },
  {
    id: 'e2b-4',
    source: '2',
    target: '4',
    sourceHandle: 'b',
    animated: true,
    style: { stroke: '#fff' },
  },*/
];

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [bgColor, setBgColor] = useState(initBgColor);
  

  useEffect(() => {
    /*const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };*/

    setNodes(nodes);

    setEdges(edges);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' }, type: 'buttonedge' }, eds)),
    []
  );

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow 
          nodes={nodes}
          edges={edges}

          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}

          style={{ background: bgColor }}

          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}

          connectionLineStyle={connectionLineStyle}
          
          snapToGrid={true}
          snapGrid={snapGrid}
          defaultViewport={defaultViewport}
          fitView
          attributionPosition="bottom-left"
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'selectorNode') return bgColor;
              if (n.type === 'output') return '#ff0072';
            }}
            nodeColor={(n) => {
              if (n.type === 'selectorNode') return bgColor;
              return '#fff';
            }}
          />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default CustomNodeFlow;
