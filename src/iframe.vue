<template lang="html">
<div class="notify" @mousemove="move" @mouseup="moveEnd">
    <div v-if="options.shadeClose" class="notify-mask"  @click="close"></div>
    <div v-else class="notify-mask"></div>
    <div :id="options.id + '_alert'" class="notify-main notify-alert notify-iframe" :class="options.center ? 'notify-main-center' : 'notify-main'"  :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2],width:options.area[0], height:options.area[1]}">
        <h2 class="notice-title" @mousedown="moveStart">{{options.title}}         
        </h2>
        <span v-if="options.btntool" class="control-tool">
            <i class="control-tool-icon ivu-icon ivu-icon-close control-tool-close" @click="btncancel"></i>
            <i class="control-tool-icon ivu-icon ivu-icon-minus control-tool-min" @click="minus"></i>
          </span>
        <div class="notify-content" :style="contentStyle" :id="id"></div>
    </div>
</div>
</template>

<script>
import helper from "./helper/helper.js";

export default {
  data() {
    return {
      moveLeft: 0, //左移的距离
      moveTop: 0, //上移的距离
      ismove: false,
      id: "vlip" + new Date().getTime()
    };
  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    contentStyle() {
      return {
        height: parseInt(this.options.area[1]) - 50 + "px",
        minHeight: "inherit",
        overflow: "auto"
      };
    }
  },
  mounted() {
    this.getContent();
    this.setFullScreen();
  },
  methods: {
    setFullScreen() {
      if (this.options.fullScreen) {
        window.addEventListener(
          "resize",
          () => {
            var width = document.body.clientWidth + "px";
            var height = document.body.clientHeight + "px";
            this.options.area = [width, height];
          },
          false
        );
      }
    },
    async getContent() {
      await helper.sleep(10);
      let instance = new this.options.content.content({
        //具体参数信息，请参考vue源码
        parent: this.options.content.parent,
        propsData: JSON.parse(JSON.stringify(this.options.content.data))
      });
      instance.vm = instance.$mount();
      document.getElementById(this.id).appendChild(instance.vm.$el);
    },
    close(event) {
      helper.clickMaskCloseAll(event, this.options.layer, this.options.id);
    },
    minus(event) {
      helper.btnminus(event, this.options);
    },
    btnyes(event) {
      helper.btnyes(event, this.options);
    },
    btncancel(event) {
      this.options.close(this.options.id);
      helper.btncancel(event, this.options);
    },
    moveStart(event) {
      if (this.options.move) {
        helper.moveStart(event, this.options);
        this.moveLeft = event.clientX;
        this.moveTop = event.clientY;
        this.ismove = true;
      }
    },
    move(event) {
      if (this.ismove) {
        let o = document.getElementById(this.options.id + "_alert");
        o.style.left =
          this.options.offset[0] + (event.clientX - this.moveLeft) + "px";
        o.style.top =
          this.options.offset[1] + (event.clientY - this.moveTop) + "px";
      }
    },
    moveEnd(event) {
      this.ismove = false;
    }
  }
};
</script>

<style>
.control-tool {
  width: auto;
  height: 43px;
  position: absolute;
  top: 0px;
  right: 0px;
}
.control-tool i:hover {
  color: #7dc4f9;
  cursor: pointer;
}
.control-tool-icon {
  position: absolute;
  width: 35px;
  height: 100%;
  top: 0;
  text-align: center;
  color: #bfcbd9;
  transition: all 0.3s;
  font-size: 20px;
}
.control-tool-icon:after {
  content: "";
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.control-tool-close {
  right: 0;
}
.control-tool-min {
  right: 40px;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  font-family: element-icons !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-icon-minus:before {
  content: "\e619";
}
.el-icon-close:before {
  content: "\e60c";
}
</style>

