import QuellesSontLesFormationsAuCatalogue from "../read/application/quelles-sont-les-formations-au-catalogue";
import CreerUneFormation from "../write/application/creer-une-formation";
import AjouterUnFormateurPotentielALaFormation from "../write/application/ajouter-un-formateur-potentiel-a-la-formation";
import { AssociationMessageEtHttp } from "../../../building-blocks/hateoas/association-message-et-http";

const associationMessageEtHttp: AssociationMessageEtHttp[] = [
  {
    message: QuellesSontLesFormationsAuCatalogue,
    method: "GET",
    href: "/formations",
  },
  {
    message: CreerUneFormation,
    method: "POST",
    href: "/formations",
  },
  {
    message: AjouterUnFormateurPotentielALaFormation,
    method: "POST",
    href: "/formations/:id/formateurs",
  },
];

export default associationMessageEtHttp;
