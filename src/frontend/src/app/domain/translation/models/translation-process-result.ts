import { Translation } from './translation';

export interface TranslationProcessResult {
  success: boolean;
  translations: Translation[];
  message?: string;
  isDuplicate: boolean;
}
