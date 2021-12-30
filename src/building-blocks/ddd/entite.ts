export interface Entite<T> {
  id: T;
  equals(e: Entite<T>): boolean;
}
