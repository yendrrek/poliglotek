import { LanguageValue } from '../types/language-value';
import { Country } from '../models/country';
import { COUNTRIES } from './countries';

export const ONE_COUNTRY_FROM_MULTI_MATCH: Partial<Record<LanguageValue, Country>> = {
  'es': COUNTRIES.countryES,
  'qu': COUNTRIES.countryAR,
  'pt': COUNTRIES.countryPT,
  'ms': COUNTRIES.countryID,
  'ku': COUNTRIES.countryIQ,
  'fr': COUNTRIES.countryFR,
  'en': COUNTRIES.countryUS,
  'ar': COUNTRIES.countryAE,
  'ts': COUNTRIES.countryZA,
  'nl': COUNTRIES.countryNL,
  'bho': COUNTRIES.countryIN,
  'ny': COUNTRIES.countryMZ,
  'ay': COUNTRIES.countryCL,
  'yo': COUNTRIES.countryNG,
  'sw': COUNTRIES.countryKE,
  'da': COUNTRIES.countryDK,
  'st': COUNTRIES.countryZA,
  'sm': COUNTRIES.countryWS,
  'om': COUNTRIES.countryKE,
  'ko': COUNTRIES.countryKR,
  'rw': COUNTRIES.countryRW,
  'ee': COUNTRIES.countryGH,
  'bn': COUNTRIES.countryIN,
  'as': COUNTRIES.countryIN,
  'sa': COUNTRIES.countryIN,
  'yi': COUNTRIES.countryUS,
  'ug': COUNTRIES.countryKZ,
  'ur': COUNTRIES.countryIN,
  'ti': COUNTRIES.countryET,
  'ta': COUNTRIES.countryIN
};
