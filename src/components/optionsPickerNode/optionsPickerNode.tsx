import React, { useEffect, useState } from 'react';
import { Handle, MarkerType, NodeProps, Position } from 'reactflow';
import { CustomSelect } from '../customSelect';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as nodeActions } from '../../features/nodesSlice';
import { actions as edgeActions } from '../../features/edgesSlice';
import './optionsPickerNode.scss';

export const OptionsPickerNode: React.FC<NodeProps> = ({
  id,
  xPos,
  yPos,
  data,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { nodes } = useAppSelector((state) => state.nodes);

  const nextId = (+id + 1).toString();
  const hasNextElement = nodes.some((el) => el.id === nextId);

  useEffect(() => {
    if (data.choices) {
      setSelectedOptions(data.choices);
    }
  }, []);

  useEffect(() => {
    const newDataForCurrentNode = {
      id,
      data: {
        choices: selectedOptions,
      },
    };

    if (selectedOptions.length && !hasNextElement) {
      const newPosition = {
        x: xPos + 200,
        y: yPos + 200,
      };

      const nextNode = {
        id: nextId,
        position: newPosition,
        data: {
          parrentChoices: data.parrentChoices.concat(selectedOptions),
        },
        type: 'optionsPicker',
      };

      const nextEdge = {
        id: id + '-' + nextId,
        source: id,
        target: nextId,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      dispatch(nodeActions.add(nextNode));
      dispatch(edgeActions.add(nextEdge));
    }

    if (selectedOptions.length && hasNextElement) {
      const newDataForNextNode = {
        id: nextId,
        data: {
          parrentChoices: data.parrentChoices.concat(selectedOptions),
        },
      };

      dispatch(nodeActions.update(newDataForNextNode));
    }
  
    dispatch(nodeActions.update(newDataForCurrentNode));

    if (!selectedOptions.length && hasNextElement) {
      const nextEdgeId = id + '-' + nextId;

      dispatch(nodeActions.deleteAllNext(id));
      dispatch(edgeActions.delete(nextEdgeId));
    }
    
  }, [selectedOptions, data]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(value)) {
        return prevSelectedOptions.filter((option) => option !== value);
      } else {
        return [...prevSelectedOptions, value];
      }
    });
  };

  const hasChoices = data.parrentChoices.length || data.choices.length;

  const label = hasChoices
    ? 'Варіант ' + data.parrentChoices.concat(data.choices).join('-')
    : 'Виберіть варіант';

  return (
    <>
      <div className='node-container'>
        <div className='question-container'></div>
        <CustomSelect
          label={label}
          checkedOptions={data.choices || []}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>


      {+id === 1 && hasNextElement && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#ADB5BD' }}
        />
      )}

      {hasNextElement && +id !== 1 && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#ADB5BD' }}
        />
      )}

      {+id !== 1 && (
        <Handle
          type="target"
          position={Position.Top}
          style={{
            visibility: 'hidden',
            transform: 'translateY(4px)',
          }}
        />
      )}
    </>
  );
};
