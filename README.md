# Can-Hot

**REAL** and frictionless *hot reloading for [CanJS](https://github.com/canjs/canjs)* components without loosing state!

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

##What is it

[CanJS](https://github.com/canjs/canjs) is a great framework (library) for building dynamic web applications. 
It gives out of the box everything you need to build modern dynamic web UIs, while keeping it simple.

**Can-Hot** is a small add-on aimed to make your DX (developers experience) much more pleasant and with less friction,
it allows you to **tweak can.Components in realtime** the same way as for example [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
for React does, so you need rarely bother about full page reloads while application development process.

##Install

```bash
npm install can-hot
```
Implicitly depends on `can` and `jquery` npm modules.

##Usage

**Can-hot** provides a basic mechanics for **hot-swapping can.Components** and can be used with any set of tools 
for hot-reloading. Given example uses [Steal-HMR](https://github.com/whitecolor/steal-hmr) 
and [Watchalive Dev Server](https://github.com/whitecolor/watchalive). 

```html
<script src="/node_modules/steal/steal.js" config="/package.json!npm">    
  import HMR from 'steal-hmr'
  import canHot from 'can-hot'
   
  // we can call `canHot.reload()` method any time when 
  // some `can.Component` has been replaced by new instance
  // but we are using it here with Steal-HRM    

  // we may instruct Can-Hot to preserve state of reloaded components.
  // Component having their own state is not very good thing
  // and side effects are possible, so it is `false` by default
  canHot.config({preserveState: true})

  new HMR({                    
    main: 'app',    
            
    // here we just attach Can-Hot's `after` hook to steal-HMR
    // so it knows when reloading are finished
    plugin: [canHot],    
    
    handle: watchalive.onFiles,   
    teardown: () => $('bmi-app').remove()
  })
</script> 
```

##Try and explore sources of demo app

Try and test how all this works with module's demo app.
```bash
git clone http://github.com/whitecolor/can-hot
npm install # please, use NPM 3, otherwice remove system.npmAlgorithm in package.json
npm run start # app will run on 7000, to use other port: npm run start -- --port your_port
```
Open your browser http://localhost:7000
You can changes files `js/css/less` *inside the app folder* and see what happens
Notice that css/less reload do not made any changes to apps current state

*NB!* This demo app uses watchalive server-side pre-compilation for *.js sources with 
[BabelJS](https://babeljs.io) just for the sake of example of configuration.

##Licence

ISC.
