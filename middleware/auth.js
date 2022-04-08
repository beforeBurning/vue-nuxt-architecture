// 路由中间件
export default (context) => {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
