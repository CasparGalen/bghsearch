import React, { useState, useEffect } from 'react';
import { CustomHighlight } from './CustomHighlight';
import { useInstantSearch } from 'react-instantsearch-core';

export const calculateStartIdx = (text, windowSize) => {
  const tokens = text.split(' ');

  let highestDensity = 0;
  let currentCount = 0;
  let calculatedStartIdx = 0;
  const currentWindow = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    currentWindow.push(token);

    if (token.includes('<mark>')) {
      currentCount++;
    }

    if (currentWindow.length > windowSize) {
      const poppedToken = currentWindow.shift();
      if (poppedToken.includes('<mark>')) {
        currentCount--;
      }
    }

    if (currentWindow.length === windowSize) {
      const density = currentCount / windowSize;
      if (density > highestDensity) {
        highestDensity = density;
        calculatedStartIdx = i + 1 - windowSize;
      }
    }
  }
  return calculatedStartIdx;
};

const ShowMoreButton = ({ hit, resultsInnerRef, CustomHighlightText }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const { indexUiState } = useInstantSearch();

  useEffect(() => {
    if (resultsInnerRef && resultsInnerRef.current && typeof indexUiState.page !== 'number') {
      setExpandedIndex(null);
      resultsInnerRef.current.scrollTop = 0;
    }
  }, [indexUiState, resultsInnerRef]);

  // Check if highlight result text is available
  const highlightText = hit['_highlightResult']?.['text']?.['value'];

  return (
    <div>
      {expandedIndex !== hit.id ? (
        <div>
          <CustomHighlight
            text={CustomHighlightText}
            windowSize={150}
            preview={true}
            startIdx={hit.highlightStartIdx}
          />
          <button
            className="div-showmore-all"
            onClick={() => {
              handleToggle(hit.id);
            }}
          >
            <p className="showmore-text">Vorschau öffnen</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="showmore-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      ) : (
        <div>
          {highlightText ? (
            <CustomHighlight
              text={highlightText}
              windowSize={150}
              preview={false}
              startIdx={hit.highlightStartIdx}
            />
          ) : (
            <p>No highlighted text available</p>
          )}
          <button
            className="div-showmore-less"
            onClick={() => handleToggle(hit.id)}
          >
            <p className="showmore-text">Vorschau schließen</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="showmore-icon"
              width="20"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowMoreButton;
