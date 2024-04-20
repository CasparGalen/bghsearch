import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { Tabs, Tab } from '../Tabs';

// Mock the Stats component to avoid the useStats hook error
jest.mock('../../TopNavBar/Stats', () => ({
  __esModule: true,
  Stats: () => <div>Stats Component Mock</div>,
}));

describe('Tabs component', () => {
  test('renders tabs and switches between them', () => {
    const { getByText } = render(
      <Tabs>
        <Tab title="Tab 1">Content 1</Tab>
        <Tab title="Tab 2">Content 2</Tab>
        {/* Add more tabs if needed */}
      </Tabs>
    );

    // Check if the initial tab is rendered
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Content 1')).toBeInTheDocument();

    // Click on the second tab
    fireEvent.click(getByText('Tab 2'));

    // Check if the second tab is now rendered
    expect(getByText('Tab 2')).toBeInTheDocument();
    expect(getByText('Content 2')).toBeInTheDocument();
  });
  test('handles keyboard navigation', () => {
    const { getByText } = render(
      <Tabs>
        <Tab title="Tab 1">Content 1</Tab>
        <Tab title="Tab 2">Content 2</Tab>
      </Tabs>
    );

    // Focus on the first tab
    fireEvent.focus(getByText('Tab 1'));

    // Press the right arrow key
    fireEvent.keyDown(getByText('Tab 1'), { key: 'ArrowRight' });

    // Check if the second tab is now focused
    expect(document.activeElement).toBe(getByText('Tab 2'));
  });

  test('renders content based on selected tab', () => {
    const { getByText } = render(
      <Tabs>
        <Tab title="Tab 1">Content 1</Tab>
        <Tab title="Tab 2">Content 2</Tab>
      </Tabs>
    );

    // Click on the second tab
    fireEvent.click(getByText('Tab 2'));

    // Check if the content of the second tab is rendered
    expect(getByText('Content 2')).toBeInTheDocument();
  });
});
