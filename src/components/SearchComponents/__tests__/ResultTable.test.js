import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InstantSearch, useInfiniteHits } from 'react-instantsearch-core';
import { ResultTable } from '../ResultTable';
import '@testing-library/jest-dom/extend-expect';

// Mock Algolia search client
const mockSearchClient = {
  search: jest.fn(),
};

// Mock useInfiniteHits
jest.mock('react-instantsearch-core', () => ({
  ...jest.requireActual('react-instantsearch-core'),
  useInfiniteHits: jest.fn(),
}));

describe('ResultTable', () => {
  beforeEach(() => {
    // Reset mock between tests
    jest.clearAllMocks();
  });

  test('renders table with correct data', async () => {
    // Mock useInfiniteHits to return the necessary values
    useInfiniteHits.mockReturnValue({
      hits: [
        {
          objectID: '1',
          path: '/example/path.pdf',
          ftitle: 'Example File',
          doc_type_clean: ['Type1', 'Type2'],
          author: 'John Doe',
          created: 1638000000, // Replace with a valid timestamp
        },
      ],
      isLastPage: false,
      showMore: jest.fn(),
    });

    // Render ResultTable within an InstantSearch context with a mock searchClient
    render(
      <InstantSearch indexName="your_index_name" searchClient={mockSearchClient}>
        <ResultTable />
      </InstantSearch>
    );

    // Assert that the data is correctly rendered in the table
    expect(screen.getByText('Example File')).toBeInTheDocument();
    expect(screen.getByText('pdf')).toBeInTheDocument();
    expect(screen.getByText('Type2')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Use waitFor to handle the asynchronous rendering of dates
    await waitFor(() => {
      expect(screen.getByText('27.11.2021')).toBeInTheDocument();
    });
  });

  test('clicking "Mehr Ergebnisse anzeigen" calls showMore', () => {
    // Mock useInfiniteHits to return the necessary values
    useInfiniteHits.mockReturnValue({
      hits: [],
      isLastPage: false,
      showMore: jest.fn(),
    });

    // Render ResultTable within an InstantSearch context with a mock searchClient
    render(
      <InstantSearch indexName="your_index_name" searchClient={mockSearchClient}>
        <ResultTable />
      </InstantSearch>
    );

    // Mock a click on the "Mehr Ergebnisse anzeigen" button
    fireEvent.click(screen.getByText('Mehr Ergebnisse anzeigen'));

    // Assert that the showMore function is called
    expect(useInfiniteHits().showMore).toHaveBeenCalled();
  });

});
