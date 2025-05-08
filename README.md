# mycanary UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Prototype

The prototype / dev site is here:

https://mycanary-dev.azurewebsites.net/

## Pod site

The POD site is accessible here:

https://mycanary-pod-dev.azurewebsites.net/pod/631be06c3c40e95312c3b863

Where 631be06c3c40e95312c3b863 is the property ID


## Backend API

https://mycanary-backend.azurewebsites.net/api

Postman:  https://gitlab.com/topcoder-consulting/my-canary/backend/-/tree/main/docs

## Designs

* [Desktop](https://marvelapp.com/prototype/dh255ei/screen/87320582)
* [Tablet](https://marvelapp.com/prototype/b1hg0jd/screen/87473386)
* [Mobile](https://marvelapp.com/prototype/94eghcd/screen/87325106)
* [Styleguide](https://marvelapp.com/prototype/95babab)
* [Source files](https://drive.google.com/drive/folders/1Lb9EHtFxE37BdYKJCYyrxJ-z2VpUz3KK)

## Tech stack

* Angular 14+
* Contentful for static content (http://contentful.com/)
  * https://www.contentful.com/developers/docs/javascript/tutorials/using-contentful-in-an-angular-project/
* Node on the backend
  * https://gitlab.com/topcoder-consulting/my-canary/backend
* ATTOM for property data
  * https://api.developer.attomdata.com/docs
  * https://github.com/Onboard-Informatics
  * API key for dev: `c68d740accfe6c7197e7a3362f823b07`

# Configuration

The app can be configured using a either the `.env` file or environment variables. A sample of the `.env` file is included as the `sample.env` file. The names of these variables can be found in the `sample.env` file as well. The key (name) of all configurable properties will be the same for both, but the values set using environment variables get precedence over values set using the `.env` file.

To get started, copy the `sample.env` file to `.env`.

Then, modify the values to configure the apps.

The app supports the following configurable parameters.

| Env Config Name | Description |
| :------------------------------------- | :---------------------------------------- |
| `ATTOM_API_KEY` | the atom api key. |

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
