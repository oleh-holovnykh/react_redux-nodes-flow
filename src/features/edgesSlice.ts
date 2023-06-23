import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Edge } from 'reactflow';

type EdgesState = {
  edges: Edge[];
};

const initialState: EdgesState = {
  edges: [],
};

const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    add: (state, actions: PayloadAction<Edge>) => {
      state.edges.push(actions.payload);
    },
    delete: (state, actions: PayloadAction<string>) => {
      state.edges = state.edges.filter(el => !el.id.includes(actions.payload));
    },
    init: (state, actions: PayloadAction<Edge[]>) => {
      state.edges = actions.payload;
    }
  },
});

export default edgesSlice.reducer;
export const { actions } = edgesSlice;
