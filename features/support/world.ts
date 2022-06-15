import { setWorldConstructor, World } from "@cucumber/cucumber";
import axios from "axios";
import { FastifyInstance } from "fastify";
import nouveauServeur from "../../src/infrastructure/serveur";

class CustomWorld extends World {
  private result: any;
  private serveur: FastifyInstance;

  public static readonly port: number = 1338;
  public static readonly host: string = "0.0.0.0";
  public static readonly url: string = `http://${CustomWorld.host}:${CustomWorld.port}`;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public constructor(options: any) {
    super(options);
    this.serveur = nouveauServeur();
  }

  public async startServer(): Promise<void> {
    await this.serveur.listen({
      port: CustomWorld.port,
      host: CustomWorld.host,
    });
  }

  public async stopServer(): Promise<void> {
    await this.serveur.close();
  }

  public async listerLesFormations(): Promise<void> {
    const response = await axios.get(`${CustomWorld.url}/formations`);
    this.result = response.data.data;
  }

  public async ajouterXFormations(
    nombreDeFormationsAAjouter: number
  ): Promise<void> {
    const url = `${CustomWorld.url}/formations`;

    await Promise.all(
      Array.from({ length: nombreDeFormationsAAjouter }, (_, i) => ({
        code: `DDD0${i}`,
        dureeEnHeures: 14,
      })).map(async (formation) => await axios.post(url, formation))
    );
  }
}

setWorldConstructor(CustomWorld);
