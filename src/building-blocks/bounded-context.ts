export default class BoundedContext implements IBoundedContext {
  public readonly questions: string[] = []
  public readonly commandes: string[] = []
  public readonly evenementsDuDomaine: string[] = []
  public readonly ubiquitousLanguage: string[] = []

  constructor(
    public readonly nom: string,
    public readonly description: string,
    public readonly classificationStrategique: ClassificationStrategique,
    public readonly rolesDuDomaine: Array<RoleDuDomaine>,
  ) {
  }

  ajouterQuestions(questions: string[]): void {
    this.questions.push(...questions)
  }

  ajouterCommandes(commandes: string[]): void {
    this.commandes.push(...commandes)
  }

  ajouterEvenementsDuDomaine(evenementsDuDomaine: string[]): void {
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
  questions: string[]
  commandes: string[]
  evenementsDuDomaine: string[]
  ubiquitousLanguage: string[]

  ajouterQuestions(questions: string[]): void
  ajouterCommandes(commandes: string[]): void
  ajouterEvenementsDuDomaine(evenementsDuDomaine: string[]): void
  ajouterLUbiquitousLanguage(elementsDeLangage: string[]): void
}

type ClassificationStrategique = {
  domain: Domain,
  businessModel: BusinessModel,
  evolution: Evolution
}

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
