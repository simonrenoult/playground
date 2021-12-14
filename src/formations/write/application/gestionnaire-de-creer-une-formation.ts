import Commande from '../../../building-blocks/write/commande'
import GestionnaireDeCommande from '../../../building-blocks/write/gestionnaire-de-commande'
import { CodeDeFormation, DureeDeFormation, Formation } from '../domain/entite/formation'
import FormationCreee from '../domain/evenement/formation-creee'
import { CatalogueDeFormations } from '../domain/repository/catalogue-de-formations'

export class CreerUneFormation implements Commande {
  public readonly nom: string = 'CREER_UNE_FORMATION'

  constructor(
    public readonly code: string,
    public readonly dureeEnHeures: number
  ) {
  }
}

export class GestionnaireDeCreerUneFormation implements GestionnaireDeCommande<CreerUneFormation, FormationCreee> {
  constructor(
    private readonly formations: CatalogueDeFormations
  ) {
  }

  public executer(formationACreer: CreerUneFormation): FormationCreee {
    const formation = new Formation(
      new CodeDeFormation(formationACreer.code),
      new DureeDeFormation(formationACreer.dureeEnHeures)
    )
    this.formations.persister(formation)
    return new FormationCreee(formation.id.valeur, formation.dureeEnHeures)
  }

  public ecoute(c: Commande): boolean {
    return c instanceof CreerUneFormation
  }
}
