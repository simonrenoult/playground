import { describe, it } from "mocha";
import { expect } from "chai";
import CalendrierDesSessionsDeFormationEnMemoire from "../calendrier-des-sessions-de-formation-en-memoire";
import QuellesSontLesSessionsDeFormationAVenir from "../../../read/application/quelles-sont-les-sessions-de-formation-a-venir";
import { GestionnaireDeQuellesSontLesSessionsDeFormationAVenir } from "../../../read/application/gestionnaire/gestionnaire-de-quelles-sont-les-sessions-de-formation-a-venir";
import { HorlogeEnMemoire } from "../../horloge-en-memoire";

describe("QuellesSontLesSessionsDeFormationAVenir", () => {
  it("liste les sessions de formation futures", async () => {
    // Given
    const quellesSontLesSessionsDeFormationAVenir =
      new QuellesSontLesSessionsDeFormationAVenir();
    const horloge = new HorlogeEnMemoire("01-01-2020");
    const calendrier = new CalendrierDesSessionsDeFormationEnMemoire();
    const gestionnaire =
      new GestionnaireDeQuellesSontLesSessionsDeFormationAVenir(
        horloge,
        calendrier
      );

    // When
    const formations = await gestionnaire.executer(
      quellesSontLesSessionsDeFormationAVenir
    );

    // Then
    expect(formations).to.have.length(1);
  });
});
