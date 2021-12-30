import { Agregat } from "./agregat";

/**
 * Interface d'accès aux données des agrégats du bounded context.
 *
 * @see https://www.martinfowler.com/bliki/BoundedContext.html
 */
export interface Repository<IdAgregat, A extends Agregat> {
  parId(id: IdAgregat): A;
  persister(a: A): void;
}
