## http 请求处理时的 11 个阶段

1. POST_READ realip
2. SERVER_REWRITE rewrite
3. FIND_CONFIG
4. REWRITE rewrite
5. POST_REWRITE
6. PREACCESS limit_conn,limit_req
7. ACCESS auth_basic,access,auth_request
8. POST_ACCESS
9. PRECONTENT try_files
10. CONTENT index,autoindex,concat
11. LOG access_log

## 如何拿到真实的用户 IP 地址

1. tcp 连接四元组(src ip,src port, dst ip, dst port)
2. http 头部 x-Forwarded-for 用于传递 ip
3. http 头部 x-real-ip 用于传递用户 ip
4. 网络中存在许多反向代理

- 基于变量
  如果 binary_remote_addr,remote_addr 这样的变量,
  其值为真实的 IP

### realip 模块

1. 默认不会编译进 Nginx,需要通过--with_http_realip_module 启用功能
2. 变量

- realip_remote_addr
- realip_remote_port

3. 功能  
   修改客户端地址
4. 指令

- set_real_ip_from
- real_ip_header field|x-real-ip|x-forwarded-for
- real_ip_recursive on|off
