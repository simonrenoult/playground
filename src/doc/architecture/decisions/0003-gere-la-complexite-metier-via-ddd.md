# 3. Gère la complexité métier via le Domain-Driven Design

Date: 2021-12-22

## Statut

Accepté

## Contexte

Ce projet permet de gérer différents éléments associés aux formations.
On sait que ce métier est complexe et ne fera que se complexifier dans le futur.
Au regard de cette complexité croissante, il convient de faire des choix permettant
d'accueillir cette complexité de sorte qu'elle reste gérable malgré son accroissement.

## Décision

Nous utiliserons le Domain-Driven Design.

## Conséquences

- Le métier sera découpé en domaines, modélisés via des `bounded contexts`.
- La typologie des communications entre domaines sera régie par une `context map`.
- Les invariants métiers seront préservés au sein de modèles du domaine appelés `agrégats`.
- Les agrégats seront modélisés comme un assemblage de `value objects` et d'`entités`.
- Les agrégats seront persistés et récupérés via des `repository`.
- L'application sera découpée en une `layered architecture` séparant `application`, `domain` et `infrastructure` (voir ADR#4)
