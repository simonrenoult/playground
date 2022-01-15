import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export class ParticipantInscritALaSessionDeFormation
  implements EvenementDuDomaine
{
  public readonly nom = ParticipantInscritALaSessionDeFormation.name;

  public constructor(
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string,
    public readonly idParticipant: string
  ) {}
}
