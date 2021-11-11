import { AxiosRepository } from './AxiosRepository';
import { IShowsRepository, IAPIResponseShow} from '../adapters/IShowsRepository';

export class APIShowsRepository extends AxiosRepository implements IShowsRepository {
  getShowsByQuery(word: string): Promise<IAPIResponseShow[]> {
    return this.client().get(`?q=${word}`).then((response) => response.data);
  }
}
