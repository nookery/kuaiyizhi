# `log` 日志

<div class="o">https://pkg.go.dev/log@go1.19.4</div>

Go 标准库中提供了日志记录的包，需要使用时请查阅其官方文档。

以下展示部分功能。

## 输出到终端

<div class="run"></div>

```go
package main

import (
    "log"
    "os"
)

func main() {
    log.SetOutput(os.Stdout)

    log.Println("测试信息")
}
```

## 输出到文件

```go
package main

import (
    "log"
    "os"
)

func main() {
    // 要保证file存在
    log.SetOutput(file)

    log.Println("测试信息")
}
```
