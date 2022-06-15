import Question from "./question";
import ModeleDeLecture from "./modele-de-lecture";
import Bus from "../bus";
import Intercepteur from "../intercepteur";
import GestionnaireDeMessage from "../gestionnaire-de-message";
import Logger from "../../logger/logger";

export default class BusDeQuestions implements Bus<Question, ModeleDeLecture> {
  private readonly intercepteurs: Intercepteur<Question>[] = [];
  private readonly gestionnaires: GestionnaireDeMessage<
    Question,
    ModeleDeLecture
  >[] = [];

  public constructor(private readonly logger: Logger) {}

  public enregistrerIntercepteur(i: Intercepteur<Question>): void {
    this.intercepteurs.push(i);
  }

  public enregistrerGestionnaire(
    g: GestionnaireDeMessage<Question, ModeleDeLecture>
  ): void {
    this.gestionnaires.push(g);
  }

  public async publier<M extends ModeleDeLecture>(
    question: Question
  ): Promise<M> {
    this.intercepteurs.forEach((i) => i.executer(question));
    const modeleDeLecture = await this.executerLeGestionnaireDeQuestion(
      question
    );
    return modeleDeLecture as M;
  }

  private async executerLeGestionnaireDeQuestion(
    question: Question
  ): Promise<ModeleDeLecture> {
    this.logger.info(`${question.nom} (question) est en cours d'émission`);
    const gestionnaireDeQuestion = this.gestionnaires.find((g) =>
      g.ecoute(question)
    );
    if (!gestionnaireDeQuestion) {
      throw new Error(
        `Aucun gestionnaire de question trouvé pour la question ${question.nom}`
      );
    }

    return gestionnaireDeQuestion.executer(question);
  }
}
