
import Sequelize from 'sequelize'
const env     = process.env.NODE_ENV || 'development'
const config  = require(__dirname + '/../config/config.json')[env]
const sequelize = new Sequelize(config)

import Note from './note'
import Notebook from './notebook'
import User from './user'

const model      = {}



model.Notebook = sequelize.import('./notebook')
model.Note = sequelize.import('./note')
model.User = sequelize.import('./user')

model.Notebook.hasMany(model.Note, {foreignKey:'notebookId', targetKey:'id'})
model.User.hasMany(model.Notebook, {foreignKey:'userId', targetKey:'id'})
model.User.hasMany(model.Note, {foreignKey:'userId', targetKey:'id'})

sequelize.sync(/*{force: true}*/)


export {model, sequelize} 
