import { injectable } from 'inversify';
import { config, DotenvParseOutput, DotenvConfigOutput } from 'dotenv';

@injectable()
export class ConfigService {
  private readonly config: DotenvParseOutput;
  constructor() {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      console.error(result.error);
    } else {
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
