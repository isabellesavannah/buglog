import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async delete(id) {
    return await dbContext.Notes.findByIdAndDelete(id)
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async find(query = {}) {
    return await dbContext.Notes.find(query)
  }
}
export const notesService = new NotesService()
