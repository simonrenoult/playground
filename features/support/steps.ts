import { After, Before, Given, Then, When } from "@cucumber/cucumber";
import { assert } from "chai";

Before(async function () {
  await this.startServer();
});

After(async function () {
  await this.stopServer();
});

Given(/il y a (\d+) formations?/, function (x) {
  this.ajouterXFormations(x);
});

When("je liste les formations", function () {
  return this.listerLesFormations();
});

Then(/le système retourne (\d+) formations?/, function (x) {
  assert.equal(this.result.length, x);
});

Given(/^il y a (\d+) session$/, function (x) {
  this.ajouterXSessions(x);
});

When(/^je liste les sessions$/, function () {
  return this.listerLesSessions();
});

Then(/^le système retourne (\d+) session$/, function (x) {
  assert.equal(this.result.length, x);
});
