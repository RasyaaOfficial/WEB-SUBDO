const domains = {
  "1": {
    zone: "6a744d80e47fd7360c493ac52c228bc9",
    apitoken: "7VkDw7pGMuONgGyXo_66VOdVwelgLc7Fj-cpzsRQ",
    tld: "hosting-privateku.web.id"
  },
  "2": {
    zone: "366a62f44de19a2c8ed81adbe4485929",
    apitoken: "NmO7m7UiErFtzcHZQ9ZhGwO0ZvuB4VuT1EX8Bn_n",
    tld: "hosting-panelku.biz.id"
  },
  "3": {
    zone: "78a4a2506b6bbaf1d20cb0b212c43bdf",
    apitoken: "7VkDw7pGMuONgGyXo_66VOdVwelgLc7Fj-cpzsRQ",
    tld: "hostingku-private.web.id"
  },
  "4": {
    zone: "45aee2c21409fa3488a4d8682b52aefb",
    apitoken: "7VkDw7pGMuONgGyXo_66VOdVwelgLc7Fj-cpzsRQ",
    tld: "hosting-private.web.id"
  },
  "5": {
    zone: "fa4794151634d2ef9b9b76f375778ae3",
    apitoken: "7VkDw7pGMuONgGyXo_66VOdVwelgLc7Fj-cpzsRQ",
    tld: "mafiahytam.my.id"
  },
  "6": {
    zone: "f521c2a8f7910d5594d2dab417e32a94",
    apitoken: "7VkDw7pGMuONgGyXo_66VOdVwelgLc7Fj-cpzsRQ",
    tld: "private-hosting.web.id"
  },
  "7": {
    zone: "087e164c1fdcc889e0310d3008105e6d",
    apitoken: "7VkDw7pGMuONgGyXo_66VOdVwelgLc7Fj-cpzsRQ",
    tld: "serverpribgw.biz.id"
  }
};

const allowedTLDs = Object.values(domains).map(d => d.tld);

module.exports = {
  domains,
  allowedTLDs
};
