import React from "react";

function Tipps() {
  return (
    <div className='dropdown dropdown-end tooltip tooltip-right' data-tip='Tipps'>
      <label tabIndex={0} className='btn btn-circle info-btn' >
        <svg
          className='info-icon'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='10'></circle>
          <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path>
          <line x1='12' y1='17' x2='12.01' y2='17'></line>
        </svg>
      </label>
      <div
        tabIndex={0}
        className='dropdown-content z-[1] card card-compact w-96 p-2 shadow-md shadow-[#0000002c]	bg-warning text-warning-content'
      >
        <div className='card-body text-left'>
          <p className='card-title'>Tipps für die Suche</p>
          <p className='text-base font-semibold mt-4'>PHRASEN-SUCHE:</p>
          <p className='text-base mb-3'>
            Wenn Sie Suchbegriffe in doppelte Anführungszeichen&#160;
            <span className='badge text-lg font-semibold'>""</span>
            &#160;setzen, werden nur solche Dokumente angezeigt, die diese Begriffe
            in der angegebenen Reihenfolge enthalten.
          </p>
          <p className='text-base font-semibold'>FILTER:</p>
          <p className='text-base '>
            Filter ermöglichen Ihnen, die Art bzw. den Umfang der Dokumente die
            durchsucht werden einzugrenzen.
          </p>
          <p className='text-base mb-3'>
            Werden innerhalb einer Filterkategorie (bspw. Verfahrensart) verschiedene Filter ausgewählt, dann werden die Dokumente
            durchsucht, die einem der ausgewählten Filtern entsprechen (logisches ODER).
            Anders verhält es sich, wenn ein Filter einer anderen Kategorie hinzugefügt wird. Bei Filtern unterschiedlicher Kategorien werden nur die Dokumente durchsucht, die der Kombination dieser Filter entsprechen (logisches ODER).&#160;
          </p>
          <p className='text-base font-semibold'>SUPPORT UND FEEDBACK:</p>
          <p className='text-base mb-3'>
            Fragen, Anregungen und Wünsche bitte an{' '}
            <a
              href='mailto:jonathan.melke@gmail.com'
              className='e-mail-link font-semibold'
            >
              jonathan.melke@gmail.com
            </a>
            <button
              className='copy-button tooltip tooltip-right'
              data-tip='E-Mail kopieren'
              onClick={() => navigator.clipboard.writeText('jonathan.melke@gmail.com')}
              aria-label='Copy email to clipboard'
            >
              <svg
                className='info-icon'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#333333'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='5.5' y='5.5' width='13' height='13' rx='2' ry='2'></rect>
                <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
              </svg>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tipps;
