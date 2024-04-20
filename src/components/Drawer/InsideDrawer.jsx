import React from 'react'
import { CustomCurrentRefinements } from '../RefinementLists/CustomCurrentRefinements';
import { ClearRefinements } from 'react-instantsearch';

function InsideDrawer () {
  return (
    <header className='header-searchresults'>
      <div className='div-currentrefinements'>
        <CustomCurrentRefinements />
      </div>
      <div className='div-clearrefinements'>
        <ClearRefinements
          classNames={{
            button: 'btn btn-xs clear-refinements-button',
            disabledButton: 'hidden'
          }}
          translations={{
            resetButtonText: 'Alle löschen'
          }}
        />
      </div>
    </header>
  )
}

export default InsideDrawer;
