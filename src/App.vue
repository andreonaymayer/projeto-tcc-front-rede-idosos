<template>
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/login">login</router-link>
    </nav>
    <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,700,900');
#app {
  font-family: 'Montserrat';
  margin: 0;
  height: 100vh;
  background-color: #F9FFFA;
}

</style>
