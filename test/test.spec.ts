import * as fs from 'fs';
import { join } from 'path';

const { readFile } = fs.promises;

const file = 'shipments_data.csv';

const parseAndExtractData = async function (file: string): Promise<string> {
  const path = join(__dirname, `__resources__/${file}`);
  const csv = await readFile(path, 'utf8');

  return csv;
};

describe('Csv orders validate', () => {
  describe(`match file ${file}`, () => {
    it(`should extract ${file}`, async () => {
      const result = await parseAndExtractData(file);
      expect(result).toMatchSnapshot();
    });
  });
});
