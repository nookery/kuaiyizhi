# `strconv` 字符串转换

<div class="o">https://pkg.go.dev/strconv@go1.19.4</div>

## 简介

`strconv` 包用于字符串与其他类型的互相转换。

## 字符串转整型

### ParseInt

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := "0"
    b := "1"
    c := "128"
    d := "256"

    // 第二个参数是进制
    aa,_ := strconv.ParseInt(a, 10, 8)
    bb,_ := strconv.ParseInt(b, 10, 16)
    cc,_ := strconv.ParseInt(c, 10, 32)
    dd,_ := strconv.ParseInt(d, 10, 64)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
    fmt.Println(reflect.TypeOf(dd), dd)
}
```

### Atoi

`Atoi`：`Array to int`，这里的`Array`指的是字符组成的数组。

`strconv.Atoi` 等价于 `strconv.ParseInt(s, 10, 0)` 。

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := "0"
    b := "1"
    c := "128"
    d := "256"

    // 第二个参数是进制
    aa,_ := strconv.Atoi(a)
    bb,_ := strconv.Atoi(b)
    cc,_ := strconv.Atoi(c)
    dd,_ := strconv.Atoi(d)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
    fmt.Println(reflect.TypeOf(dd), dd)
}
```

## 整型转字符串

### FormatInt

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := int64(24)
    b := int64(24)
    c := int64(24)

    aa := strconv.FormatInt(a, 2)
    bb := strconv.FormatInt(b, 8)
    cc := strconv.FormatInt(c, 16)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
}
```

### FormatUint

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := uint64(24)
    b := uint64(24)
    c := uint64(24)

    aa := strconv.FormatUint(a, 2)
    bb := strconv.FormatUint(b, 8)
    cc := strconv.FormatUint(c, 16)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
}
```

### Itoa

`Itoa`：`Int to array`，这里的`Array`指的是字符组成的数组。

`strconv.Itoa` 等同于 `strconv.FormatInt(int(i), 10)`。

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := int(24)
    b := int(24)
    c := int(24)

    aa := strconv.Itoa(a)
    bb := strconv.Itoa(b)
    cc := strconv.Itoa(c)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
}
```

## 字符串转浮点

### ParseFloat

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := "1.00"
    b := "2.3"
    c := "333.3"
    d := "33234.5"

    aa,_ := strconv.ParseFloat(a, 32)
    bb,_ := strconv.ParseFloat(b, 64)
    cc,_ := strconv.ParseFloat(c, 64)
    dd,_ := strconv.ParseFloat(d, 64)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
    fmt.Println(reflect.TypeOf(dd), dd)
}
```

## 浮点转字符串

### FormatFloat

```
func FormatFloat(f float64, fmt byte, prec, bitSize int) string
```

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := float64(1.00)
    b := float64(2.343434444)
    c := float64(333.3)
    d := float64(33234.5)

    aa := strconv.FormatFloat(a, 'E', 2, 32)
    bb := strconv.FormatFloat(b, 'E', 2, 64)
    cc := strconv.FormatFloat(c, 'E', 2, 64)
    dd := strconv.FormatFloat(d, 'E', 2, 64)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
    fmt.Println(reflect.TypeOf(dd), dd)
}
```

## 字符串转布尔

### ParseBool

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := "true"
    b := "false"
    c := "0"
    d := "1"

    aa,_ := strconv.ParseBool(a)
    bb,_ := strconv.ParseBool(b)
    cc,_ := strconv.ParseBool(c)
    dd,_ := strconv.ParseBool(d)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
    fmt.Println(reflect.TypeOf(cc), cc)
    fmt.Println(reflect.TypeOf(dd), dd)
}
```

## 布尔转字符串

### FormatBool

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"
import "strconv"

func main() {
    a := true
    b := false

    aa := strconv.FormatBool(a)
    bb := strconv.FormatBool(b)

    fmt.Println(reflect.TypeOf(aa), aa)
    fmt.Println(reflect.TypeOf(bb), bb)
}
```

## 字符串转复数

### ParseComplex

```
func ParseComplex(s string, bitSize int) (complex128, error)
```

## 复数转字符串

### FormatComplex

```
func FormatComplex(c complex128, fmt byte, prec, bitSize int) string
```
