import { describe, it } from "mocha";
import { expect } from "chai";
import QuellesSontLesFormationsAuCatalogue from "../../../read/application/quelles-sont-les-formations-au-catalogue";
import CatalogueDeFormationsEnMemoire from "../catalogue-de-formations-en-memoire";
import GestionnaireDeQuellesSontLesFormationsAuCatalogue from "../../../read/application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue";

describe("QuellesSontLesFormationsAuCatalogue", () => {
  it("liste les formations au catalogue", async () => {
    // Given
    const quellesSontLesFormationsAuCatalogue =
      new QuellesSontLesFormationsAuCatalogue();
    const catalogueEnMemoire = new CatalogueDeFormationsEnMemoire(["DDD01"]);
    const gestionnaire = new GestionnaireDeQuellesSontLesFormationsAuCatalogue(
      catalogueEnMemoire
    );

    // When
    const formations = await gestionnaire.executer(
      quellesSontLesFormationsAuCatalogue
    );

    // Then
    expect(formations).to.have.length(1);
  });
});
