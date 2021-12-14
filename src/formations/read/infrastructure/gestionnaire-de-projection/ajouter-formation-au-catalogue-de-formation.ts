import { Redis } from 'ioredis'
import GestionnaireDEvenementDuDomaine from '../../../../building-blocks/gestionnaire-d-evenement-du-domaine'
import FormationCreee from '../../../write/domain/evenement/formation-creee'
import EvenementDuDomaine from '../../../../building-blocks/evenement'

export class AjouterFormationAuCatalogueDeFormation implements GestionnaireDEvenementDuDomaine<FormationCreee> {
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
