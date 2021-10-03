import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseException } from '../exception/base.exception';

@Catch()
export class ExceptionFilterImpl implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let lang = request.query.lang;

    if (!lang) lang = 'hu'; // default

    console.log(exception);

    const langIndex = this.configService
      .get<Array<any>>('localization')
      .findIndex((elem) => elem.lang.split('-')[0] === lang.toLowerCase());

    if (exception instanceof BaseException) {
      exception.responseMessage = this.configService.get<string>(
        `localization[${langIndex}].exception.${exception.getYamlPath}.message`,
      );
      response
        .status(exception.getStatus())
        .json(exception.responseObject)
        .end();
    } else {
      response
        .status(400)
        .json({
          message: 'Internal server error',
          statusCode: 500,
        })
        .end();
    }
  }
}
