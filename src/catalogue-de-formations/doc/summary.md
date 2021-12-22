# Catalogue de formations

> Liste de toutes les formations proposées par OCAC

| Domain       | Business model      | Evolution       | Rôles                |
|--------------|---------------------|-----------------|----------------------|
| SUPPORTING | COST_REDUCTION | PRODUCT | DRAFT |

## Questions

<details>
<summary>QuellesSontLesFormationsAuCatalogue</summary>


```ts
export class QuellesSontLesFormationsAuCatalogue implements Question {
  public readonly nom = 'QUELLES_SONT_LES_FORMATIONS_AU_CATALOGUE'
}
```



</details>

## Modèles de lecture

<details>
<summary>FormationsAuCatalogue</summary>


```ts
export default interface FormationsAuCatalogue extends ModeleDeLecture, Array<string> {
}
```



</details>

## Commandes

<details>
<summary>AjouterUnFormateurPotentielALaFormation</summary>


```ts
export class AjouterUnFormateurPotentielALaFormation implements Commande {
  public readonly nom = 'AJOUTER_UN_FORMATEUR_POTENTIEL_A_LA_FORMATION'

  constructor(
    public readonly emailFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {
  }
}
```



</details>
<details>
<summary>CreerUneFormation</summary>


```ts
export class CreerUneFormation implements Commande {
  public readonly nom: string = 'CREER_UNE_FORMATION'

  constructor(
    public readonly code: string,
    public readonly dureeEnHeures: number
  ) {
  }
}
```



</details>

## Évènements du domaine

<details>
<summary>FormateurPotentielAjouteALaFormation</summary>


```ts
export class FormateurPotentielAjouteALaFormation implements EvenementDuDomaine {
  public readonly nom = 'FORMATEUR_POTENTIEL_AJOUTE_A_LA_FORMATION'

  constructor(
    public readonly idFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {
  }
}
```



</details>
<details>
<summary>FormationCreee</summary>


```ts
export default class FormationCreee implements EvenementDuDomaine {
  public readonly nom = 'FORMATION_CREEE'

  constructor(
    public readonly codeFormation: string,
    public readonly dureeEnHeures: number
  ) {
  }
}
```



</details>

## Ubiquitous Language

- CodeDeFormation
- DureeDeFormation
- FormateurPotentiel
- Formation
