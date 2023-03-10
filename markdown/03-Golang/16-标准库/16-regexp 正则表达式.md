# `regexp` 正则表达式

<div class="o">https://pkg.go.dev/regexp@go1.19.4</div>

## 是否匹配

<div class="run"></div>

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    match, err := regexp.MatchString("h[a-z]+.*d$", "hello world")
    if err != nil {
        panic(err)
    }
    fmt.Println(match)

    match, err = regexp.MatchString("h[a-z]+.*d$", "ello world")
    if err != nil {
        panic(err)
    }
    fmt.Println(match)
}
```

## 匹配所有子字符串

<div class="run"></div>

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    c, err := regexp.Compile("h[a-z]")
    if err != nil {
        panic(err)
    }

    res := c.FindAllString("hello world", -1)
    fmt.Printf("res = %v\n", res)

    res2 := c.FindAllString("hello world hi ha h1", -1)
    fmt.Printf("res2 = %v\n", res2)
}
```

## 匹配中文

<div class="run"></div>

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    match, err := regexp.MatchString("\\x{4e00}-\\x{9fa5}", "hello world")
    if err != nil {
        panic(err)
    }
    fmt.Println(match)

    match, err = regexp.MatchString("\\p{Han}+", "hello 世界")
    if err != nil {
        panic(err)
    }
    fmt.Println(match)
}
```

## 工具网站

<div class="link">https://regexr.com</div>
