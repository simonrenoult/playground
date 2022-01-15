export default interface Logger {
  trace(message: string, ...autresInformations: unknown[]): void;

  debug(message: string, ...autresInformations: unknown[]): void;

  info(message: string, ...autresInformations: unknown[]): void;

  warn(message: string, ...autresInformations: unknown[]): void;

  error(message: string, ...autresInformations: unknown[]): void;
}
