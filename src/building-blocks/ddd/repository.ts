import { AggregateRoot } from "./aggregate-root";

/**
 * Interface d'accès aux données des agrégats du bounded context.
 *
 * @see https://www.martinfowler.com/bliki/BoundedContext.html
 */
export interface Repository<IdAgregat, A extends AggregateRoot> {
  parId(id: IdAgregat): Promise<A>;

  persister(a: A): Promise<void>;
}
