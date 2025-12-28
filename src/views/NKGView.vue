<template>
  <div class="nkg-page" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <!-- 英雄区域 -->
    <div class="hero-section">
      <div class="hero-background">
        <img src="/NanKai_logo.webp" alt="南开大学logo" class="hero-bg-logo">
        <div class="nkg-hero-logo">
          <!-- 中央标题区域 -->
          <div class="center-title-section">
            <h1 class="main-title">NankaiGayming</h1>
            <p class="subtitle">南开大学守望先锋校队</p>
          </div>
        </div>
      </div>
      <div class="hero-content">
        <div class="scroll-indicator">
          <div class="scroll-arrow" @click="scrollToIntro">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 战队介绍区域 -->
    <div class="intro-section" :class="{ 'dark-mode': themeStore.isDarkMode }">
      <div class="container">
        <div class="intro-card clean-style" ref="introCard" :class="{ 'animate-in': isVisible1 }">
          <div class="intro-content">
            <h2>关于NKG</h2>
            <p>南开大学守望先锋校队（NanKaiGayming）自2023年起活跃在各大高校电竞赛事中，致力于为南开大学的守望先锋玩家提供专业的竞技平台和成长机会。</p>
            <p>NanKaiGayming 2023-2025人员名单已永久写入津南校区图书馆北侧学生文化谷的2025毕业生纪念墙中，包含了至2025学年所有在NKG正赛中登场的选手。</p>
          </div>
          <div class="intro-image clean-style">
            <img src="/src/assets/images/NanKaiGayming.png" alt="NKG战队" class="intro-img" :class="{ 'active': currentImageIndex === 0 }" loading="lazy">
            <img src="/src/assets/images/NKG_Real.jpg" alt="NKG战队真实照片" class="intro-img" :class="{ 'active': currentImageIndex === 1 }" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <!-- 赛事历史区域 -->
    <div class="history-section" :class="{ 'dark-mode': themeStore.isDarkMode }" ref="historySection">
      <div class="container">
        <div class="section-header" ref="historyHeader" :class="{ 'animate-in': isVisible2 }">
          <h2>战队历程</h2>
          <p>NKG战队的发展和参与的各项赛事</p>
        </div>
        
        <div class="timeline" ref="timeline" :class="{ 'animate-in': isVisible3 }">
          <div class="timeline-item">
            <div class="timeline-year">2023.11</div>
            <div class="timeline-content">
              <h3>战队成立</h3>
              <p>守望国服停服，中国战队出征世界杯遗憾摘银，守望社区情绪高涨，CUOL中国高校守望联赛成立，NanKaiGayming也响应号召集结，代表南开大学出战</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2023.12</div>
            <div class="timeline-content">
              <h3>CUOL中国高校守望联赛</h3>
              <p>这是NKG参与的第一场守望比赛，吸纳了众多南开大学守望先锋爱好者加入NKOW社群，NKG的主力成员也在此相遇，最终以5胜2负结束常规赛</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2024.4</div>
            <div class="timeline-content">
              <h3>OUL守望高校联赛</h3>
              <p>NKG继续征战OUL守望高校联赛，nkow社群与nkg战队也不断壮大</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2024.9</div>
            <div class="timeline-content">
              <h3>朱诺杯S1</h3>
              <p>朱诺杯是由华东师范大学组织的高校社区比赛，NKG在朱诺杯上半赛段首次进入淘汰赛，取得全国16强</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2025.3</div>
            <div class="timeline-content">
              <h3>OWCS中国赛区第一阶段公开预选赛</h3>
              <p>守望先锋国服回归，国服比赛重启，NKG参加守望先锋冠军系列赛预选赛，与全国顶尖战队竞技，最终取得五胜二负</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2025.5</div>
            <div class="timeline-content">
              <h3>宿舍杯天津站</h3>
              <p>在宿舍杯天津站比赛中展现团队实力，NKG第一次参与纯线下比赛，过关斩将取得季军</p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2025.9</div>
            <div class="timeline-content">
              <h3>朱诺杯S2</h3>
              <p>NKG参与第二届朱诺杯高校赛，在此期间发掘培养了多位新成员</p>
            </div>
          </div>

          <div class="timeline-item champion-highlight" @click="openChampionVideo" style="cursor: pointer;" title="点击观看夺冠纪念视频">
            <div class="timeline-year">2025.11</div>
            <div class="timeline-content">
              <h3>宿舍杯天津站</h3>
              <p>我们是冠军！NKG接连战胜北京城市学院2队、中国民航大学、天津职业技术师范大学与天津工业大学，成为宿舍杯天津站冠军！</p>
              <div class="click-hint">点击观看夺冠纪念视频 →</div>
            </div>
          </div>

          <div class="timeline-item current">
            <div class="timeline-year">2025.12</div>
            <div class="timeline-content">
              <h3>What's Next ?</h3>
              <p>继全民性兰大杯、天开杯后，围绕第20赛季新英雄版本和活跃社区氛围的斩仇杯也在筹划当中，计划于2026年1月举办，详情可加入nkow社群了解</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 人员名单区域 -->
    <div class="members-section" :class="{ 'dark-mode': themeStore.isDarkMode }" ref="membersSection">
      <div class="container">
        <div class="section-header" ref="membersHeader" :class="{ 'animate-in': isVisibleMembers }">
          <h2>战队成员</h2>
          <p>HALL OF FAME</p>
        </div>
        
        <div class="members-wall" ref="membersGrid" :class="{ 'animate-in': isVisibleMembersGrid }">
          <div 
            v-for="(member, index) in membersList" 
            :key="member.name"
            class="member-badge"
            :class="{ 
              'active-player': member.isSpecial,
              'alumni': !member.isSpecial
            }"
            :style="{ '--delay': `${index * 0.05}s` }"
            @mouseenter="showHeroes(member.name)"
            @mouseleave="hideHeroes"
          >
            <div class="badge-inner">
              <span class="member-id">{{ member.name }}</span>
              <div class="hero-overlay">
                <div class="hero-tags">
                  <span v-for="hero in member.heroes.slice(0, 3)" :key="hero">{{ hero }}</span>
                </div>
              </div>
            </div>
            <!-- 状态指示点：现役为亮色，校友为灰色 -->
            <div class="status-dot" :title="member.isSpecial ? '现役选手' : '校友'"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 招募信息区域 -->
    <div class="recruitment-section" :class="{ 'dark-mode': themeStore.isDarkMode }" ref="recruitmentSection">
      <div class="container">
        <div class="recruitment-card clean-style" ref="recruitmentCard" :class="{ 'animate-in': isVisible4 }">
          <div class="recruitment-header">
            <h2>加入NanKaiGayming</h2>
            <p>我们正在寻找志同道合的队友</p>
          </div>
          
          <div class="recruitment-content clean-layout">
            <div class="requirements-section">
              <h3>招募要求</h3>
              <div class="text-block">
                <p>只要是南开大学在读、即将入学或已毕业的成员均可加入nkow社群。对于nkg校队成员，由于部分比赛有在读要求限制，因此我们优先招募2026年6月前在读的学生，同时也欢迎毕业两年内或即将入学的校友加入。</p>
                <p>除了学籍限制，校队不设硬性段位门槛要求。任何有志于加入校队的成员均可随时联系群管理员，nkg也会在大型赛事前集中举行新人的选拔赛。</p>
                <p>我们欢迎所有热爱竞技、愿意提升的玩家加入南开大学守望先锋校队。</p>
              </div>
            </div>
            
            <div class="benefits-section">
              <h3>我们提供</h3>
              <div class="text-block">
                <p>nkow社群有着活跃的社区氛围与丰富的团建活动，我们会不定期举办校内与校际友谊赛，不仅能收获丰厚奖品，更能让你结识许多志同道合的好友。</p>
                <p>对于nkg校队成员，你可以参与专业的训练赛与正赛，亲身体验高校联赛的竞技氛围。我们提供详细的复盘与教学指导，帮助你快速提升技术水平。</p>
                <p>校队成员将被邀请参加线下团建活动，还可享专属的虚拟与实物奖励。</p>
                
              </div>
            </div>
          </div>
          
          <div class="contact-info">
            <p>欢迎南开大学的OWer校友们加入NKOW社群！进群一起开黑上分！</p>
            <p class="highlight">不定期组织团建活动，大家人都很nice！</p>
            <div class="contact-buttons">
              <button class="btn btn-primary" @click="joinGroup">加入群聊</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部CTA区域 - 已简化合并到招募区域，删除冗余的CTA -->
    <!-- 如果需要保留底部导航，可以使用一个更简单的样式 -->
    <div class="simple-footer-nav" :class="{ 'dark-mode': themeStore.isDarkMode }">
      <router-link to="/" class="nav-link">← 返回首页</router-link>
    </div>

    <!-- 联系方式弹窗 -->
    <div class="contact-modal" :class="{ 'active': showContactModal }" @click="closeContactModal">
      <div class="modal-content clean-modal" @click.stop>
        <button class="close-btn" @click="closeContactModal">×</button>
        
        <div class="modal-body-simple">
          <h3>加入南开大学守望先锋社群</h3>
          <p class="subtitle">Welcome to NKOW</p>
          
          <div class="contact-card">
            <div class="contact-row">
              <span class="label">微信群</span>
              <span class="value">请添加管理员微信拉入</span>
            </div>
            <div class="contact-row highlight-row">
              <span class="label">管理员微信号</span>
              <code class="wechat-id" @click="copyWechatId">Kevster_ovo7</code>
              <span class="copy-hint">点击复制</span>
            </div>
          </div>
          
          <div class="simple-note">
            <p>仅限南开大学在校学生及校友加入</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import { nkgMembersData } from '../data/nkgMembersData.js'

