/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function () {
  var EX, spdxLicTable = require('spdx-licenses'),
    spdxLicExceptionsTable = require('spdx-license-exceptions'),
    knownLicenseDetails = require('./details.js');

  function pushClause(rxGrp) {
    this[this.length] = arguments[rxGrp + 1];
    return '';
  }

  EX = function spdxLicenseInfoWithUrls(spec) {
    spec = String(spec);
    var info = EX.cache[spec], alertnatives, exceptions;
    if (info) { return info; }

    info = (spec.match(/^\S+-(exception)(?:-\S+|)$/i) || false);
    switch ((info[0] === spec) && info[1].toLowerCase()) {
    case 'exception':
      return spdxLicExceptionsTable(spec);
    }

    alertnatives = spec.split(/\s+OR\s+/i);
    exceptions = [];
    spec = alertnatives.shift();
    spec = spec.replace(EX.withExceptionRgx, pushClause.bind(exceptions, 1));
    info = spdxLicTable.spdx(spec);
    if (!info) { return info; }

    info = Object.assign({}, info, { idUrlArg: encodeURIComponent(info.id) });
    Object.keys(EX.tmpl).forEach(function (key) {
      info[key] = EX.tmpl[key].replace(/%id/g, info.idUrlArg);
    });
    Object.assign(info, knownLicenseDetails['%%defaults'],
      knownLicenseDetails[info.id]);

    if (info.licTextOsiUrl === true) {
      info.licTextOsiUrl = 'https://opensource.org/licenses/' + info.idUrlArg;
    }

    info.alertnatives = (alertnatives.length === 0 ? false : alertnatives);
    info.exceptions = (exceptions.length === 0 ? false : exceptions);
    EX.cache[spec] = info;
    return info;
  };
  EX.spdxVersions = {
    licenses: spdxLicTable.version,
    exceptions: spdxLicExceptionsTable.spdxVersions.exceptions,
  };
  EX.cache = {};
  EX.withExceptionRgx = /\s+WITH\s+(\S+-Exception(?:-\S+|))(?=\s|$)/ig;

  EX.tmpl = {
    licTextPlainUrl: 'http://git.spdx.org/?a=blob_plain' +
      ';p=license-list.git' +
      ';hb=HEAD' +
      ';f=%id.txt',
    licInfoUrl: 'https://spdx.org/licenses/%id.html',
  };

  EX.orThrow = function (spec) {
    spec = String(spec);
    var info = EX(spec);
    if (info) { return info; }
    throw new Error('No data available for license ' + JSON.stringify(spec));
  };

  return EX;
}());
