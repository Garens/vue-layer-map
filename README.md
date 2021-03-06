## vue-layer-map

install

```shell
npm install vue-layer-map
```

## Quick Start

在程序入口添加

```js
import Vue from 'vue'
import layer from 'vue-layer-map'
Vue.prototype.$layer = layer(Vue)
```

调用

```js
this.$layer.alert('找不到对象！')
```

## Demo

http://map.webshao.com

## Attribut

```js
{
  type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
  title: '信息',
  content: '',
  area: 'auto',
  offset: 'auto',
  icon: -1,
  btn: '确定',
  time: 0,
  shade: true,
  yes: '',
  cancel: '',
  btntool: true,  //是否显示右上角最小化和关闭图标
  center: true,   //是否显示在窗口正中心
  min: '',      //最小化方法
  show: '',     //显示窗体
  taggel: '',   //taggel一个窗体，即显示着则隐藏，隐藏着则显示
  restore: '',    //还原最小化的方法
  tips: [0, {}], //支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
  tipsMore: false, //是否允许多个tips
  shadeClose: false
}
```

## Method

```js
layer.alert(contetn, options, yes)
```

```js
layer.confirm(content, options, yes, cancel)
```

```js
layer.msg(contetn, options, end)
```

```js
layer.tips(content, follow, options)
```

```js
layer.iframe({
  content: {
    content: componentName, //传递的组件对象
    parent: this, //当前的vue对象
    data: [], //props
  },
  area: ['800px', '600px'],
})
```

```js
layer.open(options)
```

```js
layer.close(id)
```

```js
layer.closeAll(type)
```

### 关于 this.$layer.iframe

其实使用 iframe 层，除了操作方便外，主要的目的是隔离代码， 降低代码复杂度。而在 vue 中，组件就是功能块的基本单位了，所以 vue-layer 中并不存在 iframe 的 DOM 元素，这里用的都是组件。 这里的 content 有三个参数：

##### content:

此参数为组件对象， 比如

```js
import editFrom from './edir-form.vue'
```

此处 content 就为 editFrom 即可。

##### parent:

此参数其实就是当前调用 layer 的 vue 对象， 即 this 即可。在 editForm 中可以直接使用， this.$parent来获取调用layer的vue对象，然后父子传值神马的，就很easy，当然也可以直接使用vuex，就不用this.$parent 了

##### data:

此参数可认为是 editForm 的 props，然后你懂得

结果即为：

```js
methods:{
   eidt() {
	  this.$layer.iframe({
		content: {
		  content: editForm, //传递的组件对象
		  parent: this,//当前的vue对象
		  data:[]//props
		},
		area:['800px','600px'],
		title:"editForm"
	  });
  }
}
```
