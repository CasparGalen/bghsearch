import React, { useState } from 'react';
import { Stats, ToggleRefinement } from 'react-instantsearch';
import './Tabs.css';

export type TabProps = {
  children: React.ReactNode;
  title: string;
};

export function Tabs({ children }: { children: React.ReactNode }) {
  const [isToggleChecked, setIsToggleChecked] = useState(false);

  return (
    <div className="Tabs-div">
      <div className='Tabs-outer'>
        <div className='empty-div'></div>
        <div className="stats-div">
          <Stats />
        </div>
        <div className="Tabs-buttons">
        <label htmlFor="tab-toggle" className="tab">
          <span className='mt-3 mr-3 font-medium'>
            Nur Leitsatzentscheidungen:
          </span>
          <input
            id="tab-toggle"
            type="checkbox"
            className="custom-toggle"
            onChange={() => setIsToggleChecked(!isToggleChecked)}
          />
        </label>
      </div>
      </div>
      <div className="Tabs-content">
        {React.Children.map(children, (child, index) => (
          <div
            tabIndex={0}
            role="tabpanel"
            id={`tab-${index}`}
            aria-labelledby={`tab-${index}`}
            key={index}
          >
            {React.cloneElement(child as React.ReactElement<any>, { isToggleChecked })}
          </div>
        ))}
      </div>
      {isToggleChecked && (
        <ToggleRefinement
          attribute="guiding_principles"
          off="Ja"
          className={isToggleChecked ? 'hidden-toggle-refinement' : ''}
        />
      )}
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
