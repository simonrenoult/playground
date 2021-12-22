import { ClassDeclaration, Project } from 'ts-morph'
import { resolve } from 'path'

type Interfaces = 'ValueObject' | 'Agregat' | 'Entite' | 'Commande' | 'EvenementDuDomaine' | 'Question'

export interface IBoundedContext {
  nom: string
  description: string
  localisation: string
  classificationStrategique: ClassificationStrategique
  rolesDuDomaine: Array<RoleDuDomaine>
  questions: Message[]
  commandes: Message[]
  evenementsDuDomaine: Message[]
  ubiquitousLanguage: string[]
}

export default class BoundedContext implements IBoundedContext {
  public readonly ubiquitousLanguage: string[] = []
  public readonly questions: Message[] = []
  public readonly commandes: Message[] = []
  public readonly evenementsDuDomaine: Message[] = []

  public constructor(
    public readonly nom: string,
    public readonly description: string,
    public readonly classificationStrategique: ClassificationStrategique,
    public readonly rolesDuDomaine: Array<RoleDuDomaine>,
    public readonly localisation: string,
  ) {
    const classes = BoundedContext.listerLesClassesDuBoundedContext(localisation)
    this.ubiquitousLanguage = BoundedContext.recupererUbiquitousLanguage(classes)
    this.questions = BoundedContext.recupererLesQuestions(classes)
    this.commandes = BoundedContext.recupererLesCommandes(classes)
    this.evenementsDuDomaine = BoundedContext.recupererLesEvenementsDuDomaine(classes)
  }

  private static recupererUbiquitousLanguage(classes: ClassDeclaration[]): string[] {
    const agregats = recupererLeDetailDeLaClassePourLeType(classes, 'Agregat')
    const entites = recupererLeDetailDeLaClassePourLeType(classes, 'Entite')
    const valueObjects = recupererLeDetailDeLaClassePourLeType(classes, 'ValueObject')
    const ubiquitousLanguage = [...agregats, ...entites, ...valueObjects].map(c => c.nom)
    return supprimerDoublons(ubiquitousLanguage)
  }

  private static recupererLesEvenementsDuDomaine(classes: ClassDeclaration[]): DetailsDeLaClasse[] {
    return recupererLeDetailDeLaClassePourLeType(classes, 'EvenementDuDomaine')
  }

  private static recupererLesCommandes(classes: ClassDeclaration[]): DetailsDeLaClasse[] {
    return recupererLeDetailDeLaClassePourLeType(classes, 'Commande')
  }

  private static recupererLesQuestions(classes: ClassDeclaration[]): DetailsDeLaClasse[] {
    return recupererLeDetailDeLaClassePourLeType(classes, 'Question')
  }

  private static listerLesClassesDuBoundedContext(cheminVersLeBoundedContext: string): ClassDeclaration[] {
    const projet = new Project({ tsConfigFilePath: resolve(__dirname, '../..', 'tsconfig.json') });
    const fichiers = projet.getSourceFiles()
      .filter(sourceFile => sourceFile.getFilePath().includes(cheminVersLeBoundedContext))
    return fichiers.flatMap(sf => sf.getClasses())
  }
}

type ClassificationStrategique = {
  domain: Domain,
  businessModel: BusinessModel,
  evolution: Evolution
}

export type Message = { nom: string, contenu: string }

export enum Domain {
  CORE = 'CORE',
  SUPPORTING = 'SUPPORTING',
  GENERIC = 'GENERIC',
  OTHER = 'OTHER'
}

export enum BusinessModel {
  REVENUE = 'REVENUE',
  ENGAGEMENT = 'ENGAGEMENT',
  COMPLIANCE = 'COMPLIANCE',
  COST_REDUCTION = 'COST_REDUCTION'
}

export enum Evolution {
  GENESIS = 'GENESIS',
  CUSTOM_BUILT = 'CUSTOM_BUILT',
  PRODUCT = 'PRODUCT',
  COMMODITY = 'COMMODITY'
}

export enum RoleDuDomaine {
  DRAFT = 'DRAFT',
  EXECUTION = 'EXECUTION',
  ANALYST = 'ANALYST',
  GATEWAY = 'GATEWAY'
}

type DetailsDeLaClasse = { nom: string, contenu: string }

function recupererLeDetailDeLaClassePourLeType(classes: ClassDeclaration[], interfaceImplementee: Interfaces): Array<DetailsDeLaClasse> {
  return classes
    .filter(c => c.getImplements().some(i => i.getText().startsWith(interfaceImplementee)))
    .map(c => ({ nom: c.getName(), contenu: c.getText() }))
}

function supprimerDoublons(arr: string[]): string[] {
  return [...new Set(arr)]
}
