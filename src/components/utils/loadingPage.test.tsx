import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingPage from './LoadingPage';

describe('Get shows interactor', () => {
  it('should return an array of x elements', () => {
    const { container } = render(
      <LoadingPage />
    );
    expect(container.querySelector('p')?.textContent).toBe('Loading, please wait...');
  });
});
