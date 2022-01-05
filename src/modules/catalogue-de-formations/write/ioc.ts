import * as Path from "path";
import { AwilixContainer, InjectionMode } from "awilix";
import GestionnaireDeCreerUneFormation from "./application/gestionnaire/gestionnaire-de-creer-une-formation";
import GestionnaireDeAjouterUnFormateurPotentielALaFormation from "./application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation";

export interface ICradleWrite {
  gestionnaireDeCreerUneFormation: GestionnaireDeCreerUneFormation;
  gestionnaireDeAjouterUnFormateurPotentielALaFormation: GestionnaireDeAjouterUnFormateurPotentielALaFormation;
}

export default class IOCWrite {
  public static recupererLeConteneurDInjectionDeDependance(
    conteneurParent: AwilixContainer
  ): AwilixContainer {
    return conteneurParent
      .createScope<ICradleWrite>()
      .loadModules(
        [
          Path.resolve(__dirname, "./application/**/*.ts"),
          Path.resolve(__dirname, "./infrastructure/**/*.ts"),
        ],
        {
          resolverOptions: {
            injectionMode: InjectionMode.CLASSIC,
            lifetime: "SCOPED",
          },
          formatName: "camelCase",
        }
      );
  }
}
