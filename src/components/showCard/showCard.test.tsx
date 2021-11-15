import { render } from '@testing-library/react';
import ShowCard from './ShowCard';
import { MockShowsRepository } from '../../core/repositories/MockShowsRepository';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Get shows interactor', () => {
  it('should return an array of x elements', () => {
    const showsRepo = new MockShowsRepository();
    const show = showsRepo.createMockSingleShow('139');
    const { container } = render(
      <Router>
        <ShowCard show={show} />
      </Router>
    );
    expect(container.querySelector('p')?.textContent).toBe(`${show.name}`);
    expect(container.querySelector('img')?.src).toBe(`${show?.image?.medium}`);
  });
});
