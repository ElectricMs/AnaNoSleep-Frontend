<template>
  <div class="vendetta-cup-page" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <p class="section-label">NKG Special Event</p>
        <h1>斩仇杯</h1>
        <p class="hero-subtitle">
          2026 冬季 · 南开校内守望先锋交流赛事
        </p>
        <p class="hero-desc">
          斩仇杯由 NKG 承办，覆盖整个寒假，围绕公平选人、分阶段对抗和团队成长打造，记录了南开守望社群一次完整的社区竞技实践。
        </p>
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="adVisible"
        ref="adBannerRef"
        class="retro-ad-banner"
        :style="{ left: `${adPos.x}px`, top: `${adPos.y}px` }"
        role="dialog"
        aria-label="推广横幅"
        tabindex="0"
        @mouseenter="adHoverPaused = true"
        @mouseleave="adHoverPaused = false"
        @click="openAdTarget"
        @keydown.enter.prevent="openAdTarget"
        @keydown.space.prevent="openAdTarget"
      >
        <span class="retro-ad-badge">广告</span>
        <div class="retro-ad-inner">
          <span class="retro-floating-title">朱嘉远</span>
        </div>
        <button
          type="button"
          class="retro-ad-close"
          aria-label="关闭广告"
          @pointerdown.stop="closeAd"
          @click.stop.prevent="closeAd"
        >
          ×
        </button>
      </div>
    </Teleport>

    <section class="content-section">
      <div class="container">
        <div class="section-head">
          <span class="rule"></span>
          <p class="section-label">赛事定位</p>
          <span class="rule"></span>
        </div>
        <h2>以交流为核心的校内大型赛事</h2>
        <p class="lead">
          比赛目标是促进南开大学的守望先锋玩家交流，激发社群活力，推动技术与游戏理解共同进步。
          赛事采用“队长拍卖选人、小组赛、淘汰赛”的结构，在趣味性、公平性与竞技性之间保持平衡。
        </p>
      </div>
    </section>

    <section class="content-section layout-grid">
      <div class="container">
        <article class="card summary-merged">
          <div class="two-col summary-merged-inner">
            <div class="summary-body">
              <div class="section-head">
                <span class="rule"></span>
                <p class="section-label">赛制摘要</p>
                <span class="rule"></span>
              </div>
              <h3>两阶段流程</h3>
              <ul>
                <li><strong>第一阶段：</strong>小组赛（各队长利用拍卖资金招募选手，进行组内循环赛）。</li>
                <li><strong>第二阶段：</strong>淘汰赛（根据小组赛表现重定选手价值，各队伍重新拍卖选人）。</li>
              </ul>

              <h3>核心规则要点</h3>
              <ul>
                <li>小组赛前所有队长进行斩仇对抗赛，冠军会额外获得拍卖资金奖励。</li>
                <li>小组赛前拍卖选人：先对非队长选手按底价进行密封报价（通常单次报价不超过剩余资金一半），
                    最高价直接成交、同价则转入明牌加价决胜；
                    首轮无人报价者进入流拍池，再进行公开竞拍，每名选手拍卖时由资金最多且该位置未满的队长承担最低出价义务，
                    同时全程受阵容职责约束。</li>
                <li>淘汰赛前拍卖选人：各队长可保住一名队员，其余队员进入拍卖池，并直接进行公开竞拍，规则与小组赛拍卖一致。</li>
                <li>比赛启用地图池和Ban/Pick机制，首图由小组赛单挑高顺位和淘汰赛种子高顺位队伍确定，其余规则与owcs赛制一致。</li>
              </ul>
            </div>

            <div class="summary-media">
              <img :src="heroActionImage" alt="斩仇杯宣传画面" loading="lazy" />
              <div class="gallery">
                <img :src="vendettaPortraitImage" alt="斩仇角色图" loading="lazy" />
                <img :src="vendettaPosterImage" alt="斩仇主题海报" loading="lazy" />
              </div>
              <p class="img-caption">斩仇杯视觉主题基于《守望先锋2》英雄“斩仇（Vendetta）”展开。</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="section-head">
          <span class="rule"></span>
          <p class="section-label">参赛名单</p>
          <span class="rule"></span>
        </div>
        <h2>小组赛与淘汰赛队伍</h2>
        <div class="team-grids">
          <article class="card team-card">
            <h3>小组赛</h3>
            <div class="teams">
              <div v-for="team in groupStageTeams" :key="`group-${team.name}`" class="team-block">
                <h4>{{ team.name }}</h4>
                <ul>
                  <li v-for="member in team.members" :key="`${team.name}-${member}`">{{ member }}</li>
                </ul>
              </div>
            </div>
          </article>

          <article class="card team-card">
            <h3>淘汰赛</h3>
            <div class="teams">
              <div v-for="team in knockoutTeams" :key="`ko-${team.name}`" class="team-block">
                <h4>{{ team.name }}</h4>
                <ul>
                  <li v-for="member in team.members" :key="`${team.name}-${member}`">{{ member }}</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="content-section honors-section">
      <div class="container">
        <div class="section-head">
          <span class="rule"></span>
          <p class="section-label">赛事荣誉</p>
          <span class="rule"></span>
        </div>
        <h2>冠军与个人奖项</h2>
        <p class="lead honors-lead">
          淘汰赛最终结果与个人荣誉汇总如下，记录本届斩仇杯的冠军与个人奖项。
        </p>
        <div class="honors-grid">
          <article class="card honor-card honor-card--champion">
            <p class="honor-eyebrow">淘汰赛</p>
            <h3 class="honor-heading">冠军</h3>
            <p class="honor-value">老壁灯队</p>
            <p class="honor-note">淘汰赛阶段最终胜出队伍：老壁灯队。在小组赛中取得全胜，并且在淘汰赛中保持大场不败，仅丢两小分取得冠军。</p>
            <div class="champion-roster">

              <div class="champion-roster-list">
                <p class="champion-roster-member champion-roster-member--captain">
                  Agingeye
                  <span class="captain-tag">队长</span>
                </p>
                <p class="champion-roster-member">天使和源氏</p>
                <p class="champion-roster-member">馅饼</p>
                <p class="champion-roster-member">蛮巴奥特</p>
                <p class="champion-roster-member">板烧鸡腿堡</p>
              </div>
            </div>
          </article>
          <article
            v-for="award in individualAwards"
            :key="award.id"
            class="card honor-card"
          >
            <p class="honor-eyebrow">个人奖项</p>
            <h3 class="honor-heading">{{ award.label }}</h3>
            <p class="honor-value">{{ award.winner }}</p>
            <p class="honor-note">{{ award.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const adVisible = ref(true)
const adBannerRef = ref(null)
const adHoverPaused = ref(false)
const adPos = reactive({ x: 24, y: 72 })
const adVel = reactive({
  x: (Math.random() > 0.5 ? 1 : -1) * 92,
  y: (Math.random() > 0.5 ? 1 : -1) * 68
})

let adRafId = 0
let adLastTs = 0

function clampAdToViewport() {
  const el = adBannerRef.value
  if (!el) return
  const maxX = Math.max(0, window.innerWidth - el.offsetWidth)
  const maxY = Math.max(0, window.innerHeight - el.offsetHeight)
  adPos.x = Math.min(Math.max(0, adPos.x), maxX)
  adPos.y = Math.min(Math.max(0, adPos.y), maxY)
}

function adTick(ts) {
  if (!adVisible.value) return

  const el = adBannerRef.value
  if (!el) {
    adRafId = requestAnimationFrame(adTick)
    return
  }

  const dt = adLastTs ? Math.min((ts - adLastTs) / 1000, 0.064) : 0
  adLastTs = ts

  if (adHoverPaused.value) {
    adRafId = requestAnimationFrame(adTick)
    return
  }

  const w = el.offsetWidth
  const h = el.offsetHeight
  if (w === 0 || h === 0) {
    adRafId = requestAnimationFrame(adTick)
    return
  }

  const maxX = Math.max(0, window.innerWidth - w)
  const maxY = Math.max(0, window.innerHeight - h)

  adPos.x += adVel.x * dt
  adPos.y += adVel.y * dt

  if (adPos.x <= 0) {
    adPos.x = 0
    adVel.x = Math.abs(adVel.x)
  } else if (adPos.x >= maxX) {
    adPos.x = maxX
    adVel.x = -Math.abs(adVel.x)
  }

  if (adPos.y <= 0) {
    adPos.y = 0
    adVel.y = Math.abs(adVel.y)
  } else if (adPos.y >= maxY) {
    adPos.y = maxY
    adVel.y = -Math.abs(adVel.y)
  }

  adRafId = requestAnimationFrame(adTick)
}

function closeAd() {
  adVisible.value = false
  cancelAnimationFrame(adRafId)
}

const adTargetUrl = '/vendetta-cup-champion'

function openAdTarget() {
  window.open(adTargetUrl, '_blank', 'noopener')
}

function onAdResize() {
  clampAdToViewport()
}

onMounted(() => {
  adLastTs = performance.now()
  requestAnimationFrame(() => {
    const el = adBannerRef.value
    if (el && adVisible.value) {
      const maxX = Math.max(0, window.innerWidth - el.offsetWidth)
      const maxY = Math.max(0, window.innerHeight - el.offsetHeight)
      adPos.x = maxX > 0 ? Math.random() * maxX : 0
      adPos.y = maxY > 0 ? Math.random() * maxY : 0
    }
    adRafId = requestAnimationFrame(adTick)
  })
  window.addEventListener('resize', onAdResize)
})

onUnmounted(() => {
  cancelAnimationFrame(adRafId)
  window.removeEventListener('resize', onAdResize)
})

const heroActionImage = new URL('../../docs/Vendetta/overwatch-2-hero-45-vendetta-la-lupa-action-sword-fire.avif', import.meta.url).href
const vendettaPortraitImage = new URL('../../docs/Vendetta/H028SAYSFEBN1767921793489.png.jpeg', import.meta.url).href
const vendettaPosterImage = new URL('../../docs/Vendetta/HMBM2VAFBI5J1764204637307.png', import.meta.url).href

const groupStageTeams = [
  { name: '老壁灯队', members: ['Agingeye', '天使和源氏', 'Starlight', '蛮巴奥特', '多刺天门东'] },
  { name: '惊天五条区队', members: ['Omsama', 'Pingshenme', '筱妍', 'Mccormic', '板烧鸡腿堡'] },
  { name: '日不落队', members: ['Sunrise', '糖醋里脊', '吉川由纪', '知名大火男', '萨摩亚体育生'] },
  { name: '朱嘉远队', members: ['更科瑠夏', 'phantasi', '上个号丢了', 'yulu', '伊水'] },
  { name: '尼美舒利队', members: ['沙漠孤狼彪哥', 'Fatty', '馅饼', 'Moriaty'] }
]

const knockoutTeams = [
  { name: '老壁灯队', members: ['Agingeye', '天使和源氏', '馅饼', '蛮巴奥特', '板烧鸡腿堡'] },
  { name: '惊天五条区队', members: ['Omsama', 'Pingshenme', '上个号丢了', 'Mccormic', '多刺天门东'] },
  { name: '日不落队', members: ['Sunrise', '糖醋里脊', '筱妍', '知名大火男', 'Fatty'] },
  { name: 'Crazy Falcons队', members: ['更科瑠夏', 'phantasi', 'Moriaty', '沙漠孤狼彪哥', '伊水'] }
]

const individualAwards = [
  {
    id: 'mvp',
    label: 'MVP 选手',
    winner: 'Sunrise',
    description: '综合赛事表现评选出的最有价值选手。'
  },
  {
    id: 'rookie',
    label: '最佳新秀',
    winner: '曼巴奥特',
    description: '首次参加nkow社区比赛即表现突出的选手。'
  },
  {
    id: 'flex-star',
    label: '职责之星 - 自由人',
    winner: '天使和源氏',
    description: '在多职责轮转中保持稳定发挥并补齐阵容短板。'
  },
  {
    id: 'tank-star',
    label: '职责之星 - 重装位',
    winner: '糖醋里脊',
    description: '在重装职责上持续提供稳定开团与空间压制。'
  },
  {
    id: 'dps-star',
    label: '职责之星 - 输出位',
    winner: '更科瑠夏',
    description: '在输出职责上展现出高压制力与关键击杀能力。'
  },
  {
    id: 'support-star',
    label: '职责之星 - 支援位',
    winner: '板烧鸡腿堡、伊水',
    description: '兼顾节奏调度、保护续航与关键伤害。'
  }
]
</script>

<style scoped lang="scss">
.vendetta-cup-page {
  background: var(--serif-background);
  color: var(--serif-foreground);
  min-height: 100vh;
}

.container {
  max-width: var(--serif-container-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  position: relative;
  padding: 7rem 0 5rem;
  border-bottom: 1px solid var(--serif-border);
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--serif-muted) 85%, transparent), transparent),
    url('../../docs/Vendetta/7XGR0SCQ94YO1763672757341.png.avif') center / cover no-repeat;
}

