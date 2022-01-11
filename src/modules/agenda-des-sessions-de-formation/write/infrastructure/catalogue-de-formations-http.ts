import axios from "axios";
import { CatalogueDeFormations, Formation } from "../domain/gateway/formation";

export default class CatalogueDeFormationsHttp
  implements CatalogueDeFormations
{
  async chercherFormationParCode(code: string): Promise<Formation> {
    const formations = await axios.get<Formation[]>(
      "http://localhost:3000/formations"
    );
    return formations.data.find((f) => f.code === code);
  }
}
