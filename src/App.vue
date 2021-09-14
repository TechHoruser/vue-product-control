<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="js">
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
Vue.material = {
  ...Vue.material,
  locale: {
    ...Vue.material.locale,
    dateFormat,

    firstDayOfAWeek: 1,

    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    shortDays: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
    shortedDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    shorterMonths: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],

    startYear: 1900,
    endYear: 2099,
  },
};

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
