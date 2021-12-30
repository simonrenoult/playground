/**
 * @see https://www.martinfowler.com/bliki/ValueObject.html
 */
export interface ValueObject {
  equals(vo: ValueObject): boolean;
}
