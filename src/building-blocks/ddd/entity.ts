export interface Entity<T> {
  id: T;

  equals(e: Entity<T>): boolean;
}
