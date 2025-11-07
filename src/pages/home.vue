<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const box = ref([])

const gradientOptions = [
  'linear-gradient(90deg, #9fcfff, #94c8fd)',
  'linear-gradient(90deg, #ff9a9e, #fad0c4)',
  'linear-gradient(90deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(90deg, #ffecd2, #fcb69f)',
  'linear-gradient(90deg, #84fab0, #8fd3f4)',
  'linear-gradient(90deg, #d4fc79, #96e6a1)',
  'linear-gradient(90deg, #a6c0fe, #f68084)',
  'linear-gradient(90deg, #fccb90, #d57eeb)'
]
const nameOptions = ['小王', '小李', '小张', '小刘', '小陈', '小赵', '小孙', '小周']
// 生成随机数据的函数
const generateList = (count) => {
  const list = []
  for (let i = 0; i < count; i++) {
    const item = {
      name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
      initialX: Math.floor(Math.random() * 100) - 280, // -100 到 100 之间
      initialY: Math.floor(Math.random() * 100) -50, // -100 到 100 之间
      animX: Math.floor(Math.random() * 500) + 100,    // 100 到 600 之间
      animY: Math.floor(Math.random() * 300) + 50,    // 100 到 400 之间
      duration: Math.floor(Math.random() * 2) + 2,     // 2 到 6 秒之间
      rotation: Math.floor(Math.random() * 20) - 10,   // -10 到 10 度之间
      transform: Math.floor(Math.random() * 30) + 'deg', // 0 到 30 度之间
      gradient: gradientOptions[Math.floor(Math.random() * gradientOptions.length)]
    }
    list.push(item)
  }
  return list
}

const generateList2 = (count) => {
  for (let i = 0; i < count; i++) {
    const item = {
      name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
      initialX: Math.floor(Math.random() * 100) + 1200, // -100 到 100 之间
      initialY: Math.floor(Math.random() * 100) - 50, // -100 到 100 之间
      animX: Math.floor(Math.random() * 500) + 500,    // 100 到 600 之间
      animY: Math.floor(Math.random() * 300) + 50,    // 100 到 400 之间
      duration: Math.floor(Math.random() * 2) + 2,     // 2 到 6 秒之间
      rotation: Math.floor(Math.random() * 20) - 10,   // -10 到 10 度之间
      transform: Math.floor(Math.random() * -30) + 'deg', // 0 到 30 度之间
      gradient: gradientOptions[Math.floor(Math.random() * gradientOptions.length)]
    }
    list.value.push(item)
  }
}
const generateList3 = (count) => {
  for (let i = 0; i < count; i++) {
    const item = {
      name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
      initialX: Math.floor(Math.random() * 100) - 180, // -100 到 100 之间
      initialY: Math.floor(Math.random() * 100) + 540, // -100 到 100 之间
      animX: Math.floor(Math.random() * 500) + 50,    // 100 到 600 之间
      animY: Math.floor(Math.random() * 400) + 50,    // 100 到 400 之间
      duration: Math.floor(Math.random() * 2) + 2,     // 2 到 6 秒之间
      rotation: Math.floor(Math.random() * 20) - 10,   // -10 到 10 度之间
      transform: Math.floor(Math.random() * -30) + 'deg', // 0 到 30 度之间
      gradient: gradientOptions[Math.floor(Math.random() * gradientOptions.length)]
    }
    list.value.push(item)
  }
}

const generateList4 = (count) => {
  for (let i = 0; i < count; i++) {
    const item = {
      name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
      initialX: Math.floor(Math.random() * 100) + 1200, // -100 到 100 之间
      initialY: Math.floor(Math.random() * 100) + 540, // -100 到 100 之间
      animX: Math.floor(Math.random() * 500) + 250,    // 100 到 600 之间
      animY: Math.floor(Math.random() * 400) + 50,    // 100 到 400 之间
      duration: Math.floor(Math.random() * 2) + 2,     // 2 到 6 秒之间
      rotation: Math.floor(Math.random() * 20) - 10,   // -10 到 10 度之间
      transform: Math.floor(Math.random() * -30) + 'deg', // 0 到 30 度之间
      gradient: gradientOptions[Math.floor(Math.random() * gradientOptions.length)]
    }
    list.value.push(item)
  }
}
const getCoordinates = (index) => { 
  // 计算心形参数，使用心形曲线方程
  // 心形参数方程: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
  
  // 将108个元素均匀分布在心形曲线上 (0 to 2π)
  const t = index * (2 * Math.PI / 108);
  
  // 心形大小缩放因子
  const scale = 15;
  
  // 心形中心位置
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  // 根据心形参数方程计算坐标
  const x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
  const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  
  // 为不同区域的元素设置不同的旋转效果
  let rotation = 0;
  if (index < 27) {
    // 上半部分左侧
    rotation = Math.floor(Math.random() * -20) + index;
  } else if (index < 54) {
    // 上半部分右侧
    rotation = Math.floor(Math.random() * -25);
  } else {
    // 下半部分
    rotation = Math.floor(Math.random() * 40);
  }
  
  return {
    x: x,
    y: y,
    opacity: 1,
    duration: 3,
    rotation: rotation,
    delay: index * 0.1
  };
}
const loveMove = (element,index) => {
  if (index <= 108) {
    console.log('第一个元素',element)
    // element.style.left = 100 + 'px'
    // element.style.top = 100 + 'px'
    let obj = getCoordinates(index)
    gsap.fromTo(element, 
      { x: 100, y: 100, opacity: 0, rotation: Math.floor(Math.random() * -30) },       // 起始状态（-30度）
      obj // 结束状态（30度）
    )
  }
}
// 使用 generateList 函数生成数据
const list = ref(generateList(27))
// const list = ref([])
generateList2(27)
generateList3(27)
generateList4(27)

// console.log(window.innerWidth,'屏幕宽度')
// console.log(window.innerHeight,'屏幕高度')
// console.log(list.value,'数组')
const test = ref(null)
onMounted(() => {
  gsap.fromTo(test.value, 
    { x: -100, opacity: 0 },     // 起始状态
    { x: 100, opacity: 1, duration: 3 } // 结束状态
  )
  // 创建一个循环动画
  box.value.forEach((element, index) => {
  // element.style.left = list.value[index].initialX + 'px'
  // element.style.top = list.value[index].initialY + 'px'
  gsap.set(element, {
    x: list.value[index].initialX,
    y: list.value[index].initialY
  })
  if (element) {
    const tl = gsap.timeline({
      onComplete: () => {
        // 动画序列全部完成后执行
        loveMove(element, index)
      }
    })
    
    tl.to(element, {
      x: list.value[index].animX,
      y: list.value[index].animY,
      rotation: list.value[index].rotation,
      duration: list.value[index].duration,
      ease: "power2.out"
    })
    .to(element, {
      x: list.value[index].initialX,
      y: list.value[index].initialY,
      rotation: 0,
      duration: list.value[index].duration,
      ease: "power2.out"
    })
  }
})

})

</script>

<template>
  <div class="container">
    <div ref="box" class="box" v-for="(item,index) in list" :key="index" :style="{ transform: 'rotate(' + item.transform + ')', backgroundImage: item.gradient}">
      {{item.name}}
    </div>
  </div>
</template>

<style scoped>
.box {
  font-family: "FangSong", "仿宋", serif;
  color: #fff;
  font-weight: 600;
  width: 120px;
  height: 30px;
  background-color: red;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
</style>