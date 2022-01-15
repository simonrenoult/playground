/**
 * Décorateur permettant d'émuler les interfaces statiques
 * @see https://github.com/microsoft/TypeScript/issues/34516
 */
export function StaticImplements<T>() {
  return (_constructor: T): any => {
    /* nop */
  };
}
