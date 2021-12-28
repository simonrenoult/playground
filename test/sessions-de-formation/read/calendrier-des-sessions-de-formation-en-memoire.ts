import FormationsAuCatalogue
  from '../../../src/modules/catalogue-de-formations/read/domain/modele-de-lecture/formations-au-catalogue'
import {
  CalendrierDesSessionsDeFormation
} from '../../../src/modules/sessions-de-formation/read/domain/projection/calendrier-des-sessions-de-formation'
import { DateTime } from 'luxon'

export default class CalendrierDesSessionsDeFormationEnMemoire implements CalendrierDesSessionsDeFormation {
  public lister(_aPartirDe: DateTime): FormationsAuCatalogue {
    return ['DDD01']
  }
}
