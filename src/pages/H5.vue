<script setup>
import { ref } from 'vue'

const openGift = ref(false)
const giftId = ref(null)
const handleGift = (id) => {
  openGift.value = true
  setTimeout(() => {
    giftId.value = id
    console.log('giftId', giftId.value)
  }, 2400)
}
</script>

<template>
  <div class="container">
    <div>
      <img src="../images/bgc.jpg" class="fullscreen-img" alt="" srcset="">
    </div>
    
    <!-- 礼物选择区域 -->
    <div class="box" v-if="giftId == null">
      <div class="main" v-if="!openGift">
        <img src="../images/gift.gif" @click="handleGift('1')" class="gift-img" alt="" srcset="">
        <img src="../images/gift.gif" @click="handleGift('2')" class="gift-img" alt="" srcset="">
        <img src="../images/gift.gif" @click="handleGift('3')" class="gift-img" alt="" srcset="">
      </div>
      <div class="main" v-else style="margin-top: -200px;">
        <img src="../images/open-gift.gif" width="300px" height="300px" alt="" srcset="">
      </div>
    </div>
    
    <!-- 礼物内容显示区域 -->
    <div class="gift-content" v-if="giftId == 1">
      <span>第一个礼物的内容</span>
    </div>
    <div class="gift-content" v-if="giftId == 2">
      <span>第二个礼物的内容</span>
    </div>
    <div class="gift-content" v-if="giftId == 3">
      <span>第三个礼物的内容</span>
    </div>
  </div>
</template>

<style scoped>
.fullscreen-img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.container {
  min-height: 100vh;
  position: relative;
}

.box { 
  border: 2px solid red;
  width: 140px;
  height: 80px;
  position: absolute;
  top: calc(50% - 40px);
  left: calc(35% - 70px);
  z-index: 10;
}

.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gift-img{
  width: 100px; 
  height: 100px;
}

/* 添加礼物内容样式 */
.gift-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 2px black;
  padding: 20px;
  border-radius: 10px;
}
</style>