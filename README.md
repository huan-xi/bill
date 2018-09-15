# 班费记账项目简介

## 项目背景

> 	学习Angular例子，采用前后端分离的开模式，全站异步获取数据。

## 功能简介

- 显示账单列表
  - 上拉加载更多
  - 下拉刷新
  - 按标题搜索
  - 按时间或金额大小排序显示
- 查看详情
- 登入控制添加权限
- 添加
  - 获取最近使用的操作人
  - 默认使用次数最多的操作人

## 技术栈

- 前端 ：ionic3+angular4.x
- 后端：springboot  +spring+springMVC+Mybatis
- 部署管理：maven，github，Linux，nginx，springboot内置tomcat

## Sql语句

- 建库建表语句

  见文件	sql.sql

- 查询出现的名字及次数并根据次数排序

```mysql
select name,count(*) as count from bill group by name order by count desc;
```

## 运行截图

![](https://huanxi-image.oss-cn-beijing.aliyuncs.com/markdown/2B6B28F823D5FC222D29FE2FD3BBD173.png)

![](https://huanxi-image.oss-cn-beijing.aliyuncs.com/markdown/847D561AECCC42350FAEE457A52421DF.png)

![](https://huanxi-image.oss-cn-beijing.aliyuncs.com/markdown/CCCB045FB8C969229C19D5A8EC25CB73.png)

![](https://huanxi-image.oss-cn-beijing.aliyuncs.com/markdown/F48BDDDF5CB7943BCB6794312EEC9FC6.png)

## 资源外联

>  因为服务器只有1M带宽，而这ionic项目的vendor.js有5M，客户端的话已经下载了，如果第一次网页访问必然会下载几分钟，而且会造成阻塞，所以将此文件外联至阿里云oss服务器

## 部署简介

> 	部署十分简单，因为是前后端分离，直接将静态文件部署至nginx即可，然后将后端API加入nginx的API网关（将/bill/开头的地址反向代理给7000端口的Tomcat）中，解决js跨域访问的问题，响应头中添加Access-Control-Allow-Origin：your domain，即可。
>
> ***nginx server配置示例：***

```nginx
#bill模块
	upstream bill{
		server 127.0.0.1:7000;
	}
server {
		listen			80;
		server_name		bill.huanxicloud.xyz;
		add_header Cache-Control no-cache;
		location / {
		#静态文件地址			
 		  }
	}
server {
    listen       80;
    server_name  api.huanxicloud.xyz;
	add_header Access-Control-Allow-Origin http://bill.huanxicloud.xyz;
	add_header Access-Control-Allow-Credentials true;
	location ^~ /bill/ {
		proxy_pass http://bill;
		proxy_set_header Cookie $http_cookie;
	}
    error_page  404              /404.html;
}
```



    
