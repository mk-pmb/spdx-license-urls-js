
<!--#echo json="package.json" key="name" underline="=" -->
spdx-license-urls
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Provide license name via spdx-licenses, generated license URLs and additional
details.
<!--/#echo -->

Main purpose of this module is to centralize efforts for URL template
maintaince and anomaly handling.

The additional info on licenses is very sparse for now,
so feel free to pull-request better data for your favorite licenses.


API
---

  * `licu(spec)`: Try to find info on the license `spec`
    specified as an SPDX string.
    If found, return that info as a JS object, else return `false`.
    * Special list attributes: Some keys in the info object are each either
      `false` or an array of identifier strings that you might want to lookup
      further.
      The lists have not been checked for validity, so be prepared for errors
      in the follow-up lookups.
      * `alertnatives`: Alternative licenses.
        `licu()` might know about them.
      * `exceptions`: Special terms and conditions.
        `licu()` can ask the `spdx-license-exceptions` module about them.
        Some of them grant additional usage permissions with fewer
        restrictions, e.g.
        [for fonts](https://spdx.org/licenses/Font-exception-2.0.html).
  * `licu.orThrow(spec)`: Like `licu(spec)` but on failure, throw an error
    instead of returning `false`.
  * `licu.spdxVersions`: The list versions of lookup tables used.


Usage
-----

In node.js: see source of [cli.js](cli.js)

CLI:

```bash
$ spdx-license-urls -v
```
```json
{ "spdxTableVersions": {
    "licenses": "1.19",
    "exceptions": "2.5" } }
```

```bash
$ spdx-license-urls GPL-3.0 WITH Font-exception-2.0 OR Expat
```

<!--#include file="doc/gpl3-font-expat.json" code="json" -->
<!--#verbatim lncnt="32" -->
```json
{ "name": "GNU General Public License v3.0 only",
  "id": "GPL-3.0",
  "OSIApproved": true,
  "idUrlArg": "GPL-3.0",
  "licTextPlainUrl": "http://git.spdx.org/?a=blob_plain;p=license-list.git;hb=HEAD;f=GPL-3.0.txt",
  "licInfoUrl": "https://spdx.org/licenses/GPL-3.0.html",
  "licAuthor": {
    "firstName": null,
    "lastName": null,
    "email": null,
    "blogTitle": null,
    "blogUrl": null,
    "websiteTitle": null,
    "websiteUrl": null,
    "githubNick": null,
    "twitterNick": null },
  "licTextOsiUrl": "https://opensource.org/licenses/GPL-3.0",
  "licTextAuthoritativeUrl": null,
  "standardFileHeader": null,
  "logos": [ {
      "srcType": "wmcommons",
      "srcId": "GPLv3_Logo.svg" } ],
  "wikipediaPageUrlpart": {
    "de": "GNU_General_Public_License",
    "en": "GNU_General_Public_License" },
  "alertnatives": [
    "Expat" ],
  "exceptions": [
    "Font-exception-2.0" ] }

```
<!--/#include -->

```bash
$ spdx-license-urls fonT-excEption-2.0
```
```json
{ "id": "Font-exception-2.0",
  "name": "Font exception 2.0",
  "idUrlArg": "Font-exception-2.0",
  "xcpInfoUrl": "https://spdx.org/licenses/Font-exception-2.0.html" }
```



<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
