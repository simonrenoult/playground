import Commande from '../../../building-blocks/write/commande'
import GestionnaireDeCommande from '../../../building-blocks/write/gestionnaire-de-commande'
import { CodeDeFormation, DureeDeFormation, Formation } from '../domain/entite/formation'
import FormationCreee from '../domain/evenement/formation-creee'
import { CatalogueDeFormations } from '../domain/repository/catalogue-de-formations'

export class FormationACreer implements Commande {
  public readonly nom: string = 'FORMATION_A_CREER'

  constructor(
    public readonly code: string,
    public readonly dureeEnHeures: number
  ) {
  }
}

export class CreerUneFormation implements GestionnaireDeCommande<FormationACreer, FormationCreee> {
  constructor(
    private readonly formations: CatalogueDeFormations
  ) {
  }

  public executer(formationACreer: FormationACreer): FormationCreee {
    const formation = new Formation(
      new CodeDeFormation(formationACreer.code),
      new DureeDeFormation(formationACreer.dureeEnHeures)
    )
    this.formations.persister(formation)
    return new FormationCreee(formation.code, formation.dureeEnHeures)
  }

  public ecoute(c: Commande): boolean {
    return c instanceof FormationACreer
  }
}
