import React from 'react';
import { Vortex } from 'react-loader-spinner';
import './loading-screen.css';

export const LoadingScreen: React.FC = () => (
  <div className="loadingVortex">
    <Vortex
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
    <span className="loadingText">Loading...</span>
  </div>
);
