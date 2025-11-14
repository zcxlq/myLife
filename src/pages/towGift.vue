<script setup>
import { ref, onMounted } from 'vue'
import 'animate.css'
import rotationImg from './components/rotationImg.vue'
import leftRightButtons from './components/leftRightButtons.vue'
const images = ref([
  require('../images/character/material.png'),
  require('../images/character/material2.png'),
  require('../images/character/material3.png'),
])
const imageIndex = ref(0)
const imageList = [
  [require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png'),
  require('../images/character/material.png')],
  [require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png'),
  require('../images/character/material2.png')],
  [require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png'),
  require('../images/character/material3.png')]
]
const imageText = ref([
  '材料包1',
  '材料包2',
  '材料包3',
  '材料包4',
  '材料包5',
  '材料包6',
  '材料包7',
  '材料包8',
  '材料包9',
  '材料包10',
])
const randomItems = ref([])
const app = ref(2)
const month = ref([
  {name: '一月', value: 1},
  {name: '二月', value: 2},
  {name: '三月', value: 3},
  {name: '四月', value: 4},
  {name: '五月', value: 5},
  {name: '六月', value: 6},
  {name: '七月', value: 7},
  {name: '八月', value: 8},
  {name: '九月', value: 9},
  {name: '十月', value: 10},
])

// 生成随机位置的函数
const generateRandomDimensions = () => {
  const items = []
  const itemCount = 52 // 生成52个元素
  
  for (let i = 0; i < itemCount; i++) {
    // 获取屏幕尺寸
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    
    // 生成随机位置（确保元素完全在屏幕内）
    const left = Math.floor(Math.random() * (screenWidth)) - (screenWidth / 2) - 50 // 减去图片宽度
    const top = Math.floor(Math.random() * (screenHeight)) - (screenHeight / 2) // 减去图片高度
    
    // 随机选择一张图片
    const randomImage = images.value[Math.floor(Math.random() * images.value.length)]
    
    items.push({
      id: i,
      left: `${left}px`,
      top: `${top}px`,
      show: false,
      image: randomImage
    })
  }
  
  randomItems.value = items
}

generateRandomDimensions()

const triggerShake = ref(false)
const clickLeft = () => {
  if(switchImage.value){
    if(selectIndex.value > 0){
      selectIndex.value -= 1
    } else {
      selectIndex.value = imageList[imageIndex.value].length - 1
    }
  }else{
    if(imageIndex.value > 0){
      imageIndex.value -= 1
    } else {
      imageIndex.value = imageList.length - 1
    }
  }
  triggerMainAnimation()
  console.log('点击了左边按钮',selectIndex.value)
}
const clickRight = () => {
  if(switchImage.value){
    if(selectIndex.value < imageList[imageIndex.value].length - 1){
      selectIndex.value += 1
    } else {
      selectIndex.value = 0
    }
  }else{ 
    if(imageIndex.value < imageList.length - 1){
      imageIndex.value += 1
    } else {
      imageIndex.value = 0
    }
  }
  triggerMainAnimation()
  console.log('点击了右边按钮',selectIndex.value)
}
const triggerMainAnimation = () => {
  triggerShake.value = true
  setTimeout(() => {
    triggerShake.value = false
  }, 1000)
}
const selectIndex = ref(0)
const switchImage = ref(false)
const handleImageSelect = (selectedData) => {
  selectIndex.value = selectedData.index
  switchImage.value = selectedData.isShow
  console.log('父组件收到图片选择:', selectedData)
}
// 组件挂载后生成随机元素
onMounted(() => {
  // 逐个显示元素
  randomItems.value.forEach((item, index) => {
    setTimeout(() => {
      item.show = true
    }, index * 100) // 每100ms显示一个元素
    
    if(index === 51) {
      setTimeout(() => {
        randomItems.value.forEach((item, index) => {
          setTimeout(() => {
            item.show = false
          }, index * 100)
          
          if(index === 51) {
            setTimeout(() => {
              app.value = 2
            }, 5200)
          }
        })
      }, 7200)
    }
  })
})
</script>

<template>
  <div>
    <div v-if="app == 1">
      <div 
        class="image-box"
        v-for="(item, index) in randomItems" 
        :key="index"
        :style="{
          left: item.left,
          top: item.top
        }"
        :class="{ 'show': item.show }"
      >
        <img :src="item.image" width="100" height="auto"/>
      </div>
    </div>
    <div v-if="app == 2">
      <div class="choose-box">
        <div class="choose-title">选择一个礼物</div>
        <div class="choose-main animate__animated" :class="{ 'animate__backInDown': triggerShake }">
          <rotationImg :imageList="imageList[imageIndex]" :imageText="imageText" :selectIndex="selectIndex" :onImageSelect="handleImageSelect"></rotationImg>
        </div>
        <div class="choose-bottom">
          <leftRightButtons :clickLeft="clickLeft" :clickRight="clickRight"></leftRightButtons>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-box {
  position: absolute;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.image-box.show {
  opacity: 1;
  transform: scale(1);
}
.choose-title{
  position: absolute;
  top: -135%;
  left:40%;
}
.choose-bottom{
  position: absolute;
  left:23%;
}
.choose-main {
  transition: transform 0.3s ease;
}

.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
</style>