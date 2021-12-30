import FormationsAuCatalogue from '../../domain/modele-de-lecture/formations-au-catalogue'
import CatalogueDeFormations from '../../domain/projection/catalogue-de-formations'
import Question from '../../../../../building-blocks/cqrs/read/question'
import QuellesSontLesFormationsAuCatalogue from '../quelles-sont-les-formations-au-catalogue'
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";

export default class GestionnaireDeQuellesSontLesFormationsAuCatalogue
  implements GestionnaireDeMessage<QuellesSontLesFormationsAuCatalogue, FormationsAuCatalogue> {

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
