import {randomId} from '../helper/util'
export default (sequelize, DataTypes, Foreign) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    userId: DataTypes.INTEGER
  })
  return Notebook
}