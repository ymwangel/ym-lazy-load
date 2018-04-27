## LazyImg

### Install

```
<script type="text/javascript" src="https://github.com/ymwangel/HelloWorld/blob/master/lazy/umd-lazy-img.js"></script>
```

### Param Introduction

```

container:传入的dom元素内执行懒加载 不传默认是body,如果是id属性，则传入'#id'，class属性，则传入'.class'

dataSrc: 懒加载需要的图片的key <img data-src="xxx.gif" />

```


### Usage

```javascript

  new LazyImg({
    container: 'body',
    dataSrc: 'data-src'
  })
  
```