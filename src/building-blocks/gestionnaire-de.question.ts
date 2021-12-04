import { ModeleDeLecture } from './modele-de.lecture'
import { Question } from './question'

export interface GestionnaireDeQuestion<Q extends Question, R extends ModeleDeLecture> {
  executer(q: Q): R
}
