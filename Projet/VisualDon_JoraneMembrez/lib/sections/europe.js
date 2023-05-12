"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rendTroubleEurope = void 0;

var _data = require("./data");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var rendTroubleEurope = function rendTroubleEurope() {
  var dataPays = rendDataCarteDuMonde();
  var margin = {
    top: 10,
    right: 40,
    bottom: 20,
    left: 40
  },
      width = window.innerWidth - margin.left - margin.right,
      height = window.innerHeight + margin.top + margin.bottom;
  var map = d3.select("#mapEurope").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("class", "country").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var projection = d3.geoMercator().scale(210).center([0, 0]).translate([width / 2, height / 2]);
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
  }); // Convertir les coordonnées x, y du clic en coordonnées de longitude et de latitude
  // const [lon, lat] = projection.invert([event.x, event.y]);
  // ajouterLegende(colorScale);
};

exports.rendTroubleEurope = rendTroubleEurope;