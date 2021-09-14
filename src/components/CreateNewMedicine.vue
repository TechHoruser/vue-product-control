<template lang="html">
  <md-dialog id="create-dialog" :md-active.sync="showDialog">
    <md-dialog-title>Nuevo medicamento</md-dialog-title>

    <md-field>
      <label>Nombre</label>
      <md-input v-model="newMedicine.name"></md-input>
    </md-field>

    <md-datepicker v-model="newMedicine.expiredDate" dataformatas="DD-MM-yyyy">
      <label>Fecha de caducidad</label>
    </md-datepicker>

    <md-field>
      <label>Cantidad</label>
      <md-input v-model="newMedicine.amount"></md-input>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      <md-button class="md-primary" @click="createNewMedicine">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>
<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { MedicineState } from '@/store/medicine/types';
import { namespace } from '@/store/medicine';

const toLower = (text: string) => text.toString().toLowerCase();

const sameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear()
  && d1.getMonth() === d2.getMonth()
  && d1.getDate() === d2.getDate();

@Component
export default class CreateNewMedicine extends Vue {
  @Prop() showDialog = false;

  medicineState: MedicineState = this.$store.state.medicine;

  newMedicine = {
    name: '',
    expiredDate: new Date(),
    amount: 1,
  };

  createNewMedicine = (): void => {
    let newMedicine = true;
    this.medicineState.medicines.map((medicine) => {
      if (toLower(this.newMedicine.name) === toLower(medicine.name)) {
        medicine.stock.map((stock) => {
          if (sameDay(stock.expiredDate, this.newMedicine.expiredDate)) {
            // eslint-disable-next-line no-param-reassign
            stock.amount += this.newMedicine.amount;
          }
          return stock;
        });

        newMedicine = false;
      }
      return medicine;
    });

    if (newMedicine) {
      this.medicineState.medicines.push({
        name: this.newMedicine.name,
        minExpiredDate: this.newMedicine.expiredDate,
        stock: [{
          expiredDate: this.newMedicine.expiredDate,
          amount: this.newMedicine.amount,
        }],
      });
    }
    this.$store.commit(`${namespace}/medicinesLoaded`, this.medicineState.medicines);
    this.showDialog = false;
  }
}
</script>
