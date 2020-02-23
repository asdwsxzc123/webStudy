function getRedisSessionId(sid) {
  return `ssid: ${sid}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }
  // 获取redis中存储的session数据
  async get(sid) {
    console.log('get session', sid);
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  //  存储到redis
  async set(sid, sess, ttl) {
    console.log('set session', sid);
    const id = getRedisSessionId(sid);
    if (typeof ttl === 'number') {
      // 以毫秒为单位,转成毫秒
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      console.log('set sess', sessStr);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 删除
  async destroy(sid) {
    console.log('del session', sid);
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}
module.exports = RedisSessionStore;
