[![CircleCI](https://circleci.com/gh/Kamforka/movie-viewer.svg?style=shield)](https://circleci.com/gh/Kamforka/movie-viewer)

# Movie Viewer 1.0

A simple single page app based on Angular 4 to browse popular movies via the TMDb API.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Live demo

Take a look at the live demo at: [DEMO](https://movie-viewer-e727f.firebaseapp.com)

## Features

[Angular CLI](https://github.com/angular/angular-cli)  
[Bootstrap 4](https://v4-alpha.getbootstrap.com/)  
[ng-bootstrap](https://ng-bootstrap.github.io/#/home)  
[ngrx](https://github.com/ngrx/ngrx.github.io)

## Getting started

In order to use the application you need to perform the following: 

    $ git clone https://github.com/kamforka/movie-viewer.git
    $ cd movie-viewer/
    $ npm install 

## Running the development server

To set up the application locally you should use the [Angular CLI](https://github.com/angular/angular-cli) command `ng serve` (make sure you are inside the project folder) then in your preferred browser navigate to `http://localhost:4200/`, after the application was compiled you should see it running there.  
Any change in the source files will trigger an automatic reload of the development server.

## Code scaffolding

The CLI can also spare you a lot of work by providing automatic code generation.  
If you are not familiar with it yet go and take a look at the official documentation: [Generating components, directives, pipes and services](https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services).

## Running unit tests

Unit tests are provided for the application via [Karma](https://karma-runner.github.io). To run them just execute `ng test`.  
Both Firefox and Chrome launchers are installed through `npm install`, so just add your favourite to the `browser` option of `karma.conf.js`. (Entries can be: `Chrome`, `Firefox`)

## Building the app

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Continous integration and deployment

CircleCI is being used to perform continous unit testing and continous deployment. After a successful test run and an errorfree build the app is deployed to Firebase hosting via [firebase-tools](https://github.com/firebase/firebase-tools).

## Further help

If still in doubt please feel free to contact me at antalszabolcs01@gmail.com.

