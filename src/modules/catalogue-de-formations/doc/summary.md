# Catalogue de formations

> Liste de toutes les formations proposées.

| [Domain][strategic_classification] | [Business model][strategic_classification] | [Evolution][strategic_classification] | [Rôles][domain_roles] |
| ---------------------------------- | ------------------------------------------ | ------------------------------------- | --------------------- |
| SUPPORTING                         | COST_REDUCTION                             | PRODUCT                               | DRAFT                 |

## [Questions][cqrs]

<details>
<summary>QuellesSontLesFormationsAuCatalogue</summary>

```ts
export default class QuellesSontLesFormationsAuCatalogue implements Question {
  public readonly nom = "QUELLES_SONT_LES_FORMATIONS_AU_CATALOGUE";
}
```

</details>

## [Modèles de lecture][read_model]

<details>
<summary>FormationsAuCatalogue</summary>

```ts
export default interface FormationsAuCatalogue
  extends ModeleDeLecture,
    Array<string> {}
```

</details>

## [Commandes][command]

<details>
<summary>AjouterUnFormateurPotentielALaFormation</summary>

```ts
export default class AjouterUnFormateurPotentielALaFormation
  implements Commande
{
  public readonly nom = "AJOUTER_UN_FORMATEUR_POTENTIEL_A_LA_FORMATION";

  constructor(
    public readonly emailFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {}
}
```

</details>
<details>
<summary>CreerUneFormation</summary>

```ts
export default class CreerUneFormation implements Commande {
  public readonly nom: string = "CREER_UNE_FORMATION";

  constructor(
    public readonly code: string,
    public readonly dureeEnHeures: number
  ) {}
}
```

</details>

## [Évènements du domaine][domain_event]

<details>
<summary>FormateurPotentielAjouteALaFormation</summary>

```ts
export class FormateurPotentielAjouteALaFormation
  implements EvenementDuDomaine
{
  public readonly nom = "FORMATEUR_POTENTIEL_AJOUTE_A_LA_FORMATION";

  constructor(
    public readonly idFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {}
}
```

</details>
<details>
<summary>FormationCreee</summary>

```ts
export default class FormationCreee implements EvenementDuDomaine {
  public readonly nom = "FORMATION_CREEE";

  constructor(
    public readonly codeFormation: string,
    public readonly dureeEnHeures: number
  ) {}
}
```

</details>

## [Ubiquitous Language][ubiquitous_language]

- CatalogueDeFormations
- CodeDeFormation
- DureeDeFormation
- FormateurPotentiel
- Formation

[strategic_classification]: https://github.com/ddd-crew/bounded-context-canvas#strategic-classification
[cqrs]: https://www.martinfowler.com/bliki/CQRS.html
[read_model]: https://matthiasnoback.nl/2018/01/simple-cqrs-reduce-coupling-allow-the-model-to-evolve/
[domain_roles]: https://github.com/ddd-crew/bounded-context-canvas#domain-roles
[command]: https://refactoring.guru/design-patterns/command
[domain_event]: https://www.martinfowler.com/eaaDev/DomainEvent.html
[ubiquitous_language]: https://github.com/ddd-crew/bounded-context-canvas#ubiquitous-language
