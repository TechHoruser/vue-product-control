<template lang="html">
  <div id="config">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <md-toolbar>
      <div class="md-toolbar-section-start">
        <router-link to="/">
          <md-icon class="fas fa-chevron-circle-left md-size-2x md-primary"></md-icon>
        </router-link>
        <md-button class="md-primary md-raised" @click="save">Guardar</md-button>
      </div>
    </md-toolbar>

    <div>
      <md-field :class="{ 'md-invalid': $v.daysForExpirationAlert.$error }">
        <label>Número de días para preaviso</label>
        <md-input v-model.trim="daysForExpirationAlert" required></md-input>
        <span class="md-error" v-if="!$v.daysForExpirationAlert.required">
          Debe introducir un valor para este campo.
        </span>
        <span class="md-error" v-if="!$v.daysForExpirationAlert.minValue">
          El valor debe ser al menos 1.
        </span>
      </md-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { minValue, required } from 'vuelidate/lib/validators';
import { DefaultDaysForExpirationAlert, namespace } from '@/store/product/types';
import { ProductGetters } from '@/store/product/getters';
import { ProductMutations } from '@/store/product/mutations';

@Component({
  validations: {
    daysForExpirationAlert: {
      required,
      minValue: minValue(1),
    },
  },
})
export default class Config extends Vue {
  daysForExpirationAlert = DefaultDaysForExpirationAlert;

  mounted(): void {
    this.daysForExpirationAlert = this.$store.getters[`${namespace}/${ProductGetters.GET_DAYS_FOR_EXPIRATION_ALERT}`];
  }

  save(): void {
    this.$v.daysForExpirationAlert.$touch();
    if (this.$v.daysForExpirationAlert.$pending || this.$v.daysForExpirationAlert.$error) return;

    this.$store.commit(`${namespace}/${ProductMutations.LOAD_DAYS_FOR_EXPIRATION_ALERT}`, this.daysForExpirationAlert);
    window.location.href = '/';
  }
}
</script>

<style lang="scss">
  md-toolbar {
    margin-bottom: 10px;
  }
</style>
