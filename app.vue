<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
    <!-- {{ data }} -->
    <div>{{ siteData }}</div>
  </div>
</template>

<script setup>
import { postGetSiteApi } from "@/api/apis";
const { getSiteApiSuccess } = useSiteDataStore();
const { siteData } = storeToRefs(useSiteDataStore());
// console.log("----siteData", siteData);
// const nuxt = useNuxt();
// console.log("nuxt", nuxt);
// onMounted(() => {
//   getSiteApiRequest();
// });
await useAsyncData("test", async () => {
  // const headers = useRequestHeaders();
  // console.log("headers", headers);
  const url = useRequestURL();
  // const data = await postGetSiteApi({ reqUrl: url });
  const data = await postGetSiteApi({ reqUrl: url });
  // console.log("999999", data);
  getSiteApiSuccess(data);
  return data;
});
</script>
