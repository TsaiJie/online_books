const path = require('path')
// json-server 依赖 express
const express = require('express')
const jsonServer = require('json-server')
const server = jsonServer.create()
// json-server 生成路由
const router = jsonServer.router('db.json')
const middleWares = jsonServer.defaults()
const root = __dirname + '/build'
// 路由有两部分来管理 SPA 和 json-server,当两者一样时，刷新页面json-server就会接管路由，就会返回{}
// 所以要添加一个白名单，把SPA管理的路由添加进去，当进行访问时，跳转到index首页。
const reactRouterWhiteList = ['/create', '/edit/:itemId']
server.get(reactRouterWhiteList, (request, response) => {
  response.sendFile(path.resolve(root, 'index.html'))
})
// sever 静态文件
server.use(express.static(root, { maxAge: 86400000 }))
// sever 中间件
server.use(middleWares)
// server 路由
server.use(router)

server.listen(3000, () => {
  console.log('server is runing...')
})
