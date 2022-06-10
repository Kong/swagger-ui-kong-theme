import { render, screen } from '@testing-library/react';
import App from 'demo-new/src/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Kong/i);
  expect(linkElement).toBeInTheDocument();
});
