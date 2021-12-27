import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { IBoundedContext, NomDELElementEtSonContenu } from '../building-blocks/ddd/bounded-context'
import { EOL } from 'os'

// TODO: dynamiser la récupération des bounded contexts
const NOM_DES_BOUNDED_CONTEXTS = [
  'catalogue-de-formations',
  'sessions-de-formation'
]
const CHEMIN_VERS_LA_RACINE = resolve(__dirname, '..')
const NOM_DU_TEMPLATE = 'bounded-context-summary.template.md'
const CHEMIN_VERS_LE_TEMPLATE = resolve(CHEMIN_VERS_LA_RACINE, 'tools', NOM_DU_TEMPLATE)
const LOCALISATION_DU_RESUME_DANS_LE_BOUNDED_CONTEXT = 'doc/summary.md'

main()

async function main(): Promise<void> {
  for (const nomDuBoundedContext of NOM_DES_BOUNDED_CONTEXTS) {
    await genererLeBoundedContextSummary(nomDuBoundedContext)
  }
}

async function genererLeBoundedContextSummary(nomDuBoundedContext: string): Promise<void> {
  const cheminVersLeBoundedContext = resolve(CHEMIN_VERS_LA_RACINE, nomDuBoundedContext)
  const boundedContext: IBoundedContext = await recupererBoundedContext(cheminVersLeBoundedContext)
  const boundedContextSummary: string = creerLeBoundedContextSummary(boundedContext)
  ecrireBoundedContextSummarySurLeSystemeDeFichier(cheminVersLeBoundedContext, boundedContextSummary)
}

async function recupererBoundedContext(cheminVersLeBoundedContext: string): Promise<IBoundedContext> {
  return (await import(cheminVersLeBoundedContext)).default
}

function creerLeBoundedContextSummary(boundedContext: IBoundedContext): string {
  const templateDeBoundedContextSummary = readFileSync(CHEMIN_VERS_LE_TEMPLATE, { encoding: 'utf8' })

  return templateDeBoundedContextSummary
    .replace('{{ nom }}', boundedContext.nom)
    .replace('{{ description }}', boundedContext.description)
    .replace('{{ domain }}', boundedContext.classificationStrategique.domain)
    .replace('{{ businessModel }}', boundedContext.classificationStrategique.businessModel)
    .replace('{{ evolution }}', boundedContext.classificationStrategique.evolution)
    .replace('{{ rolesDuDomaine }}', boundedContext.rolesDuDomaine.join(', '))
    .replace('{{ questions }}', boundedContext.questions.map(versDetails).join(EOL))
    .replace('{{ modelesDeLecture }}', boundedContext.modelesDeLecture.map(versDetails).join(EOL))
    .replace('{{ commandes }}', boundedContext.commandes.map(versDetails).join(EOL))
    .replace('{{ evenementsDuDomaine }}', boundedContext.evenementsDuDomaine.map(versDetails).join(EOL))
    .replace('{{ ubiquitousLanguage }}', boundedContext.ubiquitousLanguage.sort().map(item => `- ${item}`).join(EOL))

  function versDetails(m: NomDELElementEtSonContenu): string {
    const MARQUEUR_DE_CODE = '```'
    const LANGAGE = `ts`
    return [
      '<details>',
      `<summary>${m.nom}</summary>`,
      EOL,
      `${MARQUEUR_DE_CODE}${LANGAGE}`,
      m.contenu,
      `${MARQUEUR_DE_CODE}${EOL}`,
      EOL,
      '</details>',
    ].join(EOL)
  }
}

function ecrireBoundedContextSummarySurLeSystemeDeFichier(cheminVersLeBoundedContext: string, boundedContextSummary: string) {
  const cheminVersLeBoundedContextSummary = resolve(cheminVersLeBoundedContext, LOCALISATION_DU_RESUME_DANS_LE_BOUNDED_CONTEXT)
  writeFileSync(cheminVersLeBoundedContextSummary, boundedContextSummary, { encoding: 'utf8' })
}
