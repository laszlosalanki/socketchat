export interface TranslationService {
  translate(text: string, targetLanguage: string): Promise<string>;
}
