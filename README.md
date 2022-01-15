# Formations

## Getting started

```sh
$ npm ci
$ npm test
```

## TODO

### Domaines

- Un domaine d'analytics/statistiques

### DDD

- [x] Appliquer les patterns tactiques (agrégats, entités, value-objects, repositories)
- [x] Appliquer les patterns stratégiques (bounded-contexts, ubiquitous language)
- [x] Identifier l'ubiquitous language
- Générer la context map

### Infrastructure

- [x] Exposer sur une API
- [x] HATEOAS
- [x] Swagger
- [x] Implémenter la persistence
- [x] Implémenter un injecteur de dépendances
- Définir la ci/cd
- Dockeriser l'application
- Déployer quelque part
- Chemins absolus plutôt que relatifs pour les imports
- Correlation-id
- RabbitsMQ pour le messaging entre composants
- Log
- Configuration/Environnement

### Architecture

- [x] Distinguer read/write
- [x] Faire de la clean architecture
- [x] Modulariser le monolithe en s'appuyant sur les bounded contexts
- [x] Déléguer aux modules/bounded-context l'enregistrement des apis, gestionnaires, etc.
- Implémenter de l'event sourcing
- Persistence des messages/piste de log
- Optimistic concurrency
- Versionner les agrégats
- Script vérifiant la clean archi
- Script vérifiant l'indépendance read/write
- Script vérifiant l'indépendance des bounded contexts

### Pattern

- [x] Implémenter le pattern memento
- [x] Implémenter le pattern factory
- Implémenter le pattern Result

### Living documentation

- [x] Générer la documentation du bounded context
- [x] Faire des liens dans le summary vers la doc des patterns
- [x] Générer des `visites`
- Générer le C4 context
- Générer un site statique de documentation
- Générer un BC Canva
- Associer les commandes aux évènements émis
- Associer les questions aux modèles de lecture
- Identifier les communications entrantes et sortantes inbound/outbound (
  voir : https://github.com/ddd-crew/bounded-context-canvas#inbound-communication)

### Tests

- [x] Gherkin
