"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajoutBoutonRecommencer = exports.afficheConclusion = void 0;

var afficheConclusion = function afficheConclusion() {
  var texte = "Vous souffrez de troubles du comportement alimentaire (TCA) ou vous pensez qu\u2019une personne de votre entourage en souffre ? N\u2019h\xE9sitez plus, prenez les devant et contactez quelqu\u2019un pour plus de renseignements. L\u2019association Anorexie et boulimie a pour but de venir en aide aux personnes souffrantes de TCA et \xE0 leurs proches.\n\nIl est jamais trop tard pour agir, contactez l\u2019association Anorexie et Boulimie : <a href=\"https://boulimie-anorexie.ch/\">https://boulimie-anorexie.ch/</a>";
  document.querySelector("#conclusion").innerHTML = texte;
  document.querySelector("body").classList.add("degrade");
};

exports.afficheConclusion = afficheConclusion;

var ajoutBoutonRecommencer = function ajoutBoutonRecommencer() {
  var html = "<button onclick=\"location.reload()\">D\xE9but de la pr\xE9sentation</button>";
  var conclusion = document.querySelector("#recommencer");
  conclusion.classList.add("button");
  conclusion.classList.add("bouttonConconlusion");
  conclusion.innerHTML = html;
  var boutton = conclusion.querySelector("button");
  boutton.classList.add("blink");
};

exports.ajoutBoutonRecommencer = ajoutBoutonRecommencer;