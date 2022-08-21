import { AppState } from "../AppState"
import { Ad } from "../models/Ad";
import { sandBoxApi } from "./AxiosService"

class AdsService {


  async getAds() {
    const res = await sandBoxApi.get('/api/ads')
    AppState.ads = res.data.map(a => new Ad(a))
    console.log(res.data, AppState.ads);

  }
}

export const adsService = new AdsService()