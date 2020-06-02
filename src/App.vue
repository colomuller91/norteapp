<template>
  <v-app>

    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <p class="display-1 mb-0" style="font-family: 'Bangers' !important;">Chimi-App</p>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <product-list/>
      <v-container
              class="fill-height"
              fluid
      >
        <product-list/>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>

  </v-app>
</template>

<script>

import productList from './components/ProductList';

export default {
  name: 'App',
  components: {
    productList,
  },

  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created () {
    this.$vuetify.theme.dark = true
  },

};
</script>
style
