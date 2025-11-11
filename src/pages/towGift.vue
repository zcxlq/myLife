<script setup>
import { ref, onMounted } from 'vue'

const images = ref([
  require('../images/bgc.jpg'),
  require('../images/gift.gif'),
  require('../images/open-gift.gif'),
])

const randomItems = ref([])
const app = ref(1)

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
        <img :src="item.image" width="100" height="100"/>
      </div>
    </div>
    <div v-if="app == 2">
      <div>图片展示完成</div>
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
</style>