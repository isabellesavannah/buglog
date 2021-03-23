import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugsService {
  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async delete(id) {
    return await dbContext.Bugs.findByIdAndDelete(id)
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async find(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator')
  }

  async editBug(id, update) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: id }, update, {
      new: true
    })
    if (!bug) {
      throw new BadRequest('Invalid ID')
    }
    return bug
  }
}
export const bugsService = new BugsService()
