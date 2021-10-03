import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  private readonly properties: Array<string>;
  private readonly yamlPath: string;

  constructor(
    statusCode: number,
    yamlPath: string,
    properties: Array<string> = null,
  ) {
    super(null, statusCode);
    this.properties = properties;
    this.yamlPath = yamlPath;
  }

  set responseMessage(message: string) {
    this.message = message;
  }

  get responseObject() {
    return {
      statusCode: this.getStatus(),
      message: this.message,
      properties: this.properties,
    };
  }

  get getYamlPath() {
    return this.yamlPath;
  }
}
