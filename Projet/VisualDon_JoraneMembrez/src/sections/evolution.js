import * as d3 from "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.4/d3.js";
import { rendToutesDonnes } from "./data.js";

const rendDataEvolution = () => {
  const data = rendToutesDonnes();
  // Grouper les données par année
  const nestedData = d3.group(data, (d) => d.year);

  // Calculer la somme de prévalence d'anorexie et de boulimie pour chaque année
  const result = [];
  for (const [year, values] of nestedData) {
    let sumAnorexia = d3.sum(values, (d) => d.prevalence_anorexia);
    let sumBulimia = d3.sum(values, (d) => d.prevalence_bulimia);
    result.push({ year, anorexie: sumAnorexia, boulimie: sumBulimia });
  }
  return result;
};

const afficheEvolutionAnnes = () => {
  const h1 =
    "Evolution de la boulimie et de l'anorexie dans le monde dans le monde de 1990 à 2019";
  const titre = document.querySelector("#titreEvolutionMondiale");
  titre.textContent = h1;
  const data = rendDataEvolution();

  // Marges et translations
  const margin = { top: 10, right: 40, bottom: 30, left: 40 },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // Ajouter le svg
  const monSvg = d3
    .select("#graph-evolutionMondiale")
    .append("svg")
    .attr("width", "1000")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Echelle
  const xScale = d3
    .scaleBand()
    .range([0, width])
    .paddingInner(0.1)
    .domain(data.filter((d) => d.year <= 2019).map((d) => d.year));

  const maxCount = d3.max(
    data.filter((d) => d.year <= 2019),
    (d) => (d.anorexie > d.boulimie ? d.anorexie : d.boulimie)
  );
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, Math.ceil(maxCount / 1000) * 1000]);

  // Dessiner la courbe d'anorexie
  const lineAnorexie = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.anorexie))
    .curve(d3.curveLinear);

  monSvg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("class", "line-anorexie")
    .attr("d", lineAnorexie);

  // Dessiner la courbe de boulimie
  const lineBoulimie = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.boulimie))
    .curve(d3.curveLinear);

  monSvg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("class", "line-boulimie")
    .attr("d", lineBoulimie);

  // Dessiner l'axe X
  let xAxis = d3.axisBottom(xScale);

  monSvg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x-axis")
    .call(xAxis);

  // Dessiner l'axe Y
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));
  monSvg.append("g").call(yAxis);

  // Ajouter la légende
  const legend = monSvg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 100},${height - 80})`);

  legend
    .append("text")
    .attr("x", 10)
    .attr("y", 20)
    .text("Anorexie")
    .attr("fill", "black")
    .attr("font-size", "16px");

  legend
    .append("text")
    .attr("x", 10)
    .attr("y", 40)
    .text("Boulimie")
    .attr("fill", "white")
    .attr("font-size", "16px");

  // Créer un élément input de type range

  const slider = d3
    .select("#barre")
    .append("input")
    .attr("type", "range")
    .attr("min", 1990)
    .attr("max", 2019)
    .attr("step", 1)
    .attr("value", [1990, 2019])
    .style("position", "absolute")
    .style("width", "35%")
    .style("left", "23%");

  const startYear = d3
    .select("#barre")
    .append("div")
    .attr("class", "start-year")
    .text("1990")
    .style("position", "absolute")
    .style("left", "20%");

  const endYear = d3
    .select("#barre")
    .append("div")
    .attr("class", "end-year")
    .text("2019")
    .style("position", "absolute")
    .style("left", "60%");

  // Ajouter une broche
  /*const brush = d3
    .brushX()
    .extent([
      [margin.left, 0.5],
      [width - margin.right, focusHeight - margin.bottom + 0.5],
    ])
    .on("brush", brushed)
    .on("end", brushended);

  const defaultSelection = [
    x(d3.utcYear.offset(x.domain()[1], -1)),
    x.range()[1],
  ];

  function brushed({ selection }) {
    if (selection) {
      svg.property("value", selection.map(x.invert, x).map(d3.utcDay.round));
      svg.dispatch("input");
    }
  }

  function brushended({ selection }) {
    if (!selection) {
      gb.call(brush.move, defaultSelection);
    }
  } */

  // permet de mettre la barre de selection au debut
  slider.node().value = slider.attr("min");

  slider.on("input", function () {
    // updateGraph();

    const startYearValue = d3.select(this).property("value").split(",")[0];
    //  const endYearValue = d3.select(this).property("value").split(",")[1];
    const endYearValue = 2019;

    startYear.text(startYearValue);
    //  endYear.text(endYearValue);

    // Filtrer les données en fonction des années sélectionnées
    const filteredData = data.filter(
      (d) => d.year >= startYearValue && d.year <= endYearValue
    );

    console.log(filteredData);

    const annees = filteredData.map((d) => d.year);
    console.log(annees);
    //  monSvg.select("xAxis").call(xAxis);

    const newXScale = d3
      .scaleBand()
      .range([0, width])
      .domain(
        filteredData.filter((d) => d.year <= 2019).map((d) => d.year),
        (d) => d.year
      );
    // redessiner les légendes de l'axe x

    xAxis = d3.axisBottom(newXScale);

    monSvg
      .select(".line-boulimie")
      .datum(filteredData)
      .transition()
      .duration(1000)
      .attr(
        "d",
        lineBoulimie.x((d) => newXScale(d.year))
      );

    monSvg
      .select(".line-anorexie")
      .datum(filteredData)
      .transition()
      .duration(1000)
      .attr(
        "d",
        lineAnorexie.x((d) => newXScale(d.year))
      );

    monSvg.select(".x-axis").call(xAxis);
  });
};

const afficheBroche = () => {};

export { afficheEvolutionAnnes, rendDataEvolution };
