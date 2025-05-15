import { TranslatedPage } from './translated-page';

export interface Translation {
  readonly id: string;
  readonly page: TranslatedPage;
  readonly url: string;
}
