const DEFAULT_CONFIG = {
  // websocket连接url
  url: null,
  // $PING$
  pingData: '$PING$',
  // 心跳间隔时间
  heartTime: 1000 * 5,
  // 超时时间
  timeout: 1000 * 30,
  // 重连次数，-1不限制次数
  reconnectCount: -1,
  // 重连间隔
  reconnectTime: 1000 * 5
}

const noop = () => { }

class Socket {
  constructor (options = {}) {
    Object.assign(this, DEFAULT_CONFIG, options)
    // socker实例
    this._socket = null
    // 标记是否为手动关闭
    this._close = false
    // 重连次数
    this._repeatCount = 0
    // 是否开启心跳
    this.isHeartBeat = false
    // 心跳定时器
    this._timer = null
    // 最后一次返回pong包时间
    this._lastResPingTime = 0
    // 本地网络状态  0:正常, -1:pong包未返回, -2:连接关闭closed
    this._localNetwork = 0

    // event
    this._onOpen = options.onOpen || noop // 连接成功后回调
    this._onMessage = options.onMessage || noop // 接收消息回调
    this._onError = options.onError || noop // 连接失败回调
    this._onClose = options.onClose || noop // 连接关闭回调
    this._onNetwork = options.onNetwork || noop
  }

  // websocket初始化
  init () {
    this._connect()
    return this
  }

  // websocket销毁
  destroy () {
    this._close = true
    if (this._socket) {
      this._socket.close()
    }
    this._onOpen = noop
    this._onMessage = noop
    this._onError = noop
    // this._onClose = noop
    this._socket = null
    this._repeatCount = 0
    this.url = ''
  }

  // websocket发送消息
  sendMessage (data) {
    return new Promise((resolve, reject) => {
      if (!this._socket) {
        reject(new Error('socket is null'))
        return
      }
      this._socket.send(typeof data === 'string' ? data : JSON.stringify(data))
      resolve()
    })
  }

  // websocket状态
  isClosed () {
    return this._close
  }

  // 连接websocket
  _connect () {
    this._close = false
    this._socket = new WebSocket(this.url)
    this._bindEvent()
  }

  // websocket绑定事件回调
  _bindEvent () {
    if (!this._socket) {
      return
    }

    // 连接成功回调
    this._socket.onopen = (res) => {
      this._onOpen(res)
    }

    // 接收消息回调
    this._socket.onmessage = (res) => {
      // ping包返回
      if (/^\$PONG\$/.test(res.data)) {
        // 设置最后一次接收到pong包的时间
        this._lastResPingTime = new Date().getTime()
      } else {
        this._onMessage(res)
      }
    }

    // 连接失败回调
    this._socket.onerror = (res) => {
      // this._reconnect()
      this._onError(res)
    }

    // 连接关闭回调
    this._socket.onclose = (res) => {
      this._onClose(res, this._close)
      if (!this._close) {
        this.setLocalNetwork(-2)
      }
      // this._reconnect()
    }
  }

  // 重新连接websocket
  _reconnect () {
    clearTimeout(this._reconectTimer)
    if (!this._socket || this._socket.readyState !== 3) {
      // 0 CONNECTING 1 OPEN 2 CLOSING 3 CLOSED
      return
    }
    this._repeatCount++
    if (this._close) {
      return
    }
    if (this.reconnectCount !== -1 && this._repeatCount >= this.reconnectCount) {
      return
    }
    this._reconectTimer = setTimeout(() => {
      this._connect()
    }, this.reconnectTime)
  }

  // 发送心跳
  _heartBeat () {
    if (this._close || !this.pingData || !this.isHeartBeat) {
      return
    }
    this.sendMessage(this.pingData)
    this._checkPing(new Date().getTime())
    this._timer = setTimeout(() => {
      this._heartBeat()
    }, this.heartTime)
  }

  //  在下次ping包发送前未收到返回，判断网络异常
  _checkPing (sendTime) {
    setTimeout(() => {
      if (this._close || !this.pingData || !this.isHeartBeat || this._lastResPingTime) {
        return
      }
      if (this._lastResPingTime - sendTime <= 0) {
        // 发送ping之后，没有接收到pong响应
        this.setLocalNetwork(-1)
      } else {
        this.setLocalNetwork(0)
      }
    }, this.heartTime - 1000)
  }

  setLocalNetwork (network) {
    if (network !== this._localNetwork) {
      this._onNetwork(network)
    }
    this._localNetwork = network
  }

  // 是否开启或关闭心跳，flag: true开启，false关闭
  setHeartBeat (flag) {
    this.isHeartBeat = flag
    clearTimeout(this._timer)
    flag && this._heartBeat()
  }
}

export default Socket
