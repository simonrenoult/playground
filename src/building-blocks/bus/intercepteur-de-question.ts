import ResultatDeLIntercepteurDeQuestion from './resultat-de-l-intercepteur-de-question'

export default interface IntercepteurDeQuestion {
  executer(r: ResultatDeLIntercepteurDeQuestion): ResultatDeLIntercepteurDeQuestion
}
