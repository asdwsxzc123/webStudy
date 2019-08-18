## listen 指令的用法

1. address[:port]
2. port
3. unix:path

- 示例:

1.  listen unix:/var/runnginx.sock;
2.  listen 127.0.0.1:8000
3.  listen 127.0.0.1;
4.  listen 8000
5.  listen \*:8000
6.  listen localhost:8000 bind;
7.  listen [::]:8000 ipv6only=on
8.  listen [::1]
