import {IShowsRepository} from '../adapters/IShowsRepository'

export class GetShows {
  private showsRepository: IShowsRepository;

  constructor(showsRepository: IShowsRepository) {
    this.showsRepository = showsRepository;
  }

  getShowsByQuery(query: string = 'girls') {
    return this.showsRepository.getShowsByQuery(query);
  }
}