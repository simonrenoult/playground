import { Client } from "pg";
import * as format from "pg-format";

export default class Tables {
  public static async creer(client: Client, schema: string): Promise<void> {
    await client.query(
      `
        CREATE TABLE IF NOT EXISTS ${format(schema)}.formations
        (
          id                  varchar PRIMARY KEY,
          date_de_creation    timestamp DEFAULT now(),
          date_de_mise_a_jour timestamp,
          contenu             json
        )
      `
    );
  }
}
