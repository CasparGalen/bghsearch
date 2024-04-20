import React from "react";
import DatumRefinement from "../RefinementLists/DatumRefinement";
import { FooterDrawer } from "./FooterDrawer";
import CustomRefinement from "../RefinementLists/CustomRefinement";

function SideDrawer() {
  return (
    <>
      <label htmlFor="my-drawer-2" className="drawer-overlay lg:hidden"></label>
      <div className="div-drawer-side ">
        {/* drawer-side */}
        <div className="div-refinementlists">
          {/* refinementlists */}
          <div  className="visible">
            <div>
              <CustomRefinement attribute='fromtext_motion_category' sortBy='count:desc' title='Verfahrensart' operator="or" searchable={false} />
            </div>
            <div>
              <CustomRefinement attribute='fromtext_decision_result' sortBy='count:desc' title='Entscheidungsergebnis' operator="or" searchable={false} />
            </div>
            <div>
              <CustomRefinement attribute='senat' sortBy='alpha:asc' title='Senat' operator="or" searchable={true} />
            </div>
            <div>
              <DatumRefinement />
            </div>
          </div>
        </div>
        <div className="sidebar-footer">
          <FooterDrawer />
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
