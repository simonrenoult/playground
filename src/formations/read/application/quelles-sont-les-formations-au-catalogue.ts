import { GestionnaireDeQuestion } from '../../../building-blocks/read/gestionnaire-de-question'
import Question from '../../../building-blocks/read/question'
import FormationsAuCatalogue from '../domain/modele-de-lecture/formations-au-catalogue'
import CatalogueDeFormations from '../domain/projection/catalogue-de-formations'

export class QuellesSontLesFormationsAuCatalogue implements Question {
  public readonly nom = 'QUELLES_SONT_LES_FORMATIONS_AU_CATALOGUE'
}

export class GestionnaireDeQuellesSontLesFormationsAuCatalogue
  implements GestionnaireDeQuestion<QuellesSontLesFormationsAuCatalogue, FormationsAuCatalogue> {

  constructor(
    private readonly catalogue: CatalogueDeFormations
  ) {
  }

  public executer(_q: QuellesSontLesFormationsAuCatalogue): FormationsAuCatalogue {
    return this.catalogue.lister()
  }

  ecoute(q: Question): boolean {
    return q instanceof QuellesSontLesFormationsAuCatalogue
  }
}
