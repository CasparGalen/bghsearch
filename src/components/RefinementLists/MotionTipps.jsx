import React, { useState, useEffect } from "react";

function MotionTipps() {
  const [dropdownPosition, setDropdownPosition] = useState("dropdown-start");
  const [maxWidth, setMaxWidth] = useState("none");
  const [maxHeight, setMaxHeight] = useState("none");

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (windowWidth <= 1024) {
        setMaxWidth("1024px");
        if (windowHeight <= 900) {
          setMaxHeight("900px");
          setDropdownPosition("dropdown-end");
        } else {
          setMaxHeight("none");
          setDropdownPosition("dropdown-end");
        }
      } else if (windowHeight <= 900) {
        setMaxWidth("none");
        setMaxHeight("900px");
        setDropdownPosition("dropdown-end");
      } else {
        setMaxWidth("none");
        setMaxHeight("none");
        setDropdownPosition("dropdown-end");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="decision-tipps" style={{ maxWidth, maxHeight }}>
      <div
        className={`dropdown ${dropdownPosition} z-100 tooltip tooltip-right`}
        data-tip="Tipps"
      >
        <label tabIndex={0} className='btn btn-circle info-btn shadow-none'>
          <svg
            className='info-icon' 
            xmlns='http://www.w3.org/2000/svg'
            width='16' 
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{ margin: '4px', marginRight: "15px" }} // Added margin to center the SVG
          >
            <circle cx='12' cy='13' r='10'></circle>
            <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path>
            <line x1='12' y1='17' x2='12.01' y2='17'></line>
          </svg>
        </label>
        <div
          tabIndex={0}
          className='dropdown-content card card-compact p-2 shadow-md shadow-[#0000002c]	bg-warning text-warning-content'
          style={{ position: 'fixed', zIndex: 1000, width: '300px', marginRight: '7px' }}
        > 
          <div className='card-body text-left'>
            <p className='text-sm'>
            Die Genauigkeit dieses Filtertyps ist nicht zu 100% garantiert. Die Urteile werden algorithmisch ausgewertet, was zu Fehlern führen kann.
            </p>
            <p className='text-sm'>
            Für die Auswahl wird das Rubrum ausgewertet: <strong>“Auf die Revision/Rechtsbeschwerde/
            Nichtzulassungsbeschwerde …”</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotionTipps;
