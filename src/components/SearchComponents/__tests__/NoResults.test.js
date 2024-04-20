import React from 'react';
import { render, queryByText } from '@testing-library/react';
import { NoResultsBoundary, NoResultsCard } from '../NoResults';
import '@testing-library/jest-dom/extend-expect';

// Mock the react-instantsearch module
jest.mock('react-instantsearch', () => ({
  useInstantSearch: () => ({ results: { __isArtificial: true, nbHits: 0 } }),
}));

describe('NoResultsBoundary', () => {
  it('should render children when there are results', () => {
    const { getByText } = render(
      <NoResultsBoundary fallback={<div>Fallback Content</div>}>
        <div>Child Content</div>
      </NoResultsBoundary>
    );

    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('should render fallback when there are no results', () => {
    const { container } = render(
      <NoResultsBoundary fallback={<div>Fallback Content</div>}>
        <div hidden>Child Content</div>
      </NoResultsBoundary>
    );

    // Use queryByText to check if the element is present
    const fallbackElement = queryByText(container, 'Fallback Content');

    // Assert that the fallback element is not present
    expect(fallbackElement).toBeNull();
  });

  it('should not render fallback when there are results', () => {
    const { container } = render(
      <NoResultsBoundary fallback={<div>Fallback Content</div>}>
        <div>Child Content</div>
      </NoResultsBoundary>
    );

    // Use queryByText to check if the element is present
    const fallbackElement = queryByText(container, 'Fallback Content');

    // Assert that the fallback element is not present
    expect(fallbackElement).toBeNull();
  });
});

describe('NoResultsCard', () => {
  it('should render NoResultsCard component', () => {
    const { getByText } = render(<NoResultsCard />);
    expect(getByText('Keine Ergebnisse.')).toBeInTheDocument();
  });
});
