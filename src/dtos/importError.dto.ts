export class ImportErrorMessagesDto {
  messages: string[];
  path: string;
  value: unknown;

  constructor(messages: string[], path: string, value: unknown) {
    this.messages = messages;
    this.path = path;
    this.value = value;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
