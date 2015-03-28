测试：命令行进入根目录输入指令 node server.js
      chorme 或 firefox 打开 localhost:3000/SX/index.html (X为1~5)

设计初衷：S1 @键不可用，得到结果的按钮将不再激活，鼠标移出环形按钮重置。
          S2 兼容S1功能，即可人为点击也可执行机器人，机器人将自动跳过已点击的按钮。
          S3 xmlhttp.js中重定义了XMLHttp对象，实现xmlhttp对象池，避免了因浏览器缓冲而无法同时发送请求的情况。
          S4 随机机器人将跳过已按按钮。
          S5 有一定概率使得无法接受服务端结果，错误处理提示显示在console中。