const themeStore = useThemeStore()

// 成员名单数据
const membersList = nkgMembersData

// 调试：检查数据是否正确加载
console.log('成员数据:', membersList)
console.log('第一个成员:', membersList[0])

// 动画可见性状态
const isVisible1 = ref(false)
const isVisible2 = ref(false)
const isVisible3 = ref(false)
const isVisibleMembers = ref(false)
const isVisibleMembersGrid = ref(false)

// 悬停状态
const hoveredMember = ref(null)

// 弹窗状态
const showContactModal = ref(false)

// 图片交替显示
const currentImageIndex = ref(0)
let imageInterval = null

// 启动图片交替动画
const startImageAlternation = () => {
  imageInterval = setInterval(() => {
    currentImageIndex.value = currentImageIndex.value === 0 ? 1 : 0
  }, 2000) // 每2秒切换一次
}

// 停止图片交替动画
const stopImageAlternation = () => {
  if (imageInterval) {
    clearInterval(imageInterval)
    imageInterval = null
  }
}
const isVisible4 = ref(false)
const isVisible5 = ref(false)

// 元素引用
const introCard = ref(null)
const historyHeader = ref(null)
const timeline = ref(null)
const membersHeader = ref(null)
const membersGrid = ref(null)
const recruitmentCard = ref(null)
const ctaContent = ref(null)

