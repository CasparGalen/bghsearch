import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultCard } from '../ResultCard';
import '@testing-library/jest-dom/extend-expect';

// Mocking the necessary dependencies and functions
jest.mock('react-instantsearch', () => ({
  useInfiniteHits: jest.fn().mockReturnValue({
    hits: [
      {
        objectID: '1',
        doc_type_clean: ['Document'],
        path: '/path/to/file.txt',
        _highlightResult: {
          text: { value: 'Sample text with <mark>highlight</mark>.' },
        },
        page_number: 1,
      },
    ],
    isLastPage: false,
    showMore: jest.fn(),
    results: {},
  }),
  Highlight: jest.fn(),
  useInstantSearch: jest.fn().mockReturnValue({
    status: 'loaded', // Mock the status property
    indexUiState: {},
  }),
  Pagination: jest.fn(),
}));

jest.mock('../CustomHighlight', () => ({
  CustomHighlight: jest.fn(),
}));

jest.mock('../ResultUtil', () => ({
  openFile: jest.fn(),
  openFolder: jest.fn(),
  makeMacPath: jest.fn(),
  makeWindowsPath: jest.fn(),
  setRootPath: jest.fn(),
}));

describe('ResultCard', () => {
  it('renders result card correctly', () => {
    const resultsInnerRefMock = { resultsInnerRef: { current: document.createElement('div') } };

    render(<ResultCard {...resultsInnerRefMock} />);

    // Ensure that the component renders correctly
    expect(screen.getByText('Document')).toBeInTheDocument();
    expect(screen.getByText('Weitere Ergebnisse anzeigen')).toBeInTheDocument();

    // Example: Clicking on the "Weitere Ergebnisse anzeigen" button
    fireEvent.click(screen.getByText('Weitere Ergebnisse anzeigen'));
    // You might want to add assertions based on the expected behavior of your component
  });

  it('displays the document type correctly', () => {
    const resultsInnerRefMock = { resultsInnerRef: { current: document.createElement('div') } };

    render(<ResultCard {...resultsInnerRefMock} />);

    // Ensure that the document type is displayed correctly
    expect(screen.getByText('Document')).toBeInTheDocument();
  });

});
