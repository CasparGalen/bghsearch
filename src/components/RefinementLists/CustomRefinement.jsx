import React from "react";
import { RefinementList, ToggleRefinement } from "react-instantsearch";
import MotionTipps from "./MotionTipps";
import DecisionTipps from "./DecisionTipps";

const highlightItems = (items) => {
  // Check if facetQuery is undefined in the first item; if so, return the items array unmodified
  if (
    items.length > 0 &&
    (typeof items[0].facetQuery === 'undefined' ||
      items[0].facetQuery === null)
  ) {
    return items;
  }
  // Array to hold items where all words are matched
  let highlightedItems = [];

  // Helper function to perform case-insensitive prefix matching and tagging
  function markMatches(str, words) {
    let allWordsMatched = true;
    for (let word of words) {
      let regex;
      if (word === '§' || word === '§§') {
        regex = new RegExp('(^|\\s)' + word + '(?=\\s|$)', 'i'); // Special regex for § and §§ symbols to ensure word boundary
      } else {
        regex = new RegExp('\\b' + word, 'i'); // For alphanumeric words, \b asserts position at a word boundary
      }
      if (regex.test(str)) {
        str = str.replace(regex, (match) => `<mark>${match}</mark>`);
      } else {
        allWordsMatched = false; // If any word from facetQuery doesn't match, set allWordsMatched to false
      }
    }
    return [str, allWordsMatched];
  }

  // Iterate through each item in the items array
  for (let item of items) {
    if (
      item.highlighted &&
      item.facetQuery &&
      typeof item.highlighted === 'string' &&
      typeof item.facetQuery === 'string'
    ) {
      let words = item.facetQuery.trim().split(/\s+/); // Trim facetQuery to remove leading/trailing whitespace, then split into individual words
      let [highlighted, allWordsMatched] = markMatches(
        item.highlighted,
        words
      ); // Call markMatches helper function
      item.highlighted = highlighted; // Update item.highlighted with marked-up string
      if (allWordsMatched) {
        highlightedItems.push(item); // If all words from facetQuery matched, add item to highlightedItems list
      }
    }
  }

  return highlightedItems.length > 0 ? highlightedItems : []; // Return highlightedItems list if not empty, else return an empty list
};

function CustomRefinement({ attribute, sortBy, title, operator, searchable }) {

  const renderTipps = () => {
    // If the attribute is "senat", return null (i.e., don't render Tipps)
    if (attribute === "senat") {
      return null;
    }
    if (attribute === "fromtext_motion_category")
      return <MotionTipps />

    if (attribute === "fromtext_decision_result")
      return <DecisionTipps />
  };

  return (
    <div className="drawer-side-divider">
      <div className="sidedrawer-overlay">
        <div className="refinements-title">
          {title}
          <div className="tipps-container">{renderTipps()}</div>
        </div>
      </div>
      <div className="">
        {attribute === "senat" && (
          <>
          <div className="" style={{marginTop:"5px", marginBottom:"10px"}}>
            <ToggleRefinement 
              label="Zivilrecht"
              attribute="senat"
              on={[
                "I. Zivilsenat",
                "II. Zivilsenat",
                "III. Zivilsenat",
                "IV. Zivilsenat",
                "V. Zivilsenat",
                "VI. Zivilsenat",
                "VIa. Zivilsenat",
                "VII. Zivilsenat",
                "VIII. Zivilsenat",
                "IX. Zivilsenat",
                "IXa. Zivilsenat",
                "X. Zivilsenat",
                "Xa. Zivilsenat",
                "XI. Zivilsenat",
                "XII. Zivilsenat",
                "XIII. Zivilsenat",
                "Großer Senat für Zivilsachen"
              ]}
              classNames={{
                label: 'cursor-pointer space-x-2 flex items-center font-bold text-sm',
                count: 'badge badge-primary badge-sm badge-outline',
                checkbox: 'checkbox checkbox-primary checkbox-xs'
              }}
            />
            <ToggleRefinement 
              label="Strafrecht"
              attribute="senat"
              on={[
                "1. Strafsenat",
                "2. Strafsenat",
                "3. Strafsenat",
                "4. Strafsenat",
                "5. Strafsenat",
                "6. Strafsenat",
                "Großer Senat für Strafsachen"
              ]}
              classNames={{
                label: 'cursor-pointer space-x-2 flex items-center font-bold text-sm',
                count: 'badge badge-primary badge-sm badge-outline',
                checkbox: 'checkbox checkbox-primary checkbox-xs',
              }}
            />
          </div>
          </>
        )}
        <RefinementList
          attribute={attribute}
          limit={8}
          showMoreLimit={1000}
          operator={operator}
          searchable={searchable}
          searchablePlaceholder='Suchen'
          showMore={true}
          sortBy={[sortBy]}
          transformItems={highlightItems}
          translations={{
            noResultsText: 'Keine Treffer.',
            showMoreButtonText ({ isShowingMore }) {
              return isShowingMore ? (
                <div className='div-showmore-less'>
                  <p className='showmore-text'>Weniger anzeigen</p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='showmore-icon'
                    width='20'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#000000'
                    strokeWidth='2'
                    strokeLinecap='butt'
                    strokeLinejoin='round'
                  >
                    <path d='M18 15l-6-6-6 6' />
                  </svg>
                </div>
              ) : (
                <div className='div-showmore-all'>
                  <p className='showmore-text'>Alle anzeigen</p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='showmore-icon'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#000000'
                    strokeWidth='2'
                    strokeLinecap='butt'
                    strokeLinejoin='round'
                  >
                    <path d='M6 9l6 6 6-6' />
                  </svg>
                </div>
              )
            }
          }}
          classNames={{
            selectedItem: 'font-bold',
            list: 'form-control h-64',
            label: 'cursor-pointer space-x-2 flex items-center',
            labelText: 'label-text',
            count: 'badge badge-primary badge-sm badge-outline',
            checkbox: 'checkbox checkbox-primary checkbox-xs',
            showMore: 'showmore-button',
            noResults: 'text-sm'
          }}
        />
      </div>
    </div>
  );
}

export default CustomRefinement;

