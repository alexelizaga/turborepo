# BrocodeNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Disable cors

1. Add domain to cors.json
2. Execute `gsutil cors set cors.json gs://brocodeschoolapp.appspot.com`
3. Check cors with cmd: `gsutil cors get gs://brocodeschoolapp.appspot.com`

--- dev ---
`gsutil cors set cors.json gs://brocodeappdev.appspot.com`
`gsutil cors get gs://brocodeappdev.appspot.com`

cmd:
`console.log('hello);`

# Deploy beta channel

`ng build --prod`

`firebase hosting:channel:deploy <feture> --project brocodeschoolapp`

Example:

`ng build --prod && firebase hosting:channel:deploy testing-md --project brocodeschoolapp`

## Theme

```
┗ ┣  ┃ 📦 📜 📂 📄

🎨 theme
 ┣ 📄 primary
 ┣ 📄 accent
 ┣ 📄 warn
 ┣ 📂 foreground
 ┃ ┣ 📄 base
 ┃ ┣ 📄 divider
 ┃ ┣ 📄 dividers
 ┃ ┣ 📄 disabled
 ┃ ┣ 📄 disabled-button
 ┃ ┣ 📄 disabled-text
 ┃ ┣ 📄 hint-text
 ┃ ┣ 📄 secondary-text
 ┃ ┣ 📄 icon
 ┃ ┣ 📄 icons
 ┃ ┣ 📄 text
 ┃ ┣ 📄 slider-min
 ┃ ┣ 📄 slider-off
 ┃ ┗ 📄 slider-off-active
 ┣ 📂background
 ┃ ┣ 📄  status-bar
 ┃ ┣ 📄  app-bar
 ┃ ┣ 📄  background
 ┃ ┣ 📄  hover
 ┃ ┣ 📄  card
 ┃ ┣ 📄  dialog
 ┃ ┣ 📄  disabled-button
 ┃ ┣ 📄  raised-button
 ┃ ┣ 📄  focused-button
 ┃ ┣ 📄  selected-button
 ┃ ┣ 📄  selected-disabled-button
 ┃ ┣ 📄  disabled-button-toggle
 ┃ ┣ 📄  unselected-chip
 ┃ ┗  disabled-list-option
 ┗ 📄 is-dark         // bool, whether dark theme or not

```
