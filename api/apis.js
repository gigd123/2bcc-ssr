import { apiRequest } from "@/api/apiClients";

export const postGetSiteApi = async ({ postData, reqUrl }) => {
  return apiRequest({
    apiUrl: "/member_api/site.php",
    postData,
    reqUrl,
  });
};
