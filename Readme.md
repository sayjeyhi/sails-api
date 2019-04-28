# Healthika prject to hackahealth contest

> 🎉 Hey dude , we have new way of health caring :)

Simple but powerful user behavior based system

- Node.js
- Mongodb
- sails project
- MVC architecture
- Machine learning base on bigML 
- JWT authentication
- Clean code

### Run locally

```
npm install
npm run dev
```

you should have `nondemon` installed globally , if don't have it 
install it :
```$xslt
npm install nodemon -g
```

**Controllers**

Go to `api/controllers` folder and you could see our controllers

**Add a new reducer**

Go to `src/reducers/index.js` and import a new reducer, and add the name to the list in the `rootReducer`.

**View application state**

Press <kbd>Ctrl</kbd> + <kbd>H</kbd> to open the Redux Devtools.

### Build production

In production mode, webpack outputs to the `public` directory, allowing the production server to serve static files.

```
npm run deploy
```

### TODO

We did our best in this 3 days , but if you want to improve it
you could add to this project :

- [ ] Improve user folder part in application
- [ ] Improve models to have better collections
