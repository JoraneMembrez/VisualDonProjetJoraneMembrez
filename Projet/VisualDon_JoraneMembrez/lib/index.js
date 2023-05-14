"use strict";

var _data = require("./sections/data");

var _evolution = require("./sections/evolution");

var _mondeCouleur = require("./sections/mondeCouleur");

var _conclusion = require("./sections/conclusion");

var _d3Collection = require("d3-collection");

//import * as d3 from "d3";
setTimeout(function () {
  document.getElementById("avertissement").style.display = "block";
}, 7000);
setTimeout(function () {
  document.getElementById("avertissement").style.display = "none";
}, 15000);
setTimeout(function () {
  document.querySelector("#buttonDescriptionBoulimie").classList.add("second");
}, 1000);
setTimeout(function () {
  document.querySelector("#buttonDescriptionAnorexie").classList.add("third");
}, 1000);
window.addEventListener("scroll", function () {
  var title = document.querySelector("h1");
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var newFontSize = 100 - scrollTop / 7;
  title.style.fontSize = newFontSize + "px";

  if (newFontSize <= 50) {
    title.style.display = "none";
  } else {
    title.style.display = "block";
  }
});
window.addEventListener("scroll", function () {
  var title = document.querySelector("h2 ");
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var newFontSize = 40 - scrollTop / 25;
  title.style.fontSize = newFontSize + "px";

  if (newFontSize <= 14) {
    title.style.display = "none";
  } else {
    title.style.display = "block";
  }
});
var data = (0, _data.rendToutesDonnes)();
var paragrapheA = document.querySelector(".descriptionAnorexie");
var buttonDescriptionAnorexie = document.querySelector("#buttonDescriptionAnorexie");
var paragrapheB = document.querySelector(".descriptionBoulimie");
var buttonDescriptionBoulimie = document.querySelector("#buttonDescriptionBoulimie");

var afficheBouton = function afficheBouton() {
  document.querySelector("body").classList.add("degrade"); // permet d'afficher et de retirer l'affichage de la définition de l'anorexie

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
  var informations = "Les troubles du comportement alimentaire (TCA) sont des pathologies qui affectent la relation qu'une personne entretient avec la nourriture. Ces troubles peuvent se manifester de diff\xE9rentes mani\xE8res : anorexie, boulimie, hyperphagie boulimique, etc.\nCes troubles peuvent avoir des cons\xE9quences graves sur la sant\xE9 physique et psychologique de la personne qui en souffre. Il est important de reconna\xEEtre les signes des TCA et de prendre en charge la personne concern\xE9e le plus rapidement possible. La recherche d'une aide professionnelle est fortement recommand\xE9e.\n\n  ";
  var paragraphe = document.querySelector("#informationSupp");
  paragraphe.textContent = informations;
  paragraphe.classList.add("first");
};

afficheBouton();

var cacheDescription = function cacheDescription() {
  var description = document.querySelector(".definition");
  description.innerHTML = " ";
  description.style.fontSize = "0px";
  description.style.padding = "0px";
  document.querySelector("body").classList.remove("background");
};

var cacheEvolution = function cacheEvolution() {
  var evolution = document.querySelector(".evolutionMondiale");
  var graph = document.querySelector("#graph-evolutionMondiale");
  var barre = document.querySelector("#barre");
  var titre = document.querySelector("#titreEvolutionMondiale");
  titre.innerHTML = " ";
  barre.innerHTML = " ";
  graph.innerHTML = " ";
};

var supprimeCouleurMonde = function supprimeCouleurMonde() {
  var monde = document.querySelector("#mapCouleur");
  monde.innerHTML = " ";
}; //pour que chaque addEventListener se produisent dans l'ordre pour afficher les graphiques


var currentActionIndex = 0;
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();

    if (currentActionIndex < spaceActions.length) {
      spaceActions[currentActionIndex]();
      currentActionIndex++;
    }
  }
});
var spaceActions = [function () {
  document.querySelector("body").classList.add("overlay");
  setTimeout(function () {
    document.querySelector("body").classList.remove("overlay");
  }, 1000);
  cacheDescription();
  document.querySelector("#titreEvolutionMondiale").classList.add("ajoutPadding");
  (0, _evolution.afficheEvolutionAnnes)();
}, function () {
  document.querySelector("body").classList.remove("overlay");
  document.querySelector("body").classList.add("terreFond");
  document.querySelector("#titreEvolutionMondiale").classList.remove("ajoutPadding");
  cacheEvolution();
  document.querySelector("#map-paysCouleur").classList.add("donneesBouge");
  (0, _mondeCouleur.afficheCouleurMonde)();
}, function () {
  document.querySelector("body").classList.remove("overlay");
  document.querySelector("body").classList.remove("onClicked");
  supprimeCouleurMonde();
  supprimeDonnesPays();
  (0, _conclusion.afficheConclusion)();
  (0, _conclusion.ajoutBoutonRecommencer)();
}];

var supprimeDonnesPays = function supprimeDonnesPays() {
  document.querySelector("#nombreCasPays").innerHTML = "";
  document.querySelector("#nombreCasPays").style.background = "transparent";
};