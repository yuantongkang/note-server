// chai 的用法： http://chaijs.com/guide/styles/

import request from 'request'
import {expect}  from 'chai'
import {model, sequelize} from '../../models'

const hash = require('../../helper/util')['hash']
const url = 'http://localhost:8888/notebooks'


before(function(done) {
  console.log('start...')
  model.Notebook.sync({force: true}).then(()=>{
    done()
  })
})

describe('GET /notebooks/', ()=>{
  it('获取笔记本列表应该为空', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(body).data).to.be.an('array')
      expect(JSON.parse(body).data).to.have.lengthOf(0)
      console.log(JSON.parse(body).data)
      done()
    })
  })
})



describe(`POST /notebooks/`, ()=>{
  it('创建笔记本无参数应该报错', done=>{
    request.post(`${url}/`, {
      form: {
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('创建笔记本参数为空应该报错', done=>{
    request.post(`${url}/`, {
      form: {
        title: ''
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('创建笔记本标题太长应该报错', done=>{
    request.post(`${url}/`, {
      form: {
        title: '1234567890123456789012345678901'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('创建笔记本标题正确应该创建成功', done=>{
    request.post(`${url}/`, {
      form: {
        title: '我的笔记1'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('获取笔记本列表数量应该为1', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      let data = JSON.parse(body).data
      expect(data).to.be.an('array')
      expect(data).to.have.lengthOf(1)

      done()
    })
  })
  it('再次创建笔记本参数正确应该创建成功', done=>{
    request.post(`${url}/`, {
      form: {
        title: '我的笔记2'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('再次获取笔记本列表数量应该为2', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      let data = JSON.parse(body).data
      expect(data).to.be.an('array')
      expect(data).to.have.lengthOf(2)
      done()
    })
  })
})

describe(`PATCH /:notebookId`, ()=>{
  it('修改笔记本参数不正确应该报错', done=>{
    request.patch(`${url}/aa`, {
      form: {
        title: ''
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('修改笔记本参数正确应该成功', done=>{
    request.patch(`${url}/1`, {
      form: {
        title: '我的笔记23'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe(`DELETE /:notebookId`, ()=>{
  it('删除笔记本笔记本不存在应该报错', done=>{
    request.delete(`${url}/a`, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('删除笔记本笔记本存在应该成功', done=>{
    request.delete(`${url}/1`, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('获取笔记本列表数量应该为1', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(body).data).to.have.lengthOf(1)
      done()
    })
  })
})



