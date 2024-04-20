import React from "react";
import { SearchBox } from "react-instantsearch";
import Tipps from "../TopNavBar/Tipps";

let timerId = undefined;
let timeout = 10;
function queryHook(query, search) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), timeout);
}

function SearchBoxFunc() {
  return (
    <>
      <SearchBox
        placeholder="Suchen"
        autoFocus
        className=""
        queryHook={queryHook}
        resetIconComponent={({ classNames }) => (
          <div className={classNames.resetIcon} title="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" linecap="round">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        )}
        submitIconComponent={({ classNames }) => (
          <div className={classNames.submitIcon} title="">
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="" className="w-5 h-5 submitIcon-main-search">
              <path
                strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </div>
        )}
        classNames={{form: '', input: 'input-main-search', submitIcon: 'btn btn-main-search', resetIcon: 'main-search-reset', loadingIndicator: 'hidden',}}
      />
      <div>
        <Tipps />
      </div>
    </>
  );
}

export default SearchBoxFunc;
