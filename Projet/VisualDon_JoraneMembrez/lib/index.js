"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var d3 = _interopRequireWildcard(require("d3"));

var _anamia = _interopRequireDefault(require("../data/anamia.csv"));

var _data = require("./sections/data");

var _evolution = require("./sections/evolution");

var _monde = require("./sections/monde");

var _mondeCouleur = require("./sections/mondeCouleur");

var _europe = require("./sections/europe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var data = (0, _data.rendToutesDonnes)(); // permet d'afficher et de retirer l'affichage de la définition de l'anorexie

var paragrapheA = document.querySelector(".descriptionAnorexie");
var buttonDescriptionAnorexie = document.querySelector("#buttonDescriptionAnorexie");
buttonDescriptionAnorexie.addEventListener("click", function () {
  if (paragrapheA.classList.contains("active")) {
    paragrapheA.textContent = "";
    paragrapheA.classList.remove("active");
  } else {
    var pAnoreixe = "Les personnes atteintes d’anorexie réduisent leur apport calorique journalier et atteingnent ainsi un apport faible en calories. La personne atteinte d’anorexie mentale a une peur constante de prendre du poids bien que son propre poids soit inférieur à la moyenne. De plus, elle perçoit son corps d’une manière diffé-rente de la réalité, elle ne se rend effectivement pas compte de la maigreur dont elle fait preuve.";
    paragrapheA.classList.add("active");
    paragrapheA.textContent = pAnoreixe;
  }
}); // permet d'afficher et de retirer l'affichage de la définition de la boulimie

var paragrapheB = document.querySelector(".descriptionBoulimie");
var buttonDescriptionBoulimie = document.querySelector("#buttonDescriptionBoulimie");
buttonDescriptionBoulimie.addEventListener("click", function () {
  if (paragrapheB.classList.contains("active")) {
    paragrapheB.textContent = "";
    paragrapheB.classList.remove("active");
  } else {
    var pBoulimie = "La boulimie est un trouble alimentaire caractérisé par des épisodes de consommation excessive d’aliments, suivis de comportements compensatoires tels que des vomissements provoqués, l’utilisation de laxatifs ou de diurétiques, ou encore des périodes de restriction alimentaire sévère. Pendant les épisodes de boulimie, la personne se sent souvent incapable de contrôler sa consommation alimentaire et continue à manger même lorsqu’elle est physiquement pleine.";
    paragrapheB.classList.add("active");
    paragrapheB.textContent = pBoulimie;
  }
});
(0, _evolution.afficheEvolutionAnnes)();
(0, _mondeCouleur.afficheCouleurMonde)();
(0, _monde.afficheMonde)(); // rendTroubleEurope();

/*dataBrut.forEach((el) => {
  pays.push(el.entity);
});

console.log(pays);

const paysRedefinition = new Map();
pays.forEach((item) => {
  if (!paysRedefinition.has(item)) {
    paysRedefinition.set(item, 1);
  } else {
    paysRedefinition.set(item, paysRedefinition.get(item) + 1);
  }
});

const paysUnique = [];
paysRedefinition.forEach((value, key) => {
  paysUnique.push(key);
});

console.log(paysUnique); */
//console.log(fileYears);
//## Graphique statique (délai 1 avril)
//Le premier rendu implique la visualisation statique des données
//```data/gapminder.csv``` pour l'année 2021 sous forme de
//[Scatter / Bubble Chart]
//(https://www.gapminder.org/tools/#$chart-type=bubbles&url=v1).
//Vous aurez sur l'axe X les données de PIB par habitant et sur l'axe Y l'espérance de vie.
//La taille des cercles devra être proportionnelle à la population du pays.
// PIB par habitant : filePerson
// Espérance de vie : fileYears

/*

const annees = Object.keys(populationData[0]);
console.log("Les années : ");
console.log(annees);

// permet de convertir par ex 1k en 1000
let converterSI = (array, variable, variableName) => {
  let convertedVariable = array.map((d) => {
    // Trouver le format SI (M, B, k)
    let SI =
      typeof d[variable.toString()] === "string" ||
      d[variable.toString()] instanceof String
        ? d[variable.toString()].slice(-1)
        : d[variable.toString()];

    // Extraire la partie numérique
    let number =
      typeof d[variable.toString()] === "string" ||
      d[variable.toString()] instanceof String
        ? parseFloat(d[variable.toString()].slice(0, -1))
        : d[variable.toString()];

    // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
      case "M": {
        return { country: d.country, [variableName]: Math.pow(10, 6) * number };
        break;
      }
      case "B": {
        return { country: d.country, [variableName]: Math.pow(10, 9) * number };
        break;
      }
      case "k": {
        return { country: d.country, [variableName]: Math.pow(10, 3) * number };
        break;
      }
      default: {
        return { country: d.country, [variableName]: number };
        break;
      }
    }
  });
  return convertedVariable;
};

let pop = [],
  income = [],
  life = [],
  dataCombined = [];

dataBrut.forEach((annee) => {
  // met dans le tableau toutes les années
  // prend les données seulement pour une années précises et par pays
  pop.push({ annee: annee, data: converterSI(populationData, annee, "pop") });
  income.push({ annee: annee, data: converterSI(pibData, annee, "income") });
  life.push({ annee: annee, data: converterSI(esperanceData, annee, "life") });

  const popAnnee = pop.filter((d) => d.annee == annee).map((d) => d.data)[0];
  const incomeAnnee = income
    .filter((d) => d.annee == annee)
    .map((d) => d.data)[0];
  const lifeAnnee = life.filter((d) => d.annee == annee).map((d) => d.data)[0];
  dataCombined.push({ annee: annee, data: mergeBy });

  console.log("Popoulation par année : ");
  console.log(popAnnee);
});

console.log("test : ");
console.log(pop, income, life); */