import BoundedContext, { BusinessModel, Domain, Evolution, RoleDuDomaine } from '../building-blocks/bounded-context'

const sessionsDeFormation = new BoundedContext(
  "Sessions de formation",
  "Création, modification, suppression et consultation des " +
    "sessions de formations planifiées à partir du catalogue.",
  {
    domain: Domain.CORE,
    businessModel: BusinessModel.COST_REDUCTION,
    evolution: Evolution.PRODUCT
  },
  [RoleDuDomaine.EXECUTION],
  __dirname
)

export default sessionsDeFormation
