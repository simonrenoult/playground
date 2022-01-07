import { Client } from "pg";
import * as format from "pg-format";

export default class Schema {
  public static NOM = "catalogue_de_formations";

  public static async creer(client: Client): Promise<void> {
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS ${format(this.NOM)}
    `);
  }

  public static async supprimer(client: Client): Promise<void> {
    await client.query(`
      DROP SCHEMA IF EXISTS ${format(this.NOM)} CASCADE
    `);
  }
}
