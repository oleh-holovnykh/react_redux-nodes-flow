import React from 'react';
import options from '../../api/options.json';
import { SelectItem } from '../selectItem';
import './selectList.scss';

interface Props {
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedOptions: string[];
}

export const SelectList: React.FC<Props> = ({
  onCheckboxChange,
  checkedOptions,
}) => {
  return (
    <ul className="items">
      {options.map((el) => {
        const isChecked = checkedOptions.includes(el.id.toString());

        return (
          <SelectItem
            key={el.id}
            option={el}
            isChecked={isChecked}
            onCheckboxChange={onCheckboxChange}
          />
        );
      })}
    </ul>
  );
};
