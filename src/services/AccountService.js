import { AppState } from '../AppState'
import { Account } from '../models/Account'
import { logger } from '../utils/Logger'
import { sandBoxApi } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await sandBoxApi.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(accountData) {
    const res = await sandBoxApi.put('/account', accountData)
    AppState.account = new Account(res.data)
  }
}

export const accountService = new AccountService()
