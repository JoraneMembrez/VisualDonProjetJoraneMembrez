"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rendDataEvolution = exports.afficheEvolutionAnnes = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _data = require("./data");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var rendDataEvolution = function rendDataEvolution() {
  var data = (0, _data.rendToutesDonnes)(); // Grouper les données par année

  var nestedData = d3.group(data, function (d) {
    return d.year;
  }); // Calculer la somme de prévalence d'anorexie et de boulimie pour chaque année

  var result = [];

  var _iterator = _createForOfIteratorHelper(nestedData),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          year = _step$value[0],
          values = _step$value[1];

      var sumAnorexia = d3.sum(values, function (d) {
        return d.prevalence_anorexia;
      });
      var sumBulimia = d3.sum(values, function (d) {
        return d.prevalence_bulimia;
      });
      result.push({
        year: year,
        anorexie: sumAnorexia,
        boulimie: sumBulimia
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
};

exports.rendDataEvolution = rendDataEvolution;

var afficheEvolutionAnnes = function afficheEvolutionAnnes() {
  var h1 = "Evolution de la boulimie et de l'anorexie dans le monde dans le monde de 1990 à 2019";
  var titre = document.querySelector("#titreEvolutionMondiale");
  titre.textContent = h1;
  var data = rendDataEvolution(); // Marges et translations

  var margin = {
    top: 10,
    right: 40,
    bottom: 30,
    left: 40
  },
      width = 1000 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom; // Ajouter le svg

  var monSvg = d3.select("#graph-evolutionMondiale").append("svg").attr("width", "1000").attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Echelle

  var xScale = d3.scaleBand().range([0, width]).paddingInner(0.1).domain(data.filter(function (d) {
    return d.year <= 2019;
  }).map(function (d) {
    return d.year;
  }));
  var maxCount = d3.max(data.filter(function (d) {
    return d.year <= 2019;
  }), function (d) {
    return d.anorexie > d.boulimie ? d.anorexie : d.boulimie;
  });
  var yScale = d3.scaleLinear().range([height, 0]).domain([0, Math.ceil(maxCount / 1000) * 1000]); // Dessiner la courbe d'anorexie

  var lineAnorexie = d3.line().x(function (d) {
    return xScale(d.year);
  }).y(function (d) {
    return yScale(d.anorexie);
  }).curve(d3.curveLinear);
  monSvg.append("path").datum(data).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 2).attr("class", "line-anorexie").attr("d", lineAnorexie); // Dessiner la courbe de boulimie

  var lineBoulimie = d3.line().x(function (d) {
    return xScale(d.year);
  }).y(function (d) {
    return yScale(d.boulimie);
  }).curve(d3.curveLinear);
  monSvg.append("path").datum(data).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 2).attr("class", "line-boulimie").attr("d", lineBoulimie); // Dessiner l'axe X

  var xAxis = d3.axisBottom(xScale);
  monSvg.append("g").attr("transform", "translate(0," + height + ")").attr("class", "x-axis").call(xAxis); // Dessiner l'axe Y

  var yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));
  monSvg.append("g").call(yAxis); // Ajouter la légende

  var legend = monSvg.append("g").attr("class", "legend").attr("transform", "translate(".concat(width - 100, ",").concat(height - 80, ")"));
  legend.append("text").attr("x", 10).attr("y", 20).text("Anorexie").attr("fill", "black").attr("font-size", "16px");
  legend.append("text").attr("x", 10).attr("y", 40).text("Boulimie").attr("fill", "white").attr("font-size", "16px"); // Créer un élément input de type range

  var slider = d3.select("#barre").append("input").attr("type", "range").attr("min", 1990).attr("max", 2019).attr("step", 1).attr("value", [1990, 2019]).style("position", "absolute").style("width", "35%").style("left", "23%");
  var startYear = d3.select("#barre").append("div").attr("class", "start-year").text("1990").style("position", "absolute").style("left", "20%");
  var endYear = d3.select("#barre").append("div").attr("class", "end-year").text("2019").style("position", "absolute").style("left", "60%"); // Ajouter une broche

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
    var startYearValue = d3.select(this).property("value").split(",")[0]; //  const endYearValue = d3.select(this).property("value").split(",")[1];

    var endYearValue = 2019;
    startYear.text(startYearValue); //  endYear.text(endYearValue);
    // Filtrer les données en fonction des années sélectionnées

    var filteredData = data.filter(function (d) {
      return d.year >= startYearValue && d.year <= endYearValue;
    });
    console.log(filteredData);
    var annees = filteredData.map(function (d) {
      return d.year;
    });
    console.log(annees); //  monSvg.select("xAxis").call(xAxis);

    var newXScale = d3.scaleBand().range([0, width]).domain(filteredData.filter(function (d) {
      return d.year <= 2019;
    }).map(function (d) {
      return d.year;
    }), function (d) {
      return d.year;
    }); // redessiner les légendes de l'axe x

    xAxis = d3.axisBottom(newXScale);
    monSvg.select(".line-boulimie").datum(filteredData).transition().duration(1000).attr("d", lineBoulimie.x(function (d) {
      return newXScale(d.year);
    }));
    monSvg.select(".line-anorexie").datum(filteredData).transition().duration(1000).attr("d", lineAnorexie.x(function (d) {
      return newXScale(d.year);
    }));
    monSvg.select(".x-axis").call(xAxis);
  });
};

exports.afficheEvolutionAnnes = afficheEvolutionAnnes;

var afficheBroche = function afficheBroche() {};