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

## rewrite 模块

```conf
error_page 404 /404.html
error_page 500 502 / 50x.html
error_page 404 =200 /empty.gif
location / {
error_page 404 = @fallback;
}
location @fallback {
proxy_pass http://backend;
}
```

return 可以做重定向,简单的返回

### rewrite 指令

rewrite regex relacement [flag]

1. 将 regex 指定的 url 替换成 replacement 这个新的 url. 可以使用正则表达式及变量提取
2. replacement 以http://或https://或者$schema开头,则直接返回302重定向
3. 替换后的 url 根据 flag 指定的方式进行处理

   - last: 用 replacement 这个 Uri 进行新的 location 匹配
   - break: break 指令停止当前脚本指令的执行,等价于独立的 break 指令
   - redirect: 返回 302 重定向
   - permanent: 返回 301 重定向

rewrite_log on 可以查看 rewrite 的日志

### rewrite if 指令

if (condition) {...}  
context: server location  
 条件 condition 为真,则执行大括号内的指令,遵循值指令的继承规则

1. 检查变量为空或者值为 0,直接使用
2. 将变量与字符串做匹配,使用=,!=
3. 将变量与正则表达式做匹配
   - 大小写敏感,~,!~
   - 大小写不敏感, ~_,!~_
4. 检查文件是否存在,使用-f 或者!-f
5. 检查目录是否存在,使用-d 或者!-d
6. 检查文件,目录,软链接是否存在,-e 或者!-e
7. 检查是否为可执行文件,-x,!-x

例子

```conf
if ($http_user_agent ~ MSIE) {
  rewrite ^(.*)$ /msie/$1 break;
}

if ($http_cookie ~* "id=([^:]+)(?:;|$)") {
  set $id $1;
}

if ($request_method = POST) {
  return 405;
}

if ($slow) {
  limit_rate 10k;
}

if ($invalid_referer) {
  return 403;
}
```

## location 指令

syntax: location [=|~|~*|^~]uri {...};  
 location !name{...}
context: server, location

syntax: merge_slashes on |off
default: merge_slashes on;
context: http,server

1. 前缀字符串
   - 常规
   - =: 精准匹配
   - ^~: 匹配上后则不再进行正则匹配
2. 用于内部跳转的命名 location @

### 匹配规则

1. 匹配上=字符串
2. 匹配上^~字符串
3. 按照 location 出现的顺序匹配
4. 记住最长匹配的前缀字符串 location

## ngx_http_limit_conn_module 模块

默认编译进 nginx;  
生效范围:

    * 全部worker进程
    * 进入preaccess阶段前不生效
    * 限制的有效性取决于key的设计:依赖postread阶段的realip模块取到真实ip

### limit_conn 指令

1. 定义共享内存(包括大小),以及 key 关键字
   limit_conn_zone key zone=name:size  
   context: http
2. 限制并发连接数
   limit_conn zone number  
   context: http,server,location

3. 限制发生时的日志级别
   limit_conn_log_level info | notice|warn|error  
   default: limit_conn_log_level error;  
   context: http,server. location

4. 限制发生时向客户端返回的错误码
   limit_conn_status code;  
   defualt: limit_conn_status 503;
   context: http,server,location

```conf
http {
  limit_conn_zone $binary_remote_addr zone=addr:10m;
  server{
    server_name baidu.com;
    root html/;
    error_log logs/error.log info;
    location / {
      limit_conn_status 500;
      limit_conn_log_level warn;
      limit_rate 50;
      limit_conn addr 1;
    }
  }
}
```

### limit_req 模块

生效算法 leaky bucket 算法;  
将突发流量变成恒定流量

1. 定义共享内存, 以及 key 关键字和限制速率
   limt_req_zone key zone=name:size rate=rate;  
   context: http
2. 限制并发数
   limt_req zone=name[burst=number][nodelay]  
   context: http.server,location  
   burst 默认是 0,  
   nodelay,对 burst 中的请求不再采用延时处理的做法,而是立即处理
3. 限制发生时的日志级别
   limit_req_log_level info | notice| warn |error;  
   default error;
   context: http,server,location
4. 限制发生时向客户端返回的错误码
   limit_red_status code;
   limit_red_status 503;
   http,server,location

## access 模块

### ngx_http_access 模块

syntax: allow address|CIDR|unix:|all
syntax: deny address|CIDR|unix:|all  
context: http,server,location, limit_except

### auth_basic 模块

默认编译进 nginx  
指令:  
syntax: auth_basic string|off;  
default: auth_basic off;
context: http.server,location,limit_except

Syntax: auth_basic_user_file file;  
context: http,server,location,limit_except

- 生成工具 htpasswd httpd-tools
  htpasswd -c file -b user pass

### auth_request 模块

