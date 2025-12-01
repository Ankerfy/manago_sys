<template>
  <div class="music-player">
    <!-- 专辑区域 -->
    <div class="album-container">
      <div class="album-cover" :class="{ playing: isPlaying }">
        <img :src="currentSong.cover" alt="专辑封面" />
        <div class="album-center"></div>
      </div>
      <div class="album-base"></div>
    </div>
    <!-- 歌曲信息 -->
    <div class="song-info">
      <h2 class="song-title">{{ currentSong.title }}</h2>
      <p class="song-artist">{{ currentSong.artist }}</p>
    </div>
    <!-- 进度条 -->
    <div class="progress-container">
      <div class="progress-bar" @click="setProgress">
        <div class="progress" :style="{ width: progressPercent }">
          <div class="progress-handle"></div>
        </div>
      </div>
      <div class="time-display">
        <span>{{ formatTime(currentTime) }}</span> <span>{{ formatTime(duration) }}</span>
      </div>
    </div>
    <!-- 控制按钮 -->
    <div class="controls">
      <button class="control-btn" @click="prevSong">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z" fill="currentColor" />
        </svg>
      </button>
      <button class="control-btn play-btn" @click="togglePlay">
        <svg
          v-if="!isPlaying"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
        </svg>
      </button>
      <button class="control-btn" @click="nextSong">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" fill="currentColor" />
        </svg>
      </button>
    </div>
    <!-- 音频可视化 -->
    <div class="visualizer">
      <div
        v-for="(height, index) in visualizerData"
        :key="index"
        class="bar"
        :style="{ height: height + '%' }"
      ></div>
    </div>
  </div>
</template> 

<script setup>
import { ref, computed, onMounted } from 'vue' // 响应式数据
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(240) // 4分钟（秒）
const currentSongIndex = ref(0)
// 歌曲列表
const songs = ref([
  { title: '夜空中最亮的星', artist: '逃跑计划', cover: 'https://picsum.photos/400/400?random=1' },
  { title: '平凡之路', artist: '朴树', cover: 'https://picsum.photos/400/400?random=2' },
  { title: '光年之外', artist: 'G.E.M.邓紫棋', cover: 'https://picsum.photos/400/400?random=3' },
])
// 当前歌曲
const currentSong = computed(() => songs.value[currentSongIndex.value]) // 进度条百分比
const progressPercent = computed(() => {
  return (currentTime.value / duration.value) * 100 + '%'
})
// 时间格式化
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}
// 播放/暂停
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}
// 上一曲
const prevSong = () => {
  currentSongIndex.value =
    currentSongIndex.value > 0 ? currentSongIndex.value - 1 : songs.value.length - 1
  currentTime.value = 0
  if (!isPlaying.value) isPlaying.value = true
}
// 下一曲
const nextSong = () => {
  currentSongIndex.value =
    currentSongIndex.value < songs.value.length - 1 ? currentSongIndex.value + 1 : 0
  currentTime.value = 0
  if (!isPlaying.value) isPlaying.value = true
}
// 设置进度
const setProgress = (e) => {
  const progressBar = e.currentTarget
  const clickX = e.offsetX
  const width = progressBar.offsetWidth
  const percent = clickX / width
  currentTime.value = percent * duration.value
}
// 可视化数据
const visualizerData = ref([])
// 初始化可视化
const initVisualizer = () => {
  visualizerData.value = Array.from({ length: 30 }, () => Math.random() * 80 + 10)
}
// 更新可视化
const updateVisualizer = () => {
  if (!isPlaying.value) return
  visualizerData.value = visualizerData.value.map((value, index) => {
    const intensity = Math.sin(Date.now() * 0.01 + index) * 30 + 30
    const change = (Math.random() - 0.5) * 40
    let newValue = intensity + change
    return Math.max(5, Math.min(95, newValue))
  })
}
// 模拟播放进度和可视化更新
onMounted(() => {
  initVisualizer()
  setInterval(() => {
    if (isPlaying.value) {
      if (currentTime.value < duration.value) {
        currentTime.value += 0.1
      } else {
        nextSong()
      }
      updateVisualizer()
    }
  }, 100)
})
</script> 

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.music-player {
  width: 100%;
  max-width: 350px;
  background: rgba(30, 30, 46, 0.8);
  border-radius: 24px;
  padding: 30px 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  color: #fff;
  margin: 0 auto;
}
.music-player::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  z-index: -1;
}
.album-container {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto 30px;
  perspective: 1000px;
}
.album-base {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  filter: blur(10px);
  z-index: -1;
}
.album-cover {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  position: relative;
  transition: transform 0.3s ease;
}
.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.album-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: #1a1a2e;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.album-cover.playing {
  animation: rotate 20s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.song-info {
  text-align: center;
  margin-bottom: 30px;
}
.song-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-artist {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}
.progress-container {
  margin-bottom: 30px;
}
.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}
.progress {
  height: 100%;
  background: linear-gradient(90deg, #e94560, #ff7aa8);
  border-radius: 3px;
  width: 30%;
  position: relative;
  transition: width 0.1s linear;
}
.progress-handle {
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(233, 69, 96, 0.8);
}
.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 20px;
  margin: 0 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.control-btn:active {
  transform: scale(0.95);
}
.play-btn {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e94560, #ff7aa8);
  box-shadow: 0 10px 20px rgba(233, 69, 96, 0.4);
}
.visualizer {
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  margin-top: 20px;
}
.bar {
  width: 6px;
  background: linear-gradient(to top, #e94560, #ff7aa8);
  border-radius: 3px 3px 0 0;
  transition: height 0.2s ease;
}
</style>