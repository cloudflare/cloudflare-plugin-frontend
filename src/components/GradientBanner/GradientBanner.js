import React from 'react';
import { createComponent } from 'cf-style-container';

const gradientStyles = () => ({
  width: '100%',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  background: 'linear-gradient(left, #8176B5, #76C4E2)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 250px',
  backgroundColor: '#e6e6e6'
});

const GradientBanner = ({ className, children }) => {
  return React.createElement('div', { className }, children);
};

export default createComponent(gradientStyles, GradientBanner);
