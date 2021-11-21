import { TranslationService } from './translation.service.interface';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';

@Injectable()
export class TranslationServiceImpl implements TranslationService {
  private readonly apiKey: string;
  private readonly endpoint: string;
  private readonly method: string;

  constructor(configService: ConfigService) {
    this.apiKey = configService.get<string>('translation.api_key');
    this.method = configService.get<string>('translation.method').toUpperCase();
    this.endpoint = `${configService.get<string>(
      'translation.endpoint',
    )}?auth_key=${this.apiKey}`;
  }

  public async translate(
    text: string,
    targetLanguage: string,
  ): Promise<string> {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('target_lang', targetLanguage);

    const request = await fetch(this.endpoint, {
      method: this.method,
      body: formData,
    });

    const result = await request.json();

    return result.translations[0].text;
  }
}
