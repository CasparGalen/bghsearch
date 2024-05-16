import React from "react";
import { RangeSlider } from "./RangeSlider";


function EinspieldatumRefinement() {
  return (
    <div className='py-4 pl-4 drawer-side-divider-last'>
      <div className="font-semibold	text-lg pb-4">Einspieldatum</div>
      <div className=''>
        <RangeSlider attribute='einspiel_date_unix' label='Datum: ' />
      </div>
    </div>
  );
}

export default EinspieldatumRefinement;
