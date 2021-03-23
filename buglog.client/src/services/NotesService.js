import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default class NotesService {
  async createNote(newNote) {
    try {
      const res = await api.post('api/notes', newNote)
      AppState.notes.push(res.data)
      console.log(res.data)
      return res.data._id
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllNotesById(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteNote(notes) {
    try {
      await api.delete('api/notes/' + notes._id)
      // this.getAllNotesById(notes.bugId)
    } catch (error) {

    }
  }

  async closeBug() {
    try {
      await api.delete('api/')
    } catch (error) {

    }
  }
}
export const notesService = new NotesService()
