# htm
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/htm/nodejs.yml?style=flat-square)](https://github.com/substrate-system/htm/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/htm?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://substrate-system.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/htm)](https://packagephobia.com/result?p=@substrate-system/htm)
[![gzip size](https://flat.badgen.net/bundlephobia/minzip/@substrate-system/htm)](https://bundlephobia.com/package/@substrate-system/htm)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


UI components made with [`htm`](https://github.com/developit/htm).

[See a live demo](https://substrate-system.github.io/htm/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Example](#example)
  * [Button](#button)
  * [JS](#js)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
- [CSS](#css)
  * [Import CSS](#import-css)
  * [pre-built JS](#pre-built-js)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/htm
```

## Example

### Button

### JS
```js
import { button } from '@substrate-system/htm/button'
import '@substrate-system/htm/css/button'
```


## Modules

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import * as components from '@susbtrate-system/htm'
```

### Common JS
```js
require('@susbtrate-system/htm')
```

## CSS

### Import CSS

```js
import '@susbtrate-system/htm/css'

// or modules
import '@susbtrate-system/htm/css/button'
```

### pre-built JS
This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/htm/dist/index.min.js ./public/htm.min.js
```

#### HTML
```html
<script type="module" src="./htm.min.js"></script>
```
