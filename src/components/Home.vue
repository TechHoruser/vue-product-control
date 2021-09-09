<template>
  <div id="home" class="md-layout md-gutter md-alignment-center">
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/medicine-list">
      <md-card class="md-primary" md-theme="purple-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Listado de Medicamentos</div>
            <div class="md-subhead">Ver listado de medicamentos.</div>
          </md-card-header>

          <md-card-content>
            Podrá ver los medicamentos registrados en el sistema y modificar su información.
          </md-card-content>
        </md-ripple>
      </md-card>
    </router-link>
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/register-use">
      <md-card class="md-primary" md-theme="purple-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Registrar Uso</div>
            <div class="md-subhead">
                Descontar al stock existente al hacer uso de un medicamento.
            </div>
          </md-card-header>

          <md-card-content>
            Podrá detallar que medicamento ha usado.
            (Tenga en cuenta ver la fecha de caducidad del mismo para descontarlo al stock adecuado)
          </md-card-content>
        </md-ripple>
      </md-card>
    </router-link>
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/config">
      <md-card class="md-primary" md-theme="purple-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Configuración</div>
            <div class="md-subhead">Configure aquí los parámetros.</div>
          </md-card-header>
        </md-ripple>
      </md-card>
    </router-link>
    <router-link class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" to="/alerts">
      <md-card class="md-accent" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Alertas</div>
            <div class="md-subhead">Sección de alertas</div>
          </md-card-header>

          <md-card-content>
            Consulte aquí si existe algún medicamento que puede caducar o haber caducado.
          </md-card-content>
        </md-ripple>
      </md-card>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
    @import "~vue-material/dist/theme/engine";

    @include md-register-theme("orange-card", (
        primary: md-get-palette-color(orange, 500)
    ));

    @import "~vue-material/dist/base/theme";
    @import "~vue-material/dist/components/MdCard/theme";

    .md-card {
        margin: 4px;
        height: 15rem;
    }
</style>
