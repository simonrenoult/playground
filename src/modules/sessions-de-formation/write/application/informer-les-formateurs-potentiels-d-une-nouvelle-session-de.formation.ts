import EvenementDuDomaine from '../../../../building-blocks/cqrs/evenement'
import GestionnaireDEvenementDuDomaine from '../../../../building-blocks/cqrs/gestionnaire-d-evenement-du-domaine'
import Email from '../../../shared-kernel/email'
import { SessionDeFormationCreee } from '../domain/evenement/session-de-formation-creee'
import { CatalogueDeFormations } from '../domain/gateway/formation'
import { Notifieur } from '../domain/gateway/notifieur'

export default class InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation implements GestionnaireDEvenementDuDomaine<SessionDeFormationCreee> {
  constructor(
    private readonly portailVersLeCatalogueDeFormations: CatalogueDeFormations,
    private readonly notifieur: Notifieur
  ) {
  }

  public execute(e: SessionDeFormationCreee): void {
    const formation = this.portailVersLeCatalogueDeFormations.chercherFormationParCode(e.codeFormation)
    formation.formateurs.forEach((f) => {
      this.notifieur.notifier(new Email(f.email))
    })
  }

  public ecoute(e: EvenementDuDomaine): boolean {
    return e instanceof SessionDeFormationCreee
  }
}
