<template>
  <div class="text-[40px]">
    index
    <br />
    <NuxtLinkLocale to="/casino" class="text-[30px]">casino</NuxtLinkLocale>
    <div>{{ siteData }}</div>
  </div>
</template>

<script setup>
import { postGetSiteApi } from "@/api/apis";
const { getSiteApiSuccess } = useSiteDataStore();
const { siteData } = storeToRefs(useSiteDataStore());
await useAsyncData("test", async () => {
  const url = useRequestURL();
  const data = await postGetSiteApi({ reqUrl: url });
  getSiteApiSuccess(data);
  return data;
});
</script>
