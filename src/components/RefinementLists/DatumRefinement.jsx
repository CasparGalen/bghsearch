import React from "react";
import { RangeSlider } from "./RangeSlider";


function DatumRefinement() {
  return (
    <div className='py-4 pl-4 drawer-side-divider-last'>
      <div className="font-semibold	text-lg pb-4">Entscheidungsdatum</div>
      <div className=''>
        <RangeSlider attribute='decision_date_unix' label='Datum: ' />
      </div>
    </div>
  );
}

export default DatumRefinement;
