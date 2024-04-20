import { useInfiniteHits, Highlight } from 'react-instantsearch';
import { ReactComponent as DOCIcon } from 'assets/images/doc-icon.svg';
import { ReactComponent as PDFIcon } from 'assets/images/pdf-icon.svg';
import { LoadingIndicator } from '../Loading';
import { ReactComponent as DOCIconWhite } from 'assets/images/doc-icon-white.svg';
import { ReactComponent as PDFIconWhite } from 'assets/images/pdf-icon-white.svg';
import ShowMoreButton from './ShowMoreButton';
import { calculateStartIdx } from './ShowMoreButton';

function SetFileIcon({ filePath }) {
  const extension = filePath.split('.').pop();
  switch(extension) {
    case 'pdf':
      return (
        <>
          <PDFIcon className="pdf-icon"/>
          <PDFIconWhite className="pdf-icon-white"/>
        </>
      );
    case 'docx':
      return (
        <>
          <DOCIcon className="doc-icon"/>
          <DOCIconWhite className="doc-icon-white"/>
        </>
      );
    default:
      return null;
  }
}

export const ResultPrinciples = (resultsInnerRef, props) => {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);

  // Filter hits where guiding_principles array contains "Ja"
  const filteredHits = hits.filter(hit => hit.guiding_principles.includes("Ja"));

  filteredHits.forEach((hit) => {
    hit.highlightStartIdx = calculateStartIdx(hit["_highlightResult"]["text"]["value"], 150);
  });

  return (
    // searchresults "Detail"
    <div className="ais-InfiniteHits">
      {filteredHits.map((hit, index) => (
        <div key={hit.id} className="result-card-outer">
          <div className='result-card-body'>
            <div className="result-card-topside">
              <div className="first-two-components">
                {hit.senat && Array.isArray(hit.senat) ? (
                  hit.senat.length > 0 && hit.senat[0] !== "" && (
                    <div className="badge-eigenschaften font-semibold">
                      <span className='dokumententyp'>
                        {hit.senat[0]}
                      </span>
                    </div>
                  )
                ) : (
                  hit.senat !== "" && (
                    <div className="badge-eigenschaften font-semibold">
                      <span className='dokumententyp'>{hit.senat}</span>
                    </div>
                  )
                )}
              </div>
              <div className="decision-date">
                {hit.decision_date_unix !== undefined && (
                  <div className="font-semibold">
                    Entscheidungsdatum:{' '}
                    <span className="badge-eigenschaften font-semibold">
                      {Intl.DateTimeFormat('de-DE', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }).format(hit.decision_date_unix * 1000)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm font-semibold" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {hit.fromtext_motion_category.length > 0 && // Check if the array is not empty
                        <span >
                          <span className="badge-typ font-semibold">
                            {hit.fromtext_motion_category}
                          </span>
                        </span>
                        } {' '}
                <span className={`badge-decision-result font-semibold ${hit.fromtext_decision_result[0] === 'Gewonnen' ? 'badge-won' : hit.fromtext_decision_result[0] === 'Verloren' ? 'badge-lost' : ''}`}>
                  {hit.fromtext_decision_result[0]}
                </span>
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                {hit.guiding_principles.includes('Ja') && (
                  <>
                    <span className='badge-typ font-semibold'>
                      {"Leitsatzenscheidung"}
                    </span>
                  </>
                )}
              </div>
            </div>
            <h2 className='card-title'>
              <div className='title-file-name text-left content-start result-card-title'>
                <div className="file-icon"><SetFileIcon filePath={hit.ftitle}/></div>
                <div
                  onClick={() => {
                    if (hit.source_url) {
                      const urlWithBlank = `${hit.source_url}&Blank=1.pdf`;
                      window.open(urlWithBlank, '_blank');
                    }
                  }}
                  style={{ cursor: hit.source_url ? 'pointer' : 'default' }}
                >
                  <Highlight attribute="file_number" hit={hit} />{" "}
                  <Highlight attribute="decision_name" hit={hit} />
                </div>
              </div>
            </h2>
            <div>
              <div>
                <div>
                  <ShowMoreButton
                    hit={hit}
                    resultsInnerRef={resultsInnerRef}
                    CustomHighlightText={
                      hit['_highlightResult']['text']['value']
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <LoadingIndicator />
      <div className='more-results-btn'>
        <button className='btn' onClick={showMore} disabled={isLastPage}>
          Weitere Ergebnisse anzeigen
        </button>
      </div>
    </div>
  );
};
