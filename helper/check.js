
export function checkLogin(req, res, next) {
  if(req.session.user){
    next()
  }else {
    res.status(400).send({msg: '登录后才能操作'})
  }
}

export function checkUsername(req, res, next){
  let [username = ''] = [req.body.username]
  if(/^[\w\u4e00-\u9fa5]{1,15}$/.test(username)){
    next()
  }else{
    res.status(400).send({msg: '用户名长度1到15个字符，只能是字母数字下划线中文'})
  }
}

export function checkPassword(req, res, next){
  let [password = ''] = [req.body.password]
  if(/^.{6,16}$/.test(password)){
    next()
  }else{
    res.status(400).send({msg:'密码长度6到16个字符'})
  }
}

export function checkNotebook(req, res, next){
  let [title = ''] = [req.body.title]
  if(title.trim() === '' || title.length > 30){
    res.status(400).send({msg: '笔记本标题不能为空，且不超过30个字符'})
  }else{
    next()
  }
}

export function checkNote(req, res, next){
  let [title = '', content = ''] = [req.body.title, req.body.content]
  if(title.length > 30){
    res.status(400).send({msg: '笔记标题不能不超过30个字符'})
  }else if(content.length > 8000){
    res.status(400).send({msg: '笔记内容不超过8000个字符'})
  }else {
    next()
  }
}
export function checkParam(req, res, next){
  let notebookId = req.params.notebookId
  if(!/^\d{1,20}$/.test(notebookId)){
    res.status(400).send({msg: '缺少 notebookId 参数或者 notebookId 无效'})
  }else {
    next()
  }
}