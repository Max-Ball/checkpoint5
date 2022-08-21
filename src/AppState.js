import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/Profile.js').Profile} */
  activeProfile: {},

  /**@type {import('./models/Profile').Profile} */
  profiles: null,

  /**@type {import('./models/Post').Post} */
  posts: null,
  nextPage: null,
  previousPage: null,
  activePost: null,

  /**@type {import('./models/Ad').Ad[]} */
  ads: [],


})
