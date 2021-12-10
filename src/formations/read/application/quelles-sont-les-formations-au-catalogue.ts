import { GestionnaireDeQuestion } from '../../../building-blocks/gestionnaire-de-question'
import { Question } from '../../../building-blocks/question'
import { FormationsAuCatalogue } from '../domain/modele-de-lecture/formations-au-catalogue'
import { CatalogueDeFormations } from '../domain/repository/catalogue-de-formations'

export class QuellesSontLesFormationsAuCatalogue implements Question {
  public readonly nom = 'QUELLES_SONT_LES_FORMATIONS_AU_CATALOGUE'
}

export class GestionnaireDeQuellesSontLesFormationsAuCatalogue
  implements GestionnaireDeQuestion<QuellesSontLesFormationsAuCatalogue, FormationsAuCatalogue> {

  constructor(
    private readonly catalogue: CatalogueDeFormations
  ) {
  }

  public executer(q: QuellesSontLesFormationsAuCatalogue): FormationsAuCatalogue {
    return this.catalogue.lister()
  }
}
