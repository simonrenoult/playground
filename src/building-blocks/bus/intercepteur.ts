import ResultatDeLIntercepteur from './resultat-de-l-intercepteur'

export default interface Intercepteur {
  executer(r: ResultatDeLIntercepteur): ResultatDeLIntercepteur
}
