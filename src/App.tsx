import React, { useState, useRef, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch';

import { instantMeiliSearch } from './instant-meilisearch';

import './App.css';

import DarkModeToggle from './components/TopNavBar/DarkMode';
import SearchBoxFunc from './components/SearchComponents/SearchBox';
import { Logos } from './components/TopNavBar/Logos';
import { Tab, Tabs } from 'components/layout';
import { LoadingIndicator } from 'components';
import { NoResultsBoundary, NoResultsCard } from 'components';
import { ResultCard } from 'components';
import { ResultPrinciples } from 'components';
import SideDrawer from 'components/Drawer/SideDrawer';
import InsideDrawer from 'components/Drawer/InsideDrawer';

function App() {
  // Meilisearch configuration
  const searchEngineUrl = process.env.REACT_APP_SEARCH_ENGINE_URL!;
  const searchKey = process.env.REACT_APP_SEARCH_KEY!;
  const [indexName, setIndexName] = useState("BGH_SEARCH");
  const resultsInnerRef = useRef<HTMLDivElement>(null); 

  const searchClient = instantMeiliSearch(
    searchEngineUrl,
    searchKey,
    {
      primaryKey: 'id',  // Adjust if your primary key is different
    }
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    function adjustDrawerForScreenSize() {
      setIsDrawerOpen(window.innerWidth > 1024);
    }

    // Adjust the drawer based on the initial screen size
    adjustDrawerForScreenSize();

    // Add a resize event listener to adjust the drawer for screen size changes
    window.addEventListener('resize', adjustDrawerForScreenSize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', adjustDrawerForScreenSize);
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setIndexName(selectedValue);
  };

  const scrollToTop = () => {
    if (resultsInnerRef.current) {
      resultsInnerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="wrapper">
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        stalledSearchDelay={500}
        onStateChange={({ uiState, setUiState }) => {
          scrollToTop();
          setUiState(uiState);
        }}
      >
        <div className="navbar">
          <div className="div-logo">
            <Logos />
          </div>
          <div className="searchbox-div">
            <SearchBoxFunc />
          </div>
          <div className="div-darkmode-toggle tooltip tooltip-left" data-tip="Toggle Dark Mode">
            <DarkModeToggle />
          </div>
        </div>
        <div className="div-page-content">
          <div className='drawer drawer-mobile'>
            <input
              id='my-drawer-2'
              type='checkbox'
              className='drawer-toggle'
              checked={isDrawerOpen}
              onChange={(e) => setIsDrawerOpen(e.target.checked)}
            />
            <div className='drawer-content'>
              <div style={{zIndex: 5}}>
                <InsideDrawer />
              </div>
              <label htmlFor='my-drawer-2' className={`btn drawer-button lg:hidden ${isDrawerOpen ? 'active' : ''}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke=''
                  className='sp-icon-open w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </label>
              <div className='body-searchresults-outer'>
                <div id='resultsInner' className='body-searchresults-inner' ref={resultsInnerRef}>
                  <div className='top-container-components'>
                    <Tabs>
                      <Tab title='Detail'>
                        <select className="select select-bordered" value={indexName} onChange={handleSortChange}>
                          <option value="BGH_SEARCH">Nach Relevanz sortieren</option>
                          <option value="BGH_SEARCH:decision_date_unix:desc">Nach Datum sortieren</option>
                        </select>
                        <LoadingIndicator />
                        <NoResultsBoundary fallback={<NoResultsCard />}>
                          <ResultCard resultsInnerRef={resultsInnerRef} />
                        </NoResultsBoundary>
                      </Tab>
                      <Tab title='Tabelle'>
                        <select className="select select-bordered" value={indexName} onChange={handleSortChange}>
                          <option value="BGH_SEARCH">Nach Relevanz sortieren</option>
                          <option value="BGH_SEARCH:decision_date_unix:desc">Nach Datum sortieren</option>
                        </select>
                        <LoadingIndicator />
                        <NoResultsBoundary fallback={<NoResultsCard />}>
                          <ResultPrinciples />
                        </NoResultsBoundary> 
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            <div className='drawer-side'>
              <SideDrawer />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default App;
