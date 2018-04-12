// chai 的用法： http://chaijs.com/guide/styles/

import request from 'request'
import {expect}  from 'chai'
import {model, sequelize} from '../../models'

const hash = require('../../helper/util')['hash']
const url = 'http://localhost:8888/notes'


describe(`POST /notes/ab`, ()=>{
  before(function(done) {
    model.Notebook.sync({force: true}).then(()=>{
      model.Note.sync({force:true}).then(()=>{
        request.post(`http://localhost:3000/notebooks/`, {
          form: {
            title: '我的笔记本1'
          }
        }, (err, response, body)=>{
          done()
        })
      })
    })
  })

  it('创建笔记参数不正确应该报错', done=>{
    request.post(`${url}/`,{
      form: {
        content: ''
      }
    }, function(err, response, body){
      expect(response.statusCode).to.equal(404)
      done()
    })
  })

  it('创建笔记参数正确应该成功', done=>{
    request.post(`${url}/to/1`,{
      form: {
        title: 'hello',
        content: '我是内容'
      }
    }, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe(`GET /notes/from/1`, ()=>{
  it('获取笔记列表参数正确应该成功', done=>{
    request.get(`${url}/from/1`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe(`DELETE /notes/:noteId`, ()=>{
  it('删除笔记到回收站参数正确应该成功', done=>{
    request.delete(`${url}/1`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})


describe(`PATCH /notes/:noteID`, ()=>{
  it('先创建笔记应该成功', done=>{
    request.post(`${url}/to/1`,{
      form: {
        title: 'hello',
        content: '我是内容',
      }
    }, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })

  it('修改笔记参数正确应该成功', done=>{
    request.patch(`${url}/2`, {
      form: {
        title: '饥人谷'
      }
    },function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe(`GET /notes/trash`, ()=>{
  it('获取回收站笔记应该成功', done=>{
    request.get(`${url}/trash`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe(`PATCH /notes/:noteId/revert`, ()=>{
  it('从回收站恢复笔记应该成功', done=>{
    request.patch(`${url}/1/revert`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe(`DELETE /notes/:noteID/confirm`, ()=>{
  it('彻底删除笔记参数正确应该成功', done=>{
    request.delete(`${url}/1/confirm`, {form: {force: true}}, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})


