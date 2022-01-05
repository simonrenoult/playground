import { Given, Then, When } from "@cucumber/cucumber";
import { assert } from "chai";

Given("il y a {int} formations", function (x) {
  this.ajouterXFormations(x);
});

When("je liste les formations", function () {
  return this.listerLesFormations();
});

Then("le système retourne {int} formations", function (x) {
  assert.equal(this.result.length, x);
});
