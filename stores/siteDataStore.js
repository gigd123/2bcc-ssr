import { API_STATUS } from "@/constants/constants";
import { postGetSiteApi } from "@/api/apis";
import { tokenErr, apiResError, apiError } from "@/utils/utils";

export const useSiteDataStore = defineStore("useSiteData", () => {
  // const { separateLobbyData } = storeToRefs(useGameBrandStore())
  const initialState = {
    data: {},
    status: API_STATUS.INITIAL,
  };
  const siteDataInfo = ref(initialState);

  const getSiteApiSuccess = (payload) => {
    // const { data: testData } = payload || {};
    console.log("payload", payload.data);
    siteDataInfo.value.data = payload.data;
    if (import.meta.client) {
      console.log("fuck");
      const langFromPath = window?.location.pathname.split("/")[1];
      const allLang = payload?.data.allLang.split(",");
      const defaultLang = payload?.data.defaultLang;
      if (allLang.includes(langFromPath)) {
        localStorage.setItem("selectedLanguage", langFromPath);
        localStorage.setItem(
          "urlLangParam",
          defaultLang === langFromPath ? "" : langFromPath
        );
      } else {
        localStorage.setItem("selectedLanguage", defaultLang);
        localStorage.setItem("urlLangParam", "");
      }
    }
    siteDataInfo.value.status = API_STATUS.SUCCESS;
  };

  const getSiteApiRequest = async () => {
    try {
      siteDataInfo.value.status = API_STATUS.LOADING;
      const response = await postGetSiteApi({});
      const responseData = response.data;
      if (responseData.code === "00") {
        getSiteApiSuccess(responseData);
        // 多國語系網址相關邏輯
        // const langFromPath = window?.location.pathname.split("/")[1];
        // const allLang = responseData?.data.allLang.split(",");
        // const defaultLang = responseData?.data.defaultLang;
        // if (allLang.includes(langFromPath)) {
        //   localStorage.setItem("selectedLanguage", langFromPath);
        //   localStorage.setItem(
        //     "urlLangParam",
        //     defaultLang === langFromPath ? "" : langFromPath
        //   );
        // } else {
        //   localStorage.setItem("selectedLanguage", defaultLang);
        //   localStorage.setItem("urlLangParam", "");
        // }
      } else if (responseData.code === "10") {
        tokenErr();
        siteDataInfo.value.status = API_STATUS.FAILURE;
      } else {
        apiResError(responseData);
        siteDataInfo.value.status = API_STATUS.FAILURE;
      }
    } catch (error) {
      apiError(error);
      siteDataInfo.value.status = API_STATUS.FAILURE;
    }
  };
  const siteData = computed(() => siteDataInfo.value.data);
  const gameClass = computed(() => siteDataInfo.value.data.gameClass);
  const classRow = computed(() => {
    return [
      {
        className: "Hot",
      },
      ...(gameClass?.value || []),
      // ...separateLobbyData.value,
    ];
  });
  const gameType = computed(() => {
    const data = [
      {
        name: "All",
        label: "All",
        id: "0",
      },
      ...(siteDataInfo.value.data.gameClass || []).map((item, index) => {
        return {
          name: item.className,
          label: item.className,
          id: (index + 1).toString(),
        };
      }),
    ];
    return data;
  });
  const walletSite = computed(() => siteDataInfo.value.data.wallet);

  return {
    siteDataInfo,
    siteData,
    classRow,
    gameType,
    walletSite,
    gameClass,
    getSiteApiRequest,
    getSiteApiSuccess,
  };
});
