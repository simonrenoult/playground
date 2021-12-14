import ResultatDeLIntercepteurDeCommande from './resultat-de-l-intercepteur-de-commande'

export default interface IntercepteurDeCommande {
  executer(r: ResultatDeLIntercepteurDeCommande): ResultatDeLIntercepteurDeCommande
}
