<template lang="html">
  <md-dialog id="create-dialog"
             :md-active.sync="showDialog"
             :md-close-on-esc="false"
             :md-click-outside-to-close="false"
  >
    <md-dialog-title>Nuevo medicamento</md-dialog-title>

    <md-field :class="{ 'md-invalid': $v.newMedicine.name.$error }">
      <label>Nombre</label>
      <md-input v-model.trim="newMedicine.name" required></md-input>
      <span class="md-error" v-if="!$v.newMedicine.name.required">
        Debe introducir el nombre del medicamento.
      </span>
    </md-field>

    <md-datepicker :class="{ 'md-invalid': $v.newMedicine.expiredDate.$error }"
                   v-model="newMedicine.expiredDate"
                   required
    >
      <label>Fecha de caducidad</label>
      <span class="md-error" v-if="!$v.newMedicine.expiredDate.required">
        Debe introducir la fecha de caducidad.
      </span>
    </md-datepicker>

    <md-field :class="{ 'md-invalid': $v.newMedicine.amount.$error }">
      <label>Cantidad</label>
      <md-input v-model.number="newMedicine.amount" type="number" required></md-input>
      <span class="md-error" v-if="!$v.newMedicine.amount.required">
        Debe introducir la cantidad de medicamentos.
      </span>
      <span class="md-error" v-if="!$v.newMedicine.amount.minValue">
        La cantidad del medicamento debe ser positiva.
      </span>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="hideDialog">Cerrar</md-button>
      <md-button class="md-primary md-raised" @click="createNewMedicine">Registrar</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { validationMixin } from 'vuelidate';
import { required, minValue } from 'vuelidate/lib/validators';
import { namespace } from '@/store/medicine/types';
import { MedicineMutations } from '@/store/medicine/mutations';
import { MedicineGetters } from '@/store/medicine/getters';
import { Medicine } from '@/entities/Medicine';

const toLower = (text: string) => text.toString().toLowerCase();

const sameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear()
  && d1.getMonth() === d2.getMonth()
  && d1.getDate() === d2.getDate();

@Component({
  mixins: [validationMixin],
  validations: {
    newMedicine: {
      name: { required },
      expiredDate: { required },
      amount: {
        required,
        minValue: minValue(1),
      },
    },
  },
})
export default class CreateNewMedicine extends Vue {
  @Prop() showDialog = false;

  newMedicine = {
    name: null,
    expiredDate: null,
    amount: null,
  };

  createNewMedicine(): void {
    this.$v.newMedicine.$touch();
    if (this.$v.newMedicine.$pending || this.$v.newMedicine.$error) return;

    let isNewMedicine = true;
    const allMedicines = this.$store.getters[`${namespace}/${MedicineGetters.GET_ALL}`];
    allMedicines.forEach((medicine: Medicine) => {
      if (toLower(this.newMedicine.name) === toLower(medicine.name)) {
        isNewMedicine = false;

        let existStock = false;
        medicine.stock.forEach((stock) => {
          if (sameDay(stock.expiredDate, this.newMedicine.expiredDate)) {
            existStock = true;
            stock.amount += this.newMedicine.amount;
          }
        }, this);

        if (!existStock) {
          medicine.stock.push({
            expiredDate: this.newMedicine.expiredDate,
            amount: this.newMedicine.amount,
          });
        }
      }
    }, this);

    if (isNewMedicine) {
      allMedicines.push({
        name: this.newMedicine.name,
        stock: [{
          expiredDate: this.newMedicine.expiredDate,
          amount: this.newMedicine.amount,
        }],
      });
    }
    this.$store.commit(`${namespace}/${MedicineMutations.LOADED}`, allMedicines);
    this.hideDialog();
  }

  hideDialog(): void {
    this.$emit('hideDialog');
  }
}
</script>
