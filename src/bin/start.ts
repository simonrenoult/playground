import serveur from "../infrastructure/serveur";

const PORT = process.env.PORT || 3000;

async function start(): Promise<void> {
  try {
    await serveur.listen(PORT);
  } catch (err) {
    serveur.log.error(err);
    process.exit(1);
  }
}

start();
