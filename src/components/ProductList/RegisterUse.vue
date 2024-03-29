<template lang="html">
  <md-dialog id="create-dialog"
             :md-active.sync="showDialog"
             :md-close-on-esc="false"
             :md-click-outside-to-close="false"
  >
    <md-dialog-title>Registrar uso</md-dialog-title>
    <md-dialog-content>
      <p><strong>Nombre del producto:</strong> {{ product.name }}</p>
      <p><strong>Fecha de caducidad:</strong> {{ selectedStock.expiredDate | formatDate }}</p>
    </md-dialog-content>

    <md-field :class="{ 'md-invalid': $v.amount.$error }">
      <label>Cantidad</label>
      <md-input v-model.number="amount" type="number" required></md-input>
      <span class="md-error" v-if="!$v.amount.required">
        Debe introducir la cantidad de productos.
      </span>
      <span class="md-error" v-if="!$v.amount.minValue">
        La cantidad del producto debe ser positiva.
      </span>
      <span class="md-error" v-if="!$v.amount.maxValue">
        La cantidad del producto es mayor a la registrada en el sistema.
      </span>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="hideDialog">Cerrar</md-button>
      <md-button class="md-primary md-raised" @click="registerUse">Descontar</md-button>
      <md-button class="md-primary md-raised" @click="addAmount">Añadir</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { maxValue, minValue, required } from 'vuelidate/lib/validators';
import { Product, Stock } from '@/entities/Product';
import { namespace, ProcessProduct } from '@/store/product/types';
import { ProductGetters } from '@/store/product/getters';
import { ProductMutations } from '@/store/product/mutations';
import { sameDay, toLower } from '@/Helpers';

@Component({
  validations: {
    amount: {
      required,
      minValue: minValue(1),
      maxValue(value) {
        return maxValue(this.selectedStock.amount)(value);
      },
    },
  },
})
export default class RegisterUse extends Vue {
  @Prop() showDialog!: boolean;

  @Prop() product!: ProcessProduct;

  @Prop() selectedStock!: Stock;

  amount = 1;

  hideDialog(): void {
    this.$emit('hideDialog');
  }

  goToProductList(): void {
    this.$emit('goToProductList');
  }

  registerUse(): void {
    this.$v.amount.$touch();
    if (this.$v.amount.$pending || this.$v.amount.$error) return;

    const allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_ALL_PRODUCTS}`];
    let errorAmount = false;
    let goToProductList = false;
    allProducts.forEach((product: Product, productIndex: any, productObject: any) => {
      if (toLower(this.product.name) === toLower(product.name)) {
        product.stock.forEach((stock, stockIndex, stockObject) => {
          if (sameDay(stock.expiredDate, this.selectedStock.expiredDate)) {
            const newAmount = stock.amount - this.amount;
            if (newAmount < 0) {
              errorAmount = true;
            } else if (newAmount === 0) {
              stockObject.splice(stockIndex, 1);
            } else {
              stock.amount = newAmount;
            }
          }
        }, this);
        if (product.stock.length === 0) {
          productObject.splice(productIndex, 1);
          goToProductList = true;
        }
      }
    }, this);

    if (errorAmount) {
      return;
    }

    this.$store.commit(`${namespace}/${ProductMutations.LOAD_PRODUCTS}`, allProducts);

    if (goToProductList) {
      this.goToProductList();
    } else {
      this.hideDialog();
    }
  }

  addAmount(): void {
    this.$v.amount.$touch();
    if (this.$v.amount.$pending || this.$v.amount.$error) return;

    const allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_ALL_PRODUCTS}`];
    allProducts.forEach((product: Product) => {
      if (toLower(this.product.name) === toLower(product.name)) {
        product.stock.forEach((stock) => {
          if (sameDay(stock.expiredDate, this.selectedStock.expiredDate)) {
            stock.amount += this.amount;
          }
        }, this);
      }
    }, this);

    this.$store.commit(`${namespace}/${ProductMutations.LOAD_PRODUCTS}`, allProducts);
    this.hideDialog();
  }
}
</script>
