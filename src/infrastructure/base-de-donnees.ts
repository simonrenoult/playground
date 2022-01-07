import { Client } from "pg";
import injectable from "../building-blocks/ioc/injectable";

@injectable()
export default class BaseDeDonnees {
  public readonly client: Client;

  private constructor(private readonly postgresqlUrl: string) {
    this.client = new Client(postgresqlUrl);
  }

  public static async initialiser(
    postgresqlUrl: string
  ): Promise<BaseDeDonnees> {
    const bdd = new BaseDeDonnees(postgresqlUrl);
    await bdd.client.connect();
    return bdd;
  }
}
