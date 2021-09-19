<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// MATERIAL IMPORTS
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

export const dateFormat = 'dd/MM/yyyy';

Vue.use(VueMaterial);

Vue.filter('formatDate', (date: Date) => {
  const year = String(date.getFullYear());
  const month = ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1);
  const day = (date.getDate() > 9 ? '' : '0') + date.getDate();
  return `${day}/${month}/${year}`;
});

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";
@include md-register-theme("default", (
  primary: #7070ec,
  accent: #9c9c9c,
));

@import "~vue-material/dist/theme/all";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.md-dialog {
  .md-dialog-container {
    padding: 2em;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .md-dialog-content {
    overflow: unset;
  }
}
</style>
