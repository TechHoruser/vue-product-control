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

import Alerts from './components/Alerts.vue';
import Home from './components/Home.vue';
import Config from './components/Config.vue';
import RegisterUse from './components/RegisterUse.vue';
import MedicineList from './components/MedicineList.vue';

export const dateFormat = 'dd/MM/yyyy';

Vue.use(VueMaterial);

Vue.filter('formatDate', (date: Date) => {
  const year = String(date.getFullYear());
  const month = ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1);
  const day = (date.getDate() > 9 ? '' : '0') + date.getDate();
  return `${day}/${month}/${year}`;
});

@Component({
  components: {
    Home,
    Alerts,
    Config,
    RegisterUse,
    MedicineList,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
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
</style>
