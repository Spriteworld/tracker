<template>
  <div class="flex flex-row">
    <div class="flex w-[30vw] flex-none">
      <TypePicker
        :maps="maps"
        :activeType="activeType"
        @changed-type="changeActiveType"
      />
    </div>
    <div class="flex flex-col p-2 w-[70vw] flex-none">
      <MapPicker
        ref="picker"
        :maps="maps"
        :activeMap="activeMap"
        @changed="changeActiveMap"
        :disabled="!true"
        :counter="true"
        class="mb-4 text-xs"
      />
      <MapCanvas
        ref="map"
        :activeMapName="activeMap"
        :activeMap="maps[activeMap]"
        :activeType="activeType"
        @changeMap="changeMap"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Index',

  data() {
    return {
      activeMap: '',
      activeType: '',
      maps: {},
    };
  },

  created() {
    this.activeMap = localStorage.getItem('active-map') || '';
    // find all the map json files and add them to the list
    let maps = import.meta.globEager('@/stores/maps/emerald/*.json');
    Object.keys(maps).forEach(map => {
      const name = map.split('\\').pop().split('/').pop().split('.')[0];
      if (name === 'blank') { return; }

      this.maps[name] = JSON.parse(JSON.stringify(maps[map].default));
    });
    if (this.activeMap === '') {
      this.activeMap = Object.keys(this.maps)[0];
    }
  },

  methods: {
    changeActiveMap(map) {
      this.activeMap = map;
    },
    changeActiveType(type) {
      this.activeType = type;
    },
    changeMap(map) {
      this.$refs.picker.activateMap(map);
    }
  },

  watch: {
    activeMap: (value) => {
      localStorage.setItem('active-map', value);
    }
  }
};
</script>
