const afficheConclusion = () => {
  const texte = `Vous souffrez de troubles du comportement alimentaire (TCA) ou vous pensez qu’une personne de votre entourage en souffre ? N’hésitez plus, prenez les devant et contactez quelqu’un pour plus de renseignements. L’association Anorexie et boulimie a pour but de venir en aide aux personnes souffrantes de TCA et à leurs proches.

Il est jamais trop tard pour agir, contactez l’association Anorexie et Boulimie : <a href="https://boulimie-anorexie.ch/">https://boulimie-anorexie.ch/</a>`;

  document.querySelector("#conclusion").innerHTML = texte;
  document.querySelector("body").classList.add("degrade");
};

const ajoutBoutonRecommencer = () => {
  const html = `<button onclick="location.reload()">Début de la présentation</button>`;
  const conclusion = document.querySelector("#recommencer");
  conclusion.classList.add("button");
  conclusion.classList.add("bouttonConconlusion");

  conclusion.innerHTML = html;
  const boutton = conclusion.querySelector("button");
  boutton.classList.add("blink");
};

export { afficheConclusion, ajoutBoutonRecommencer };
