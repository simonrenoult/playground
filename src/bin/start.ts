import { Configuration } from "../infrastructure/configuration";
import nouveauServeur from "../infrastructure/serveur";

async function start(): Promise<void> {
  // @ts-ignore
  const configuration: Configuration = serveur.configuration;

  const serveur = nouveauServeur();
  try {
    await serveur.listen({
      port: configuration.port,
      host: configuration.host,
    });
  } catch (err) {
    serveur.log.error(err);
    process.exit(1);
  }
}

start();
