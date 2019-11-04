# beer_app

Before you read this, you must know that I'm writing this at 6am after programming the entire night and the deadline was technically yesterday. So this documentation isn't really done or well written to be honest. 

## Table of Contents

- [Introduction](#introduction)
- [Code](#code)
- [Reflection](#reflection)
- [Licence](#licence)

## Introduction
This is my first time using VueJS and also TypeScript. I made this app for an internship application. Saddly I didn't have enough time to clean up the project (maybe I did, which means you can't read this :D). But the app works, is responsive and has extra features like: a search bar, carousel, color scaler, intersection observer. 

## Code
In this section I will show (and briefly explain) the code for the requirements.

Some requirements for the app were:
- [Menu is fixed while scrolling](#fixed-menu)
- [Sorting option](#sorting-option)
- [Detail page shows 3 relevant other items](#relevant-items)
- [Generated sitemap](#sitemap)
- [Responsive layout](#responsive-layout)


#### Fixed Menu
```html
<div id="app">
    <app-navigation />

    <div id="app-view">
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>

      <app-footer class="grid-base"></app-footer>
    </div>
  </div>
```
Because I use routes the pages are loaded inside the `router-view`. This means I can put things like navigation outside. I put the `router-view` and `app-footer` inside the `#app-view` to allow `overflow: scroll`. I didn't have to mess with the position of the navbar at all. 

#### Sorting Option
```ts
  @Watch("sortingKey")
  @Watch("ascending")
  function(): void {
    this.sortBeers();
  }
```
For the sorting I used watchers to look at the sortingKey and ascending property.

#### Relevant Items
```ts
const findMatchingIbu = async (range: number): Promise<void> => {
  const results: APIData[] | any = await fetcher(
    `${baseUrl}?ibu_gt=${data.ibu - range}&ibu_lt=${data.ibu + range}`
  );

  for (let result of results) {
    if (map.size == 3) break;

    if (data.id !== result.id) {
      map.set(result.id, result);
    }
  }
  
    if (map.size < 3) {
      // Afraid this might clash with the API ratelimit
      return findMatchingIbu(range + 10);
    }
  };
  await findMatchingIbu(1);
}
```
For getting relevant other items, I used a function that takes a number as an argument. If it can't find on the first try it will call itself untill it does find some data. 


#### Sitemap
```ts
// @ts-ignore: Property 'options' does not exist on type 'VueRouter'.
    this.routes = this.$router.options.routes.filter((route: any) => {
      // Not sure what the qualifications are for a route to be included in the sitemap
      if ("name" in route && !/\:/.test(route.path)) {
        return { name: route.name, path: route.path };
      }
    });
```
Since you can access the routes it's pretty easy to get some kind of sitemap. I just didn't know what the requirements were for a route to be inserted in the sitemap.

#### Responsive Layout
```scss
.grid-base {
  display: grid;
  width: 100vw;
  grid-template-columns: calc(10vw - 7.5vmin) minmax(auto, 960px) calc(
      10vw - 7.5vmin
    );

  & > * {
    grid-column: 2 / 3;
    min-width: 0;
  }
}
```
To make it easy more myself I just used a base grid. To make this work I just had to give all the view elements (pages) a grid-base class.

I also used classes for the font-sizes.

```scss
.font-huge {
  font-size: 32px;
}

.font-large {
  font-size: 26px;
}

.font-medium {
  font-size: 22px;
}

.font-regular {
  font-size: 18px;
}

.font-small {
  font-size: 14px;
}
```

And with media queries I could easily alter their sizes. I also used a trick to have [fluid typography](https://css-tricks.com/snippets/css/fluid-typography/). 

```scss
element {
  font-size: calc(18px + (40 - 18) * ((100vw - 320px) / (1600 - 320)));
}
```

### Reflection
Sadly I didn't have enough time to clean up the code, which is totally my fault. I tried to work at home, which doesn't work at all for me (unless I have a deadline, like right now :D).

For this test I had to keep track of a time log. But it was impossible for me to keep track of it, because at home I worked maybe an hour. Or I didn't really work at all, but just watched tutorials. But I can say that I made the app in about a week. But a lot of hours went into watching/reading tutorials.

## Licence

MIT © [Jesse Dijkman](https://github.com/jesseDijkman1)

