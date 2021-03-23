import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default class BugsService {
  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs/', newBug)
      AppState.bugs.push(res.data)
      return res.data._id
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getBugById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async closeBug() {
    try {
      await api.delete('api/')
    } catch (error) {

    }
  } // switch to giant button, take info from end point, id,
}
export const bugsService = new BugsService()
