import FormationsAuCatalogue from "../modele-de-lecture/formations-au-catalogue";
import { Projection } from "../../../../../building-blocks/cqrs/read/projection";

export default interface CatalogueDeFormations extends Projection {
  lister(): Promise<FormationsAuCatalogue>;

  ajouter(code: string): void;
}
