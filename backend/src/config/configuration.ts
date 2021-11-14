import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
  const fileName =
    process.env.NODE_ENV === 'production'
      ? 'config.yaml'
      : 'config.secret.yaml';
  return yaml.load(readFileSync(join(__dirname, fileName), 'utf-8')) as Record<
    string,
    any
  >;
};
