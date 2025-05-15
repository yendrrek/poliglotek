import { Translation } from '../../domain/translation/translation';

export interface TranslationResponse {
  readonly success: boolean;
  readonly error: string;
  readonly warning?: string;
  readonly data: Translation[];
}
