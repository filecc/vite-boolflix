# The Mooovie DB - coded by [filecc](https://filecc.dev)

Live Site available at [here](https://filecc-boolflix.vercel.app)

To run the project locally simply, ```git clone``` and

```
npm i
npm run dev -- --host
```
## Table of contents

- [Overview](#overview)
  - [The Project](#the-project)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Request and Hint](#request-and-hint)
- [Author](#author)

### The Project

As part of [Boolean Academy](https://boolean.careers/) journey, I was asked to manipulate and use [The Movie DB](https://developers.themoviedb.org/3/getting-started/introduction)'s API, to create some sort of "Netflix/Movie Database".

### Links

- Live Site URL: [Live Site](https://filecc-boolflix.vercel.app)

## My process

### Built with

- Mobile-first workflow
- SASS
- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [Vue3](https://vuejs.org/) - JS Framework
- [Vue Router](https://router.vuejs.org/) - Powerfull Routing
- [Pinia](https://pinia.vuejs.org/) - Amazing ```store``` tool


### What I learned

I managed, finally, to completely work with [Vue Router](https://router.vuejs.org/), to get users go through many pages on the same site, with no other HTML page then the ```index.html```.

```js
const routes = [
  { path: '/', component: () => import('../views/Home.vue')},
  { path: '/404', component: () => import('../views/NotFound.vue') },  
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
  { path: '/search',component: () => import('../views/Search.vue')},
  { path: '/movie/:name', component: () => import('../views/SingleItemDisplayDetail.vue') },
  { path: '/series/:name', component: () => import('../views/SingleItemDisplayDetail.vue') },
  { path: '/tv/:name', component: () => import('../views/SingleItemDisplayDetail.vue') },
  { path: '/actors/:name', component: () => import('../views/SingleActor.vue') },
];


const router = createRouter({
  history: createWebHistory(),
  routes
})
```
Thanks so much to [ColorThief](https://github.com/lokesh/color-thief), for this wonderful piece of code that just change a color, but makes the APP just... amazing.

```js
const r = colorThief.getColor(img)[0];
const g = colorThief.getColor(img)[1];
const b = colorThief.getColor(img)[2];
```

And thanks to [Mohamed Ashraf](https://github.com/MohmmedAshraf/blade-flags/tree/main/resources/svg), for his amazing work and sharing. <img style='width: 30px' src='public/images/flags/country-eg.svg' alt='arab' >

## Request and Hint

If you have something to say just head up at Instagram or Twitter. ☺️

## Author

- Website - [filecc](https://www.filecc.dev)
- Instagram - [Instagram](https://www.instagram.com/filecc)
- Frontend Mentor - [@filecc](https://www.frontendmentor.io/profile/filecc)
- Twitter - [@_filecc](https://www.twitter.com/_filecc)

