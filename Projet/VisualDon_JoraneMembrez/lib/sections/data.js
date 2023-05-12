"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rendToutesDonnes = exports.rendDataEvolutionMondialeAnorexie = exports.rendDataCarteDuMonde = exports.prendPaysUnique = exports.prendPays = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _anamia = _interopRequireDefault(require("/data/anamia.csv"));

var _d3Collection = require("d3-collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var rendToutesDonnes = function rendToutesDonnes() {
  return _anamia["default"];
}; // rend la liste des pays sans doublons


exports.rendToutesDonnes = rendToutesDonnes;

var prendPaysUnique = function prendPaysUnique() {
  var pays = [];

  _anamia["default"].forEach(function (el) {
    pays.push(el.entity);
  });

  var paysRedefinition = new Map();
  pays.forEach(function (item) {
    if (!paysRedefinition.has(item)) {
      paysRedefinition.set(item, 1);
    } else {
      paysRedefinition.set(item, paysRedefinition.get(item) + 1);
    }
  });
  var paysUnique = [];
  paysRedefinition.forEach(function (value, key) {
    paysUnique.push(key);
  });
  return paysUnique;
}; // prend tous les pays


exports.prendPaysUnique = prendPaysUnique;

var prendPays = function prendPays() {
  var pays = [];

  _anamia["default"].forEach(function (el) {
    pays.push(el.entity);
  });

  return pays;
};

exports.prendPays = prendPays;

var prendAnnnes = function prendAnnnes() {
  var annees = [];

  _anamia["default"].forEach(function (el) {
    pays.push(el.year);
  });

  return annees;
};

var rendDataEvolutionMondialeAnorexie = function rendDataEvolutionMondialeAnorexie() {
  var dataBrut = rendToutesDonnes();
  var data = dataBrut.map(function (d) {
    return {
      annees: d.year,
      anorexie: d.prevalence_anorexia
    };
  });
  return data;
};
/*const rendDataEvolutionMondialeBoulimie = () => {
  const dataBrut = rendToutesDonnes();
  console.log(dataBrut);
  const data = dataBrut.map((d) => ({
    annees: d.year,
    boulimie: d.prevalence_bulimia,
  }));
  return data;
}; */


exports.rendDataEvolutionMondialeAnorexie = rendDataEvolutionMondialeAnorexie;

var rendDataCarteDuMonde = function rendDataCarteDuMonde() {
  var data = rendToutesDonnes();
  var dataMonde = []; // Count prevalence_anorexia and prevalence_bulimia for each country

  var dataGrouped = (0, _d3Collection.nest)().key(function (d) {
    return d.isocode;
  }).rollup(function (v) {
    return {
      anorexie: d3.sum(v, function (d) {
        return d.prevalence_anorexia;
      }),
      boulimie: d3.sum(v, function (d) {
        return d.prevalence_bulimia;
      })
    };
  }).entries(data); // Boucle à travers toutes les années et tous les pays

  /*for (let i = 1996; i <= 2019; i++) {
    let j = 0;
    data.forEach((el) => {
      let pays = el.entity;
      let sumAnorexie = 0;
      let sumBoulimie = 0;
        for (let i = 1996; i <= 2019; i++) {
        let anorexie = el.prevalence_anorexia;
        let boulimie = el.prevalence_bulimia;
        sumAnorexie += anorexie;
        sumBoulimie += boulimie;
      }
      dataMonde[j] = {
        Pays: pays,
        Anorexie: sumAnorexie,
        Boulimie: sumBoulimie,
      };
      j++;
    });
  } */

  return dataGrouped;
};

exports.rendDataCarteDuMonde = rendDataCarteDuMonde;