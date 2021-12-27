import ModeleDeLecture from './modele-de-lecture'
import Question from './question'

export default interface GestionnaireDeQuestion<Q extends Question, R extends ModeleDeLecture> {
  executer(q: Q): R
  ecoute(q: Question): boolean
}
