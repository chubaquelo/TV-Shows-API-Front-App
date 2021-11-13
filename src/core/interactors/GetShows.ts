import {IShowsRepository} from '../adapters/IShowsRepository'

export class GetShows {
  private showsRepository: IShowsRepository;

  constructor(showsRepository: IShowsRepository) {
    this.showsRepository = showsRepository;
  }

  getShowsByQuery(query: string = 'girls') {
    return this.showsRepository.getShowsByQuery(query);
  }

  getShowById(id: string = '33320') {
    return this.showsRepository.getShowById(id);
  }
}