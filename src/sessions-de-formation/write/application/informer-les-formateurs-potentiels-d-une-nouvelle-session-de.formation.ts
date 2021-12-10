import EvenementDuDomaine from '../../../building-blocks/evenement'
import { GestionnaireDEvenementDuDomaine } from '../../../building-blocks/gestionnaire-d-evenement-du-domaine'
import { Email } from '../../../shared-kernel/email'
import { SessionDeFormationCreee } from '../domain/evenement/session-de-formation-creee'
import { PortailVersLeCatalogueDeFormations } from '../domain/gateway/formation'
import { Notifieur } from '../domain/gateway/notifieur'

export class InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation implements GestionnaireDEvenementDuDomaine<SessionDeFormationCreee> {
  constructor(
    private readonly portailVersLeCatalogueDeFormations: PortailVersLeCatalogueDeFormations,
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
