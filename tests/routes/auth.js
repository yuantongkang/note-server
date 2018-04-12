import request from 'request'
import {expect}  from 'chai'
import {model, sequelize} from '../../models'

const hash = require('../../helper/util')['hash']
const url = 'http://localhost:8888'

before((done)=>{
  sequelize.sync({force: true}).then(()=>{
    done()
  })
})





describe('POST /auth/register - 创建用户', ()=>{
  it('参数符合规则，应该成功', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: 'user1', 
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('参数不符合规则，应该失败', done=>{
    request.post(`${url}/auth/register`, {
      form: {
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('参数不符合规则，应该失败', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: '',
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('参数不符合规则，应该失败', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: 'use',
        password: '1234'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('用户已存在，应该失败', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: 'user1', 
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
})

describe('POST /auth/login - 登录', ()=>{
  it('参数不符合规则，应该失败', done=>{
    request.post(`${url}/auth/login`, {
      form: {
        username: 'user1'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('密码不正确，应该失败', done=>{
    request.post(`${url}/auth/login`, {
      form: {
        username: 'user1',
        password: '12345678'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('参数正确，应该成功', done=>{
    request.post(`${url}/auth/login`, {
      form: {
        username: 'user1', 
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('GET /auth - 判断用户是否登录', ()=>{
  //因为没带 cookie
  it('应该未登录', done=>{
    request.get(`${url}/auth`, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(body).isLogin).to.equal(false)
      done()
    })
  })
})

describe('GET /auth/logout - 注销登录', ()=>{
  it('应该失败', done=>{
    request.get(`${url}/auth/logout`, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
})


