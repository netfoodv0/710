import React from 'react';
import styled from 'styled-components';

interface ToggleOption {
  id: string;
  label: string;
}

interface ToggleProps {
  options: ToggleOption[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  options,
  name,
  defaultValue,
  onChange,
  className,
  size = 'medium',
  color = '#8b5cf6',
  backgroundColor = '#f3f4f6'
}) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { height: '28px', width: '130px', fontSize: '0.7rem', padding: '0.4rem' };
      case 'large':
        return { height: '40px', width: '160px', fontSize: '0.9rem', padding: '0.8rem' };
      default:
        return { height: '32px', width: '140px', fontSize: '0.8rem', padding: '0.6rem' };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <StyledToggle 
      className={className}
      $color={color}
      $backgroundColor={backgroundColor}
      $sizeStyles={sizeStyles}
    >
      <div className="toggle-container">
        <div className="toggle-track">
          {options.map((option, index) => (
            <React.Fragment key={option.id}>
              <input
                type="radio"
                id={`${name}-${option.id}`}
                name={name}
                defaultChecked={defaultValue === option.id}
                onChange={() => handleChange(option.id)}
              />
              <label className="toggle-option" htmlFor={`${name}-${option.id}`}>
                {option.label}
              </label>
            </React.Fragment>
          ))}
          <span className="toggle-slider" />
        </div>
      </div>
    </StyledToggle>
  );
}

const StyledToggle = styled.div<{
  $color: string;
  $backgroundColor: string;
  $sizeStyles: { height: string; width: string; fontSize: string; padding: string };
}>`
  .toggle-container {
    display: flex;
    align-items: center;
  }

  .toggle-track {
    display: flex;
    position: relative;
    background-color: ${props => props.$backgroundColor};
    padding: ${props => props.$sizeStyles.padding};
    border-radius: 99px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .toggle-track * {
    z-index: 2;
  }

  .toggle-container input[type="radio"] {
    display: none;
  }

  .toggle-option {
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${props => props.$sizeStyles.height};
    width: ${props => props.$sizeStyles.width};
    font-size: ${props => props.$sizeStyles.fontSize};
    color: #6b7280;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    user-select: none;
  }

  .toggle-container input[type="radio"]:checked + label {
    color: #ffffff;
    font-weight: 600;
  }

  ${props => {
    // Gerar estilos dinamicamente baseado no número de opções
    return Array.from({ length: 10 }, (_, index) => `
      .toggle-container input:nth-of-type(${index + 1}):checked ~ .toggle-slider {
        transform: translateX(${index * 100}%);
      }
    `).join('');
  }}

  .toggle-slider {
    position: absolute;
    display: flex;
    height: ${props => props.$sizeStyles.height};
    width: ${props => props.$sizeStyles.width};
    background-color: ${props => props.$color};
    z-index: 1;
    border-radius: 99px;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  }

  /* Hover effects */
  .toggle-option:hover {
    color: ${props => props.$color};
  }

  .toggle-container input[type="radio"]:checked + label:hover {
    color: #ffffff;
  }

  @media (max-width: 700px) {
    .toggle-track {
      transform: scale(0.9);
    }
  }
`;

export default Toggle;
