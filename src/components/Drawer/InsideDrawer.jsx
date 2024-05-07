import React from 'react';
import { CustomCurrentRefinements } from '../RefinementLists/CustomCurrentRefinements';
import { ClearRefinements, useCurrentRefinements } from 'react-instantsearch';

function InsideDrawer() {
  const { items } = useCurrentRefinements();

  // remove the Alle löschen button when guiding_principles attribute is being filtered
  const hasOtherRefinements = items.some(item => item.attribute !== 'guiding_principles');

  return (
    <header className='header-searchresults'>
      <div className='div-currentrefinements'>
        <CustomCurrentRefinements />
      </div>
      {hasOtherRefinements && ( // Render ClearRefinements only if there are other refinements
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
      )}
    </header>
  );
}

export default InsideDrawer;
