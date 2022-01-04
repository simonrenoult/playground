import { describe, it } from "mocha";
import { expect } from "chai";
import InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation from "../../../../src/modules/calendrier-des-sessions-de-formation/write/application/informer-les-formateurs-potentiels-d-une-nouvelle-session-de.formation";
import { Fixtures } from "../../../fixtures";
import { NotifieurEnMemoire } from "../../notifieur-en-memoire";
import { PortailVersLeCatalogueDeFormationEnMemoire } from "../../portail-vers-le-catalogue-de-formation-en-memoire";

describe("GestionnaireDeInformerLesFormateursPotentielsDUneNouvelleSessionDeFormation", () => {
  it("fait le boulot", async () => {
    // Given
    const notifieurEnMemoire = new NotifieurEnMemoire();
    const portailVersLeCatalogueDeFormationEnMemoire =
      new PortailVersLeCatalogueDeFormationEnMemoire();
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
      "foo@example.com",
    ]);
  });
});
