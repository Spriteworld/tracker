<template>
  <div class="flex flex-row gap-2 flex-wrap">
    <div
      v-for="map in Object.keys(maps)"
      :key="map"
      v-text="getMapLabel(map, maps)"
      class="flex justify-center items-center w-26 h-6 grow-1 shrink-0 p-2 bg-portal-orange-500 rounded-lg hover:bg-portal-orange-500/50"
      :class="{
        'bg-portal-orange-500/50': activeMap == map,
        'bg-portal-orange-500/25 disabled cursor-not-allowed': disabled && !hasWarps(map),
        'cursor-pointer': !disabled || disabled && hasWarps(map)
      }"
      @click="activateMap(map)"
    ></div>
  </div>
</template>

<script>
import toWords from '@/utilities/toWords.js';

export default {
  name: 'MapPicker',
  props: {
    maps: {
      type: Object,
      required: true,
    },
    activeMap: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    counter: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    toWords,
    activateMap(map) {
      if (this.disabled && !this.hasWarps(map)) {
        return;
      }
      this.$emit('changed', map);
    },
    hasWarps(map) {
      return this.maps[map].warps.length !== 0;
    },
    getMapLabel(map, maps) {
      if (!this.counter) {
        return toWords(map);
      }

      let loadedData = localStorage.getItem('warps');
      if (loadedData === null) {
        loadedData = {};
      } else {
        loadedData = JSON.parse(loadedData);
      }

      let warpCount = Object.keys(maps[map].warps).length;
      let knownWarps = typeof maps[map].warps !== 'array'
        ? Object.keys(maps[map].warps).filter(warp => {
            if (map in loadedData) {
              if (warp in loadedData[map]) {
                return loadedData[map][warp] !== 'others/unknown';
              }
            }

            return maps[map].warps[warp].type === 'others/unknown';
          }).length
        : 0
      ;

      return toWords(map) + ` (${knownWarps}/${warpCount})`;
    }
  },
};
</script>
