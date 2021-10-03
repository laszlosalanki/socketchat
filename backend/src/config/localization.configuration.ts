import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
  return {
    localization: [
      yaml.load(
        readFileSync(join(__dirname, 'localization/hu-HU.yaml'), 'utf-8'),
      ) as Record<string, any>,
    ],
  };
};
