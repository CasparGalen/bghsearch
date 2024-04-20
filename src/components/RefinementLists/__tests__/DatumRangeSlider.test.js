import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DatumRefinement from '../DatumRefinement';
import { InstantSearch } from 'react-instantsearch-core';

// Mock the useInstantSearchContext hook
jest.mock('react-instantsearch-core', () => ({
  ...jest.requireActual('react-instantsearch-core'),
  useInstantSearchContext: jest.fn(),
}));

// Mock the InstantSearch component
jest.mock('react-instantsearch-core', () => ({
  InstantSearch: ({ children }) => <div>{children}</div>,
}));

// Mock the RangeSlider component
jest.mock('../RangeSlider', () => ({
  __esModule: true,
  RangeSlider: jest.fn((props) => {
    const { label, attribute, onChange } = props;
    return (
      <div
        data-testid={`mocked-slider-${attribute}`}
        aria-label={label}
        onChange={(value) => onChange && onChange(value)}
      >
        Mocked RangeSlider Component
      </div>
    );
  }),
}));

describe('DatumRefinement component', () => {
  test('should handle user interaction with date sliders', () => {
    render(
      <InstantSearch searchClient={{}}>
        <DatumRefinement />
      </InstantSearch>
    );

    // Retrieve the onChange function from the mocked RangeSlider component
    const createdSlider = screen.getByTestId('mocked-slider-created');
    const modifiedSlider = screen.getByTestId('mocked-slider-modified');

    // Simulate user interaction with date sliders by calling the onChange prop
    createdSlider.onChange && createdSlider.onChange(['2010-01-01', '2021-02-01']);
    modifiedSlider.onChange && modifiedSlider.onChange(['2010-01-01', '2021-02-01']);
  });
});
