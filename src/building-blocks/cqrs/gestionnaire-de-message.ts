import Message from "./message";

export default interface GestionnaireDeMessage<M extends Message, ResultatDuGestionnaire> {
  executer(m: M): ResultatDuGestionnaire
  ecoute(m: M): boolean
}
