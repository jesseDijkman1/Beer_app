<template>
  <div id="app">
    <app-navigation />

    <div id="app-view">
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>

      <app-footer class="grid-base"></app-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppFooter from "@/components/layout/AppFooter/index.vue";
import AppNavigation from "@/components/layout/AppNavigation/index.vue";
import { RouteObject } from "@/types";

import AppButton from "@/components/ui/AppButton.vue";

@Component({
  components: {
    AppFooter,
    AppNavigation,
    AppButton,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
:root {
  --color-main: #ffb800;
  --color-main-dark: rgba(255, 184, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir next", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: black;
  color: white;
}

#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: minmax(60px, auto) minmax(auto, calc(100vh - 60px));

  &::before {
    content: "";
    display: block;
    position: fixed;
    background-color: black;
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.8) 30%,
        rgba(0, 0, 0, 1) 100%
      ),
      url("https://rf-hobby.cz/wp-content/uploads/691.jpg");
    background-size: cover;
    background-blend-mode: luminosity;
    width: 100vw;
    height: 100vh;
    z-index: -2;
  }
}

#app-view {
  overflow-y: scroll;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style-type: none;
}

button,
input {
  outline: none;
  border: none;
  background: none;
}

// Font classes (mobile first)
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

// Base grid
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

.full-width {
  grid-column: 1 / 4;
  max-width: 100vw;
}

@media (min-width: 400px) {
  .grid-base {
    grid-template-columns: minmax(calc(15vw - 5vmin), auto) minmax(auto, 960px) minmax(
        calc(15vw - 5vmin),
        auto
      );
  }
}

@media (min-width: 600px) {
  .font-huge {
    font-size: 40px;
  }

  .font-large {
    font-size: 32px;
  }

  .font-medium {
    font-size: 24px;
  }

  .font-small {
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .font-huge {
    font-size: 50px;
  }

  .font-large {
    font-size: 40px;
  }
}
</style>
