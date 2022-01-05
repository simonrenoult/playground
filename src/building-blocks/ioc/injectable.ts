import { RESOLVER } from "awilix";

/**
 * Awilix ne fournit pas nativement de décorateur facilitant l'injection donc il est fait maison.
 * @see https://github.com/jeffijoe/awilix#inlining-resolver-options
 */
export default function injectable(
  nomPourLeConteneurDeIOC?: string
): (target: any) => any {
  return (target: any): any => {
    target[RESOLVER] = { name: nomPourLeConteneurDeIOC ?? target.name };
    return target;
  };
}
