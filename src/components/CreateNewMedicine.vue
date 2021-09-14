<template lang="html">
  <md-dialog id="create-dialog" :md-active.sync="showDialog">
    <md-dialog-title>Nuevo medicamento</md-dialog-title>

    <md-field>
      <label>Nombre</label>
      <md-input v-model="newMedicine.name"></md-input>
    </md-field>

    <md-datepicker v-model="newMedicine.expiredDate">
      <label>Fecha de caducidad</label>
    </md-datepicker>

    <md-field>
      <label>Cantidad</label>
      <md-input v-model.number="newMedicine.amount" type="number"></md-input>
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
import { namespace } from '@/store/medicine/types';
import { MedicineMutations } from '@/store/medicine/mutations';
import { MedicineGetters } from '@/store/medicine/getters';
import { Medicine } from '@/entities/Medicine';

const toLower = (text: string) => text.toString().toLowerCase();

const sameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear()
  && d1.getMonth() === d2.getMonth()
  && d1.getDate() === d2.getDate();

@Component
export default class CreateNewMedicine extends Vue {
  @Prop() showDialog = false;

  newMedicine = {
    name: '',
    expiredDate: new Date(),
    amount: 1,
  };

  createNewMedicine = (): void => {
    let newMedicine = true;
    const allMedicines = this.$store.getters[`${namespace}/${MedicineGetters.GET_ALL}`];
    allMedicines.forEach((medicine: Medicine) => {
      if (toLower(this.newMedicine.name) === toLower(medicine.name)) {
        newMedicine = false;

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

    if (newMedicine) {
      allMedicines.push({
        name: this.newMedicine.name,
        stock: [{
          expiredDate: this.newMedicine.expiredDate,
          amount: this.newMedicine.amount,
        }],
      });
    }
    this.$store.commit(`${namespace}/${MedicineMutations.LOADED}`, allMedicines);
    this.$emit('modifyShowDialog', false);
  }
}
</script>

<style lang="scss">
#create-dialog .md-dialog-container {
  padding: 3em;
}
</style>
