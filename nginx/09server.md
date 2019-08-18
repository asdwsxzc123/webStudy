## server_name 指令

1. 指令后可以跟多个域名,第一个是主域名
   server_name_in_redirect on |off
2. _泛域名: 仅支持在最前面或者最后
   server_name _.baidu.com
3. 正则表达式: 加~前缀
   server_name www.baidu.com ~^www\d+\.baidu\.com
4. 正则表达式创建变量: 用小括号()

```conf
  server {
    server_name ~^(www\.)?(.+)$;
    location / {
      root /sites/$2
    }
  }
```

5. 其他

- .baidu.com 可以匹配 baidu.com \*.baidu.com
- \_匹配所有
- "" 匹配没有传递 Host 头部

  curl www.baidu.com -I 获取网站的请求信息

## server 匹配顺序

1. 精确匹配
2. \*在前的泛域名
3. \*在后的泛域名
4. 按文件中的顺序匹配正则表达式域名
5. default server

- 第一个
- listen 知道 default
