import { render } from '@testing-library/react';
import SinglePageHeader from './SinglePageHeader';
import { MockShowsRepository } from '../../core/repositories/MockShowsRepository';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Get shows interactor', () => {
  it('should return an array of x elements', () => {
    const showsRepo = new MockShowsRepository();
    const show = showsRepo.createMockSingleShow('139');
    const {container} = render(<Router><SinglePageHeader show={show} /></Router>);
    expect(container.querySelector('[data-testid=single-show-title]')).toBeTruthy();
    expect(container.querySelector('[data-testid=single-show-title]')?.textContent).toBe(`Show: ${show.name}`);
    expect(container.querySelector('button')?.textContent).toBe('Go Back!');
  });
});
