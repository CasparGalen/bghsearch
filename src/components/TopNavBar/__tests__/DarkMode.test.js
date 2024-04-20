import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import DarkModeToggle from '../DarkMode';
import '@testing-library/jest-dom/extend-expect';

describe('DarkModeToggle', () => {
  it('toggles theme when clicked', async () => { // Note the use of `async` here
    const { getByTestId } = render(<DarkModeToggle />);

    // Initial theme check
    expect(document.querySelector('html').getAttribute('class')).toBe('bghlight');

    // Wait for the checkbox to be available
    await waitFor(() => {
      getByTestId('darkModeCheckbox');
    });

    // Simulate a click on the checkbox using getByTestId
    fireEvent.click(getByTestId('darkModeCheckbox'));

    // Check if the theme has been updated
    expect(document.querySelector('html').getAttribute('class')).toBe('dark');

    // Click again to toggle back
    fireEvent.click(getByTestId('darkModeCheckbox'));

    // Check if the theme is back to the initial state
    expect(document.querySelector('html').getAttribute('class')).toBe('bghlight');
  });

  it('updates data-theme attribute accordingly', async () => {
    const { getByTestId } = render(<DarkModeToggle />);

    // Wait for the checkbox to be available
    await waitFor(() => {
      getByTestId('darkModeCheckbox');
    });

    // Simulate a click on the checkbox to toggle to 'dark'
    fireEvent.click(getByTestId('darkModeCheckbox'));
    expect(document.querySelector('html').getAttribute('data-theme')).toBe('dark');

    // Simulate another click on the checkbox to toggle back to 'bghlight'
    fireEvent.click(getByTestId('darkModeCheckbox'));
    expect(document.querySelector('html').getAttribute('data-theme')).toBe('bghlight');

  });
});