.retro-ad-banner {
  position: fixed;
  z-index: 30000;
  cursor: pointer;
  box-sizing: border-box;
  min-width: 11.5rem;
  padding: 0.45rem 2.35rem 0.45rem 2.5rem;
  border: 2px solid #ff8c00;
  border-radius: 4px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 236, 160, 0.98) 38%, #ffb84d 100%);
  box-shadow:
    0 2px 0 #fff inset,
    0 6px 18px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(0, 0, 0, 0.12);
  animation: retro-ad-border-glow 1.4s ease-in-out infinite;
}

.retro-ad-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.25rem;
  pointer-events: none;
}

.retro-ad-badge {
  position: absolute;
  left: 6px;
  top: 4px;
  font-family: var(--serif-font-mono, ui-monospace, monospace);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
  pointer-events: none;
}

.retro-ad-close {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 5;
  pointer-events: auto;
  touch-action: manipulation;
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  border: 1px solid #b0b0b0;
  border-radius: 2px;
  background: linear-gradient(180deg, #fafafa 0%, #d8d8d8 100%);
  color: #333;
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 0 #fff inset, 0 1px 2px rgba(0, 0, 0, 0.2);
}

.retro-ad-close:hover {
  background: linear-gradient(180deg, #fff 0%, #e8e8e8 100%);
  color: #c00;
}

.retro-ad-close:active {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25) inset;
}

.retro-ad-close:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

.retro-floating-title {
  position: relative;
  display: inline-block;
  pointer-events: none;
  font-family: "Impact", "Arial Black", "STHeiti", sans-serif;
  font-size: clamp(1.65rem, 5vw, 2.65rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: 0.06em;
  white-space: nowrap;
  width: max-content;
  text-transform: uppercase;
  color: #fff92b;
  -webkit-text-stroke: 2px #8200ff;
  text-shadow:
    0 0 6px rgba(255, 243, 90, 0.7),
    0 0 14px rgba(255, 51, 168, 0.4),
    0 0 26px rgba(255, 102, 0, 0.32),
    0 0 38px rgba(255, 0, 136, 0.22),
    3px 3px 0 #00dbff,
    -3px -3px 0 #ff1f1f,
    0 6px 14px rgba(0, 0, 0, 0.35);
  filter:
    saturate(1.45)
    contrast(1.06)
    drop-shadow(0 0 8px rgba(255, 77, 196, 0.45))
    drop-shadow(0 0 18px rgba(255, 92, 0, 0.35))
    drop-shadow(0 0 28px rgba(145, 0, 255, 0.3));
  transform: rotate(-3deg);
  animation: retro-float-pulse 1.15s steps(2, end) infinite;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--serif-background) 76%, transparent);
}

