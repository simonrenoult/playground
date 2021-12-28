import IntercepteurDeQuestion from './intercepteur-de-question'
import GestionnaireDeQuestion from './gestionnaire-de-question'
import ResultatDeLIntercepteurDeQuestion from './resultat-de-l-intercepteur-de-question'
import { EnregistreurDeGestionnaire } from '../enregistreur-de-gestionnaire'

export default class ExecuterLeGestionnaireDeQuestion implements IntercepteurDeQuestion, EnregistreurDeGestionnaire<GestionnaireDeQuestion> {
  private readonly gestionnairesDeQuestion: Array<GestionnaireDeQuestion> = []

  constructor(
    private readonly logger: any
  ) {
  }

  enregister(g: GestionnaireDeQuestion): EnregistreurDeGestionnaire<GestionnaireDeQuestion> {
    this.gestionnairesDeQuestion.push(g)
    return this
  }

  public executer(r: ResultatDeLIntercepteurDeQuestion): ResultatDeLIntercepteurDeQuestion {
    this.logger.info(`${r.question.nom} (question) est en cours d'émission`)
    const gestionnaireDeQuestion = this.gestionnairesDeQuestion.find((g) => g.ecoute(r.question))
    if (!gestionnaireDeQuestion) throw new Error(`Aucun gestionnaire de question trouvé pour la question ${r.question.nom}`)
    const modeleDeLecture = gestionnaireDeQuestion.executer(r.question)
    return { ...r, modeleDeLecture }
  }
}
