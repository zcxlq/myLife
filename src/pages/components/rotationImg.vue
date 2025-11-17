<script setup>
import { defineProps, ref, watch } from 'vue'
const props = defineProps({
  imageList: Array,
  imageText: Array,
  selectIndex: {
    type: Number,
    default: null
  },
  onImageSelect: {
    type: Function,
    default: null
  }
})

const seletcImage = ref({})
const isShow = ref(true)

// 监听 selectIndex 的变化
watch(() => props.selectIndex, (newIndex) => {
  if (newIndex !== null && !isShow.value) {
    // 更新当前显示的图片
    updateSelectedImage(newIndex)
  }
})

const updateSelectedImage = (index) => {
  const colors = [
    '142, 249, 252', '142, 252, 204', '142, 252, 157', '215, 252, 142',
    '252, 252, 142', '252, 208, 142', '252, 142, 142', '252, 142, 239',
    '204, 142, 252', '142, 202, 252'
  ]
  
  seletcImage.value = {
    color: colors[index] || colors[0],
    index: index
  }
}

const showImg = (color, index) => {
  isShow.value = false
  seletcImage.value = {
    color,
    index
  }
  console.log('点击了图片', seletcImage.value)
  
  // 通知父组件图片被选中
  if (props.onImageSelect && typeof props.onImageSelect === 'function') {
    props.onImageSelect({
      index,
      isShow: true
    })
  }
}
const goBack = () => {
  isShow.value = true
  
  // 通知父组件返回列表
  if (props.onImageSelect && typeof props.onImageSelect === 'function') {
    isShow.value = true
    props.onImageSelect({
      index: null,
      isShow: false
    })
  }
}
</script>

<template>
  <div>
    <div class="wrapper" v-if="isShow">
      <div class="inner" style="--quantity: 10;">
        <div class="card" style="--index: 0;--color-card: 142, 249, 252;" @click="showImg('142, 249, 252', 0)">
          <div class="img">
            <img src="../../images/character/material.png" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[0]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 1;--color-card: 142, 252, 204;" @click="showImg('142, 252, 204', 1)">
          <div class="img">
            <img src="../../images/character/material.png" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[1]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 2;--color-card: 142, 252, 157;" @click="showImg('142, 252, 157', 2)">
          <div class="img">
            <img src="../../images/character/material.png" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[2]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 3;--color-card: 215, 252, 142;" @click="showImg('215, 252, 142', 3)">
          <div class="img">
            <img src="../../images/character/material.png" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[3]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 4;--color-card: 252, 252, 142;" @click="showImg('252, 252, 142', 4)">
          <div class="img">
            <img src="../../images/character/material.png" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[4]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 5;--color-card: 252, 208, 142;" @click="showImg('252, 208, 142', 5)">
          <div class="img">
            <img :src="props.imageList[5]" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[5]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 6;--color-card: 252, 142, 142;" @click="showImg('252, 142, 142', 6)">
          <div class="img">
            <img :src="props.imageList[6]" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[6]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 7;--color-card: 252, 142, 239;" @click="showImg('252, 142, 239', 7)">
          <div class="img">
            <img :src="props.imageList[7]" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[7]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 8;--color-card: 204, 142, 252;" @click="showImg('204, 142, 252', 8)">
          <div class="img">
            <img :src="props.imageList[8]" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[8]}}</p>
            </div>
          </div>
        </div>
        <div class="card" style="--index: 9;--color-card: 142, 202, 252;" @click="showImg('142, 202, 252', 9)">
          <div class="img">
            <img :src="props.imageList[9]" alt="" style="margin-top: 10px;" width="100px" height="auto">
            <div class="text">
              <p class="title">{{props.imageText[9]}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="card" :style="{'--color-card': seletcImage.color}">
        <div class="img">
          <div class="go-back" @click="goBack">
            <svg t="1763090493466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4686" width="50" height="50"><path d="M515.582162 1023.994371A516.343116 516.343116 0 0 1 204.957513 921.646875a502.014467 502.014467 0 0 1-113.60572-122.816995A486.662342 486.662342 0 0 1 20.73202 642.238212a511.737479 511.737479 0 0 1 990.723759-259.962639 40.938998 40.938998 0 0 1-3.582162 29.169036 36.333361 36.333361 0 0 1-23.539924 17.399074 36.845098 36.845098 0 0 1-29.169036-3.582162 38.892048 38.892048 0 0 1-18.42255-23.539924 436.000332 436.000332 0 0 0-420.13647-324.953299 446.235081 446.235081 0 0 0-111.047033 14.328649 434.976857 434.976857 0 1 0 538.859565 497.40883 37.868573 37.868573 0 0 1 37.356836-32.239462h6.652588a39.915523 39.915523 0 0 1 25.075136 15.863862 38.380311 38.380311 0 0 1 6.14085 28.657299 511.737479 511.737479 0 0 1-374.591835 405.296083 460.563731 460.563731 0 0 1-129.469582 17.910812z" fill="#00E2FF" p-id="4687"></path><path d="M512 775.801694a35.821624 35.821624 0 0 1-27.122086-11.769962l-225.164491-224.652753a38.892048 38.892048 0 0 1 0-54.244173l225.164491-224.652753a39.915523 39.915523 0 0 1 27.122086-11.769962 37.868573 37.868573 0 0 1 27.122086 11.769962 39.915523 39.915523 0 0 1 11.769962 27.122086 35.821624 35.821624 0 0 1-11.769962 27.122086l-158.638618 158.638619h358.216235a38.892048 38.892048 0 1 1 0 77.272359h-358.216235l159.150356 159.150356a38.892048 38.892048 0 0 1 11.769962 27.122086 37.868573 37.868573 0 0 1-11.769962 27.122087 36.845098 36.845098 0 0 1-27.633824 11.769962z" fill="#00E2FF" p-id="4688"></path></svg>
          </div>
          <img :src="props.imageList[seletcImage.index]" alt="" style="margin-top: 10px;" width="300px" height="auto">
          <div class="text">
            <p class="title">{{props.imageText[seletcImage.index]}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 500px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: -300px;
}

.inner {
  --w: 150px;
  --h: 200px;
  --translateZ: calc((var(--w) + var(--h)) + 0px);
  --rotateX: -15deg;
  --perspective: 1000px;
  position: absolute;
  width: var(--w);
  height: var(--h);
  top: 25%;
  left: calc(50% - (var(--w) / 2) - 2.5px);
  z-index: 2;
  transform-style: preserve-3d;
  transform: perspective(var(--perspective));
  animation: rotating 20s linear infinite;
}

@keyframes rotating {
  from {
    transform: perspective(var(--perspective)) rotateX(var(--rotateX))
      rotateY(0);
  }
  to {
    transform: perspective(var(--perspective)) rotateX(var(--rotateX))
      rotateY(1turn);
  }
}

.card {
  position: absolute;
  border: 2px solid rgba(var(--color-card));
  border-radius: 12px;
  overflow: hidden;
  inset: 0;
  transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
    translateZ(var(--translateZ));
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #0000
    radial-gradient(
      circle,
      rgba(var(--color-card), 0.2) 0%,
      rgba(var(--color-card), 0.6) 80%,
      rgba(var(--color-card), 0.9) 100%
    );
}

.text {
  padding: 5px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

.go-back{
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}
</style>