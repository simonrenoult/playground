import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { ClassDeclaration, Project } from 'ts-morph'
import { IBoundedContext, Message } from '../bounded-context'
import { EOL } from 'os'

// FIXME: dynamiser la récupération des bounded contexts
const NOM_DES_BOUNDED_CONTEXTS = [
  // 'catalogue-de-formations',
  'sessions-de-formation'
]
const CHEMIN_VERS_LA_RACINE = resolve(__dirname, '../..')
const NOM_DU_TEMPLATE = 'bounded-context-canvas.template.md'
const CHEMIN_VERS_LE_TEMPLATE = resolve(CHEMIN_VERS_LA_RACINE, 'building-blocks/tools', NOM_DU_TEMPLATE)
const CHEMIN_VERS_TS_CONFIG = resolve(__dirname, '../../..', 'tsconfig.json')
const LOCALISATION_DU_CANVAS_DANS_LE_BOUNDED_CONTEXT = 'doc/canvas.md'

main()

async function main(): Promise<void> {
  for (const nomDuBoundedContext of NOM_DES_BOUNDED_CONTEXTS) {
    await genererLeBoundedContextCanvas(nomDuBoundedContext)
  }
}

async function genererLeBoundedContextCanvas(nomDuBoundedContext: string): Promise<void> {
  const cheminVersLeBoundedContext = resolve(CHEMIN_VERS_LA_RACINE, nomDuBoundedContext)
  const boundedContext: IBoundedContext = await ajouterLeContenuDuBoundedContext(cheminVersLeBoundedContext)
  const boundedContextCanvas: string = creerLeBoundedContextCanvas(boundedContext)
  ecrireBoundedContextCanvasSurLeSystemeDeFichier(cheminVersLeBoundedContext, boundedContextCanvas)
}

async function ajouterLeContenuDuBoundedContext(cheminVersLeBoundedContext: string): Promise<IBoundedContext> {
  const boundedContext: IBoundedContext = (await import(cheminVersLeBoundedContext)).default
  const classes = listerLesClassesDuBoundedContext(cheminVersLeBoundedContext)

  const { questions, commandes, evenementsDuDomaine } = await listerLesMessagesDuBoundedContext(classes)
  boundedContext.ajouterQuestions(questions)
  boundedContext.ajouterCommandes(commandes)
  boundedContext.ajouterEvenementsDuDomaine(evenementsDuDomaine)

  const ubiquitousLanguage = await identifierLUbiquitousLanguage(classes)
  boundedContext.ajouterLUbiquitousLanguage(ubiquitousLanguage)

  return boundedContext
}

function listerLesClassesDuBoundedContext(cheminVersLeBoundedContext: string): ClassDeclaration[] {
  const project = new Project({ tsConfigFilePath: CHEMIN_VERS_TS_CONFIG });
  const fichiers = project.getSourceFiles()
    .filter(sourceFile => sourceFile.getFilePath().includes(cheminVersLeBoundedContext))
  return fichiers.map(sf => sf.getClasses()).reduce((prev, cur) => ([...prev, ...cur]), [])
}

function creerLeBoundedContextCanvas(boundedContext: IBoundedContext): string {
  const templateDeBoundedContextCanvas = readFileSync(CHEMIN_VERS_LE_TEMPLATE, { encoding: 'utf8' })

  return templateDeBoundedContextCanvas
    .replace('{{ nom }}', boundedContext.nom)
    .replace('{{ description }}', boundedContext.description)
    .replace('{{ domain }}', boundedContext.classificationStrategique.domain)
    .replace('{{ businessModel }}', boundedContext.classificationStrategique.businessModel)
    .replace('{{ evolution }}', boundedContext.classificationStrategique.evolution)
    .replace('{{ rolesDuDomaine }}', boundedContext.rolesDuDomaine.join(', '))
    .replace('{{ questions }}', boundedContext.questions.map(versDetails).join(EOL))
    .replace('{{ commandes }}', boundedContext.commandes.map(versDetails).join(EOL))
    .replace('{{ evenementsDuDomaine }}', boundedContext.evenementsDuDomaine.map(versDetails).join(EOL))
    .replace('{{ ubiquitousLanguage }}', boundedContext.ubiquitousLanguage.map(item => `- ${item}`).join(EOL))

  function versDetails(m: Message): string {
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

function ecrireBoundedContextCanvasSurLeSystemeDeFichier(cheminVersLeBoundedContext: string, boundedContextCanvas: string) {
  const cheminVersLeCanvasDuBoundedContext = resolve(cheminVersLeBoundedContext, LOCALISATION_DU_CANVAS_DANS_LE_BOUNDED_CONTEXT)
  writeFileSync(cheminVersLeCanvasDuBoundedContext, boundedContextCanvas, { encoding: 'utf8' })
}

async function listerLesMessagesDuBoundedContext(classes: ClassDeclaration[]): Promise<{ commandes: Array<DetailsDeLaClasse>; evenementsDuDomaine: Array<DetailsDeLaClasse>; questions: Array<DetailsDeLaClasse> }> {
  return {
    commandes: recupererLeNomDeLaClassePourLeType(classes, 'Commande'),
    questions: recupererLeNomDeLaClassePourLeType(classes, 'Question'),
    evenementsDuDomaine: recupererLeNomDeLaClassePourLeType(classes, 'EvenementDuDomaine')
  }
}

async function identifierLUbiquitousLanguage(classes: ClassDeclaration[]): Promise<string[]> {
  const agregats: string[] = recupererLeNomDeLaClassePourLeType(classes, 'Agregat').map(c => c.nom)
  const entites: string[] = recupererLeNomDeLaClassePourLeType(classes, 'Entite').map(c => c.nom)
  const valueObjects: string[] = recupererLeNomDeLaClassePourLeType(classes, 'ValueObject').map(c => c.nom)
  return [...new Set([...agregats, ...entites, ...valueObjects])]
}

type Interfaces = 'ValueObject' | 'Agregat' | 'Entite' | 'Commande' | 'EvenementDuDomaine' | 'Question'

type DetailsDeLaClasse = { nom: string, contenu: string }

function recupererLeNomDeLaClassePourLeType(classes: ClassDeclaration[], interfaceImplementee: Interfaces): Array<DetailsDeLaClasse> {
  return classes
    .filter(c => c.getImplements().some(i => i.getText().startsWith(interfaceImplementee)))
    .map(c => ({ nom: c.getName(), contenu: c.getText() }))
}
