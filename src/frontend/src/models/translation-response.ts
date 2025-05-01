import { Translation } from './translation';

export interface TranslationResponse {
  success: boolean;
  error: string;
  warning?: string;
  data: Translation[];
}
