<template lang="html">
  <div id="product-list">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <md-toolbar>
      <div class="md-toolbar-section-start">
        <router-link to="/">
          <md-icon class="fas fa-chevron-circle-left md-size-2x md-primary"></md-icon>
        </router-link>
        <md-button class="md-primary md-raised" @click="showCreateProductDialog = true">Nuevo Producto</md-button>
      </div>

      <md-field md-clearable class="md-toolbar-section-end">
        <md-input placeholder="Nombre del producto" v-model="search" @input="searchOnTable()" required />
      </md-field>
    </md-toolbar>
    <md-table v-model="searched"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              md-card
              md-fixed-header
    >
      <md-table-empty-state v-if="search === ''" md-label="Sin productos"/>
      <md-table-empty-state v-else
        md-label="Sin productos"
        :md-description="`No se han encontrado productos para '${search}'`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="showProductDetailsDialogMethod(item)">
        <md-table-cell md-label="Nombre" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Fecha de expiración mínima" md-sort-by="minExpiredDate">
          {{ item.minExpiredDate | formatDate }}
        </md-table-cell>
        <md-table-cell md-label="Alertas" class="alert-column">
          <md-badge v-if="item.alerts.indexOf(2) > -1" class="badge-error"></md-badge>
          <md-badge v-if="item.alerts.indexOf(1) > -1" class="badge-warning"></md-badge>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <CreateNewProduct
      :show-dialog="showCreateProductDialog"
      v-on:hideDialog="hideCreateProductDialog"
    />

    <ProductDetails
      :show-dialog="showProductDetailsDialog"
      :product="selectedProduct"
      v-on:hideDialog="hideProductDetailsDialog"
      v-on:refreshItems="refreshItems"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, ProcessProduct } from '@/store/product/types';
import { ProductActions } from '@/store/product/actions';
import { ProductGetters } from '@/store/product/getters';
import CreateNewProduct from '@/components/ProductList/CreateNewProduct.vue';
import ProductDetails from '@/components/ProductList/ProductDetails.vue';
import { customSort } from '@/Helpers';

const toLower = (text: string) => text.toString().toLowerCase();

@Component({
  components: { ProductDetails, CreateNewProduct },
})
export default class ProductList extends Vue {
  allProducts: ProcessProduct[] = [];

  search = '';

  searched: ProcessProduct[] = [];

  showCreateProductDialog = false;

  showProductDetailsDialog = false;

  selectedProduct: ProcessProduct = {
    name: '',
    minExpiredDate: new Date(),
    stock: [],
    alerts: [],
  };

  currentSort = 'amount';

  currentSortOrder = 'desc';

  async mounted(): Promise<void> {
    await this.$store.dispatch(`${namespace}/${ProductActions.FETCH_DATA}`);
    this.allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_ALL_PROCESSED_PRODUCTS}`];
    this.searched = this.allProducts;
    this.checkAlerts();
  }

  searchOnTable(): void {
    this.searched = [];
    this.allProducts.forEach((productToFilter) => {
      if (toLower(productToFilter.name).includes(toLower(this.search))) {
        this.searched.push(productToFilter);
      }
    });
    this.checkAlerts();
  }

  checkAlerts(): void {
    if (!this.$route.query.alerts) {
      return;
    }

    this.searched.forEach((product, productIndex, productObject) => {
      product.stock.forEach((stock, stockIndex, stockObject) => {
        if (stock.alert === 0) {
          stockObject.splice(stockIndex, 1);
        }
      });
      if (product.stock.length === 0) {
        productObject.splice(productIndex, 1);
      }
    });
  }

  hideCreateProductDialog(): void {
    this.refreshItems();
    this.showCreateProductDialog = false;
  }

  hideProductDetailsDialog(): void {
    this.showProductDetailsDialog = false;
  }

  showProductDetailsDialogMethod(product: ProcessProduct): void {
    this.selectedProduct = product;
    this.showProductDetailsDialog = true;
  }

  customSort(value: []): [] {
    return customSort(value, this.currentSort, this.currentSortOrder);
  }

  refreshItems(): void {
    this.allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_ALL_PROCESSED_PRODUCTS}`];
    if (this.selectedProduct.name !== '') {
      this.allProducts.forEach((item) => {
        if (item.name === this.selectedProduct.name) {
          this.selectedProduct = item;
        }
      });
    }
    this.searchOnTable();
  }
}
</script>

<style lang="scss">
  md-toolbar {
    margin-bottom: 10px;
  }

  .md-badge {
    margin: 1rem;
    height: 1rem;
    width: 1rem;
    position: relative;

    &.badge-error {
      background-color: #f34848;
    }
    &.badge-warning {
      background-color: #e7ca60;
    }
  }

  .alert-column {
    display: flex;
    flex-direction: row-reverse;

    &>* {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
