# 认识 Java

Java 是当下最流行的编程语言之一，广泛应用于各个领域。

安卓操作系统就是使用 Java 开发的。

## 主要特点

- 面向对象：所有东西都是对象
- 跨平台：编写一次、随处运行
- 多线程：可以用于编写同时执行众多任务的程序

## 第一个 Java 程序

<div class="run"></div>

```java
public class MyFirstJavaProgram {
    public static void main(String []args) {
        System.out.println("Hello");
    }
}
```

这样是定义了一个类：

```java
public class MyFirstJavaProgram {
}
```

这样是定义了一个方法：

```java
public static void main(String []args) {
}
```

这是一条语句，表示输出`Hello`:

```java
System.out.println("Hello");
```

## 查看本机 Java 程序信息

<div class="run"></div>

```shell
java --version
```
