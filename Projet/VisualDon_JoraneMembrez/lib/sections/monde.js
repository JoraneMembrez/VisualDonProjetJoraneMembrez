"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afficheMonde = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _data = require("./data");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var afficheMonde = function afficheMonde() {
  var dataPays = (0, _data.rendDataCarteDuMonde)();
  var margin = {
    top: 10,
    right: 40,
    bottom: 20,
    left: 40
  },
      width = window.innerWidth - margin.left - margin.right,
      height = window.innerHeight + margin.top + margin.bottom;
  var map = d3.select("#map-paysPlusTouches").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var projection = d3.geoOrthographic().scale(210).center([0, 0]).translate([width / 2, height / 2]);
  var path = d3.geoPath().projection(projection);
  var colorScale = d3.scaleLinear().domain([d3.min(dataPays.map(function (d) {
    return d.anorexie;
  })), d3.max(dataPays.map(function (d) {
    return d.anorexie;
  }))]).range(["blue", "steeylblue"]);
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {
    //  console.log("Data 2021 : ");
    // console.log(dataPays);
    data.features.forEach(function (d) {
      var infoPays = dataPays.find(function (dc) {
        return dc.key == d.id;
      });

      if (infoPays) {
        d.properties.pays = infoPays.Pays;
        d.properties.anorexie = infoPays.anorexie;
        d.properties.boulimie = infoPays.boulimie;
      } else {
        d.properties.pays = null;
        d.properties.anorexie = null;
        d.properties.boulimie = null;
      }
    });
    map.append("g").selectAll("path").data(data.features).join("path").attr("d", path).attr("fill", function (d) {
      var anorexie = dataPays.anorexie;
      var boulimie = dataPays.boulimie;

      if (anorexie && boulimie) {
        return colorScale(anorexie + boulimie);
      } else {
        return "white";
      }
    });
  });
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
  }; // sert à bouger la terre


  var dragged = function dragged(event) {
    var _projection$invert = projection.invert([event.x, event.y]),
        _projection$invert2 = _slicedToArray(_projection$invert, 2),
        x = _projection$invert2[0],
        y = _projection$invert2[1];

    projection.rotate([-x, -y]);
    map.selectAll("path").attr("d", path);
  };

  map.call(d3.drag().on("drag", dragged)); // clic sur le pays et affichage des données particulières

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

  var _projection$invert3 = projection.invert([event.x, event.y]),
      _projection$invert4 = _slicedToArray(_projection$invert3, 2),
      lon = _projection$invert4[0],
      lat = _projection$invert4[1];
};

exports.afficheMonde = afficheMonde;

var afficheSectionDonnes = function afficheSectionDonnes(donneesAffichees) {
  // console.log(donneesAffichees);
  var casPays = document.querySelector("#nombreCasPays");
  var html = "<h3>".concat(donneesAffichees.pays, "</h3><p>Nombre de cas d'anorexie : ").concat(donneesAffichees.anorexie, "</p><p>Nombre de cas de boulimie : ").concat(donneesAffichees.boulimie, "</p>");
  casPays.classList.add("donneesPays");
  casPays.innerHTML = html;
};