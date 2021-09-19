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
      <md-table-empty-state v-if="search === ''" md-label="Sin medicamentos"/>
      <md-table-empty-state v-else
        md-label="Sin medicamentos"
        :md-description="`No se han encontrado medicamentos para '${search}'`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="showProductDetailsDialogMethod(item)">
        <md-table-cell md-label="Nombre" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Fecha de expiración mínima" md-sort-by="minExpiredDate">
          {{ item.minExpiredDate | formatDate }}
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
  };

  currentSort = 'amount';

  currentSortOrder = 'desc';

  async mounted(): Promise<void> {
    await this.$store.dispatch(`${namespace}/${ProductActions.FETCH_DATA}`);
    this.allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_PROCESS_ALL}`];
    this.searched = this.allProducts;
  }

  searchOnTable(): void {
    this.searched = [];
    this.allProducts.forEach((productToFilter) => {
      if (toLower(productToFilter.name).includes(toLower(this.search))) {
        this.searched.push(productToFilter);
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
    this.allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_PROCESS_ALL}`];
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

<style>
  md-toolbar {
    margin-bottom: 10px;
  }
</style>