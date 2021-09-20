<template>
  <div id="home" class="md-layout md-gutter md-alignment-center">
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/product-list">
      <md-card class="md-primary" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Listado de Productos</div>
            <div class="md-subhead">Ver listado de Productos.</div>
          </md-card-header>

          <md-card-content>
            Podrá ver los productos registrados en el sistema y modificar su información.
          </md-card-content>
        </md-ripple>
      </md-card>
    </router-link>
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/config">
      <md-card class="md-primary" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Configuración</div>
            <div class="md-subhead">Configure aquí los parámetros.</div>
          </md-card-header>
        </md-ripple>
      </md-card>
    </router-link>
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/alerts">
      <md-card class="md-primary" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Alertas</div>
            <div class="md-subhead">Sección de alertas</div>
          </md-card-header>

          <md-card-content>
            Consulte aquí si existe algún producto que puede caducar o haber caducado.
          </md-card-content>

          <div class="md-card-footer">
            <md-badge v-if="hardAlerts > 0" class="error-badge" :md-content="hardAlerts" />
            <md-badge v-if="softAlerts > 0" class="warning-badge" :md-content="softAlerts" />
          </div>
        </md-ripple>
      </md-card>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment/moment';
import { namespace, ProcessProduct } from '@/store/product/types';
import { ProductActions } from '@/store/product/actions';
import { ProductGetters } from '@/store/product/getters';

@Component
export default class Home extends Vue {
  softAlerts = 0;

  hardAlerts = 0;

  allProducts: ProcessProduct[] = [];

  mounted(): void {
    this.$store.dispatch(`${namespace}/${ProductActions.FETCH_DATA}`);
    this.allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_ALL_PROCESSED_PRODUCTS}`];
    const daysForExpirationAlert = this.$store.getters[`${namespace}/${ProductGetters.GET_DAYS_FOR_EXPIRATION_ALERT}`];

    this.softAlerts = 0;
    this.hardAlerts = 0;

    this.allProducts.forEach((product) => {
      let levelOfAlert = 0;
      product.stock.forEach((stock) => {
        let levelOfAlertForCurrentStock = 0;
        if (moment(stock.expiredDate).diff(moment(), 'days') < daysForExpirationAlert) {
          levelOfAlertForCurrentStock = 1;
        }
        if (moment(stock.expiredDate).diff(moment(), 'days') < 0) {
          levelOfAlertForCurrentStock = 2;
        }

        if (levelOfAlertForCurrentStock > levelOfAlert) {
          levelOfAlert = levelOfAlertForCurrentStock;
        }
      });

      if (levelOfAlert === 1) {
        this.softAlerts += 1;
      }
      if (levelOfAlert === 2) {
        this.hardAlerts += 1;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    margin: 4px;
    height: 15rem;

    .md-card-footer {
      display: flex;
      padding: 16px;
      height: 2rem + 2rem;
      flex-direction: row-reverse;

      .md-badge {
        font-size: 1rem;
        height: 2rem;
        width: 2rem;
        position: relative;
        right: unset;
        z-index: unset;
        margin: 5px;

        &.warning-badge {
          background-color: #e7ca60;
          color: black;
          font-weight: bolder;
        }
        &.error-badge {
          background-color: #f34848;
          color: white;
          font-weight: bolder;
        }
      }
    }
  }
</style>
