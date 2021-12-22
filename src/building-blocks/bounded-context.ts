import { ClassDeclaration, InterfaceDeclaration, Project } from 'ts-morph'
import { resolve } from 'path'

type Interfaces = 'ValueObject' | 'Agregat' | 'Entite' | 'Commande' | 'EvenementDuDomaine' | 'Question' | 'ModeleDeLecture'

export interface IBoundedContext {
  nom: string
  description: string
  localisation: string
  classificationStrategique: ClassificationStrategique
  rolesDuDomaine: Array<RoleDuDomaine>
  questions: Message[]
  modelesDeLecture: Message[]
  commandes: Message[]
  evenementsDuDomaine: Message[]
  ubiquitousLanguage: string[]
}

export default class BoundedContext implements IBoundedContext {
  public readonly ubiquitousLanguage: string[] = []
  public readonly questions: Message[] = []
  public readonly modelesDeLecture: Message[] = []
  public readonly commandes: Message[] = []
  public readonly evenementsDuDomaine: Message[] = []

  public constructor(
    public readonly nom: string,
    public readonly description: string,
    public readonly classificationStrategique: ClassificationStrategique,
    public readonly rolesDuDomaine: Array<RoleDuDomaine>,
    public readonly localisation: string,
  ) {
    const elements = BoundedContext.listerLesElementsDuBoundedContext(localisation)
    this.ubiquitousLanguage = BoundedContext.recupererUbiquitousLanguage(elements)
    this.questions = BoundedContext.recupererLesQuestions(elements)
    this.modelesDeLecture = BoundedContext.recupererLesModelesDeLecture(elements)
    this.commandes = BoundedContext.recupererLesCommandes(elements)
    this.evenementsDuDomaine = BoundedContext.recupererLesEvenementsDuDomaine(elements)
  }

  private static recupererUbiquitousLanguage(classes: Array<ClassDeclaration | InterfaceDeclaration>): string[] {
    const agregats = recupererLeDetailDeLElementPourLeType(classes, 'Agregat')
    const entites = recupererLeDetailDeLElementPourLeType(classes, 'Entite')
    const valueObjects = recupererLeDetailDeLElementPourLeType(classes, 'ValueObject')
    const ubiquitousLanguage = [...agregats, ...entites, ...valueObjects].map(c => c.nom)
    return supprimerDoublons(ubiquitousLanguage)
  }

  private static recupererLesEvenementsDuDomaine(classes: Array<ClassDeclaration | InterfaceDeclaration>): DetailsDeLaClasse[] {
    return recupererLeDetailDeLElementPourLeType(classes, 'EvenementDuDomaine')
  }

  private static recupererLesCommandes(classes: Array<ClassDeclaration | InterfaceDeclaration>): DetailsDeLaClasse[] {
    return recupererLeDetailDeLElementPourLeType(classes, 'Commande')
  }

  private static recupererLesQuestions(classes: Array<ClassDeclaration | InterfaceDeclaration>): DetailsDeLaClasse[] {
    return recupererLeDetailDeLElementPourLeType(classes, 'Question')
  }

  private static recupererLesModelesDeLecture(elements: Array<ClassDeclaration | InterfaceDeclaration>) {
    return recupererLeDetailDeLElementPourLeType(elements, 'ModeleDeLecture')
  }

  private static listerLesElementsDuBoundedContext(cheminVersLeBoundedContext: string): Array<ClassDeclaration | InterfaceDeclaration> {
    const projet = new Project({ tsConfigFilePath: resolve(__dirname, '../..', 'tsconfig.json') })
    const fichiers = projet.getSourceFiles()
      .filter(sourceFile => sourceFile.getFilePath().includes(cheminVersLeBoundedContext))
    return fichiers.flatMap(sf => [...sf.getClasses(), ...sf.getInterfaces()])
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

function recupererLeDetailDeLElementPourLeType(elements: Array<ClassDeclaration | InterfaceDeclaration>, interfaceImplementee: Interfaces): Array<DetailsDeLaClasse> {
  return elements
    .filter(c => {
      if (c instanceof  ClassDeclaration) {
        return c.getImplements().some(i => i.getText().startsWith(interfaceImplementee))
      }

      if (c instanceof InterfaceDeclaration) {
        return c.getExtends().some(e => e.getText().startsWith(interfaceImplementee))
      }

      return false
    })
    .map(c => ({ nom: c.getName(), contenu: c.getText() }))
}

function supprimerDoublons(arr: string[]): string[] {
  return [...new Set(arr)]
}
