//import * as d3 from "d3";

import { rendToutesDonnes } from "./sections/data.js";
import { afficheEvolutionAnnes } from "./sections/evolution.js";
import { afficheCouleurMonde } from "./sections/mondeCouleur.js";
import {
  afficheConclusion,
  ajoutBoutonRecommencer,
} from "./sections/conclusion.js";

setTimeout(() => {
  document.getElementById("avertissement").style.display = "block";
}, 7000);

setTimeout(() => {
  document.getElementById("avertissement").style.display = "none";
}, 15000);

setTimeout(() => {
  document.querySelector("#buttonDescriptionBoulimie").classList.add("second");
}, 1000);
setTimeout(() => {
  document.querySelector("#buttonDescriptionAnorexie").classList.add("third");
}, 1000);

window.addEventListener("scroll", function () {
  let title = document.querySelector("h1");
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let newFontSize = 100 - scrollTop / 7;
  title.style.fontSize = newFontSize + "px";
  if (newFontSize <= 50) {
    title.style.display = "none";
  } else {
    title.style.display = "block";
  }
});

window.addEventListener("scroll", function () {
  let title = document.querySelector("h2 ");
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let newFontSize = 40 - scrollTop / 25;
  title.style.fontSize = newFontSize + "px";
  if (newFontSize <= 14) {
    title.style.display = "none";
  } else {
    title.style.display = "block";
  }
});

let data = rendToutesDonnes();

const paragrapheA = document.querySelector(".descriptionAnorexie");
const buttonDescriptionAnorexie = document.querySelector(
  "#buttonDescriptionAnorexie"
);
const paragrapheB = document.querySelector(".descriptionBoulimie");
const buttonDescriptionBoulimie = document.querySelector(
  "#buttonDescriptionBoulimie"
);
const afficheBouton = () => {
  document.querySelector("body").classList.add("degrade");
  // permet d'afficher et de retirer l'affichage de la définition de l'anorexie
  buttonDescriptionAnorexie.addEventListener("click", () => {
    if (paragrapheA.classList.contains("active")) {
      paragrapheA.textContent = "";
      paragrapheA.classList.remove("active");
    } else {
      const pAnoreixe =
        "Les personnes atteintes d’anorexie réduisent leur apport calorique journalier et atteingnent ainsi un apport faible en calories. La personne atteinte d’anorexie mentale a une peur constante de prendre du poids bien que son propre poids soit inférieur à la moyenne. De plus, elle perçoit son corps d’une manière diffé-rente de la réalité, elle ne se rend effectivement pas compte de la maigreur dont elle fait preuve.";
      paragrapheA.classList.add("active");
      paragrapheA.textContent = pAnoreixe;
    }
  });
  // permet d'afficher et de retirer l'affichage de la définition de la boulimie
  buttonDescriptionBoulimie.addEventListener("click", () => {
    if (paragrapheB.classList.contains("active")) {
      paragrapheB.textContent = "";
      paragrapheB.classList.remove("active");
    } else {
      const pBoulimie =
        "La boulimie est un trouble alimentaire caractérisé par des épisodes de consommation excessive d’aliments, suivis de comportements compensatoires tels que des vomissements provoqués, l’utilisation de laxatifs ou de diurétiques, ou encore des périodes de restriction alimentaire sévère. Pendant les épisodes de boulimie, la personne se sent souvent incapable de contrôler sa consommation alimentaire et continue à manger même lorsqu’elle est physiquement pleine.";
      paragrapheB.classList.add("active");
      paragrapheB.textContent = pBoulimie;
    }
  });

  const informations = `Les troubles du comportement alimentaire (TCA) sont des pathologies qui affectent la relation qu'une personne entretient avec la nourriture. Ces troubles peuvent se manifester de différentes manières : anorexie, boulimie, hyperphagie boulimique, etc.
Ces troubles peuvent avoir des conséquences graves sur la santé physique et psychologique de la personne qui en souffre. Il est important de reconnaître les signes des TCA et de prendre en charge la personne concernée le plus rapidement possible. La recherche d'une aide professionnelle est fortement recommandée.

  `;

  const paragraphe = document.querySelector("#informationSupp");
  paragraphe.textContent = informations;
  paragraphe.classList.add("first");
};

afficheBouton();

const cacheDescription = () => {
  const description = document.querySelector(".definition");
  description.innerHTML = " ";
  description.style.fontSize = "0px";
  description.style.padding = "0px";
  document.querySelector("body").classList.remove("background");
};

const cacheEvolution = () => {
  const evolution = document.querySelector(".evolutionMondiale");
  const graph = document.querySelector("#graph-evolutionMondiale");
  const barre = document.querySelector("#barre");
  const titre = document.querySelector("#titreEvolutionMondiale");
  titre.innerHTML = " ";
  barre.innerHTML = " ";
  graph.innerHTML = " ";
};

const supprimeCouleurMonde = () => {
  const monde = document.querySelector("#mapCouleur");
  monde.innerHTML = " ";
};

//pour que chaque addEventListener se produisent dans l'ordre pour afficher les graphiques
let currentActionIndex = 0;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();

    if (currentActionIndex < spaceActions.length) {
      spaceActions[currentActionIndex]();
      currentActionIndex++;
    }
  }
});

const spaceActions = [
  function () {
    document.querySelector("body").classList.add("overlay");

    setTimeout(function () {
      document.querySelector("body").classList.remove("overlay");
    }, 1000);

    cacheDescription();
    document
      .querySelector("#titreEvolutionMondiale")
      .classList.add("ajoutPadding");
    afficheEvolutionAnnes();
  },
  function () {
    document.querySelector("body").classList.remove("overlay");
    document.querySelector("body").classList.add("terreFond");

    document
      .querySelector("#titreEvolutionMondiale")
      .classList.remove("ajoutPadding");
    cacheEvolution();
    document.querySelector("#map-paysCouleur").classList.add("donneesBouge");
    afficheCouleurMonde();
  },

  function () {
    document.querySelector("body").classList.remove("overlay");
    document.querySelector("body").classList.remove("onClicked");
    supprimeCouleurMonde();
    supprimeDonnesPays();
    afficheConclusion();
    ajoutBoutonRecommencer();
  },
];

const supprimeDonnesPays = () => {
  document.querySelector("#nombreCasPays").innerHTML = "";
  document.querySelector("#nombreCasPays").style.background = "transparent";
};
