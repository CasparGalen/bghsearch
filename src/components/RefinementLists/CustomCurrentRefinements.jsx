import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { isModifierClick } from '../../isModifierClick';
import cx from "classnames";

const transformItems = (items) => {
  return items.map((item) => {

    // Exclude guiding_principles filter
    if (item.attribute === 'guiding_principles') {
      return null; 
    }

    if (item.attribute.startsWith('fromtext_motion_category')) {
      item.label = 'Bewegungskategorie';
    }
    if (item.attribute === 'decision_date_unix') {
      item.label = 'Entscheidungsdatum';
      let startdate = item.refinements[0].label.split(" ");
      let startDateTimestamp = Number(startdate[1]) * 1000;
      if (!isNaN(startDateTimestamp)) {
        let startDate = new Date(startDateTimestamp);
        item.refinements[0].label = startdate[0].concat(Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startDate));
      }
      if (item.refinements[1] !== undefined) {
        let enddate = item.refinements[1].label.split(" ");
        let endDateTimestamp = Number(enddate[1]) * 1000;
        if (!isNaN(endDateTimestamp)) {
          let endDate = new Date(endDateTimestamp);
          item.refinements[1].label = enddate[0].concat(Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(endDate));
        }
      }
    }
    if (item.attribute === 'einspiel_date_unix') {
      item.label = 'Einspieldatum';
      let startdate = item.refinements[0].label.split(" ");
      let startDateTimestamp = Number(startdate[1]) * 1000;
      if (!isNaN(startDateTimestamp)) {
        let startDate = new Date(startDateTimestamp);
        item.refinements[0].label = startdate[0].concat(Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startDate));
      }
      if (item.refinements[1] !== undefined) {
        let enddate = item.refinements[1].label.split(" ");
        let endDateTimestamp = Number(enddate[1]) * 1000;
        if (!isNaN(endDateTimestamp)) {
          let endDate = new Date(endDateTimestamp);
          item.refinements[1].label = enddate[0].concat(Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(endDate));
        }
      }
    }
    if (item.attribute === 'fromtext_motion_category') {
      item.label = 'Verfahrensart';
    }
    if (item.attribute === 'fromtext_decision_result') {
      item.label = 'Entscheidungsergebnis';
    }
    if (item.attribute === 'senat') {
      item.label = 'Senat';
    }
    if (item.attribute === 'legal_category') {
      item.label = 'Rechtskategorie';
    }

    return item;
  }).filter(Boolean);
};

export function CustomCurrentRefinements(props) {
  var { items, refine} = useCurrentRefinements(props);
  items = transformItems(items)
  return (
    <div className='ais-CurrentRefinements'>
    <ul className='ais-CurrentRefinements-list'>
      {items.map((item) => (
        <li
          key={[item.indexName, item.label].join('/')}
          className={cx({
            'ais-CurrentRefinements-item': true,
            'badge' : true,
            'badge-typ': (item.attribute === "fromtext_motion_category"),
            'badge-firmenname' : (["fromtext_decision_result", "senat", "legal_category"].includes(item.attribute)),
            'badge-eigenschaften' : (["decision_date_unix", "einspiel_date_unix"].includes(item.attribute)),
            'current-refinement-badge': true
          })}
        >
          <span
            className='ais-CurrentRefinements-label font-bold capitalize'
          >
            {item.label}:
          </span>
          {item.refinements.map((refinement) => (
            <span
              key={refinement.label}
              className='ais-CurrentRefinements-category'
            >
              <span
                className='ais-CurrentRefinements-categoryLabel'
              >
                {refinement.label}
              </span>
              <button
                type="button"
                onClick={(event) => {
                  if (isModifierClick(event)) {
                    return;
                  }

                  refine(refinement);
                }}
                className={cx({
                  'ais-CurrentRefinements-delete btn btn-circle btn-xs': true,
                  'button-typ': (item.attribute === "fromtext_motion_category"),
                  'button-firmenname' : (["fromtext_decision_result", "senat", "legal_category"].includes(item.attribute)),
                  'button-eigenschaften' : (["decision_date_unix","einspiel_date_unix"].includes(item.attribute)),
                  // Die untere auch??? Was ist da drin??
                  // 'current-refinement-badge': true
                })}
              >
                {/* Icon einfügen */}
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </span>
          ))}
        </li>
      ))}
    </ul>
  </div>
  )
}
