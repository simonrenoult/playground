import { ulid } from "ulid";
import { describe, it } from "mocha";
import { expect } from "chai";
import InscrireUnParticipantAUneSessionDeFormation from "../../../write/application/inscrire-un-participant-a-une-session-de-formation";
import { ParticipantInscritALaSessionDeFormation } from "../../../write/domain/evenement/participant-inscrit-a-la-session-de-formation";
import { SessionsDeFormationEnMemoire } from "../sessions-de-formation-en-memoire";
import GestionnaireDeInscrireUnParticipantAUneSessionDeFormation from "../../../write/application/gestionnaire/gestionnaire-de-inscrire-un-participant-a-une-session-de-formation";
import { Fixtures } from "../../fixtures";

describe("SInscrireAUneSessionDeFormation", () => {
  it("ajoute un participant à la session de formation", async () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire();
    const sInscrireAUneSessionDeFormation =
      new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(
        sessionsDeFormationEnMemoire
      );
    const emailParticipant = "foo@bar.com";
    const idSessionDeSessionDeFormation = ulid();
    await sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    );
    const inscriptionALaSessionDeFormation =
      new InscrireUnParticipantAUneSessionDeFormation(
        emailParticipant,
        idSessionDeSessionDeFormation
      );

    // When
    await sInscrireAUneSessionDeFormation.executer(
      inscriptionALaSessionDeFormation
    );

    // Then
    const [sessionDeFormation] = sessionsDeFormationEnMemoire.lister();
    expect(sessionDeFormation.participants).to.have.length(1);
  });

  it("retourne un évènement d'inscription à la session", async () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire();
    const sInscrireAUneSessionDeFormation =
      new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(
        sessionsDeFormationEnMemoire
      );
    const emailParticipant = "foo@bar.com";
    const idSessionDeSessionDeFormation = ulid();
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    );
    const inscriptionALaSessionDeFormation =
      new InscrireUnParticipantAUneSessionDeFormation(
        emailParticipant,
        idSessionDeSessionDeFormation
      );

    // When
    const evenement = await sInscrireAUneSessionDeFormation.executer(
      inscriptionALaSessionDeFormation
    );

    // Then
    expect(evenement).to.be.an.instanceOf(
      ParticipantInscritALaSessionDeFormation
    );
  });
});
