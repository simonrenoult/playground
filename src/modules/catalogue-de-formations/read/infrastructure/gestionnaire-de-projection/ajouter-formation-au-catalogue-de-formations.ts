import { Redis } from 'ioredis'
import GestionnaireDEvenementDuDomaine from '../../../../../building-blocks/cqrs/gestionnaire-d-evenement-du-domaine'
import EvenementDuDomaine from '../../../../../building-blocks/cqrs/evenement'
import FormationCreee from '../../../write/domain/evenement/formation-creee'

export class AjouterFormationAuCatalogueDeFormations implements GestionnaireDEvenementDuDomaine<FormationCreee> {
  private readonly CLE_REDIS = 'formations'

  constructor(
    private readonly redis: Redis
  ) {
  }

  public execute(e: FormationCreee): void {
    // @ts-ignore
    const formations = (await this.redis.get(this.CLE_REDIS)) || []
    this.redis.set(this.CLE_REDIS, [...formations, e.codeFormation])
  }

  public ecoute(e: EvenementDuDomaine): boolean {
    return e instanceof FormationCreee
  }
}
