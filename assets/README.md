# Assets

This is a really hacky guide on how to compile assets because the pipeline is really old
and keeps breaking.

The real fix is to rewrite the frontend.

## Install

```
yarn install
```

## js deps

```
npm run deploy-js
```

## Compiling Sass

I removed the following from package.json and instead compiled the scss manually (`npm -g sass`, then `npm run sass`)

```json
// package.json
"sass": "sass --style=compressed ./scss:../priv/static/css",
"watch:sass": "sass --watch ./scss:../priv/static/css"

// dep
"sass": "^1.69.5",
"node-sass": "^4.14.1",
```
