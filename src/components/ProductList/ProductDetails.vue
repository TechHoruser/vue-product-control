<template lang="html">
  <md-dialog id="product-details-dialog"
             :md-active.sync="showDialog"
             :md-close-on-esc="false"
             :md-click-outside-to-close="false"
  >
    <md-dialog-title>Stock del Producto</md-dialog-title>

    <md-dialog-content>
      <md-table v-model="product.stock"
                :md-sort.sync="currentSort"
                :md-sort-order.sync="currentSortOrder"
                :md-sort-fn="customSort"
                md-card
                md-fixed-header
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }" @click="showRegisterUseDialogMethod(item)">
          <md-table-cell md-label="Fecha de caducidad" md-sort-by="expiredDate">
            {{ item.expiredDate | formatDate }}
          </md-table-cell>
          <md-table-cell md-label="Cantidad" md-sort-by="amount" md-numeric>{{ item.amount }}</md-table-cell>
        </md-table-row>
      </md-table>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="hideDialog">Cerrar</md-button>
    </md-dialog-actions>

    <RegisterUse
      :show-dialog="showRegisterUseDialog"
      :selected-stock="selectedStock"
      :product="product"
      v-on:hideDialog="hideRegisterUseDialog"
      v-on:goToProductList="hideRegisterUseDialogAndGoToProductList"
    />
  </md-dialog>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Stock } from '@/entities/Product';
import { ProcessProduct } from '@/store/product/types';
import RegisterUse from '@/components/ProductList/RegisterUse.vue';
import { customSort } from '@/Helpers';

@Component({
  components: { RegisterUse },
})
export default class ProductDetails extends Vue {
  @Prop() showDialog!: boolean;

  @Prop() product!: ProcessProduct;

  showRegisterUseDialog = false;

  selectedStock: Stock = {
    expiredDate: new Date(),
    amount: 1,
  };

  currentSort = 'expiredDate';

  currentSortOrder = 'desc';

  hideDialog(): void {
    this.$emit('hideDialog');
  }

  customSort(value: []): [] {
    return customSort(value, this.currentSort, this.currentSortOrder);
  }

  showRegisterUseDialogMethod(selectedStock: Stock): void {
    this.selectedStock = selectedStock;
    this.showRegisterUseDialog = true;
  }

  hideRegisterUseDialog(): void {
    this.$emit('refreshItems');
    this.showRegisterUseDialog = false;
  }

  hideRegisterUseDialogAndGoToProductList(): void {
    this.hideRegisterUseDialog();
    this.hideDialog();
  }
}

</script>
