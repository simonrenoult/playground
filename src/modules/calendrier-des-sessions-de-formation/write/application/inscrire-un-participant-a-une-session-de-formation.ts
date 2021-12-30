import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class InscrireUnParticipantAUneSessionDeFormation
  implements Commande
{
  public readonly nom = "INSCRIRE_UN_PARTICIPANT_A_UNE_SESSION_DE_FORMATION";

  constructor(
    public readonly emailParticipant: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {}
}
