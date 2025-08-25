import React from 'react';
import styled from 'styled-components';

interface RadioOption {
  id: string;
  label: string;
  notification?: number;
}

interface RadioProps {
  options: RadioOption[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
}

const Radio: React.FC<RadioProps> = ({
  options,
  name,
  defaultValue,
  onChange,
  className,
  size = 'medium',
  color = '#185ee0',
  backgroundColor = '#e6eef9'
}) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { height: '24px', width: '100px', fontSize: '0.7rem', padding: '0.5rem' };
      case 'large':
        return { height: '36px', width: '120px', fontSize: '0.9rem', padding: '1rem' };
      default:
        return { height: '30px', width: '110px', fontSize: '0.8rem', padding: '0.75rem' };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <StyledWrapper 
      className={className}
      $color={color}
      $backgroundColor={backgroundColor}
      $sizeStyles={sizeStyles}
    >
      <div className="container">
        <div className="tabs">
          {options.map((option, index) => (
            <React.Fragment key={option.id}>
              <input
                type="radio"
                id={option.id}
                name={name}
                defaultChecked={defaultValue === option.id}
                onChange={() => handleChange(option.id)}
              />
              <label className="tab" htmlFor={option.id}>
                {option.label}
                {option.notification && (
                  <span className="notification">{option.notification}</span>
                )}
              </label>
            </React.Fragment>
          ))}
          <span className="glider" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{
  $color: string;
  $backgroundColor: string;
  $sizeStyles: { height: string; width: string; fontSize: string; padding: string };
}>`
  .tabs {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow:
      0 0 1px 0 ${props => props.$color}26,
      0 6px 12px 0 ${props => props.$color}26;
    padding: ${props => props.$sizeStyles.padding};
    border-radius: 99px;
  }

  .tabs * {
    z-index: 2;
  }

  .container input[type="radio"] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${props => props.$sizeStyles.height};
    width: ${props => props.$sizeStyles.width};
    font-size: ${props => props.$sizeStyles.fontSize};
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
    position: relative;
  }

  .notification {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 10px;
    left: 30%;
    font-size: 10px;
    margin-left: 0.75rem;
    border-radius: 50%;
    margin: 0px;
    background-color: ${props => props.$backgroundColor};
    transition: 0.15s ease-in;
  }

  .container input[type="radio"]:checked + label {
    color: ${props => props.$color};
  }

  .container input[type="radio"]:checked + label > .notification {
    background-color: ${props => props.$color};
    color: #fff;
    margin: 0px;
  }

  ${props => {
    // Gerar estilos dinamicamente baseado no número de opções
    return Array.from({ length: 10 }, (_, index) => `
      .container input:nth-of-type(${index + 1}):checked ~ .glider {
        transform: translateX(${index * 100}%);
      }
    `).join('');
  }}

  .glider {
    position: absolute;
    display: flex;
    height: ${props => props.$sizeStyles.height};
    width: ${props => props.$sizeStyles.width};
    background-color: ${props => props.$backgroundColor};
    z-index: 1;
    border-radius: 99px;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 700px) {
    .tabs {
      transform: scale(0.6);
    }
  }
`;

export default Radio;
