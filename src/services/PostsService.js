import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { sandBoxApi } from "./AxiosService"

class PostsService {

  async getPosts() {
    const res = await sandBoxApi.get('/api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.newer
    AppState.previousPage = res.data.older
  }

  async changePage(url) {
    const res = await sandBoxApi.get(url)
    console.log(res.data);
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.newer
    AppState.previousPage = res.data.older
  }

  async getPostsByProfileId(creatorId) {

    const res = await sandBoxApi.get('/api/posts', {
      params: {
        creatorId
      }
    })
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.newer
    AppState.previousPage = res.data.older
  }

  async createPost(postData) {
    const res = await sandBoxApi.post('/api/posts/', postData)
    AppState.posts.unshift(new Post(res.data))
    logger.log('making a post', res.data)
  }

  async deletePost(id) {
    await sandBoxApi.delete(`/api/posts/${id}`)
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }

  async likePost(id) {
    const res = await sandBoxApi.post(`api/posts/${id}/like`)
    const index = AppState.posts.findIndex(p => p.id == id)
    console.log(index);
    AppState.posts.splice(index, 1, new Post(res.data))
  }

  async search(query) {
    const res = await sandBoxApi.get('/api/posts', {
      params: {
        query: query
      }
    })
    AppState.posts = res.data.posts.map(p => new Post(p))
    console.log(res.data.posts, AppState.posts);
  }

}

export const postsService = new PostsService()