// Intersection Observer
let observer = null





// 滚动到介绍区域
const scrollToIntro = () => {
  const introSection = document.querySelector('.intro-section')
  if (introSection) {
    introSection.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

// 滚动到招募区域
const scrollToRecruitment = () => {
  const recruitmentSection = document.querySelector('.recruitment-section')
  if (recruitmentSection) {
    recruitmentSection.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

// 滚动到历史区域
const scrollToHistory = () => {
  const historySection = document.querySelector('.history-section')
  if (historySection) {
    historySection.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

// 加入群聊
const joinGroup = () => {
  showContactModal.value = true
}

// 关闭联系方式弹窗
const closeContactModal = () => {
  showContactModal.value = false
}

// 复制微信号
const copyWechatId = () => {
  const wechatId = 'Kevster_ovo7'
  navigator.clipboard.writeText(wechatId).then(() => {
    alert('微信号已复制到剪贴板')
  }).catch(err => {
    console.error('复制失败:', err)
  })
}

// 联系我们
const contactUs = () => {
  // 这里可以添加联系方式
  alert('邮箱：ananosleep@163.com\n或通过群聊联系我们')
}

// 跳转到冠军纪念视频
const openChampionVideo = () => {
  window.open('https://www.bilibili.com/video/BV1uikBBhEZg', '_blank')
}

// 显示英雄信息
const showHeroes = (memberName) => {
  console.log('显示英雄信息:', memberName)
  const member = membersList.find(m => m.name === memberName)
  console.log('找到的成员:', member)
  hoveredMember.value = memberName
}

// 隐藏英雄信息
const hideHeroes = () => {
  hoveredMember.value = null
}

// 设置 Intersection Observer
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === introCard.value) {
          isVisible1.value = true
        } else if (entry.target === historyHeader.value) {
          isVisible2.value = true
        } else if (entry.target === timeline.value) {
          isVisible3.value = true
        } else if (entry.target === membersHeader.value) {
          isVisibleMembers.value = true
        } else if (entry.target === membersGrid.value) {
          isVisibleMembersGrid.value = true
        } else if (entry.target === recruitmentCard.value) {
          isVisible4.value = true
        } else if (entry.target === ctaContent.value) {
          isVisible5.value = true
        }
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  // 开始观察所有元素
  if (introCard.value) observer.observe(introCard.value)
  if (historyHeader.value) observer.observe(historyHeader.value)
  if (timeline.value) observer.observe(timeline.value)
  if (membersHeader.value) observer.observe(membersHeader.value)
  if (membersGrid.value) observer.observe(membersGrid.value)
  if (recruitmentCard.value) observer.observe(recruitmentCard.value)
  if (ctaContent.value) observer.observe(ctaContent.value)
}

onMounted(() => {
  setTimeout(setupObserver, 100)
  // 延迟启动图片交替动画
  setTimeout(startImageAlternation, 1000)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  stopImageAlternation()
})
</script>

<style lang="scss" scoped>
.nkg-page {
  min-height: 100vh;
}

// 英雄区域
.hero-section {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none; // 禁止文本选择
  cursor: default;   // 鼠标保持默认箭头样式
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-bg-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  object-fit: contain;
  opacity: 1;
  filter: brightness(0.8) blur(0.3px);
  transition: all 0.3s ease;
  z-index: 1;
}

.nkg-page.dark-mode .hero-bg-logo {
  opacity: 0.65; // 提升暗色模式下的可见度
  filter: brightness(0.9) blur(0.2px); // 提亮并稍微减弱模糊
}

// NKG英雄区域Logo样式
.nkg-hero-logo {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  z-index: 2;
}

.nkg-page.dark-mode .nkg-hero-logo {
  background: rgba(26, 26, 26, 0.9);
}


// 中央标题区域
.center-title-section {
  text-align: center;
  z-index: 2;
  position: relative;
  animation: fadeInUp 1.5s ease-out 0.2s forwards;
  opacity: 0;
  transform: translateY(30px);
}

.main-title {
  font-size: clamp(6rem, 8vw, 7rem); // 增大字体基准尺寸
  font-weight: bold; // BigNoodleTitling 本身就很粗，不需要 bold
  color: #711a5f;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'BigNoodleTitling', 'Arial Black', sans-serif;
  letter-spacing: 4px; // 增加一点字间距，更有气势
  font-style: italic; // 字体本身是斜体，显式声明一下
  transform: scaleX(1.4); // 横向拉伸 140%，让字看起来更宽
  display: inline-block; // transform 需要块级或行内块级元素
}

.subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: #711a5f;
  font-weight: 500;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

// 深色模式下的标题样式
.nkg-page.dark-mode .main-title,
.nkg-page.dark-mode .subtitle {
  color: #7e0c6e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}


@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}


.scroll-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.scroll-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  border: 3px solid #711a5f;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #711a5f;
  animation: bounce 2s infinite;
}

.scroll-arrow:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(113, 26, 95, 0.3);
  border-color: #8b2a6b;
  color: #8b2a6b;
}

.scroll-arrow svg {
  transition: transform 0.3s ease;
}

.scroll-arrow:hover svg {
  transform: translateY(2px);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// 通用按钮样式
.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;

  &.btn-primary {
    background: linear-gradient(45deg, #711a5f, #711a5f);
    color: #fff;
    box-shadow: 0 4px 15px rgba(113, 26, 95, 0.4);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(113, 26, 95, 0.6);
    }
  }

  &.btn-secondary {
    background: transparent;
    color: #fff;
    border: 2px solid #fff;

    &:hover {
      background: #fff;
      color: #333;
      transform: translateY(-3px);
    }
  }

  &.btn-outline {
    background: transparent;
    color: #711a5f;
    border: 2px solid #711a5f;

    &:hover {
      background: #711a5f;
      color: #fff;
      transform: translateY(-2px);
    }
  }
}

// 通用容器
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// 介绍区域
.intro-section {
  padding: 5rem 0;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &.dark-mode {
    background: #2a2a2a;
  }
}

.intro-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center; // 垂直居中
  padding: 3rem 0; // 移除左右内边距，减少卡片感
  transition: all 0.3s ease;
  
  opacity: 0;
  transform: translateY(60px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  // 简洁风格样式
  &.clean-style {
    background: transparent;
    box-shadow: none;
    border: none;
  }
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// 移除深色模式下的背景和阴影
.intro-section.dark-mode .intro-card.clean-style {
  background: transparent;
  box-shadow: none;
}

.intro-content h2 {
  font-size: 2.8rem; // 加大标题
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  position: relative;
  
  // 添加一个简洁的下划线装饰
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #711a5f;
    margin-top: 1rem;
    border-radius: 2px;
  }
}

.intro-section.dark-mode .intro-content h2 {
  color: #e0e0e0;
}

.intro-content p {
  font-size: 1.15rem; // 微调字体大小
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #555; // 加深一点颜色增加可读性
}

.intro-section.dark-mode .intro-content p {
  color: #ccc;
}

.intro-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 将宽高比调整为 16:9 (9/16 = 0.5625)，减少高度 */
  min-height: 250px; // 稍微减小最小高度
  //overflow: hidden; // 移除overflow hidden以允许阴影显示（如果需要）
  border-radius: 20px;
  
  // 简洁风格样式
  &.clean-style {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); // 更柔和的阴影
    background: #fff; // 给图片容器一个背景，防止加载时透出
  }
  
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 深色模式下的图片容器背景
.intro-section.dark-mode .intro-image.clean-style {
  background: #333;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.intro-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; // 保持 contain 模式，确保图片完整显示
  padding: 1rem; // 添加一点内边距，让图片不贴边，看起来更精致
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  transform: scale(1.05); // 初始轻微放大

  &.active {
    opacity: 1;
    transform: scale(1);
  }

  &:hover {
    transform: scale(1.02); // 悬停效果更微妙
  }
}

// 历史区域
.history-section {
  padding: 5rem 0;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &.dark-mode {
    background: #2a2a2a;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    font-size: 3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
}

.history-section.dark-mode .section-header,
.members-section.dark-mode .section-header {
  h2 {
    color: #e0e0e0;
  }

  p {
    color: #ccc;
  }
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  opacity: 0;
  transform: translateY(60px);
  transition: all 0.8s ease 0.2s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #711a5f;
    transform: translateX(-50%);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    flex-direction: row;

    .timeline-content {
      margin-left: 2rem;
      text-align: left;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    .timeline-content {
      margin-right: 2rem;
      text-align: right;
    }
  }

  &.current {
    .timeline-year {
      background: #711a5f;
      color: #fff;
      animation: pulse 2s infinite;
    }
  }
}

.timeline-year {
  background: #fff;
  border: 4px solid #711a5f;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: #711a5f;
  z-index: 2;
  position: relative;
  flex-shrink: 0;
}

.timeline-content {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  flex: 1;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

.history-section.dark-mode .timeline-content {
  background: #333;

  h3 {
    color: #e0e0e0;
  }

  p {
    color: #ccc;
  }
}

// 人员名单区域
.members-section {
  padding: 5rem 0;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &.dark-mode {
    background: #2a2a2a;
  }
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.2s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// 人员名单区域
.members-section {
  padding: 5rem 0;
  background: #f8f9fa;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.dark-mode {
    background: #2a2a2a;
  }
}

.members-wall {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.member-badge {
  position: relative;
  width: 160px;
  height: 60px;
  perspective: 1000px;
  cursor: default;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUpIn 0.5s ease forwards;
  animation-delay: var(--delay);
  
  // 现役选手特殊样式
  &.active-player .badge-inner {
    background: #fff;
    border: 1px solid #711a5f;
    box-shadow: 0 4px 15px rgba(113, 26, 95, 0.15);
    
    .member-id {
      color: #711a5f;
      font-weight: 700;
    }
  }
  
  // 校友样式
  &.alumni .badge-inner {
    background: #fff;
    border: 1px solid #e0e0e0;
    
    .member-id {
      color: #666;
    }
  }
}

.members-section.dark-mode {
  .active-player .badge-inner {
    background: #333;
    border-color: #8b2a6b;
    box-shadow: 0 4px 15px rgba(139, 42, 107, 0.3);
    
    .member-id { color: #d4a5c9; }
  }
  
  .alumni .badge-inner {
    background: #333;
    border-color: #444;
    
    .member-id { color: #999; }
  }
}

.badge-inner {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  .member-id {
    font-size: 1.1rem;
    z-index: 2;
    transition: transform 0.3s ease;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(113, 26, 95, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
  
  .hero-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem;
    padding: 0.5rem;
    
    span {
      color: #fff;
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
}

// 悬停交互
.member-badge:hover {
  z-index: 10;
  
  .badge-inner {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .member-id {
    opacity: 0; // 悬停时隐藏名字
  }
  
  .hero-overlay {
    opacity: 1;
    transform: translateY(0);
  }
}

// 状态指示点
.status-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #f8f9fa; // 与背景色同色，制造间隔感
  z-index: 4;
  
  .active-player & {
    background: #00ff88; // 现役亮绿灯
    box-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
  }
  
  .alumni & {
    background: #ccc; // 校友灰灯
    display: none; // 或者直接隐藏校友的点，更简洁
  }
}

.members-section.dark-mode .status-dot {
  border-color: #2a2a2a;
}

@keyframes fadeUpIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 招募区域
.recruitment-section {
  padding: 5rem 0 3rem 0;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &.dark-mode {
    background: #2a2a2a;
  }
}

.recruitment-card {
  background: #fff;
  padding: 3rem;
  border-radius: 20px;
  // box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); // 移除原有阴影
  transition: all 0.3s ease;
  
  opacity: 0;
  transform: translateY(60px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  // 简洁风格
  &.clean-style {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0; // 移除内边距，使其自然融入
  }
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.recruitment-section.dark-mode .recruitment-card.clean-style {
  background: transparent;
  box-shadow: none;
}

.recruitment-header {
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    // 标题下划线
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 4px;
      background: #711a5f;
      margin-top: 0.5rem;
      border-radius: 2px;
      opacity: 0.8;
    }
  }

  p {
    font-size: 1.2rem;
    color: #666;
    margin-top: 1rem;
  }
}

.recruitment-section.dark-mode .recruitment-header {
  h2 {
    color: #e0e0e0;
  }

  p {
    color: #ccc;
  }
}

.recruitment-content.clean-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem; // 加大间距
  margin-bottom: 4rem;
  text-align: left;
}

.requirements-section, .benefits-section {
  h3 {
    font-size: 2rem; // 加大标题
    font-weight: 700;
    color: #333;
    margin-bottom: 2rem;
    position: relative;
    
    // 标题下划线
    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 4px;
      background: #711a5f;
      margin-top: 1rem;
      border-radius: 2px;
    }
  }

  .text-block {
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #555;
      margin-bottom: 1.5rem;
    }
  }
}

.recruitment-section.dark-mode {
  .requirements-section, .benefits-section {
    h3 {
      color: #e0e0e0;
    }
    .text-block p {
      color: #ccc;
    }
  }
}

// 移除旧的卡片样式
// .requirements, .benefits { ... }

.contact-info {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(113, 26, 95, 0.05) 0%, rgba(113, 26, 95, 0.1) 100%); // 极淡的紫色背景
  border-radius: 20px;

  p {
    color: #555;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    
    &.highlight {
      font-weight: 600;
      color: #711a5f;
    }
  }
}

.recruitment-section.dark-mode .contact-info {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  
  p {
    color: #ccc;
    
    &.highlight {
      color: #e0e0e0;
    }
  }
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

// 简单的底部导航样式
.simple-footer-nav {
  padding: 2rem 0 4rem;
  text-align: center;
  background: #f8f9fa;
  
  .nav-link {
    color: #999;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #711a5f;
    }
  }
  
  &.dark-mode {
    background: #2a2a2a;
    
    .nav-link:hover {
      color: #e0e0e0;
    }
  }
}

// 移除原有的CTA样式
// .cta-section { ... }

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

// 冠军高亮样式
.timeline-item.champion-highlight {
  .timeline-year {
    background: linear-gradient(135deg, #FFD700, #DAA520);
    color: #fff;
    border-color: #DAA520;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
    //animation: pulse-gold 2s infinite;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    z-index: 3;
  }

  .timeline-content {
    background: linear-gradient(to right bottom, #fff, #fffbf0);
    //border: 2px solid #FFD700;
    box-shadow: 0 10px 25px rgba(218, 165, 32, 0.2);//给卡片底部添加一个金色的模糊投影
    position: relative;
    overflow: hidden;
    padding: 1.5rem;
    transition: padding 0.3s ease;
    //transform: scale(1.02);
    
    &::after {//扫光特效
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
      transform: rotate(30deg);
      animation: shine 6s infinite linear;
      pointer-events: none;
    }

    h3 {
      color: #B8860B;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      transition: margin 0.3s ease;
    }

    p {
      color: #333;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .click-hint {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0.5rem 1.5rem;
      text-align: right;
      font-size: 0.85rem;
      color: #fff;
      font-weight: 600;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      background: linear-gradient(135deg, #FFD700, #DAA520);
      pointer-events: none;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    &:hover {
      padding-top: 0.5rem;
      padding-bottom: 3.0rem; // 增加底部padding保持高度不变

      h3 {
        margin-bottom: 0; // 收缩标题与正文间距
      }
      
      .click-hint {
        transform: translateY(0);
      }
    }
  }
}

// 深色模式适配
.nkg-page.dark-mode .timeline-item.champion-highlight {
  .timeline-content {
    background: linear-gradient(to right bottom, #333, #3a332a);
    border-color: #B8860B;
    box-shadow: 0 10px 25px rgba(218, 165, 32, 0.1);

    &::after {
      background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
    }

    h3 {
      color: #FFD700;
    }

    p {
      color: #e0e0e0;
    }

    // .click-hint {
    //   background: rgba(58, 51, 42, 0.95);
    // }
  }
}

// 动画
@keyframes pulse-gold {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
    transform: scale(1);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
    transform: scale(1.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
    transform: scale(1);
  }
}

@keyframes pulse-dot {
  0% {
    box-shadow: 0 0 0 0 rgba(113, 26, 95, 0.7);
    transform: translateY(-50%) scale(1);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(113, 26, 95, 0);
    transform: translateY(-50%) scale(1.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(113, 26, 95, 0);
    transform: translateY(-50%) scale(1);
  }
}

@keyframes pulse-dot-dark {
  0% {
    box-shadow: 0 0 0 0 rgba(212, 165, 201, 0.7);
    transform: translateY(-50%) scale(1);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(212, 165, 201, 0);
    transform: translateY(-50%) scale(1.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 165, 201, 0);
    transform: translateY(-50%) scale(1);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-150%) rotate(30deg);
  }
  20% {
    transform: translateX(150%) rotate(30deg);
  }
  100% {
    transform: translateX(150%) rotate(30deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .main-title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
  }

  .btn {
    padding: 1.1rem 2.2rem;
    font-size: 1.1rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .scroll-indicator {
    margin-top: 1.5rem;
  }

  .scroll-arrow {
    width: 55px;
    height: 55px;
  }

  .scroll-arrow svg {
    width: 28px;
    height: 28px;
  }

  .intro-card {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem 1rem;
  }

  .intro-content {
    padding: 0 0.5rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 0.8rem;
    }
  }

  .recruitment-content,
  .recruitment-content.clean-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem; // 增加侧边距
  }
  
  .contact-info {
    margin: 0 1rem; // 增加侧边距
  }

  .timeline {
    margin-left: 0;
    padding-left: 1rem;
    
    &::before {
      left: 24px;
    }
  }

  .timeline-item {
    flex-direction: column !important;
    padding-left: 2.5rem;
    align-items: flex-start;
    margin-bottom: 2.5rem;

    .timeline-content {
      margin-left: 0 !important;
      margin-right: 0 !important;
      text-align: left !important;
      width: 100%;
      margin-top: 0.5rem;
      padding: 1.2rem;
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      
      p {
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }
  }

  .timeline-year {
    position: relative;
    left: auto;
    top: auto;
    width: auto;
    height: auto;
    background: transparent;
    border: none;
    padding: 0;
    margin-bottom: 0.2rem;
    font-size: 1.4rem;
    font-weight: 800;
    font-family: 'BigNoodleTitling', sans-serif;
    color: #711a5f;
    line-height: 1;
    letter-spacing: 1px;
    
    &::before {
      content: '';
      position: absolute;
      left: calc(-2.5rem + 17px);
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      background: #fff;
      border: 3px solid #711a5f;
      border-radius: 50%;
      z-index: 2;
      box-shadow: 0 0 0 4px #f8f9fa;
    }
  }
  
  .nkg-page.dark-mode .timeline-year {
    color: #d4a5c9;
    
    &::before {
      background: #2a2a2a;
      border-color: #8b2a6b;
      box-shadow: 0 0 0 4px #2a2a2a;
    }
  }

  .timeline-item.current {
    .timeline-year {
      animation: none !important;
      background: transparent !important;
      color: #711a5f !important;
      
      &::before {
        background: #711a5f;
        border-color: #711a5f;
        animation: pulse-dot 2s infinite;
      }
    }
    
    .timeline-content {
      border: 1px solid rgba(113, 26, 95, 0.2);
      background: linear-gradient(135deg, #fff 0%, #fff5fa 100%);
      box-shadow: 0 4px 12px rgba(113, 26, 95, 0.1);
      
      h3 {
        color: #711a5f;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  .nkg-page.dark-mode .timeline-item.current {
    .timeline-year {
      color: #d4a5c9 !important;
    }

    .timeline-year::before {
      background: #d4a5c9;
      border-color: #d4a5c9;
      animation: pulse-dot-dark 2s infinite;
    }
    
    .timeline-content {
      border-color: rgba(212, 165, 201, 0.2);
      background: linear-gradient(135deg, #2a2a2a 0%, #3a2a35 100%);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      
      h3 {
        color: #d4a5c9;
      }
      
      p {
        color: #e0e0e0;
      }
    }
  }

  .timeline-item.champion-highlight {
    .timeline-year {
      color: #B8860B;
      text-shadow: none;
      box-shadow: none;
      background: transparent;
      
      &::before {
        background: #FFD700;
        border-color: #DAA520;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      }
    }
    
    .timeline-content {
      padding-top: 0.5rem !important;
      padding-bottom: 3.0rem !important;
      
      h3 {
        margin-bottom: 0 !important;
      }
    }

    .click-hint {
      transform: translateY(0) !important;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(218, 165, 32, 0.9));
      padding: 0.4rem 1rem;
    }
  }
  
  .nkg-page.dark-mode .timeline-item.champion-highlight .timeline-year {
    color: #FFD700;
    
    &::before {
      background: #B8860B;
      border-color: #FFD700;
    }
  }

  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .container {
    padding: 0 1rem;
  }

  // NKG英雄区域响应式
  .nkg-hero-logo {
    padding: 1.5rem 1rem;
  }

  .main-title {
    font-size: clamp(2rem, 7vw, 4rem);
  }

  .subtitle {
    font-size: clamp(0.9rem, 2vw, 1rem);
  }

  .members-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .member-card {
    padding: 1rem;
  }

  .member-card .member-name {
    font-size: 1rem;
  }

  .heroes-section {
    padding: 0.8rem 0.8rem 1.5rem 0.8rem;
  }

  .hero-tag {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
  }
}

// 弹窗样式优化
.contact-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); // 加深背景遮罩
  backdrop-filter: blur(5px); // 增加毛玻璃效果
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.modal-content.clean-modal {
  background: #fff;
  width: 90%;
  max-width: 420px;
  border-radius: 24px;
  padding: 3rem 2rem;
  position: relative;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  transform: scale(0.95);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  .contact-modal.active & {
    transform: scale(1);
  }
}

.nkg-page.dark-mode .modal-content.clean-modal {
  background: #2a2a2a;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #333;
  }
}

.nkg-page.dark-mode .close-btn:hover {
  color: #fff;
}

.modal-body-simple {
  h3 {
    font-size: 1.6rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  .subtitle {
    font-size: 1rem;
    color: #999;
    letter-spacing: 1px;
    margin-bottom: 2.5rem;
    text-transform: uppercase;
  }
}

.nkg-page.dark-mode .modal-body-simple h3 {
  color: #e0e0e0;
}

.contact-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  .contact-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    font-size: 0.95rem;
    
    &:first-child {
      border-bottom: 1px solid #eee;
    }
    
    .label {
      color: #666;
    }
    
    .value {
      color: #333;
      font-weight: 500;
    }
  }
  
  .highlight-row {
    margin-top: 0.5rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    
    .label {
      font-size: 0.85rem;
      color: #999;
    }
    
    .wechat-id {
      width: 100%;
      background: #fff;
      padding: 1rem;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: 700;
      color: #711a5f;
      border: 1px dashed #711a5f;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      text-align: center;
      
      &:hover {
        background: #fdf5fa;
        transform: scale(1.02);
      }
      
      &:active {
        transform: scale(0.98);
      }
    }
    
    .copy-hint {
      align-self: center;
      font-size: 0.75rem;
      color: #aaa;
      margin-top: 0.2rem;
    }
  }
}

.nkg-page.dark-mode .contact-card {
  background: #333;
  
  .contact-row:first-child {
    border-bottom-color: #444;
  }
  
  .label { color: #aaa; }
  .value { color: #e0e0e0; }
  
  .highlight-row .wechat-id {
    background: #2a2a2a;
    color: #d4a5c9;
    border-color: #d4a5c9;
    
    &:hover {
      background: #3a3a3a;
    }
  }
}

.simple-note {
  p {
    font-size: 0.9rem;
    color: #999;
    margin: 0;
  }
}

// 移动端弹窗样式
@media (max-width: 768px) {
  .modal-content.clean-modal {
    width: 95%;
    padding: 2rem 1.5rem;
  }
}
</style>
