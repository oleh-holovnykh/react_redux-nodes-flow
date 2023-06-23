import React, { useState } from 'react';
import cn from 'classnames';
import './customSelect.scss';
import { SelectList } from '../selectList';
import arrowDown from '../../images/keyboard_arrow_down_24px.svg';
import arrowUp from '../../images/expand_more_24px.svg';

interface Props {
  label: string;
  checkedOptions: string[];
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomSelect: React.FC<Props> = ({
  label,
  checkedOptions,
  onCheckboxChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toogleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn('dropdown-check-list', {
        visible: isOpen,
      })}
      onClick={toogleDropdown}
    >
      <span className="anchor">
        {label}
        <img
          className='anchorIcon'
          src={isOpen ? arrowUp : arrowDown}
          alt="select icon" 
        />
      </span>
      <SelectList
        checkedOptions={checkedOptions}
        onCheckboxChange={onCheckboxChange}
      />
    </div>
  );
};
