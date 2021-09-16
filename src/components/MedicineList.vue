<template lang="html">
  <div id="medicine-list">
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-button class="md-primary md-raised" @click="showDialog = true">Nuevo Medicamento</md-button>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Nombre del medicamento" v-model="search" @input="searchOnTable()" required />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state v-if="search === ''" md-label="Sin medicamentos"/>
      <md-table-empty-state v-else
        md-label="Sin medicamentos"
        :md-description="`No se han encontrado medicamentos para '${search}'`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nombre" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Fecha de expiración mínima" md-sort-by="minExpiredDate.getTime()">
          {{ item.minExpiredDate | formatDate }}
        </md-table-cell>
      </md-table-row>
    </md-table>

    <CreateNewMedicine :show-dialog="showDialog"
                       v-on:modifyShowDialog="modifyShowDialog"
                       @close="showDialog = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, ProcessMedicine } from '@/store/medicine/types';
import CreateNewMedicine from '@/components/CreateNewMedicine.vue';
import { MedicineActions } from '@/store/medicine/actions';
import { MedicineGetters } from '@/store/medicine/getters';

const toLower = (text: string) => text.toString().toLowerCase();

@Component({
  components: { CreateNewMedicine },
})
export default class MedicineList extends Vue {
  allMedicines: ProcessMedicine[] = [];

  search = '';

  searched: ProcessMedicine[] = [];

  showDialog = false;

  async mounted(): Promise<void> {
    await this.$store.dispatch(`${namespace}/${MedicineActions.FETCH_DATA}`);
    this.allMedicines = this.$store.getters[`${namespace}/${MedicineGetters.GET_PROCESS_ALL}`];
    this.searched = this.allMedicines;
  }

  searchOnTable(): void {
    this.searched = [];
    this.allMedicines.forEach((medicineToFilter) => {
      if (toLower(medicineToFilter.name).includes(toLower(this.search))) {
        this.searched.push(medicineToFilter);
      }
    });
  }

  modifyShowDialog(newValue: boolean): void {
    this.showDialog = newValue;
    this.allMedicines = this.$store.getters[`${namespace}/${MedicineGetters.GET_PROCESS_ALL}`];
    this.searchOnTable();
  }
}
</script>
