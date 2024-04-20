import React from 'react';
import {useInstantSearch} from 'react-instantsearch';



export function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();
  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}


export function NoResultsCard(props) {
  return (
    <div className="info-card-outer">
      <div className="info-card-body">
        Keine Ergebnisse.
      </div>
    </div>
  );
}
