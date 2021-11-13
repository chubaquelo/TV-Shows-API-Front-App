import {GetShows} from './GetShows';
import {MockShowsRepository} from '../repositories/MockShowsRepository'

describe('Get shows interactor', () => {
  const getShows = new GetShows(new MockShowsRepository());

  it('should return an array of x elements', () => {
    getShows.getShowsByQuery().then(shows => {
      expect(shows.length).toBe(10);
    })
    expect.assertions(1);
  })

  it('first show name should be Girls', () => {
    getShows.getShowsByQuery().then(shows => {
      expect(shows[0].show.name).toBe('Girls');
    })
    expect.assertions(1);
  })

  it('should return a single show', () => {
    getShows.getShowById('22230').then(show => {
      expect(show.name).toBe('Girls');
      expect(show.id).toBe(22230);
    })
    expect.assertions(2);
  })
})