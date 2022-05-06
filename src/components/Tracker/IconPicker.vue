<template>
  <div class="flex flex-col flex-wrap mb-4">
    <div
      v-for="iconRow in icons"
      class="flex flex-row"
    >
      <div
        v-for="icon in iconRow"
        :key="icon"
        class="border border-transparent hover:border-white cursor-pointer"
        :class="{
          'border-white': icon == activeIcon || icon == activeType
        }"
        @click="changeActiveIcon(icon)"
      >
        <img :src="getIconUrl(icon)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconPicker',
  props: {
    activeIcon: {
      type: String,
    },
    activeType: {
      type: String,
    },
  },

  data() {
    return {
      icons: [
        ['others/unknown', 'others/one_way', 'others/dead_end', 'others/event', 'others/center', 'others/mart', 'others/bike'],
        ['badges/stone_badge', 'badges/knuckle_badge', 'badges/dynamo_badge', 'badges/heat_badge', 'badges/balance_badge', 'badges/feather_badge', 'badges/mind_badge', 'badges/rain_badge'],
        ['hms_em/rock_smash', 'hms_em/strength', 'hms_em/surf', 'hms_em/waterfall', 'hms_em/dive'],
        ['hms_em/hm1', 'hms_em/hm2', 'hms_em/hm3', 'hms_em/hm4', 'hms_em/hm5', 'hms_em/hm6', 'hms_em/hm7', 'hms_em/hm8'],
        // ['hms_plat/hm1', 'hms_plat/hm2', 'hms_plat/hm3', 'hms_plat/hm4', 'hms_plat/hm5', 'hms_plat/hm6', 'hms_plat/hm7', 'hms_plat/hm8'],
        ['numbers/1','numbers/2','numbers/3','numbers/4','numbers/5','numbers/6','numbers/7','numbers/8'],
        ['types/bug', 'types/dark', 'types/dragon', 'types/electric', 'types/fairy', 'types/fighting', 'types/fire', 'types/flying', 'types/ghost'],
        ['types/grass', 'types/ground', 'types/ice', 'types/normal', 'types/poison', 'types/psychic', 'types/rock', 'types/steel', 'types/water']
      ],
    };
  },

  methods: {
    changeActiveIcon(icon) {
      this.$emit('changed', icon);
    },
    getIconUrl(icon) {
      return './assets/types/'+icon+'.png';
    },
  },
};
</script>
