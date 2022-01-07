import { Client } from "pg";
import BaseDeDonnees from "../../../infrastructure/base-de-donnees";
import Schema from "../configuration/schema";
import Tables from "../write/infrastructure/tables";

const POSTGRES_URL =
  "postgres://formations-test:formations-test@localhost:5432/formations-test";

export async function initialiserLaBaseDeDonneesDeTest(): Promise<Client> {
  const { client } = await BaseDeDonnees.initialiser(POSTGRES_URL);
  await Schema.supprimer(client);
  await Schema.creer(client);
  await Tables.creer(client, Schema.NOM);

  return client;
}
