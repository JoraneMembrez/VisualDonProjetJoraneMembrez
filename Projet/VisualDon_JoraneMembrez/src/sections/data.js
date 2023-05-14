import * as d3 from "d3";
import dataBrut from "/data/anamia.csv";
import { nest } from "d3-collection";

const rendToutesDonnes = () => {
  return dataBrut;
};

// rend la liste des pays sans doublons
const prendPaysUnique = () => {
  let pays = [];

  dataBrut.forEach((el) => {
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

  dataBrut.forEach((el) => {
    pays.push(el.entity);
  });

  return pays;
};

const prendAnnnes = () => {
  let annees = [];

  dataBrut.forEach((el) => {
    pays.push(el.year);
  });

  return annees;
};

const rendDataEvolutionMondialeAnorexie = () => {
  const dataBrut = rendToutesDonnes();
  const data = dataBrut.map((d) => ({
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