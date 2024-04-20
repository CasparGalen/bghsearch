import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DokumententypRefinement, { transformDoctypes, sortDemoFilters } from '../DokumententypRefinement';
import { RefinementList } from 'react-instantsearch';

// Mocking the RefinementList component to avoid actual network requests
jest.mock('react-instantsearch', () => ({
  RefinementList: jest.fn(() => <div data-testid="refinement-list"></div>),
}));

describe('DokumententypRefinement', () => {
  test('renders DokumententypRefinement component', async () => {
    render(<DokumententypRefinement />);

    // Wait for the component to be rendered
    await waitFor(() => {

      // Check if the RefinementList is rendered
      const refinementList = screen.getByTestId('refinement-list');
      expect(refinementList).toBeInTheDocument();

    });
  });

  test('transforms and sorts doctypes correctly', () => {
    const inputItems = [
      { label: 'Urteil' },
      { label: 'Schriftsätze' },
      { label: 'Verträge' },
      { label: 'Sonstiges' },
    ];
    const expectedOutput = [
      { "label": "Urteile" },
      { "label": "Verträge" },
      { "label": "Schriftsätze" },
      { "label": "Sonstiges" },
    ];
    const transformedItems = transformDoctypes(inputItems);
    expect(transformedItems).toEqual(expectedOutput);
    const sortedItems = sortDemoFilters(inputItems);
    expect(sortedItems).toEqual(expectedOutput);
  });

  test('handles empty inputItems for transformation and sorting', () => {
    const emptyInputItems = [];
    const transformedItems = transformDoctypes(emptyInputItems);
    expect(transformedItems).toEqual([]);
    const sortedItems = sortDemoFilters(emptyInputItems);
    expect(sortedItems).toEqual([]);
  });

  test('handles undefined inputItems for transformation and sorting', () => {
    const undefinedInputItems = undefined;
    const transformedItems = transformDoctypes(undefinedInputItems);
    expect(transformedItems).toEqual([]);
    const sortedItems = sortDemoFilters(undefinedInputItems);
    expect(sortedItems).toEqual([]);
  });

});
