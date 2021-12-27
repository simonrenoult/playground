import Question from './question'
import IntercepteurDeQuestion from './intercepteur-de-question'
import ResultatDeLIntercepteurDeQuestion from './resultat-de-l-intercepteur-de-question'
import ModeleDeLecture from './modele-de-lecture'
import Bus from '../bus'

export default class BusDeQuestion implements Bus<Question, ModeleDeLecture> {
  constructor(
    private readonly intercepteurs: IntercepteurDeQuestion[] = []
  ) {
  }

  public publier<M extends ModeleDeLecture>(question: Question): M {
    let resultatDeLIntercepteur: ResultatDeLIntercepteurDeQuestion = { question, modeleDeLecture: undefined }
    for (const intercepteur of this.intercepteurs) {
      resultatDeLIntercepteur = intercepteur.executer(resultatDeLIntercepteur)
    }
    return resultatDeLIntercepteur.modeleDeLecture as M
  }
}
