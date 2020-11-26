<template lang="html">
<div class="notify" @mousemove="move" @mouseup="moveEnd">
    <div v-if="options.shadeClose" class="notify-mask"  @click="close"></div>
    <div v-else class="notify-mask"></div>
    <div :id="options.id + '_alert'" class="notify-main notify-alert notify-iframe" :class="options.center ? 'notify-main-center' : 'notify-main'"  :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2],width:options.area[0], height:options.area[1]}">
        <h2 class="notice-title" @mousedown="moveStart">{{options.title}}         
        </h2>
        <span v-if="options.btntool" class="control-tool">
          <div @click="minus" class="control-tool-icon">
            <svg t="1606291066381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4209" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
              <path d="M914.285714 420.571429l0 109.714286q0 22.857143-16 38.857143t-38.857143 16l-694.857143 0q-22.857143 0-38.857143-16t-16-38.857143l0-109.714286q0-22.857143 16-38.857143t38.857143-16l694.857143 0q22.857143 0 38.857143 16t16 38.857143z" p-id="4210"></path>
            </svg>
          </div>
          <div @click="btncancel" class="control-tool-icon">
            <svg t="1606353983373" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5011" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
            <path d="M925.468404 822.294069 622.19831 512.00614l303.311027-310.331931c34.682917-27.842115 38.299281-75.80243 8.121981-107.216907-30.135344-31.369452-82.733283-34.259268-117.408013-6.463202L512.000512 399.25724 207.776695 87.993077c-34.675754-27.796066-87.272669-24.90625-117.408013 6.463202-30.178323 31.414477-26.560936 79.375815 8.121981 107.216907l303.311027 310.331931L98.531596 822.294069c-34.724873 27.820626-38.341237 75.846432-8.117888 107.195418 30.135344 31.43699 82.72919 34.326806 117.408013 6.485715l304.178791-311.219137 304.177767 311.219137c34.678824 27.841092 87.271646 24.951275 117.408013-6.485715C963.808618 898.140501 960.146205 850.113671 925.468404 822.294069z" p-id="5012"></path>
            </svg>
          </div>
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
      default: function () {
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

<style >
.control-tool {
  width: auto;
  height: 43px;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
}
.control-tool-icon:hover {
  color: #7dc4f9;
  cursor: pointer;
}
.control-tool-icon {
  width: 35px;
  height: 100%;
  text-align: center;
  color: #bfcbd9;
  transition: all 0.3s;
  font-size: 32px;
}
.control-tool-icon svg {
  fill: currentColor;
}
.control-tool-close {
  right: 0;
}
.control-tool-min {
  right: 40px;
}
</style>

