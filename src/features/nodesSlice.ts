import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Node } from 'reactflow';

type NodesState = {
  nodes: Node[];
};

const initialState: NodesState = {
  nodes: [
    {
      id: '1',
      data: {
        parrentChoices: [],
        choices: [],
      },
      position: { x: 0, y: 0 },
      type: 'optionsPicker'
    },
  ]
};

type Payload = {
  id: string,
  data: {
    choices?: string[],
    parrentChoices?: string[],
  };
}

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    deleteAllNext: (state, actions: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(el => el.id <= actions.payload);
    },
    add: (state, actions: PayloadAction<Node>) => {
      state.nodes.push(actions.payload);
    },
    update: (state, actions: PayloadAction<Payload>) => {
      const nodeToUpdate = state.nodes.find(el => el.id === actions.payload.id);

      if (nodeToUpdate) {
        Object.assign(nodeToUpdate.data, actions.payload.data);
      }
    },
    init: (state, actions: PayloadAction<Node[]>) => {
      state.nodes = actions.payload;
    }
  }
});

export default nodesSlice.reducer;
export const { actions } = nodesSlice;
