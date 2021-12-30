# {{ nom }}

> {{ description }}

| [Domain][strategic_classification] | [Business model][strategic_classification] | [Evolution][strategic_classification] | [Rôles][domain_roles] |
| ---------------------------------- | ------------------------------------------ | ------------------------------------- | --------------------- |
| {{ domain }}                       | {{ businessModel }}                        | {{ evolution }}                       | {{ rolesDuDomaine }}  |

## [Questions][cqrs]

{{ questions }}

## [Modèles de lecture][read_model]

{{ modelesDeLecture }}

## [Commandes][command]

{{ commandes }}

## [Évènements du domaine][domain_event]

{{ evenementsDuDomaine }}

## [Ubiquitous Language][ubiquitous_language]

{{ ubiquitousLanguage }}

[strategic_classification]: https://github.com/ddd-crew/bounded-context-canvas#strategic-classification
[cqrs]: https://www.martinfowler.com/bliki/CQRS.html
[read_model]: https://matthiasnoback.nl/2018/01/simple-cqrs-reduce-coupling-allow-the-model-to-evolve/
[domain_roles]: https://github.com/ddd-crew/bounded-context-canvas#domain-roles
[command]: https://refactoring.guru/design-patterns/command
[domain_event]: https://www.martinfowler.com/eaaDev/DomainEvent.html
[ubiquitous_language]: https://github.com/ddd-crew/bounded-context-canvas#ubiquitous-language
