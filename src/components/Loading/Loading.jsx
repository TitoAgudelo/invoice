import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = ({ size = '50' }) => {
  return (
    <LoadingContainer size={size}>
      <div className="load-9">
        <div className="spinner">
          <div className="bubble-1"></div>
          <div className="bubble-2"></div>
        </div>
      </div>
    </LoadingContainer>
  );
};

const loadingI = keyframes`
  100% {transform: rotate(360deg);}
`;

const bounce = keyframes`    
  0%, 100% {transform: scale(0);}
  50% {transform: scale(1);}
`;

const LoadingContainer = styled.div`
  width: fit-content;

  .spinner {
    position: relative;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    margin: 0 auto;
  }

  .bubble-1,
  .bubble-2 {
    position: absolute;
    top: 0;
    width: ${({ size }) => `${size / 2}px`};
    height: ${({ size }) => `${size / 2}px`};
    border-radius: 100%;
    background-color: #3ee085;
  }

  .bubble-2 {
    top: auto;
    bottom: 0;
  }

  .load-9 {
    .spinner {
      animation: ${loadingI} 2s linear infinite;
    }
    .bubble-1,
    .bubble-2 {
      animation: ${bounce} 2s ease-in-out infinite;
    }
    .bubble-2 {
      animation-delay: -1s;
    }
  }
`;

export default Loading;
