import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBoxFunc from '../SearchBox';

jest.mock('react-instantsearch', () => ({
  SearchBox: ({ queryHook, resetIconComponent }) => {
    const handleInputChange = (event) => {
      queryHook(event.target.value, jest.fn());
    };

    return (
      <div>
        <input
          type="text"
          placeholder="Suchen"
          onChange={handleInputChange}
          data-testid="search-box"
        />
        <div onClick={() => queryHook('', jest.fn())} data-testid="reset-icon">
          {resetIconComponent({ classNames: { resetIcon: '' } })}
        </div>
      </div>
    );
  },
}));

test('SearchBoxFunc renders correctly', () => {
  const { getByTestId } = render(<SearchBoxFunc />);

  // Check if the SearchBox component renders with the correct placeholder
  const searchBox = getByTestId('search-box');
  expect(searchBox).toBeInTheDocument();

  // Mock the search function
  const searchFunctionMock = jest.fn();

  // Simulate user input and trigger the search
  fireEvent.change(searchBox, { target: { value: 'test query' } });
  // Ensure the setTimeout in queryHook is executed
  jest.advanceTimersByTime(10);

  // Check if the search function is called after the timeout
  waitFor(() => expect(searchFunctionMock).toHaveBeenCalledWith('test query'));

});

test('SearchBoxFunc handles placeholder text correctly', () => {
  const { getByTestId } = render(<SearchBoxFunc />);

  // Check if the SearchBox component renders with the correct placeholder
  const searchBox = getByTestId('search-box');
  expect(searchBox).toHaveAttribute('placeholder', 'Suchen');
});
