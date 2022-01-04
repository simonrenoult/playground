import { describe, it } from "mocha";
import { expect } from "chai";
import { GestionnaireDeAjouterUnFormateurPotentielALaFormation } from "../../../../src/modules/catalogue-de-formations/write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation";
import { FormateurPotentiel } from "../../../../src/modules/catalogue-de-formations/write/domain/entite/formation";
import { FormateurPotentielAjouteALaFormation } from "../../../../src/modules/catalogue-de-formations/write/domain/evenement/formateur-potentiel-ajoute-a-la.formation";
import Email from "../../../../src/modules/shared-kernel/email";
import { Fixtures } from "../../../fixtures";
import CatalogueDeFormationsEnMemoire from "../../../../src/modules/catalogue-de-formations/write/infrastructure/catalogue-de-formations-en-memoire";
import AjouterUnFormateurPotentielALaFormation from "../../../../src/modules/catalogue-de-formations/write/application/ajouter-un-formateur-potentiel-a-la-formation";

describe("AjouterUnFormateurPotentielALaFormation", () => {
  it("persiste la formation avec le formateur potentiel", async () => {
    // Given
    const formations = new CatalogueDeFormationsEnMemoire();
    await formations.persister(Fixtures.uneFormation());
    const ajouterUnFormateurPotentielALaFormation =
      new GestionnaireDeAjouterUnFormateurPotentielALaFormation(formations);
    const commande = new AjouterUnFormateurPotentielALaFormation(
      "foo@example.com",
      "DDD01"
    );

    // When
    await ajouterUnFormateurPotentielALaFormation.executer(commande);

    // Then
    const [formation] = formations.lister();
    expect(formation.formateursPotentiels).to.deep.equal([
      new FormateurPotentiel(new Email("foo@example.com")),
    ]);
  });

  it("retourne un évènement d'ajout d'un formateur principal", async () => {
    // Given
    const formations = new CatalogueDeFormationsEnMemoire();
    formations.persister(Fixtures.uneFormation());
    const ajouterUnFormateurPotentielALaFormation =
      new GestionnaireDeAjouterUnFormateurPotentielALaFormation(formations);
    const commande = new AjouterUnFormateurPotentielALaFormation(
      "foo@example.com",
      "DDD01"
    );

    // When
    const evenement = await ajouterUnFormateurPotentielALaFormation.executer(
      commande
    );

    // Then
    expect(evenement).to.deep.equal(
      new FormateurPotentielAjouteALaFormation("foo@example.com", "DDD01")
    );
  });
});
