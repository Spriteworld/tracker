<template>
  <div class="flex flex-row">
    <div class="flex">
      <div class="relative">
        <canvas id="map" height="500" width="500" oncontextmenu="return false;"></canvas>
        <div
          v-for="(point, key) in points[activeMapName]"
          :key="key"
          class="flex absolute text-xs justify-center items-center cursor-pointer border-2 border-transparent"
          :class="{
            'bg-white/30': !String(point.type).includes('map/'),
            'border-white': !String(point.type).includes('map/') && key === activePoint
          }"
          :style="{
            'width': String(point.type).includes('map/')
              ? 'auto'
              : (point.w || 32)+'px',
            'height': (point.h || 40)+'px',
            'top': point.y+'px',
            'left': (String(point.type).includes('map/') ? (point.x - ((point.w || 32)/2)) : point.x)+'px',
          }"
          @click="changeActivePoint(key)"
          @click.ctrl="changeMap"
          @contextmenu.prevent="setTypeToPoint(key)"
        >
          <img
            v-if="!(String(point.type).includes('map/'))"
            :src="getTypeIcon(point.type)"
            class="rounded border border-transparent"
          />
          <div
            v-else
            class="flex bg-slate-800/75 p-2 h-18 w-20 rounded cursor-pointer border border-transparent select-none justify-center items-center"
            :class="{
              'border border-white': key === activePoint
            }"
            :data-map="point.type"
            v-text="toWords(point.type.replace('map/', ''))"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col" v-if="false">
      <code><pre>{{ this.activeType }}</pre></code>
      <code><pre>{{ this.activeMap }}</pre></code>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import toWords from '@/utilities/toWords.js';

export default {
  name: 'MapCanvas',
  props: {
    activeMapName: {
      type: String,
      required: true
    },
    activeMap: {
      type: Object,
      required: true
    },
    activeType: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      canvas: null,
      ctx: null,
      activePoint: '',
      points: {},
    };
  },

  mounted() {
    let c = document.getElementById('map');
    this.canvas = c;
    var ctx = c.getContext("2d");
    this.ctx = ctx;
  },

  created() {
    this.drawMap();
  },

  methods: {
    toWords,
    drawMap() {
      let areaImg = new Image();
      areaImg.src = this.activeMap._meta.img;
      areaImg.onload = () => {
        this.canvas.width = this.activeMap._meta.width;
        this.canvas.height = this.activeMap._meta.height;
        this.ctx.drawImage(areaImg, 0, 0);
      };

      if (typeof this.points[this.activeMapName] !== 'undefined') {
        return;
      }

      let loadedData = localStorage.getItem('warps');
      if (loadedData === null) {
        loadedData = {};
      } else {
        loadedData = JSON.parse(loadedData);
      }

      Vue.set(this.points, this.activeMapName, {});
      for (const key in this.activeMap.warps) {
        Vue.set(this.points[this.activeMapName], key, this.activeMap.warps[key]);

        Vue.set(this.points[this.activeMapName][key], 'type', 'others/unknown');
        if (this.activeMapName in loadedData) {
          if (key in loadedData[this.activeMapName]) {
            Vue.set(this.points[this.activeMapName][key], 'type', loadedData[this.activeMapName][key]);
          }
        }
      }
    },
    changeActivePoint(point) {
      this.activePoint = point;
    },
    setTypeToPoint(point) {
      if (this.activeType === '') {
        return;
      }

      this.points[this.activeMapName][point].type = this.activeType;
    },
    getTypeIcon(icon) {
      return './assets/types/'+icon+'.png';
    },
    changeMap(e) {
      const map = e.target.dataset.map;
      if (!String(map).includes('map/')) {
        return;
      }

      this.$emit('changeMap', map.replace('map/', ''));
    },
    saveWarps() {
      let warps = {};

      for (const map in this.points) {
        warps[map] = {};
        for (const warp in this.points[map]) {
          warps[map][warp] = this.points[map][warp].type;
        }
      }

      localStorage.setItem('warps', JSON.stringify(warps));
    },
  },

  watch: {
    activeMap: {
      deep: true,
      handler() {
        this.drawMap();
      },
    },
    activeType: {
      deep: true,
      handler(value) {
        if (this.activePoint === '') {
          return;
        }

        this.points[this.activeMapName][this.activePoint].type = value;
      },
    },
    points: {
      deep: true,
      handler() {
        this.saveWarps();
      },
    },
  },
};
</script>