.hero-section .container {
  position: relative;
  z-index: 1;
}

.section-label {
  font-family: var(--serif-font-mono);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--serif-accent);
}

h1, h2, h3, h4 {
  font-family: var(--serif-font-display);
  color: var(--serif-foreground);
}

h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin: 1rem 0;
}

.hero-subtitle {
  font-family: var(--serif-font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--serif-muted-foreground);
}

.hero-desc,
.lead,
p,
li {
  font-family: var(--serif-font-body);
  line-height: 1.75;
}

.hero-desc {
  max-width: 48rem;
  margin-top: 1.25rem;
  font-size: 1.0625rem;
}

.content-section {
  padding: 2rem 0;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rule {
  display: block;
  height: 1px;
  flex: 1;
  background: var(--serif-border);
}

h2 {
  margin: 1rem 0 1.25rem;
  font-size: clamp(1.85rem, 4vw, 2.6rem);
}

h3 {
  margin-bottom: 0.85rem;
  font-size: 1.45rem;
}

.lead {
  max-width: 56rem;
  color: var(--serif-muted-foreground);
}

.two-col {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
}

.card {
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-radius: 10px;
  padding: 1.75rem;
  box-shadow: 0 4px 12px rgba(26, 26, 26, 0.06);
}

ul {
  margin-top: 0.75rem;
  padding-left: 1.1rem;
}

li {
  margin: 0.45rem 0;
}

.summary-media img,
.gallery img {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--serif-border);
}

