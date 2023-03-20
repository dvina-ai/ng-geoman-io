# @dvina/ngx-leaflet-geoman

> Leaflet Geoman extension to the @asymmetrik/ngx-leaflet package for Angular.io
> Provides Leaflet Geoman integration into Angular.io projects. Compatible with Leaflet v1.x and Leaflet Geoman-io 2.x

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [API](#api)
-   [Contribute](#contribute)
-   [License](#license)
-   [Credits](#credits)

## Install

Install the package and its peer dependencies via npm (or yarn):

```shell
npm install leaflet
npm install @asymmetrik/ngx-leaflet
npm install @geoman-io/leaflet-geoman-free
npm install @dvina/ngx-leaflet-geoman
```

If you intend to use this library in a typescript project (utilizing the typings), you will need to also install the leaflet typings via npm:

```shell
npm install --save-dev @types/leaflet
```

## Usage

To use this library, there are a handful of setup steps to go through that vary based on your app environment (e.g., Webpack, ngCli, SystemJS, etc.).
Generally, the steps are:

-   Follow the instructions to install and configure [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet)
-   Install this library and the Leaflet typings (see above).
-   Import the Leaflet and leaflet-geoman-free stylesheet
-   Import the ngx-leaflet and ngx-leaflet-geoman modules into your Angular project
-   Create and configure a map (see docs below)

### Import the Leaflet Stylesheet

For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load `./node_modules/leaflet/dist/leaflet.css` and `./node_modules/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css`.
How you include the stylesheet will depend on your specific setup. For examples, refer to the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) README

### Import Code Dependencies and Module

This project is exported using UMD and it includes typings.
So, you shouldn't have to do anything special to use it if you're building your project in Typescript.

#### Typescript Angular.io Module Import

Before you can use the module in your Angular.io app, you'll need to import it in your application.
Note that you also need to import the ngx-leaflet module as well.

For example, in your `app.module.ts`, add:

```js
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletGeomanModule } from '@dvina/ngx-leaflet-geoman';

...
imports: [
	...
	LeafletModule,
	LeafletGeomanModule
]
...
```

### Create and Configure a Map with the Geoman

To create a map, use the `leaflet` attribute directive. This directive must appear first.
You must specify an initial zoom/center and set of layers either via `leafletOptions` or by binding to `leafletZoom`, `leafletCenter`, and `leafletLayers`.
Finally, add the `leafletDraw` attribute directive to add the leaflet draw control and configure it with `leafletDrawOptions`.

```html
<div leafletGeoman [leafletGeomanOptions]="options" (leafletDrawStart)="onDrawStart($event)"></div>
```

#### leafletGeoman

This is an attribute directive that initiates the leaflet geoman free plugin.
