This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To install all packages, node version has be >= 11.0

## Browser Compatability

This project is using default browser support from CRA, as it doesn't include polyfill for simplicity sake, it's recommended to use Chrome/Firefox to test.

## Linting and Formatting

This code base heavily relies on VSCode, please install all recommended workspace extensions to enable auto-fix.
All workspace settings and extensions are saved in .vscode folder
Linting and formatting are handled by Prettier + ESlint

## MARVEL API

API private key is supposed to be used ONLY on server side application; for frontend web application to authenticate, the website host should be registered on Marverl develop website.
To simplify this web app demo and focus on frontend, the private key is used in frontend to generate hash so that it can work with the API without registration and server side.
Private key is saved in .env.development.local which should NOT be saved in repo, but I removed it from gitignore to make it work for this coding challenge demo purpose ONLY.