.gallery {
  display: grid;
  gap: 1rem;
}

.summary-media > .gallery {
  margin-top: 1rem;
}

.summary-merged-inner {
  align-items: start;
}

.img-caption {
  margin-top: 0.8rem;
  color: var(--serif-muted-foreground);
  font-size: 0.95rem;
}

.team-grids {
  display: grid;
  gap: 1.4rem;
}

.team-card h3 {
  margin-bottom: 1.25rem;
}

.teams {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.team-block {
  padding-top: 0.75rem;
  border-top: 1px solid var(--serif-border);
}

.team-block h4 {
  margin-bottom: 0.5rem;
  color: var(--serif-accent);
  font-size: 1.1rem;
}

.honors-lead {
  margin-bottom: 0.25rem;
}

.honors-grid {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.5rem;
  grid-template-columns: 1fr;
}

.honor-card {
  margin: 0;
}

.honor-card .honor-eyebrow {
  margin: 0 0 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--serif-muted-foreground);
}

.honor-card .honor-heading {
  margin: 0 0 0.6rem;
  font-size: 1.15rem;
  font-weight: 600;
}

.honor-card .honor-value {
  margin: 0 0 0.65rem;
  font-family: var(--serif-font-display, 'Playfair Display', serif);
  font-size: clamp(1.45rem, 3.2vw, 1.85rem);
  line-height: 1.2;
  color: var(--serif-accent);
}

