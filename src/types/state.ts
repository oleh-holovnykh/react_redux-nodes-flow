import { Edge, Node } from 'reactflow';

export interface State {
  nodes: {
    nodes: Node[];
  };
  edges: {
    edges: Edge[];
  };
}
