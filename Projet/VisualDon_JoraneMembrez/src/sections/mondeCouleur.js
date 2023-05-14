import { rendDataCarteDuMonde, rendToutesDonnes } from "./data.js";
import * as d3 from "d3";

const afficheCouleurMonde = () => {
  const titreCouleur = document.querySelector("#titreCouleurMondiale");
  titreCouleur.innerHTML =
    "Les pays les plus touchés par les troubles alimentaire";

  const legende = `<ul>
            <li><span class="legend-dot chiffre1"></span> &lt 1'000</li>
            <li><span class="legend-dot chiffre2"></span> 1'001 - 50'000</li>
            <li><span class="legend-dot chiffre3"></span> 50'001 - 100'000</li>
            <li><span class="legend-dot chiffre4"></span> 100'000 - 500'000</li>
            <li>
              <span class="legend-dot chiffre5"></span> 500'001 - 1000'000
            </li>
            <li><span class="legend-dot chiffre6"></span> > 1'000'000</li>
          </ul>`;
  document.querySelector("#legende").innerHTML = legende;

  const dataPays = rendDataCarteDuMonde();

  const margin = { top: 10, right: 40, bottom: 20, left: 40 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight + margin.top + margin.bottom;

  const map = d3
    .select("#map-paysCouleur")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "country")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const projection = d3
    .geoOrthographic()
    .scale(210)
    .center([0, 0])
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  const thresholds = [0, 1000, 50000, 100000, 500000, 1000000];

  // Définir les couleurs correspondantes pour chaque catégorie
  const colors = [
    "#edf8fb",
    "#ccece6",
    "#99d8c9",
    "#66c2a4",
    "#2ca25f",
    "#006d2c",
  ];

  // Définir l'échelle de couleurs avec la fonction d3.scaleThreshold()
  const colorScale = d3.scaleThreshold().domain(thresholds).range(colors);

  d3.json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  ).then((data) => {
    data.features.forEach((d) => {
      let infoPays = dataPays.find((dc) => dc.key == d.id);
      if (infoPays) {
        d.properties.anorexie = infoPays.value.anorexie;
        d.properties.boulimie = infoPays.value.boulimie;
      } else {
        d.properties.anorexie = "-";
        d.properties.boulimie = "-";
      }
    });

    map
      .selectAll("country")
      .append("circle")
      .attr("cx", 2)
      .attr("cy", 0)
      .attr("r", 20)
      .style("fill", "red");
    // serait utiliser pour mettre dans des couleurs différents certains pays
    map
      .append("g")
      .selectAll("country")
      .data(data.features)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) => {
        // Utiliser les données de prévalence pour la coloration
        let anorexie = d.properties.anorexie;
        // console.log("anorexie : ", anorexie);
        let boulimie = d.properties.boulimie;
        // console.log("boulimie : ", boulimie);
        if (anorexie) {
          return colorScale(anorexie);
        } else {
          return "white";
        }
      });
  });

  // Définir les seuils de prévalence pour chaque catégorie

  const rotationSpeed = 0.05;
  let rotationCount = 0;
  const updateEarthRotation = () => {
    const timeElapsed = Date.now() - lastTime;
    const rotationAngle = rotationSpeed * timeElapsed;
    projection.rotate([rotationAngle + projection.rotate()[0], 0]);
    map.selectAll("path").attr("d", path);
    lastTime = Date.now();
    rotationCount += rotationAngle;
    if (rotationCount >= Math.PI * 2 * 2) {
      // arrêter après deux tours
      d3.timer(updateEarthRotation, 0); // stopper le timer
      map.call(d3.drag().on("drag", dragged)); // activer le drag
    }
  };

  // ajouterLegende(thresholds, colors);
  // sert à bouger la terre
  const dragged = (event) => {
    const [x, y] = projection.invert([event.x, event.y]);
    projection.rotate([-x, -y]);
    map.selectAll("path").attr("d", path);
  };

  map.call(d3.drag().on("drag", dragged));

  map.on("click", (event) => {
    document.querySelector("body").classList.remove("degrade");
    document.querySelector("body").classList.remove("terreFond");
    document.querySelector("body").classList.add("onClicked");

    let pays = {};
    pays = dataPays.find((dc) => dc.key == event.srcElement.__data__.id);
    if (pays) {
      console.log("pays : ", pays);
      event.srcElement.__data__.properties.anorexie = pays.value.anorexie;
      event.srcElement.__data__.properties.boulimie = pays.value.boulimie;
    }

    const donneesAffichees = {
      pays: event.srcElement.__data__.properties.name,
      anorexie: event.srcElement.__data__.properties.anorexie,
      boulimie: event.srcElement.__data__.properties.boulimie,
    };

    afficheSectionDonnes(donneesAffichees);
    recupereDonnesPays(donneesAffichees);
  });

  // Convertir les coordonnées x, y du clic en coordonnées de longitude et de latitude
  // const [lon, lat] = projection.invert([event.x, event.y]);

  // ajouterLegende(colorScale);
};

