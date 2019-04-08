# **!ATTENTION: READ CAREFULLY!**
* **Don't use property type `Array` in typescript components, it will ruin your day**
```
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ExampleComponent',
  props: {
    /** DON'T DO IT, USE Object INSTEAD, UNLESS YOU WANT SPEND HOURS IN PAIN SUFFERING OF MISTERIOS ERRORS */
    testProp: Array 
  },
})
</script>
```
* At the very first build you might face error like there is no index page, don't worry, stop the dev server and run it again - everything will be fine
* **Dynamic image src bug. Thanks to Bemto**: this will NOT work: ```+e.IMG.image(:src="imagePathVariable")``` bemto converts image path to an emty base64 image. Don't use ```+e``` or ```+b``` bemto syntax with ```img``` tag with dynamic src. Use normal pug syntax instead ```IMG.image(:src="imagePathVariable" class="blockName__image")```
* At the very first build you might face error like there is no index page, don't worry, stop the dev server and run it again - everything will be fine
* **Async functions inside router-view hooks**: all synchronous code must run first. Any synchronous code written after ```await``` will NOT work properly.


## Build Setup
``` bash
# install dependencies
$ yarn install

# serve in development mode with hot reload at localhost:3000
$ yarn start

# serve in production mode with hot reload at localhost:3000
$ yarn prod

# generate static project
$ yarn run generate
```
