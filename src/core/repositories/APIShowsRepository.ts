import { AxiosRepository } from './AxiosRepository';
import { IShowsRepository, IAPIResponseShow} from '../adapters/IShowsRepository';
import { Show } from '../entities/show';

export class APIShowsRepository extends AxiosRepository implements IShowsRepository {
  getShowsByQuery(word: string): Promise<IAPIResponseShow[]> {
    return this.client().get(`/search/shows?q=${word}`).then((response) => response.data);
  }
  getShowById(id: string): Promise<Show> {
    return this.client().get(`/shows/${id}`).then((response) => response.data);
  }
}