1. 需要单独添加 --with-http_auth_request_module
2. 功能: 向上游的服务器转发请求,若上游服务返回的响应码是 2xx,则继续执行,如果为 401 或者 403,则将响应返回给服务端
3. 原理: 收到请求后,生成子请求,通过反向 dialing 吧请求传递给上游服务
4. 指令:

- syntax: auth_request uri |off;  
  default: off;  
  context: http,server, location

- syntax: auth_request_set \$variable value;  
  context: http,server,location

## 限制所有 access 阶段模块的 satisfy 指令

syntac: satisfy all|any;
default: satisfy all;
context: http,server,location

- access 阶段的模块:

  - access
  - auth_basic
  - auth_request
  - 其他模块

- 问题
  - 如果有 return,access 阶段会生效
  - 多个 access 模块的顺序有影响吗
  - 入队密码,下面的问题件可以访问吗
  - 如果吧 deny all 提到 `auth_basic` 之前
  - 如果改为 allow all,有机会输入密码吗

## precontent 的 try_files 指令

syntax: try_files file ... uri;
context server,location

## 实时拷贝流量: preconetnt 的 mirror 模块

处理请求时,生成子请求访问其他服务,对子请求的返回值不做处理.  
syntax: mirror uri |off  
default: mirror off;  
context: http,server,location;

syntax: mirror_request_body on |off;  
default : mirror_request_body on;  
context: http,server,location

## content 的 root 和 alias 模块

syntax: alias path;
context: location;

syntax: root path;  
default: root html  
context: http,server,location,if in location

- 功能
  - 将 url 映射为文件路径,以返回静态文件内容
- 差异
  - root 会将完整的 url 映射进文件路径中
  - alias 只会讲 location 后的 url 映射到文件路径中

## 生成带访问文件的是三个相关变量

location /RealPath/ {
alias html/realpath/;
}

1. \$request_filename 代访问文件的完整路径
2. \$document_root 由 URI 和 root/alias 规则生成的文件夹路径
3. \$realpath_root 将 document_root 中的软链接等换成真实路径

- 静态文件返回的 content-type

  - syntax: types {text/html html; image/gif gif;}
  - context: http,server,location

  - syntax: default_type mime-type;
  - default: default_type text/plain;
  - context: http.server,location

  - syntax: types_hash_bucket_size size;
  - default: types_hash_bucket_size 64;
  - context: http,server,location;

  - syntax: types_hash_max_size size;
  - default: types_hash_max_size 1024;
  - context: http,server,location

- 未找到文件时的错误日志
  - syntax: log_not_found on |off;
  - default: log_not_found on;
  - context: http,server,location

## 重定向跳转的域名

1.

- syntax: server_name_in_redirect on|off;
- default: server_name_in_redirect off;
- context: http,server,location

2.

- syntax: port_in_redirect on |off;
- default: port_in_redirect on;
- context: http,server,location;

3.

- syntax: absolute_redirect on |off;
- default: absolute_redirect on;
- context: http,server,location;

## content 的 index 和 autoindex 模块

1. 功能 指定/访问时返回 index 文件内容
2. 功能 当 url 以/结尾时,尝试以 html/xml/json/jsonp 等格式返回 root/alias 中指向目录的目录结构

```conf
syntax: autoindex on |off;
deafult: autoindex off;
context: http, server,location

syntax: autoindex_format json|html

syntax: autoindex_exact_size off;
```

## access 日志格式

```conf
syntax: log_format name[escape]

syntax: access_log path[format [buffer=size] [gzip[=level]][flush=time][if=condition]]
default: access_log logs/access.log combined;
```

1. path 路径可以包含变量: 不打开 cache 始每记录一条日志都需要打开,关闭日志
2. if 通过变量值控制请求日志是否记录
3. 日志缓存

- 功能: 批量将内存中的日志写入磁盘
- 写入磁盘的条件
  - 所有待写入磁盘的日志大小超出缓存大小
  - 达到 flush 指定的过期时间
  - worker 进程执行 reopen 命令

4. 日志压缩

- 功能; 批量压缩内存中的日志,在写入磁盘
- buffer 大小默认为 64kb
- 压缩基本默认为 1

### 对日志文件名包含变量时的优化

```conf
syntax: open_log_file_cache max=N [inactive=time][min_uses=N][valid=time]
```

## http 模块过滤顺序

1. copy_filter: 复制包体内容
2. postpone_filter: 处理子请求
3. header_filter: 构造响应头部
4. write_filter: 发送响应

## sub

将响应中指定的字符串,替换成新的字符串.默认为编译进 nginx

1. sub_filter string replacement

2. sub_filter_last_modified on |off
3. sub_filter_once on |off
4. sub_filter_types mime-type ..
