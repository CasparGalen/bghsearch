import React, { useState } from 'react';
import { Stats } from '../TopNavBar/Stats';
import './Tabs.css';

export type TabProps = {
  children: React.ReactNode;
  title: string;
};

export function Tabs({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabToggle = () => {
    setCurrentTab(currentTab === 0 ? 1 : 0);
  };

  return (
    <div className="Tabs-div">
      <div className='Tabs-outer'>
        <div className='empty-div'></div>
        <div className="stats-div">
          <Stats />
        </div>
        <div className="Tabs-buttons">
        <label htmlFor="tab-toggle" className="tab">
          <span 
            className='mt-3 mr-3 font-medium'>
              Nur Leitsatzentscheidungen:
          </span>
          <input
            id="tab-toggle"
            type="checkbox"
            className="custom-toggle"
            checked={currentTab === 1}
            onChange={handleTabToggle}
          />
        </label>
        </div>
      </div>
      <div className="Tabs-content">
        <div className='select-bordered'></div>
        {React.Children.map(children, (child, index) => (
          <div
            tabIndex={0}
            role="tabpanel"
            id={`tab-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={currentTab !== index}
            key={index}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
