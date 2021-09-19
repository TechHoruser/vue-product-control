<template lang="html">
  <md-dialog id="create-dialog"
             :md-active.sync="showDialog"
             :md-close-on-esc="false"
             :md-click-outside-to-close="false"
  >
    <md-dialog-title>Nuevo producto</md-dialog-title>

    <md-field :class="{ 'md-invalid': $v.newProduct.name.$error }">
      <label>Nombre</label>
      <md-input v-model.trim="newProduct.name" required></md-input>
      <span class="md-error" v-if="!$v.newProduct.name.required">
        Debe introducir el nombre del producto.
      </span>
    </md-field>

    <md-datepicker :class="{ 'md-invalid': $v.newProduct.expiredDate.$error }"
                   v-model="newProduct.expiredDate"
                   required
    >
      <label>Fecha de caducidad</label>
      <span class="md-error" v-if="!$v.newProduct.expiredDate.required">
        Debe introducir la fecha de caducidad.
      </span>
    </md-datepicker>

    <md-field :class="{ 'md-invalid': $v.newProduct.amount.$error }">
      <label>Cantidad</label>
      <md-input v-model.number="newProduct.amount" type="number" required></md-input>
      <span class="md-error" v-if="!$v.newProduct.amount.required">
        Debe introducir la cantidad de medicamentos.
      </span>
      <span class="md-error" v-if="!$v.newProduct.amount.minValue">
        La cantidad del producto debe ser positiva.
      </span>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="hideDialog">Cerrar</md-button>
      <md-button class="md-primary md-raised" @click="createNewProduct">Registrar</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { validationMixin } from 'vuelidate';
import { required, minValue } from 'vuelidate/lib/validators';
import { namespace } from '@/store/product/types';
import { ProductMutations } from '@/store/product/mutations';
import { ProductGetters } from '@/store/product/getters';
import { Product } from '@/entities/Product';
import { sameDay, toLower } from '@/Helpers';

@Component({
  mixins: [validationMixin],
  validations: {
    newProduct: {
      name: { required },
      expiredDate: { required },
      amount: {
        required,
        minValue: minValue(1),
      },
    },
  },
})
export default class CreateNewProduct extends Vue {
  @Prop() showDialog: boolean;

  newProduct = {
    name: null,
    expiredDate: null,
    amount: null,
  };

  createNewProduct(): void {
    this.$v.newProduct.$touch();
    if (this.$v.newProduct.$pending || this.$v.newProduct.$error) return;

    let isNewProduct = true;
    const allProducts = this.$store.getters[`${namespace}/${ProductGetters.GET_ALL}`];
    allProducts.forEach((product: Product) => {
      if (toLower(this.newProduct.name) === toLower(product.name)) {
        isNewProduct = false;

        let existStock = false;
        product.stock.forEach((stock) => {
          if (sameDay(stock.expiredDate, this.newProduct.expiredDate)) {
            existStock = true;
            stock.amount += this.newProduct.amount;
          }
        }, this);

        if (!existStock) {
          product.stock.push({
            expiredDate: this.newProduct.expiredDate,
            amount: this.newProduct.amount,
          });
        }
      }
    }, this);

    if (isNewProduct) {
      allProducts.push({
        name: this.newProduct.name,
        stock: [{
          expiredDate: this.newProduct.expiredDate,
          amount: this.newProduct.amount,
        }],
      });
    }
    this.$store.commit(`${namespace}/${ProductMutations.LOADED}`, allProducts);
    this.hideDialog();
  }

  hideDialog(): void {
    this.$emit('hideDialog');
  }
}
</script>
