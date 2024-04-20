import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilePathButton from '../FilePathButton';

// Mock the window.electron object
window.electron = {
  openFileDialog: jest.fn(),
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('FilePathButton', () => {
  test('renders FilePathButton component', () => {
    render(<FilePathButton />);
    const buttonElement = screen.getByText('Select a Path');
    expect(buttonElement).toBeInTheDocument();
  });

  test('dropdown becomes visible when button is clicked', () => {
    render(<FilePathButton />);
    const buttonElement = screen.getByText('Select a Path');
    fireEvent.click(buttonElement);

    // Check if the dropdown becomes visible
    const dropdownElement = screen.getByTestId('dropdownInformation');
    expect(dropdownElement).toBeInTheDocument();

  });

  test('FilePathButton updates file path on option selection', async () => {
    // Render the component
    render(<FilePathButton />);

    // Open the dropdown
    fireEvent.click(screen.getByTestId('dropdownInformationButton'));

    // Select an option (for example, "Disk C:")
    fireEvent.click(screen.getByText('Disk C:'));

    // Check if the file path is updated in localStorage
    expect(localStorage.getItem('selectedFilePath')).toEqual('C:/');

    // You can add more assertions if needed, such as checking the state or other effects

    // Close the dropdown (optional)
    fireEvent.click(screen.getByTestId('dropdownInformationButton'));
  });

});
