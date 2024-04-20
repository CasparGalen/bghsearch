import React from 'react';
import * as LogoComponents from './LogoComponents';

export function Logos () {
  return (
    <>
      <svg data-testid="logo_bgh" className='logo_bgh' width='254' height='25'>
        <LogoComponents.BGHLogo />
      </svg>
      <svg data-testid="logo_bgh_white" className='logo_bgh_white' width='254' height='25'>
        <LogoComponents.BGHLogoWhite />
      </svg>
    </>
  );
}
