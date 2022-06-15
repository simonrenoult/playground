import serveur from "../infrastructure/serveur";
import { Configuration } from "../infrastructure/configuration";

async function start(): Promise<void> {
  // @ts-ignore
  const configuration: Configuration = serveur.configuration;

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
