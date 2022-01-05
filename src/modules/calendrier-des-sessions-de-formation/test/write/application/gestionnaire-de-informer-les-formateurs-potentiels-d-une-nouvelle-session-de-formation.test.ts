import { describe, it } from "mocha";
import { expect } from "chai";
import InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation from "../../../write/application/informer-les-formateurs-potentiels-d-une-nouvelle-session-de.formation";
import { NotifieurEnMemoire } from "../../notifieur-en-memoire";
import { CatalogueDeFormationsGatewayEnMemoire } from "../../catalogue-de-formations-gateway-en-memoire";
import { Fixtures } from "../../fixtures";

describe("GestionnaireDeInformerLesFormateursPotentielsDUneNouvelleSessionDeFormation", () => {
  it("fait le boulot", async () => {
    // Given
    const notifieurEnMemoire = new NotifieurEnMemoire();
    const portailVersLeCatalogueDeFormationEnMemoire =
      new CatalogueDeFormationsGatewayEnMemoire();
    const informerLesFormateursPotentielsDUneNouvelleSessionDeFormation =
      new InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation(
        portailVersLeCatalogueDeFormationEnMemoire,
        notifieurEnMemoire
      );

    // When
    await informerLesFormateursPotentielsDUneNouvelleSessionDeFormation.executer(
      Fixtures.uneSessionDeFormationCreee()
    );

    // Then
    expect(notifieurEnMemoire.emailsNotifies).to.deep.equal([
      "tom@example.com",
    ]);
  });
});
