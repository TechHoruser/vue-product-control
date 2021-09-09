<template lang="html">
    <div id="medicine-list">
        <h1>Medicine List</h1>
        <ul>
          <li @for="medicine in medicineState.medicines">{{ medicine }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { MedicineState } from '@/store/medicine/types';

const namespace = 'medicine';

@Component
export default class MedicineList extends Vue {
  @State('medicineState') profile: MedicineState;

  @Action('fetchData', { namespace }) fetchData: any;

  mounted(): void {
    this.fetchData();
  }
}
</script>

<style lang="scss">

</style>
