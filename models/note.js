export default (sequelize, DataTypes, Foreign) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    notebookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    indexes: [{
      fields: ['notebookId']
    }
  ]})
  return Note;
}