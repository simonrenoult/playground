import * as readdirp from 'readdirp'
import * as fs from 'fs-extra'
import * as path from 'path';

const MarkdownIt = require('markdown-it')

const CHEMIN_VERS_LA_RACINE = path.resolve(__dirname, '../..')
const CHEMIN_VERS_LA_DOCUMENTATION = path.resolve(CHEMIN_VERS_LA_RACINE, 'doc')

const markdownIt = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

main()


async function main() {
  const markdowns = await recupererLesFichiersMarkdown()
  const htmls = await creerLesFichiersHtml(markdowns)
  await fs.ensureDir(CHEMIN_VERS_LA_DOCUMENTATION)
  for await (const html of htmls) {
    const cheminVersLeFichier = [CHEMIN_VERS_LA_DOCUMENTATION, html.nom].join(path.sep)
    await fs.outputFile(cheminVersLeFichier, html.contenu)
  }
}

type Fichier = { nom: string, contenu: string }

async function recupererLesFichiersMarkdown (): Promise<Fichier[]> {
  const options = {
    fileFilter: ['*.md', '!*.template.md'],
    directoryFilter: ['!.git', '!*modules'],
    type: 'files'
  }

  const markdowns: Fichier[] = []
  // @ts-ignore
  for await (const entry of readdirp(CHEMIN_VERS_LA_RACINE, options)) {
    process.stdout.write(`Fichier trouvé : ${entry.path}\n`)
    const markdown = fs.readFileSync(entry.fullPath, { encoding: 'utf-8' })
    markdowns.push({ nom: entry.path, contenu: markdown })
  }

  return markdowns
}

async function creerLesFichiersHtml(markdowns: Fichier[]): Promise<Fichier[]> {
  return markdowns.map(m => ({ nom: m.nom.replace('.md', '.html'), contenu: markdownIt.render(m.contenu) }))
}
