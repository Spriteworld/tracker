<template>
  <div class="bg-slate-800 flex flex-col p-2">
    <div class="flex flex-col mb-auto">
      <IconPicker
        :activeType="activeType"
        :activeIcon="activeIcon"
        @changed="changeActiveIcon"
        class="justify-center items-center gap-y-1"
      />
      <MapPicker
        :maps="maps"
        :activeType="activeType"
        :activeMap="activeMap"
        @changed="changeActiveMap"
        class="justify-center items-center gap-y-1 text-xs"
      />
    </div>
    <div class="flex flex-col w-full justify-center items-center">
      <Btn
        type="warn"
        @click.native="clearStorage"
      >Clear Storage</Btn>
      <div class="flex flex-col text-sm text-gray-500 justify-center items-center">
        <div>Pokemon Map Tracker</div>
        <div>Built By xLink & PrudenGaming</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypePicker',
  props: {
    maps: {
      type: Object,
      required: true,
    },
    activeType: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      activeIcon: '',
      activeMap: '',
    };
  },

  methods: {
    changeActiveIcon(icon) {
      this.activeIcon = icon;
      this.activeMap = '';
      this.$emit('changed-type', icon);
    },
    changeActiveMap(map) {
      this.activeIcon = '';
      this.activeMap = map;
      this.$emit('changed-type', 'map/'+map);
    },
    clearStorage() {
      if (confirm('Are you sure?')) {
        localStorage.removeItem('warps');
        window.location.reload();
      }
    },
  },
};
</script>
