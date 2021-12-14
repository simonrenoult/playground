import { Redis } from 'ioredis'
import FormationsAuCatalogue from '../../domain/modele-de-lecture/formations-au-catalogue'
import CatalogueDeFormations from '../../domain/projection/catalogue-de-formations'

export class CatalogueDeFormationsRedis implements CatalogueDeFormations {

  constructor(
    private readonly redis: Redis
  ) {
  }

  public lister(): FormationsAuCatalogue {
    // @ts-ignore
    const formationsBrutes = await this.redis.get('formations')
    return formationsBrutes ? JSON.parse(formationsBrutes) : []
  }
}
