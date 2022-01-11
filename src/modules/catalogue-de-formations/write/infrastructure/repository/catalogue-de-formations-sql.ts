import { Client } from "pg";
import {
  CodeDeFormation,
  Formation,
  FormationState,
} from "../../domain/entite/formation";
import CatalogueDeFormations from "../../domain/repository/catalogue-de-formations";

class AucuneFormationTrouvee extends Error {
  constructor(public readonly code: CodeDeFormation) {
    super(`Aucun agrégat trouvé avec l'id ${code.valeur}`);
  }
}

// @injectable("catalogueDeFormations")
export default class CatalogueDeFormationsSql implements CatalogueDeFormations {
  constructor(private readonly sqlClient: Client) {}

  public async parId(code: CodeDeFormation): Promise<Formation> {
    const { rowCount, rows } = await this.sqlClient.query<{
      contenu: FormationState;
    }>(
      `SELECT contenu
       FROM catalogue_de_formations.formations
       WHERE formations.id = $1::text`,
      [code.valeur]
    );

    if (rowCount === 0) throw new AucuneFormationTrouvee(code);

    return Formation.fromState(rows[0].contenu);
  }

  public async persister(formation: Formation): Promise<void> {
    await this.sqlClient.query(
      `
        INSERT INTO catalogue_de_formations.formations (id, contenu, date_de_mise_a_jour)
        VALUES ($1, $2, $3)
      `,
      [formation.id.valeur, formation.toState(), new Date()]
    );
  }
}
