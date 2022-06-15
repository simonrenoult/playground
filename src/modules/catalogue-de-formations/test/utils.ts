import { Client } from "pg";
import * as dotenv from "dotenv";
import BaseDeDonnees from "../../../infrastructure/base-de-donnees";
import Schema from "../configuration/schema";
import Tables from "../write/infrastructure/tables";

dotenv.config();

const POSTGRES_URL = process.env.DATABASE_URL;

export async function initialiserLaBaseDeDonneesDeTest(): Promise<Client> {
  const { client } = await BaseDeDonnees.initialiser(POSTGRES_URL);
  await Schema.supprimer(client);
  await Schema.creer(client);
  await Tables.creer(client, Schema.NOM);

  return client;
}
