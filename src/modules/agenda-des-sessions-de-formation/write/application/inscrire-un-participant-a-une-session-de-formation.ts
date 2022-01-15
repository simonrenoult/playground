import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class InscrireUnParticipantAUneSessionDeFormation
  implements Commande
{
  public readonly nom = InscrireUnParticipantAUneSessionDeFormation.name;

  public constructor(
    public readonly emailParticipant: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {}
}
