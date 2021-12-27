import serveur from './serveur'

const PORT = process.env.PORT || 3000

async function start() {
  try {
    await serveur.listen(PORT)
  } catch (err) {
    serveur.log.error(err)
    process.exit(1)
  }
}

start()
