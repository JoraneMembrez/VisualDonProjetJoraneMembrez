import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
//import dataBrut from "../data/anamia.csv";

const dataBrut = d3.csv("../data/anamia.csv");
//import { nest } from "https://cdn.jsdelivr.net/npm/d3-collection@1.0.7/dist/d3-collection.min.js";

const rendToutesDonnes = async () => {
  return await dataBrut;
};

// rend la liste des pays sans doublons
const prendPaysUnique = () => {
  let pays = [];

  rendToutesDonnes.forEach((el) => {
    pays.push(el.entity);
  });

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

  return paysUnique;
};

// prend tous les pays
const prendPays = () => {
  let pays = [];

  rendToutesDonnes.forEach((el) => {
    pays.push(el.entity);
  });

  return pays;
};

const prendAnnnes = () => {
  let annees = [];

  rendToutesDonnes.forEach((el) => {
    pays.push(el.year);
  });

  return annees;
};

const rendDataEvolutionMondialeAnorexie = () => {
  const data = rendToutesDonnes().map((d) => ({
    annees: d.year,
    anorexie: d.prevalence_anorexia,
  }));
  return data;
};

const rendDataCarteDuMonde = () => {
  const data = rendToutesDonnes();
  const dataMonde = [];

  const dataGrouped = nest()
    .key((d) => d.isocode)
    .rollup((v) => {
      return {
        anorexie: d3.sum(v, (d) => d.prevalence_anorexia),
        boulimie: d3.sum(v, (d) => d.prevalence_bulimia),
      };
    })
    .entries(data);
  return dataGrouped;
};

export {
  prendPaysUnique,
  prendPays,
  rendToutesDonnes,
  rendDataEvolutionMondialeAnorexie,
  rendDataCarteDuMonde,
};
