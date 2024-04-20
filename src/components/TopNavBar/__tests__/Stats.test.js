import React from 'react';
import { render } from '@testing-library/react';
import { useStats as mockUseStats } from 'react-instantsearch';
import { Stats } from '../Stats';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-instantsearch');

describe('Stats', () => {
  it('renders stats correctly', () => {
    const mockStats = {
      nbHits: 42,
      processingTimeMS: 1500,
    };

    // Mock the useStats hook to return the desired values
    mockUseStats.mockReturnValue(mockStats);

    // Render the component
    const { getByText } = render(<Stats />);

    // Check if the stats are rendered correctly
    expect(getByText(`${mockStats.nbHits} Ergebnisse (${mockStats.processingTimeMS / 1000} Sekunden)`)).toBeInTheDocument();

  });
});
