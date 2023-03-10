# `time` 时间

<div class="o">https://pkg.go.dev/time@go1.19.4</div>

## 当前时间

<div class="run"></div>

```go
package main
import "fmt"
import "time"

func main() {
    fmt.Println(time.Now())
}
```

## 当前日期

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "time"

func main() {
    t := time.Now()

    fmt.Println(reflect.TypeOf(t))
    fmt.Println(t.Day())
}
```

<div class="run"></div>

```go
package main
import "fmt"
import "time"

func main() {
    var t time.Time = time.Unix(1608632200, 0)

    fmt.Println(t)
}
```

## 定时器

<div class="run"></div>

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(time.Second)
    defer ticker.Stop()

    done := make(chan bool)
    go func() {
        time.Sleep(5 * time.Second) // 模拟耗时操作
        done <- true
    }()

    for {
        select {
        case <-done:
            fmt.Println("Done!")
            return
        case <-ticker.C:
            fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
        }
    }
}

// $ go run main.go
// 输出如下，你的输出可能和这里的不一样
/**
  2021-01-03 15:40:21
  2021-01-03 15:40:22
  2021-01-03 15:40:23
  2021-01-03 15:40:24
  2021-01-03 15:40:25
  Done!
*/
```
