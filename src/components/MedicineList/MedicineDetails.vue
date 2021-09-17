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
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Fecha de caducidad" md-sort-by="formatDateForOrder(expiredDate)">
            {{ item.expiredDate | formatDate }}
          </md-table-cell>
          <md-table-cell md-label="Cantidad" md-sort-by="amount" md-numeric>{{ item.amount }}</md-table-cell>
        </md-table-row>
      </md-table>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-accent" @click="hideDialog">Cerrar</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { ProcessMedicine } from '@/store/medicine/types';
import { customSort, formatDateForOrder } from '@/Helpers';

@Component
export default class MedicineDetails extends Vue {
  @Prop() showDialog: boolean;

  @Prop() medicine: ProcessMedicine;

  currentSort = 'amount';

  currentSortOrder = 'asc';

  hideDialog(): void {
    this.$emit('hideDialog');
  }

  customSort(value: []): [] {
    return customSort(value, this.currentSort, this.currentSortOrder);
  }
}

</script>
