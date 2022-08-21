import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { sandBoxApi } from "./AxiosService"

class ProfilesService {

  async getProfileById(profileId) {
    const res = await sandBoxApi.get(`/api/profiles/${profileId}`)
    logger.log('get profile by id', res.data)
    AppState.activeProfile = new Profile(res.data)
  }
  async search(query) {
    const res = await sandBoxApi.get('/api/profiles', {
      params: {
        query: query
      }
    })
    AppState.profiles = res.data.map(p => new Profile(p))
    console.log(res.data, AppState.profiles);
  }
}

export const profilesService = new ProfilesService()