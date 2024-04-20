import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import { CustomCurrentRefinements } from 'renderer/components/RefinementLists/CustomCurrentRefinements';
import * as InstantSearch from 'react-instantsearch'; // Import the whole module to mock

// Mocking the necessary modules for react-instantsearch
jest.mock('react-instantsearch');

describe('CustomCurrentRefinements', () => {
  it('renders CustomCurrentRefinements component', () => {
    // Mocking the useCurrentRefinements hook return values
    const mockUseCurrentRefinements = {
      items: [],
      canRefine: false,
      refine: jest.fn(),
    };

    // Mock the useCurrentRefinements function
    InstantSearch.useCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements);

    const { container } = render(<CustomCurrentRefinements />);
    expect(container).toBeInTheDocument();
  });

  it('renders CustomCurrentRefinements component with one refinement', () => {
    const mockUseCurrentRefinements = {
      items: [
        {
          attribute: 'author',
          label: 'Author',
          refinements: [{ label: 'John Doe' }],
        },
      ],
      canRefine: true,
      refine: jest.fn(),
    };
    InstantSearch.useCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements);

    const { container } = render(<CustomCurrentRefinements />);
    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent('Author:John Doe');
  });

  it('calls refine when delete button is clicked', () => {
    const mockUseCurrentRefinements = {
      items: [
        {
          attribute: 'author',
          label: 'Author',
          refinements: [{ label: 'John Doe' }],
        },
      ],
      canRefine: true,
      refine: jest.fn(),
    };
    InstantSearch.useCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements);

    const { getByText } = render(<CustomCurrentRefinements />);
    const deleteButton = getByText('John Doe').nextSibling;
    fireEvent.click(deleteButton);

    expect(mockUseCurrentRefinements.refine).toHaveBeenCalledWith({ label: 'John Doe' });
  });

});
