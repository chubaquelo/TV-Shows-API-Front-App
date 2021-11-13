import {Show} from '../entities/show'

export interface IAPIResponseShow {
  score: number;
  show: Show;
}

export interface IShowsRepository {
  getShowsByQuery(query: string): Promise<IAPIResponseShow[]>
  getShowById(id: string): Promise<Show>
}
