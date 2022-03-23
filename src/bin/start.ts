import serveur from "../infrastructure/serveur";

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

async function start(): Promise<void> {
  try {
    await serveur.listen({ port: PORT, host: HOST });
  } catch (err) {
    serveur.log.error(err);
    process.exit(1);
  }
}

start();
