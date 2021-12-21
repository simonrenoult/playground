export default class BoundedContext implements IBoundedContext {
  public readonly questions: Message[] = []
  public readonly commandes: Message[] = []
  public readonly evenementsDuDomaine: Message[] = []
  public readonly ubiquitousLanguage: string[] = []

  constructor(
    public readonly nom: string,
    public readonly description: string,
    public readonly classificationStrategique: ClassificationStrategique,
    public readonly rolesDuDomaine: Array<RoleDuDomaine>,
  ) {
  }

  ajouterQuestions(questions: Message[]): void {
    this.questions.push(...questions)
  }

  ajouterCommandes(commandes: Message[]): void {
    this.commandes.push(...commandes)
  }

  ajouterEvenementsDuDomaine(evenementsDuDomaine: Message[]): void {
    this.evenementsDuDomaine.push(...evenementsDuDomaine)
  }

  ajouterLUbiquitousLanguage(elementsDeLangage: string[]): void {
    this.ubiquitousLanguage.push(...elementsDeLangage)
  }
}

export interface IBoundedContext {
  nom: string
  description: string
  classificationStrategique: ClassificationStrategique
  rolesDuDomaine: Array<RoleDuDomaine>
  questions: Message[]
  commandes: Message[]
  evenementsDuDomaine: Message[]
  ubiquitousLanguage: string[]

  ajouterQuestions(questions: Message[]): void
  ajouterCommandes(commandes: Message[]): void
  ajouterEvenementsDuDomaine(evenementsDuDomaine: Message[]): void
  ajouterLUbiquitousLanguage(elementsDeLangage: string[]): void
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
