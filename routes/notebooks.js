import express from 'express'
import {checkNotebook} from '../helper/check'
import {model} from '../models'
const router = express.Router()

//获取笔记本列表
router.get('/', (req, res) => {
  model.Notebook.findAll({where:{userId: req.session.user.id}})
    .then(notebooks=>{
      let promiseArr = notebooks.map(notebook=>notebook.getNotes())
      Promise.all(promiseArr).then(values=>{
        let books = notebooks.map((notebook, idx)=>{
          let book = notebook.get({plain: true})
          book.noteCounts = values[idx].length
          return book
        })
        res.send({data: books})
      })
      
    })
})

//创建笔记本
router.post('/', checkNotebook, (req, res) =>{
  let title = req.body.title
  model.Notebook.create({title, userId: req.session.user.id}).then(val=>{
    console.log('create success')
    res.send({msg: '创建笔记本成功', data: val})
  })
})

//修改笔记本标题
router.patch('/:notebookId', checkNotebook, (req, res) =>{
  let title = req.body.title
  model.Notebook.update({title:title},{where: {id: req.params.notebookId, userId: req.session.user.id}})
    .then(([affectRow])=>{
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      res.send({msg: '修改成功'})
    })
})

//删除笔记本
router.delete('/:notebookId', (req, res) =>{
  model.Note.findAll({where: {notebookId: req.params.notebookId, userId: req.session.user.id}})
    .then(notes=>{
      if(notes.length > 0){
        res.status(400).send({msg: '笔记本不为空或者回收站中还有属于当前笔记本的笔记'})
      } else {
        model.Notebook.destroy({where: {id: req.params.notebookId, userId: req.session.user.id}})
          .then(affectRow => {
            if(affectRow === 0){
              return res.status(400).send({msg: '笔记本不存在'})
            }
            res.send({msg: '删除成功'})
          })
      }

    })

})


export default router
