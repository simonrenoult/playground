export interface EnregistreurDeGestionnaire<TypeDeGestionnaire> {
  enregister(g: TypeDeGestionnaire): EnregistreurDeGestionnaire<TypeDeGestionnaire>
}
