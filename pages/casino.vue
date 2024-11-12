<template>
  <div>
    <NuxtLinkLocale to="/" class="text-[30px]">index</NuxtLinkLocale>
    <br />
    {{ siteData.gameClass }}
  </div>
</template>

<script setup>
const { siteData } = storeToRefs(useSiteDataStore());
const { getSiteApiRequest } = useSiteDataStore();
const src = "/SMG_pongPongMahjong.webp";
onMounted(() => {
  getSiteApiRequest();
});
</script>
