import { Translation } from '../../domain/translation/models/translation';

export interface TranslationResponse {
  readonly success: boolean;
  readonly error: string;
  readonly warning?: string;
  readonly data: Translation[];
}
