"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*jshint esversion: 6 */
function fetchData(uri) {
  var file_contents = "";
  (0, _nodeFetch["default"])(uri).then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      throw "Unable to find file at provided URL" + response.status;
    } // Examine the text in the response


    response.json().then(function (data) {
      console.log(data);
    });
  })["catch"](function (err) {
    console.log('Fetch Error :-S', err);
  });
}

function readData(file) {}

function parseHFormat(data) {
  var parsed = [];
  var lines = data.split("\n");
  var conf = '';
  var pred = '';
  var aa = '';
  lines.forEach(function (line, i) {
    conf += stripLine(line, "Conf: ");
    pred += stripLine(line, "Pred: ");
    aa += stripLine(line, "  AA: ");
  });
  aa.split("").forEach(function (_char, i) {
    parsed.push({
      aa: aa[i],
      pred: pred[i],
      conf: Number(conf[i])
    });
  });
  return parsed;
}

function stripLine(line, leader) {
  if (line.startsWith(leader)) {
    var re = new RegExp("^" + leader);
    return line.replace(re, "");
  } else {
    return '';
  }
}

function disopred_parse(data) {}

function dompred_parse(data) {}

function memsat_parse(data) {}

function genth_parse(data) {}

function ffpred_parse(data) {}

function contact_parse(data) {}

module.exports = {
  fetchData: fetchData,
  readData: readData,
  parseHFormat: parseHFormat
};