const recupereDonnesPays = (data) => {
  let donneesPays = [];
  console.log(data);
  const dataBrut = rendToutesDonnes();
  console.log("Les data brut sont :", dataBrut);
  let uneDataPays = dataBrut.filter((d) => data.pays == d.entity);
  donneesPays.push(uneDataPays);
  afficheGraphiquePays(donneesPays);
};

const afficheGraphiquePays = (donneesPays) => {
  const data = donneesPays[0];
  console.log("Les data sont ", data);
  const margin = { top: 10, right: 40, bottom: 30, left: 40 },
    width = 1000 - margin.left - margin.right - 100,
    height = 400 - margin.top - margin.bottom - 100;

  // Ajouter le svg
  const monSvg = d3
    .select("#nombreCasPays")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Echelle
  const xScale = d3
    .scaleBand()
    .range([0, width])
    .paddingInner(0.1)
    .domain(data.filter((d) => d.year <= 2019).map((d) => d.year));

  console.log("les données sont : ", data);
  const maxCount = d3.max(
    data.filter((d) => d.year <= 2019),
    (d) =>
      d.prevalence_anorexia > d.prevalence_bulimia
        ? d.prevalence_anorexia
        : d.prevalence_bulimia
  );
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, Math.ceil(maxCount / 1000) * 1000]);

  // Dessiner la courbe d'anorexie
  const lineAnorexie = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.prevalence_anorexia))
    .curve(d3.curveLinear);

  monSvg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("class", "line-anorexie")
    .attr("d", lineAnorexie);

  // Dessiner la courbe de boulimie
  const lineBoulimie = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.prevalence_bulimia))
    .curve(d3.curveLinear);

  monSvg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 2)
    .attr("class", "line-boulimie")
    .attr("d", lineBoulimie);

  // Dessiner l'axe X
  const xAxis = d3.axisBottom(xScale);

  monSvg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Dessiner l'axe Y
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));
  monSvg.append("g").call(yAxis);

  const legend = monSvg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${80},${100})`);

  legend
    .append("text")
    .attr("x", 10)
    .attr("y", 20)
    .text("Anorexie")
    .attr("fill", "white")
    .attr("font-size", "16px");

  legend
    .append("text")
    .attr("x", 10)
    .attr("y", 40)
    .text("Boulimie")
    .attr("fill", "grey")
    .attr("font-size", "16px");
};

const afficheSectionDonnes = (donneesAffichees) => {
  // console.log(donneesAffichees);
  const casPays = document.querySelector("#nombreCasPays");
  const html = `<h3>${donneesAffichees.pays}</h3><p>Nombre de cas d'anorexie : ${donneesAffichees.anorexie}</p><p>Nombre de cas de boulimie : ${donneesAffichees.boulimie}</p>`;
  casPays.classList.add("donneesPays");
  casPays.innerHTML = html;
};

const ajouterLegende = (thresholds, colors) => {
  console.log(thresholds, colors);

  const html = `0 `;

  const legend = d3
    .select("#map-paysCouleur")
    .append("svg")
    .attr("id", "legende")
    .attr("width", 200)
    .attr("height", 200);

  const legendWidth = 20;
  const legendHeight = 20;

  const labels = colorScale.ticks(7);

  const legendGroups = legend
    .selectAll("g")
    .data(labels)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0,${i * 30})`);

  legendGroups
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("fill", colorScale);

  legendGroups
    .append("text")
    .text((d) => d)
    .attr("x", legendWidth + 10)
    .attr("y", legendHeight - 4);
};

export { afficheCouleurMonde };