.honor-card .honor-value--placeholder {
  color: var(--serif-muted-foreground);
  font-size: 1.05rem;
  font-family: var(--serif-font-body);
}

.honor-card .honor-note {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--serif-muted-foreground);
}

.champion-roster {
  margin-top: 0.95rem;
}

.champion-roster-label {
  margin: 0;
  font-family: var(--serif-font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--serif-muted-foreground);
}

.champion-roster-list {
  margin-top: 0.45rem;
  margin-bottom: 0;
}

.champion-roster-member {
  margin: 0.25rem 0;
}

.champion-roster-member--captain {
  margin: 0.25rem 0;
}

.champion-roster-member--captain {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--serif-font-display);
  color: var(--serif-foreground);
}

.captain-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.52rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--serif-accent) 55%, var(--serif-border) 45%);
  background: color-mix(in srgb, var(--serif-accent) 12%, var(--serif-card) 88%);
  color: var(--serif-accent);
  font-family: var(--serif-font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.honor-card--champion {
  border-top: 3px solid var(--serif-accent);
}

.honor-card--pending {
  border-style: dashed;
  border-color: color-mix(in srgb, var(--serif-border) 78%, var(--serif-accent) 22%);
}

@media (min-width: 720px) {
  .honors-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .honor-card--champion {
    grid-column: 1 / -1;
  }
}

.dark-mode .hero-overlay {
  background: color-mix(in srgb, var(--serif-background) 82%, transparent);
}

@keyframes retro-ad-border-glow {
  0%,
  100% {
    border-color: #ff8c00;
    box-shadow:
      0 2px 0 #fff inset,
      0 6px 18px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(0, 0, 0, 0.12),
      0 0 12px rgba(255, 180, 0, 0.45);
  }
  50% {
    border-color: #ff4500;
    box-shadow:
      0 2px 0 #fff inset,
      0 6px 18px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(0, 0, 0, 0.12),
      0 0 20px rgba(255, 100, 0, 0.65);
  }
}

@keyframes retro-float-pulse {
  0% {
    transform: rotate(-3deg) scale(1);
    filter:
      hue-rotate(0deg)
      saturate(1.4)
      contrast(1.05)
      drop-shadow(0 0 6px rgba(255, 77, 196, 0.4))
      drop-shadow(0 0 16px rgba(255, 92, 0, 0.32))
      drop-shadow(0 0 26px rgba(145, 0, 255, 0.28));
  }
  50% {
    transform: rotate(2deg) scale(1.05);
    filter:
      hue-rotate(12deg)
      saturate(1.55)
      contrast(1.1)
      drop-shadow(0 0 10px rgba(255, 77, 196, 0.55))
      drop-shadow(0 0 22px rgba(255, 92, 0, 0.42))
      drop-shadow(0 0 36px rgba(145, 0, 255, 0.38));
  }
  100% {
    transform: rotate(-3deg) scale(1);
    filter:
      hue-rotate(0deg)
      saturate(1.4)
      contrast(1.05)
      drop-shadow(0 0 6px rgba(255, 77, 196, 0.4))
      drop-shadow(0 0 16px rgba(255, 92, 0, 0.32))
      drop-shadow(0 0 26px rgba(145, 0, 255, 0.28));
  }
}

@media (max-width: 960px) {
  .two-col,
  .teams {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .hero-section {
    padding-top: 6.5rem;
  }

  .retro-floating-title {
    -webkit-text-stroke: 1.5px #8200ff;
  }

  .content-section {
    padding: 3.5rem 0;
  }
}
</style>
