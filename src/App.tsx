/* eslint-disable */
import React,{ memo } from 'react';
import './App.css';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './types/nodeTypes';
import { useAppSelector } from './app/hooks';

const App: React.FC = memo(() => {
  const { nodes } = useAppSelector((state) => state.nodes);
  const { edges } = useAppSelector((state) => state.edges);

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
      />
    </div>
  );
});

export default App;
