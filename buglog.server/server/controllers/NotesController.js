import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await notesService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(201, await notesService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await notesService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
