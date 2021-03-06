<template>
  <div class="rules">
    <ActivityDescription
      v-for="activity in activities"
      :key="activity.name"
      :title="activity.name"
      :description="activity.description"
      :icon_src="
        activity.name
          .toLowerCase()
          .replace(' ', '_')
          .replace('/', '') + '_icon.svg'
      "
      :path="'https://www.jeec.ist/schedule?type=' + activity.name"
    />
  </div>
</template>

<script>
import ActivityDescription from "@/components/ActivityDescription.vue";
export default {
  name: "ActivityRules",
  data: function() {
    return {};
  },
  components: {
    ActivityDescription
  },
  props: { activities: Object },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.rules {
  padding-top: 9vh;
}
</style>
