import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { ClassDeclaration, Project } from 'ts-morph'
import { IBoundedContext } from '../bounded-context'

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
    .replace('{{ questions }}', boundedContext.questions.map(q => `- ${q}`).join('\n'))
    .replace('{{ commandes }}', boundedContext.commandes.map(c => `- ${c}`).join('\n'))
    .replace('{{ evenementsDuDomaine }}', boundedContext.evenementsDuDomaine.map(e => `- ${e}`).join('\n'))
    .replace('{{ ubiquitousLanguage }}', boundedContext.ubiquitousLanguage.map(item => `- ${item}`).join('\n'))
}

function ecrireBoundedContextCanvasSurLeSystemeDeFichier(cheminVersLeBoundedContext: string, boundedContextCanvas: string) {
  const cheminVersLeCanvasDuBoundedContext = resolve(cheminVersLeBoundedContext, LOCALISATION_DU_CANVAS_DANS_LE_BOUNDED_CONTEXT)
  writeFileSync(cheminVersLeCanvasDuBoundedContext, boundedContextCanvas, { encoding: 'utf8' })
}

type Messages = { commandes: string[]; questions: string[]; evenementsDuDomaine: string[] }

async function listerLesMessagesDuBoundedContext(classes: ClassDeclaration[]): Promise<Messages> {
  return {
    commandes: recupererLeNomDeLaClassePourLeType(classes, 'Commande'),
    questions: recupererLeNomDeLaClassePourLeType(classes, 'Question'),
    evenementsDuDomaine: recupererLeNomDeLaClassePourLeType(classes, 'EvenementDuDomaine')
  }
}

async function identifierLUbiquitousLanguage(classes: ClassDeclaration[]): Promise<string[]> {
  const agregats: string[] = recupererLeNomDeLaClassePourLeType(classes, 'Agregat')
  const entites: string[] = recupererLeNomDeLaClassePourLeType(classes, 'Entite')
  const valueObjects: string[] = recupererLeNomDeLaClassePourLeType(classes, 'ValueObject')
  return [...new Set([...agregats, ...entites, ...valueObjects])]
}

type Interfaces = 'ValueObject' | 'Agregat' | 'Entite' | 'Commande' | 'EvenementDuDomaine' | 'Question'

function recupererLeNomDeLaClassePourLeType(classes: ClassDeclaration[], interfaceImplementee: Interfaces): string[] {
  return classes
    .filter(c => c.getImplements().some(i => i.getText().startsWith(interfaceImplementee)))
    .map(c => c.getName())
}
