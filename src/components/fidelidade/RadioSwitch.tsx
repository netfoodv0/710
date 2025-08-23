import React from 'react';
import styled from 'styled-components';

interface RadioSwitchProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  name: string;
}

const RadioSwitch: React.FC<RadioSwitchProps> = ({ value, onChange, options, name }) => {
  return (
    <StyledWrapper>
      <div className="filter-switch">
        {options.map((option, index) => (
          <React.Fragment key={option.value}>
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <label className="option" htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </React.Fragment>
        ))}
        <span 
          className="background" 
          style={{ 
            left: value === options[1]?.value ? '50%' : '4px' 
          }} 
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .filter-switch {
    border: 2px solid #8b5cf6;
    border-radius: 30px;
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    width: 400px;
    overflow: hidden;
  }
  
  .filter-switch input {
    display: none;
  }
  
  .filter-switch label {
    flex: 1;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all 0.5s;
    font-weight: 500;
    font-size: 16px;
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .filter-switch .background {
    position: absolute;
    width: 49%;
    height: 38px;
    background-color: #8b5cf6;
    top: 4px;
    left: 4px;
    border-radius: 30px;
    transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .filter-switch input:checked + label {
    color: #ffffff;
    font-weight: bold;
  }
  
  .filter-switch input:not(:checked) + label {
    color: #6b7280;
  }
  
  .filter-switch input:checked + label:hover {
    color: #ffffff;
  }
  
  .filter-switch input:not(:checked) + label:hover {
    color: #8b5cf6;
  }
`;

export default RadioSwitch;
