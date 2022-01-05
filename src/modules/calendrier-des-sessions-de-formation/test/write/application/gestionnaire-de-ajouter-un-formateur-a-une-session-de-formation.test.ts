import { ulid } from "ulid";
import { describe, it } from "mocha";
import { expect } from "chai";
import AjouterUnFormateurAUneSessionDeFormation from "../../../write/application/ajouter-un-formateur-a-une-session-de-formation";
import { FormateurAjouteALaSessionDeFormation } from "../../../write/domain/evenement/formateur-ajoute-a-la-session-de-formation";
import { SessionsDeFormationEnMemoire } from "../sessions-de-formation-en-memoire";
import GestionnaireDeAjouterUnFormateurAUneSessionDeFormation from "../../../write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-a-une-session-de-formation";
import { Fixtures } from "../../fixtures";

describe("AjouterUnFormateurAUneSessionDeFormation", () => {
  it("ajoute un formateur à la session de formation", async () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire();
    const stafferUneSessionDeFormation =
      new GestionnaireDeAjouterUnFormateurAUneSessionDeFormation(
        sessionsDeFormationEnMemoire
      );
    const emailFormateur = "qux@example.com";
    const idSessionDeSessionDeFormation = ulid();
    await sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    );
    const sessionDeFormationAStaffer =
      new AjouterUnFormateurAUneSessionDeFormation(
        emailFormateur,
        idSessionDeSessionDeFormation
      );

    // When
    await stafferUneSessionDeFormation.executer(sessionDeFormationAStaffer);

    // Then
    const [sessionDeFormation] = sessionsDeFormationEnMemoire.lister();
    expect(sessionDeFormation.formateurs).to.have.length(1);
  });

  it("retourne un évènement de staffing d'un formateur à la session de formation", async () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire();
    const stafferUneSessionDeFormation =
      new GestionnaireDeAjouterUnFormateurAUneSessionDeFormation(
        sessionsDeFormationEnMemoire
      );
    const emailFormateur = "qux@example.com";
    const idSessionDeSessionDeFormation = ulid();
    await sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    );
    const sessionDeFormationAStaffer =
      new AjouterUnFormateurAUneSessionDeFormation(
        emailFormateur,
        idSessionDeSessionDeFormation
      );

    // When
    const evenement = await stafferUneSessionDeFormation.executer(
      sessionDeFormationAStaffer
    );

    // Then
    expect(evenement).to.be.an.instanceOf(FormateurAjouteALaSessionDeFormation);
  });
});
