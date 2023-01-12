```js
{
    "start": "nodemon -w src/ -e ts --exec ts-node ./src/index.ts",
}

```

nodemon --watch src/ 表示检测目录是 package.json 同级目录 src 文件夹

-e ts 表示 nodemon 命令准备将要监听以 ts 为文件后缀名的文件

--exec ts-node ./src/index.ts 表示检测到 src 目录下有任何变化的都要重新执行 index.ts 文件。
