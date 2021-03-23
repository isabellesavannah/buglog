import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import BugsSchema from '../models/Bugs'
import NotesSchema from '../models/Notes'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bugs', BugsSchema);
  Notes = mongoose.model('Notes', NotesSchema);
}

export const dbContext = new DbContext()
