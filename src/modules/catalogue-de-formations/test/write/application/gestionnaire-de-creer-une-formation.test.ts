import { describe, it } from "mocha";
import { expect } from "chai";
import { GestionnaireDeCreerUneFormation } from "../../../write/application/gestionnaire/gestionnaire-de-creer-une-formation";
import CatalogueDeFormationsEnMemoire from "../../../write/infrastructure/catalogue-de-formations-en-memoire";
import { CodeDeFormation } from "../../../write/domain/entite/formation";
import { Fixtures } from "../../fixtures";

describe("CreerUneFormation", () => {
  it("persiste une formation", async () => {
    // Given
    const formationACreer = Fixtures.uneFormationACreer();
    const formations = new CatalogueDeFormationsEnMemoire();
    const creerUneFormation = new GestionnaireDeCreerUneFormation(formations);

    // When
    await creerUneFormation.executer(formationACreer);

    // Then
    const [formation] = formations.lister();
    expect(formation.id).to.deep.equal(new CodeDeFormation("DDD01"));
    expect(formation.dureeEnHeures).to.deep.equal(14);
  });

  it("retourne un évènement de création de formation", async () => {
    // Given
    const formationACreer = Fixtures.uneFormationACreer();
    const formations = new CatalogueDeFormationsEnMemoire();
    const creerUneFormation = new GestionnaireDeCreerUneFormation(formations);

    // When
    const evenement = await creerUneFormation.executer(formationACreer);

    // Then
    expect(evenement.codeFormation).to.deep.equal("DDD01");
    expect(evenement.dureeEnHeures).to.deep.equal(14);
  });
});
