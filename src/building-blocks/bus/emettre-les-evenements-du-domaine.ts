import Bus from './bus'
import EvenementDuDomaine from '../evenement'
import Intercepteur from './intercepteur'
import ResultatDeLIntercepteur from './resultat-de-l-intercepteur'

export default class EmettreLesEvenementsDuDomaine implements Intercepteur {
  constructor(
    private readonly busDEvenementsDuDomaine: Bus<EvenementDuDomaine>,
    private readonly logger: Console
  ) {
  }

  public executer(r: ResultatDeLIntercepteur): ResultatDeLIntercepteur {
    this.logger.info(`${r.evenementDuDomaine.nom} (évènement) en cours d'émission`)
    this.busDEvenementsDuDomaine.publier(r.evenementDuDomaine)
    return r
  }
}
