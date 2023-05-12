"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afficheCouleurMonde = void 0;

var _data = require("./data");

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var afficheCouleurMonde = function afficheCouleurMonde() {
  var dataPays = (0, _data.rendDataCarteDuMonde)();
  var margin = {
    top: 10,
    right: 40,
    bottom: 20,
    left: 40
  },
      width = window.innerWidth - margin.left - margin.right,
      height = window.innerHeight + margin.top + margin.bottom;
  var map = d3.select("#map-paysCouleur").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("class", "country").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var projection = d3.geoOrthographic().scale(210).center([0, 0]).translate([width / 2, height / 2]);
  var path = d3.geoPath().projection(projection);
  var thresholds = [0, 10000, 50000, 100000, 500000, 1000000, 5000000]; // Définir les couleurs correspondantes pour chaque catégorie

  var colors = ["white", "hsl(217, 89%, 61%)", "#1a1f71", "#0C00FF", "#27ae60", "green"]; // Définir l'échelle de couleurs avec la fonction d3.scaleThreshold()

  var colorScale = d3.scaleThreshold().domain(thresholds).range(colors);
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {
    data.features.forEach(function (d) {
      var infoPays = dataPays.find(function (dc) {
        return dc.key == d.id;
      });

      if (infoPays) {
        d.properties.anorexie = infoPays.value.anorexie;
        d.properties.boulimie = infoPays.value.boulimie;
      } else {
        d.properties.anorexie = "-";
        d.properties.boulimie = "-";
      }
    });
    map.selectAll("country").append("circle").attr("cx", 2).attr("cy", 0).attr("r", 20).style("fill", "red"); // serait utiliser pour mettre dans des couleurs différents certains pays

    map.append("g").selectAll("country").data(data.features).join("path").attr("d", path).attr("fill", function (d) {
      // Utiliser les données de prévalence pour la coloration
      var anorexie = d.properties.anorexie; // console.log("anorexie : ", anorexie);

      var boulimie = d.properties.boulimie; // console.log("boulimie : ", boulimie);

      if (anorexie) {
        return colorScale(anorexie);
      } else {
        return "white";
      }
    });
  }); // Définir les seuils de prévalence pour chaque catégorie

  var rotationSpeed = 0.05;
  var rotationCount = 0;

  var updateEarthRotation = function updateEarthRotation() {
    var timeElapsed = Date.now() - lastTime;
    var rotationAngle = rotationSpeed * timeElapsed;
    projection.rotate([rotationAngle + projection.rotate()[0], 0]);
    map.selectAll("path").attr("d", path);
    lastTime = Date.now();
    rotationCount += rotationAngle;

    if (rotationCount >= Math.PI * 2 * 2) {
      // arrêter après deux tours
      d3.timer(updateEarthRotation, 0); // stopper le timer

      map.call(d3.drag().on("drag", dragged)); // activer le drag
    }
  }; // ajouterLegende(thresholds, colors);
  // sert à bouger la terre


  var dragged = function dragged(event) {
    var _projection$invert = projection.invert([event.x, event.y]),
        _projection$invert2 = _slicedToArray(_projection$invert, 2),
        x = _projection$invert2[0],
        y = _projection$invert2[1];

    projection.rotate([-x, -y]);
    map.selectAll("path").attr("d", path);
  };

  map.call(d3.drag().on("drag", dragged));
  map.on("click", function (event) {
    var pays = {};
    dataPays.forEach(function (d) {
      // console.log(event.srcElement.__data__.id);
      pays = dataPays.find(function (dc) {
        return dc.key == event.srcElement.__data__.id;
      });
    });

    if (pays) {
      event.srcElement.__data__.properties.anorexie = pays.value.anorexie;
      event.srcElement.__data__.properties.boulimie = pays.value.boulimie;
    }

    var donneesAffichees = {
      pays: event.srcElement.__data__.properties.name,
      anorexie: event.srcElement.__data__.properties.anorexie,
      boulimie: event.srcElement.__data__.properties.boulimie
    };
    afficheSectionDonnes(donneesAffichees);
    recupereDonnesPays(donneesAffichees);
  }); // Convertir les coordonnées x, y du clic en coordonnées de longitude et de latitude
  // const [lon, lat] = projection.invert([event.x, event.y]);
  // ajouterLegende(colorScale);
};

exports.afficheCouleurMonde = afficheCouleurMonde;

var recupereDonnesPays = function recupereDonnesPays(data) {
  var donneesPays = [];
  console.log(data);
  var dataBrut = (0, _data.rendToutesDonnes)();
  console.log("Les data brut sont :", dataBrut);
  var uneDataPays = dataBrut.filter(function (d) {
    return data.pays == d.entity;
  });
  donneesPays.push(uneDataPays);
  afficheGraphiquePays(donneesPays);
};

afficheGraphiquePays = function afficheGraphiquePays() {
  var margin = {
    top: 10,
    right: 40,
    bottom: 30,
    left: 40
  },
      width = window.innerWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom; // Ajouter le svg

  var monSvg = d3.select("#nombreCasPays").append("svg").attr("width", "100%").attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Echelle

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
  monSvg.append("path").datum(data).attr("fill", "none").attr("stroke", "grey").attr("stroke-width", 2).attr("class", "line-anorexie").attr("d", lineAnorexie); // Dessiner la courbe de boulimie

  var lineBoulimie = d3.line().x(function (d) {
    return xScale(d.year);
  }).y(function (d) {
    return yScale(d.boulimie);
  }).curve(d3.curveLinear);
  monSvg.append("path").datum(data).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 2).attr("class", "line-boulimie").attr("d", lineBoulimie); // Dessiner l'axe X

  var xAxis = d3.axisBottom(xScale);
  monSvg.append("g").attr("transform", "translate(0," + height + ")").call(xAxis); // Dessiner l'axe Y

  var yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));
  monSvg.append("g").call(yAxis);
};

var afficheSectionDonnes = function afficheSectionDonnes(donneesAffichees) {
  // console.log(donneesAffichees);
  var casPays = document.querySelector("#nombreCasPays");
  var html = "<h3>".concat(donneesAffichees.pays, "</h3><p>Nombre de cas d'anorexie : ").concat(donneesAffichees.anorexie, "</p><p>Nombre de cas de boulimie : ").concat(donneesAffichees.boulimie, "</p>");
  casPays.classList.add("donneesPays");
  casPays.innerHTML = html;
};

var ajouterLegende = function ajouterLegende(thresholds, colors) {
  console.log(thresholds, colors);
  var html = "0 ";
  var legend = d3.select("#map-paysCouleur").append("svg").attr("id", "legende").attr("width", 200).attr("height", 200);
  var legendWidth = 20;
  var legendHeight = 20;
  var labels = colorScale.ticks(7);
  var legendGroups = legend.selectAll("g").data(labels).enter().append("g").attr("transform", function (d, i) {
    return "translate(0,".concat(i * 30, ")");
  });
  legendGroups.append("rect").attr("width", legendWidth).attr("height", legendHeight).attr("fill", colorScale);
  legendGroups.append("text").text(function (d) {
    return d;
  }).attr("x", legendWidth + 10).attr("y", legendHeight - 4);
};