import { describe, it } from "mocha";
import { expect } from "chai";
import GestionnaireDeAjouterUnFormateurPotentielALaFormation from "../../../write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation";
import { FormateurPotentiel } from "../../../write/domain/entite/formation";
import { FormateurPotentielAjouteALaFormation } from "../../../write/domain/evenement/formateur-potentiel-ajoute-a-la.formation";
import Email from "../../../../shared-kernel/email";
import CatalogueDeFormationsEnMemoire from "../../../write/infrastructure/repository/catalogue-de-formations-en-memoire";
import AjouterUnFormateurPotentielALaFormation from "../../../write/application/ajouter-un-formateur-potentiel-a-la-formation";
import { Fixtures } from "../../fixtures";

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
    await formations.persister(Fixtures.uneFormation());
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
