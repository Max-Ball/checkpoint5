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
}

export const profilesService = new ProfilesService()