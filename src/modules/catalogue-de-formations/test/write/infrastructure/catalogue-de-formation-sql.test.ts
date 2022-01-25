import CatalogueDeFormationsSql from "../../../write/infrastructure/repository/catalogue-de-formations-sql";
import { describe, it } from "mocha";
import { expect } from "chai";
import { Fixtures } from "../../fixtures";
import { initialiserLaBaseDeDonneesDeTest } from "../../utils";
import { CodeDeFormation } from "../../../write/domain/code-de-formation";

describe(CatalogueDeFormationsSql.name, () => {
  it("permet de lire un agrégat après avoir été persisté", async () => {
    // Given
    const client = await initialiserLaBaseDeDonneesDeTest();
    const repo = new CatalogueDeFormationsSql(client);
    const formation = Fixtures.uneFormation();
    await repo.persister(formation);

    // When
    const actual = await repo.parId(new CodeDeFormation(formation.id.valeur));

    // Then
    expect(actual.equals(formation)).to.be.true;
  });
});
