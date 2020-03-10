This code repo is only for frontend skill demostration, it doesn't show anything related to UI/UX design, and I `don't have` experience with UI/UX design.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To install all packages, node version has be >= 11.0.

## Technologies

Typescript + React + SCSS module + Jest + Enzyme

Redux is not being used in this project, it is a little overkill for this project. Instead it is using hooks API and local state.

No services, a Marvel API hook is created to load data.

## How to start

install yarn (or npm)

run `yarn` to install all packages

run `yarn start` to run application

run `yarn test` to run tests

## Browser Compatability

This project is using default browser support from CRA, as it doesn't include polyfill for simplicity sake, it's recommended to use Chrome/Firefox to test.

## Linting and Formatting

This code base heavily relies on VSCode, please install all recommended workspace extensions to enable auto-fix.
All workspace settings and extensions are saved in .vscode folder
Linting and formatting are handled by Prettier + ESlint

## MARVEL API

API private key is supposed to be used `ONLY` on server side application; for frontend web application to authenticate, the website host should be registered on Marverl develop website.

To simplify this web app demo and focus on frontend, the private key is used in frontend to generate hash so that it can work with the API without registration and server side.

Private key is saved in .env.development.local which should `NOT` be saved in repo, but I removed it from gitignore to make it work for this coding challenge demo purpose `ONLY`.

It is not documented how to find if the character does not have a valid image, so this project excludes those characters for which either image path ends with 'image_not_available' or extension is 'gif'.

## Project structure

All root pages are saved in pages directory, it is not necessary to make such a dedicated folder, but it is useful when project is switched to SSR.

All components are saved in src/components folder.

Css theme is saved in styles folder. As it is quite simple in this case, there is only 1 theme.scss file created.

All API endpoint configurations are saved in .env.\* files. Web app will read them from process.env, so they can be easliy injected in build/release pipeline
