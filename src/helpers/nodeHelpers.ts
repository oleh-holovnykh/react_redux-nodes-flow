import { MarkerType } from 'reactflow';

export const createNextNode = (
  id: string,
  x: number,
  y: number,
  ...parrentOptions: string[]
) => {
  const newPosition = {
    x: x + 200,
    y: y + 200,
  };
  const nextId = (+id + 1).toString();

  return {
    id: nextId,
    position: newPosition,
    data: {
      parrentChoices: parrentOptions,
    },
    type: 'optionsPicker',
  };
};

export const createNextEdge = (id: string) => {
  const nextId = (+id + 1).toString();

  return {
    id: id + '-' + nextId,
    source: id,
    target: nextId,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  };
};

export const createDataForNode = (
  id: string,
  ...options: string[]
) => {
  return {
    id,
    data: {
      choices: options,
    },
  };
};
