import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export class ParticipantInscritALaSessionDeFormation
  implements EvenementDuDomaine
{
  public readonly nom = "PARTICIPANT_INSCRIT_A_LA_SESSION_DE_FORMATION";

  constructor(
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string,
    public readonly idParticipant: string
  ) {}
}
