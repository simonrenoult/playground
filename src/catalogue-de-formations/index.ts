import BoundedContext, { BusinessModel, Domain, Evolution, RoleDuDomaine } from '../building-blocks/bounded-context'

const catalogueDesFormations = new BoundedContext(
  "Catalogue de formations",
  "Liste de toutes les formations proposées par OCAC",
  {
    domain: Domain.SUPPORTING,
    businessModel: BusinessModel.COST_REDUCTION,
    evolution: Evolution.PRODUCT
  },
  [RoleDuDomaine.DRAFT]
)

export default catalogueDesFormations
