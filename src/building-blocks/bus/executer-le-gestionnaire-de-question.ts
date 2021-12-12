import IntercepteurDeQuestion from './intercepteur-de-question'
import { GestionnaireDeQuestion } from '../gestionnaire-de-question'
import Question from '../question'
import ModeleDeLecture from '../modele-de-lecture'
import ResultatDeLIntercepteurDeQuestion from './resultat-de-l-intercepteur-de-question'

export default class ExecuterLeGestionnaireDeQuestion implements IntercepteurDeQuestion {
  constructor(
    private readonly gestionnairesDeQuestion: Array<GestionnaireDeQuestion<Question, ModeleDeLecture>> = [],
    private readonly logger: Console
  ) {
  }

  public executer(r: ResultatDeLIntercepteurDeQuestion): ResultatDeLIntercepteurDeQuestion {
    this.logger.info(`${r.question.nom} (question) est en cours d'émission`)
    const gestionnaireDeQuestion = this.gestionnairesDeQuestion.find((g) => g.ecoute(r.question))
    if (!gestionnaireDeQuestion) throw new Error(`Aucun gestionnaire de question trouvé pour la question ${r.question.nom}`)
    const modeleDeLecture = gestionnaireDeQuestion.executer(r.question)
    return { ...r, modeleDeLecture }
  }
}
