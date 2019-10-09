<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/" class="main-nav__item">Home</router-link>
      <router-link to="/categories" class="main-nav__item">Categories</router-link>
      <router-link to="/random" class="main-nav__item">Random</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir Next";
}

#app {
  margin-top: 50px;
}

.main-nav {
  position: fixed;
  display: flex;
  top: 0;
  align-items: center;
  height: 50px;
  padding: 0 10vw;
  width: 100%;
  background-image: linear-gradient(-90deg, #7b1e00 0%, #000000 63%);
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.32);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.32);

  &__item {
    margin-left: 5vw;
    text-decoration: none;
    color: white;
  }
}
</style>

