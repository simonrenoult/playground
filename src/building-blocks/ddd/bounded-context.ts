import { ClassDeclaration, InterfaceDeclaration, Project } from 'ts-morph'
import { resolve } from 'path'
import { Constructor } from 'type-fest'
import Message from '../cqrs/message'

type Interfaces =
  'ValueObject'
  | 'Agregat'
  | 'Entite'
  | 'Commande'
  | 'EvenementDuDomaine'
  | 'Question'
  | 'ModeleDeLecture'
  | 'Repository'

export interface IBoundedContext {
  nom: string
  description: string
  cheminVersLaRacineDuBoundedContext: string
  classificationStrategique: ClassificationStrategique
  rolesDuDomaine: Array<RoleDuDomaine>
  questions: NomDELElementEtSonContenu[]
  modelesDeLecture: NomDELElementEtSonContenu[]
  commandes: NomDELElementEtSonContenu[]
  evenementsDuDomaine: NomDELElementEtSonContenu[]
  ubiquitousLanguage: string[],
  arborescenceDeMessages: ArborescenceDeMessages[]
}

export type ArborescenceDeMessages = { messageInitial: Constructor<Message>, messagesSuivants: Constructor<Message>[] }

export default class BoundedContext implements IBoundedContext {
  public readonly ubiquitousLanguage: string[] = []
  public readonly questions: NomDELElementEtSonContenu[] = []
  public readonly modelesDeLecture: NomDELElementEtSonContenu[] = []
  public readonly commandes: NomDELElementEtSonContenu[] = []
  public readonly evenementsDuDomaine: NomDELElementEtSonContenu[] = []

  public constructor(
    public readonly nom: string,
    public readonly description: string,
    public readonly classificationStrategique: ClassificationStrategique,
    public readonly rolesDuDomaine: Array<RoleDuDomaine>,
    public readonly arborescenceDeMessages: ArborescenceDeMessages[],
    public readonly cheminVersLaRacineDuBoundedContext: string,
  ) {
    const elements = BoundedContext.listerLesElementsDuBoundedContext(cheminVersLaRacineDuBoundedContext)
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
    const repositories = recupererLeDetailDeLElementPourLeType(classes, 'Repository')
    const ubiquitousLanguage = [...agregats, ...entites, ...valueObjects, ...repositories].map(c => c.nom)
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
    const projet = new Project({ tsConfigFilePath: resolve(__dirname, '../../..', 'tsconfig.json') })
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

export type NomDELElementEtSonContenu = { nom: string, contenu: string }

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
