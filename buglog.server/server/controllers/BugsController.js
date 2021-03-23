import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getNoteById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      return res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(201, await bugsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const data = await bugsService.editBug(req.params.id, req.body, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
      // delete prop off an object, + hide button req.b.cl = wat we want
    }
  }

  async closeBug(req, res, next) {
    try {
      res.send(await bugsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      res.send(await notesService.find({ bug: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
