# Sessions de formation

> Création, modification, suppression et consultation des sessions de formations planifiées à partir du catalogue.

| Domain       | Business model      | Evolution       | Rôles                |
|--------------|---------------------|-----------------|----------------------|
| CORE | COST_REDUCTION | PRODUCT | EXECUTION |

## Questions



## Commandes

<details>
<summary>AjouterUnFormateurAUneSessionDeFormation</summary>


```ts
export class AjouterUnFormateurAUneSessionDeFormation implements Commande {
  public readonly nom = 'AJOUTER_UN_FORMATEUR_A_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly emailFormateur: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {
  }
}
```



</details>
<details>
<summary>CreerUneSessionDeFormation</summary>


```ts
export class CreerUneSessionDeFormation implements Commande {
  public readonly nom = 'CREER_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}
```



</details>
<details>
<summary>InscrireUnParticipantAUneSessionDeFormation</summary>


```ts
export class InscrireUnParticipantAUneSessionDeFormation implements Commande {
  public readonly nom = 'INSCRIRE_UN_PARTICIPANT_A_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly emailParticipant: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {
  }
}
```



</details>

## Évènements du domaine

<details>
<summary>FormateurAjouteALaSessionDeFormation</summary>


```ts
export class FormateurAjouteALaSessionDeFormation implements EvenementDuDomaine {
  public readonly nom = 'FORMATEUR_AJOUTE_A_LA_SESSION_DE_FORMATION'

  constructor(
    public readonly idFormateur: string,
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string
  ) {
  }
}
```



</details>
<details>
<summary>ParticipantInscritALaSessionDeFormation</summary>


```ts
export class ParticipantInscritALaSessionDeFormation implements EvenementDuDomaine {
  public readonly nom = 'PARTICIPANT_INSCRIT_A_LA_SESSION_DE_FORMATION'

  constructor(
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string,
    public readonly idParticipant: string
  ) {
  }
}
```



</details>
<details>
<summary>SessionDeFormationCreee</summary>


```ts
export class SessionDeFormationCreee implements EvenementDuDomaine {
  public readonly nom = 'SESSION_DE_FORMATION_PLANIFIEE'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}
```



</details>

## Ubiquitous Language

- SessionDeFormation
- Formateur
- Participant
- CodeDeFormation
- IdSessionDeFormation
