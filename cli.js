#!/usr/bin/env nodejs
/*jslint indent: 2, maxlen: 80, node: true */
/* -*- coding: UTF-8, tab-width: 2 -*- */
'use strict';

var licu = require('./licu.js'), spec = process.argv.slice(2).join(' '), info;
try {
  info = (function () {
    switch (spec) {
    case '-v':
      return { spdxTableVersions: licu.spdxVersions };
    }
    return licu.orThrow(spec);
  }());
  console.log(JSON.stringify(info, null, 2
    ).replace(/^(\S)\s+/g, '$1 '
    ).replace(/(\[|\{)\n\s+(?!"|\s)/g, '$1 '
    ).replace(/\n\s*(\}|\])/g, ' $1'
    ));
} catch (err) {
  console.error('E:', (err.message || err));
  process.exit(3);
}
