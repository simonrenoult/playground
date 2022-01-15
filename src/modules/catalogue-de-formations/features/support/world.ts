import BusDeCommandes from "../../../../building-blocks/cqrs/write/bus-de-commandes";
import BusDeQuestions from "../../../../building-blocks/cqrs/read/bus-de-questions";
import BusDEvenementsDuDomaine from "../../../../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationsModule from "../../index";
import QuellesSontLesFormationsAuCatalogue from "../../read/application/quelles-sont-les-formations-au-catalogue";
import { setWorldConstructor, World } from "@cucumber/cucumber";

class CustomWorld extends World {
  private busDeQuestions: BusDeQuestions;
  private busDeCommandes: BusDeCommandes;
  private busDEvenements: BusDEvenementsDuDomaine;
  private result: any;

  public constructor(options: any) {
    super(options);
    this.busDeQuestions = new BusDeQuestions(console);
    this.busDEvenements = new BusDEvenementsDuDomaine(console);
    this.busDeCommandes = new BusDeCommandes(this.busDEvenements, console);
    const module = new CatalogueDeFormationsModule(
      this.busDeQuestions,
      this.busDeCommandes
    );
    module.enregistrerLesGestionnairesDeCommande(this.busDeCommandes);
    module.enregistrerLesGestionnairesDeQuestion(this.busDeQuestions);
  }

  public async listerLesFormations(): Promise<void> {
    this.result = await this.busDeQuestions.publier(
      new QuellesSontLesFormationsAuCatalogue()
    );
  }

  public ajouterXFormations(x: number): void {
    if (x !== 0) throw new Error("À implémenter");
  }
}

setWorldConstructor(CustomWorld);
