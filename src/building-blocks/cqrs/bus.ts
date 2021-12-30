import Message from './message'
import Intercepteur from "./intercepteur";
import GestionnaireDeMessage from "./gestionnaire-de-message";

export default interface Bus<M extends Message, Resultat> {
  enregistrerIntercepteur(i: Intercepteur<M>): void
  enregistrerGestionnaire(g: GestionnaireDeMessage<M, Resultat>): void
  publier(m: M): Resultat
}
