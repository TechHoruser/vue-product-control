<template lang="html">
  <md-dialog id="medicine-details-dialog"
             :md-active.sync="showDialog"
             :md-close-on-esc="false"
             :md-click-outside-to-close="false"
  >
    <md-dialog-title>Stock del Medicamento</md-dialog-title>

    <md-dialog-content>
      <md-table v-model="medicine.stock"
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
      :medicine="medicine"
      v-on:hideDialog="hideRegisterUseDialog"
    />
  </md-dialog>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Stock } from '@/entities/Medicine';
import { ProcessMedicine } from '@/store/medicine/types';
import RegisterUse from '@/components/MedicineList/RegisterUse.vue';
import { customSort } from '@/Helpers';

@Component({
  components: { RegisterUse },
})
export default class MedicineDetails extends Vue {
  @Prop() showDialog: boolean;

  @Prop() medicine: ProcessMedicine;

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
}

</script>
