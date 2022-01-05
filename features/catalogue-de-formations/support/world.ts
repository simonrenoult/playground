import BusDeCommandes from "../../../src/building-blocks/cqrs/write/bus-de-commandes";
import BusDeQuestions from "../../../src/building-blocks/cqrs/read/bus-de-questions";
import BusDEvenementsDuDomaine from "../../../src/building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationsModule from "../../../src/modules/catalogue-de-formations";
import QuellesSontLesFormationsAuCatalogue from "../../../src/modules/catalogue-de-formations/read/application/quelles-sont-les-formations-au-catalogue";
import { setWorldConstructor, World } from "@cucumber/cucumber";

class CustomWorld extends World {
  private busDeQuestions: BusDeQuestions;
  private busDeCommandes: BusDeCommandes;
  private busDEvenements: BusDEvenementsDuDomaine;
  private result: any;

  constructor(options: any) {
    super(options);
    this.busDeQuestions = new BusDeQuestions(console);
    this.busDEvenements = new BusDEvenementsDuDomaine(console);
    this.busDeCommandes = new BusDeCommandes(this.busDEvenements, console);
    const module = new CatalogueDeFormationsModule(
      this.busDeQuestions,
      this.busDeCommandes
    );
    module.ajouterLesGestionnairesDeCommande(this.busDeCommandes);
    module.ajouterLesGestionnairesDeQuestion(this.busDeQuestions);
  }

  async listerLesFormations() {
    this.result = await this.busDeQuestions.publier(
      new QuellesSontLesFormationsAuCatalogue()
    );
  }

  ajouterXFormations(x: number) {
    if (x !== 0) throw new Error("À implémenter");
  }
}

setWorldConstructor(CustomWorld);
