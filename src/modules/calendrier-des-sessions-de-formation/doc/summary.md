# Calendrier des sessions de formation

> Création, modification, suppression et consultation des sessions de formations planifiées à partir du catalogue.

| [Domain][strategic_classification] | [Business model][strategic_classification] | [Evolution][strategic_classification] | [Rôles][domain_roles] |
| ---------------------------------- | ------------------------------------------ | ------------------------------------- | --------------------- |
| CORE                       | COST_REDUCTION                        | PRODUCT                       | EXECUTION  |

## [Questions][cqrs]

<details>
<summary>QuellesSontLesSessionsDeFormationAVenir</summary>


```ts
export default class QuellesSontLesSessionsDeFormationAVenir
  implements Question
{
  public readonly nom = QuellesSontLesSessionsDeFormationAVenir.name;
}
```



</details>

## [Modèles de lecture][read_model]

<details>
<summary>SessionsDeFormationsFutures</summary>


```ts
export interface SessionsDeFormationsFutures
  extends ModeleDeLecture,
    Array<string> {}
```



</details>

## [Commandes][command]

<details>
<summary>AjouterUnFormateurAUneSessionDeFormation</summary>


```ts
export default class AjouterUnFormateurAUneSessionDeFormation
  implements Commande
{
  public readonly nom = AjouterUnFormateurAUneSessionDeFormation.name;

  constructor(
    public readonly emailFormateur: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {}
}
```



</details>
<details>
<summary>CreerUneSessionDeFormation</summary>


```ts
export default class CreerUneSessionDeFormation implements Commande {
  public readonly nom = CreerUneSessionDeFormation.name;

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {}
}
```



</details>
<details>
<summary>InscrireUnParticipantAUneSessionDeFormation</summary>


```ts
export default class InscrireUnParticipantAUneSessionDeFormation
  implements Commande
{
  public readonly nom = InscrireUnParticipantAUneSessionDeFormation.name;

  constructor(
    public readonly emailParticipant: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {}
}
```



</details>

## [Évènements du domaine][domain_event]

<details>
<summary>FormateurAjouteALaSessionDeFormation</summary>


```ts
export class FormateurAjouteALaSessionDeFormation
  implements EvenementDuDomaine
{
  public readonly nom = FormateurAjouteALaSessionDeFormation.name;

  constructor(
    public readonly idFormateur: string,
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string
  ) {}
}
```



</details>
<details>
<summary>ParticipantInscritALaSessionDeFormation</summary>


```ts
export class ParticipantInscritALaSessionDeFormation
  implements EvenementDuDomaine
{
  public readonly nom = ParticipantInscritALaSessionDeFormation.name;

  constructor(
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string,
    public readonly idParticipant: string
  ) {}
}
```



</details>
<details>
<summary>SessionDeFormationCreee</summary>


```ts
export class SessionDeFormationCreee implements EvenementDuDomaine {
  public readonly nom = SessionDeFormationCreee.name;

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {}
}
```



</details>

## [Ubiquitous Language][ubiquitous_language]

- CodeDeFormation
- Formateur
- IdSessionDeFormation
- Participant
- SessionDeFormation
- SessionsDeFormation

[strategic_classification]: https://github.com/ddd-crew/bounded-context-canvas#strategic-classification
[cqrs]: https://www.martinfowler.com/bliki/CQRS.html
[read_model]: https://matthiasnoback.nl/2018/01/simple-cqrs-reduce-coupling-allow-the-model-to-evolve/
[domain_roles]: https://github.com/ddd-crew/bounded-context-canvas#domain-roles
[command]: https://refactoring.guru/design-patterns/command
[domain_event]: https://www.martinfowler.com/eaaDev/DomainEvent.html
[ubiquitous_language]: https://github.com/ddd-crew/bounded-context-canvas#ubiquitous-language
