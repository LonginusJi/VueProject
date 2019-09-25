<template>
  <div class="charts">
    <v-tabs fixed-tabs background-color="indigo" dark grow>
      <v-tab>Force Chart</v-tab>
      <v-tab>Bar Chart</v-tab>
      <v-tab>Circle Chart</v-tab>
      <v-tab-item>
        <ForceBar></ForceBar>
      </v-tab-item>
      <v-tab-item>
        <HighChart></HighChart>
      </v-tab-item>
      <v-tab-item>
        <CircleChart></CircleChart>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import HighChart from "../components/HighChart.vue";
// import ForceChart from "../components/ForceChart.vue";
import CircleChart from "../components/CircleChart.vue";
import ForceBar from "../components/ForceBar.vue";
export default {
  components: {
    // ForceChart,
    CircleChart,
    HighChart,
    ForceBar
  }
};
</script>

<style>
svg {
  display: block;
  margin: 50px auto;
}
</style>