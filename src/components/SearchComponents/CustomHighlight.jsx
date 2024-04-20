import React, { useRef, useLayoutEffect } from 'react';

export const CustomHighlight = ({ text, windowSize, preview, startIdx }) => {
  const markerRef = useRef(null);

  const getTextSnippet = (text, windowSize, startIdx) => {

    const tokens = text.split(' ');

    let resultSection = tokens.slice(startIdx, startIdx + windowSize).join(' ');

    if (startIdx > 0) {
      resultSection = "..." + resultSection;
    }

    if (startIdx + windowSize < tokens.length) {
      resultSection = resultSection + "...";
    }

    return resultSection;
  };



  const insertScrollMarker = (text, idx) => {
    const preText = text.split(' ').slice(0, idx).join(' ')
    const postText = text.split(' ').slice(idx).join(' ')
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: preText }} />
        <div ref={markerRef}></div>
        <span dangerouslySetInnerHTML={{ __html: postText }} />
      </>
    );
  };

  useLayoutEffect(() => {
    if (preview === false && markerRef.current) {

      // Introduce a timeout to allow the browser to complete rendering
      setTimeout(() => {
        markerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }, 0);
    }
  }, [preview]);

  if (preview) {
    const textSnippet = getTextSnippet(text, windowSize, startIdx);
    return (
      <div className="div-ais-Snippet-weniger">
        <span dangerouslySetInnerHTML={{ __html: textSnippet }} />
      </div>
    );
  }
  else {
        return (
          <div className="div-ais-Snippet div-ais-Snippet-mehr">
            {insertScrollMarker(text, startIdx + windowSize)}
          </div>
        );
      }
};
