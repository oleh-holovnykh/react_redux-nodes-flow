
import React from 'react';
import { Option } from '../../types/option';
import './selectItem.scss';

interface Props {
  option: Option;
  isChecked: boolean;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectItem: React.FC<Props> = ({ 
  option,
  onCheckboxChange,
  isChecked,
}) => {

  return (
    <li className='item'>
      <input
        type="checkbox"
        checked={isChecked}
        value={option.id.toString()}
        onChange={onCheckboxChange}
      />
      {option.title}
    </li>
  );
};
