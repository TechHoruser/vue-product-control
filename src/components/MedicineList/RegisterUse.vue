<template lang="html">
  <md-dialog id="create-dialog"
             v-if="selectedStock !== undefined"
             :md-active.sync="showDialog"
             :md-close-on-esc="false"
             :md-click-outside-to-close="false"
  >
    <md-dialog-title>Registrar uso</md-dialog-title>
    <md-dialog-content>
      <p><strong>Nombre del medicamento:</strong> {{ medicine.name }}</p>
      <p><strong>Fecha de caducidad:</strong> {{ selectedStock.expiredDate | formatDate }}</p>
    </md-dialog-content>

    <md-field :class="{ 'md-invalid': $v.amount.$error }">
      <label>Cantidad</label>
      <md-input v-model.number="amount" type="number" required></md-input>
      <span class="md-error" v-if="!$v.amount.required">
        Debe introducir la cantidad de medicamentos.
      </span>
      <span class="md-error" v-if="!$v.amount.minValue">
        La cantidad del medicamento debe ser positiva.
      </span>
      <span class="md-error" v-if="!$v.amount.maxValue">
        La cantidad del medicamento es mayor a la registrada en el sistema.
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
import { validationMixin } from 'vuelidate';
import { maxValue, minValue, required } from 'vuelidate/lib/validators';
import { Medicine, Stock } from '@/entities/Medicine';
import { namespace, ProcessMedicine } from '@/store/medicine/types';
import { MedicineGetters } from '@/store/medicine/getters';
import { MedicineMutations } from '@/store/medicine/mutations';
import { sameDay, toLower } from '@/Helpers';

@Component({
  mixins: [validationMixin],
  validations: {
    amount: {
      required,
      minValue: minValue(1),
      // maxValue: maxValue(this.selectedStock.amount),
    },
  },
})
export default class RegisterUse extends Vue {
  @Prop() showDialog: boolean;

  @Prop() medicine: ProcessMedicine;

  @Prop() selectedStock: Stock;

  amount = 1;

  hideDialog(): void {
    this.$emit('hideDialog');
  }

  registerUse(): void {
    this.$v.amount.$touch();
    if (this.$v.amount.$pending || this.$v.amount.$error) return;

    const allMedicines = this.$store.getters[`${namespace}/${MedicineGetters.GET_ALL}`];
    let errorAmount = false;
    allMedicines.forEach((medicine: Medicine, medicineIndex, medicineObject) => {
      if (toLower(this.medicine.name) === toLower(medicine.name)) {
        medicine.stock.forEach((stock, stockIndex, stockObject) => {
          if (sameDay(stock.expiredDate, this.selectedStock.expiredDate)) {
            stock.amount -= this.amount;
            if (stock.amount < 0) {
              errorAmount = true;
            } else if (stock.amount === 0) {
              stockObject.splice(stockIndex, 1);
            }
          }
        }, this);
        if (medicine.stock.length === 0) {
          medicineObject.splice(medicineIndex, 1);
        }
      }
    }, this);

    if (errorAmount) {
      // TODO: add error maxValue to amount field like maxValue(this.selectedStock.amount)
      return;
    }

    this.$store.commit(`${namespace}/${MedicineMutations.LOADED}`, allMedicines);
    this.hideDialog();
  }

  addAmount(): void {
    this.$v.amount.$touch();
    if (this.$v.amount.$pending || this.$v.amount.$error) return;

    const allMedicines = this.$store.getters[`${namespace}/${MedicineGetters.GET_ALL}`];
    allMedicines.forEach((medicine: Medicine) => {
      if (toLower(this.medicine.name) === toLower(medicine.name)) {
        medicine.stock.forEach((stock) => {
          if (sameDay(stock.expiredDate, this.selectedStock.expiredDate)) {
            stock.amount += this.amount;
          }
        }, this);
      }
    }, this);

    this.$store.commit(`${namespace}/${MedicineMutations.LOADED}`, allMedicines);
    this.hideDialog();
  }
}
</script>
