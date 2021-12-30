import BoundedContext, {
  BusinessModel,
  Domain,
  Evolution,
  RoleDuDomaine,
} from "../../building-blocks/ddd/bounded-context";
import QuellesSontLesFormationsAuCatalogue from "./read/application/quelles-sont-les-formations-au-catalogue";
import CreerUneFormation from "./write/application/creer-une-formation";
import AjouterUnFormateurPotentielALaFormation from "./write/application/ajouter-un-formateur-potentiel-a-la-formation";

export default new BoundedContext(
  "Catalogue de formations",
  "Liste de toutes les formations proposées.",
  {
    domain: Domain.SUPPORTING,
    businessModel: BusinessModel.COST_REDUCTION,
    evolution: Evolution.PRODUCT,
  },
  [RoleDuDomaine.DRAFT],
  [
    {
      messageInitial: QuellesSontLesFormationsAuCatalogue,
      messagesSuivants: [CreerUneFormation],
    },
    {
      messageInitial: CreerUneFormation,
      messagesSuivants: [AjouterUnFormateurPotentielALaFormation],
    },
  ],
  __dirname
);
