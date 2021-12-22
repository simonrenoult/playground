# 2. Séparation des écritures et des lectures

Date: 2021-12-22

## Statut

Accepté

## Contexte

Le projet `ocac-formations` a été créé avant tout comme un terrain d'apprentissage.
La distinction des écritures et des lectures, telles que décrites par le pattern d'architecture CQRS,
est un domaine dans lequel je souhaite progresser.

## Décision

Nous utiliserons le pattern CQRS dans ce bounded-context afin d'explorer les possibilités qu'il offre.

## Conséquences

Le `bounded-context` (voir ADR#3) sera divisé en un répertoire `read` et un autre `write` afin de rendre évidente cette distinction.
La synchronisation des données entre `write` et `read` se fera par `eventual consistency` au travers des messages émis
par la partie `write` et écoutés par la partie `read`.
