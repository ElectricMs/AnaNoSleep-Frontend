<template>
  <section class="serif-hero" :class="{ 'is-entered': heroEntered }">
    <div class="serif-container">
      <div class="serif-hero-stage">
        <div class="serif-floating-gallery" aria-hidden="true">
          <div
            v-for="(img, idx) in heroFloatImages"
            :key="img.src"
            class="serif-float-card"
            :class="`serif-float-card--${idx + 1}`"
          >
            <picture>
              <source :srcset="img.avifSrc" type="image/avif" />
              <img :src="img.src" :alt="img.alt" loading="lazy" decoding="async" />
            </picture>
          </div>
        </div>

        <div class="serif-hero-content serif-hero-panel">
          <div class="serif-label">OVERWATCH GUIDES</div>
          <h1 class="serif-title">
            ANANOSLEEP<span class="serif-period">.</span>COM
          </h1>
          <p class="serif-subtitle">在这里探索更多Overwatch</p>
          <div class="serif-actions">
            <a href="#home-main" class="serif-btn serif-btn--primary">开始探索</a>
            <a
              href="https://ow.blizzard.cn/"
              target="_blank"
              rel="noopener noreferrer"
              class="serif-btn serif-btn--outline"
            >
              跳转官网
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroEntered = ref(false)
const heroFloatImages = ref([])
let lazyLoadTimer = null
let firstAnimationFrame = null
let secondAnimationFrame = null

const floatImages = [
  { src: new URL('../../assets/images/display/junodva.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/junodva.avif', import.meta.url).href, alt: 'Juno & D.Va' },
  { src: new URL('../../assets/images/display/daotian.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/daotian.avif', import.meta.url).href, alt: 'Daotian' },
  { src: new URL('../../assets/images/display/luciecho.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/luciecho.avif', import.meta.url).href, alt: 'Lucio & Echo' },
  { src: new URL('../../assets/images/display/route66.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/route66.avif', import.meta.url).href, alt: 'Route 66' },
  { src: new URL('../../assets/images/display/ram.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/ram.avif', import.meta.url).href, alt: 'Ramattra' },
  { src: new URL('../../assets/images/display/homeview-bg1.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/homeview-bg1.avif', import.meta.url).href, alt: 'Home Background' },
  { src: new URL('../../assets/images/display/kiriko.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/kiriko.avif', import.meta.url).href, alt: 'Kiriko' },
  { src: new URL('../../assets/images/display/kiriko2.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/kiriko2.avif', import.meta.url).href, alt: 'Kiriko (Alt)' },
  { src: new URL('../../assets/images/display/kirimercy.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/kirimercy.avif', import.meta.url).href, alt: 'Kiriko & Mercy' },
  { src: new URL('../../assets/images/display/kirimercy2.jpg', import.meta.url).href, avifSrc: new URL('../../assets/images/display/kirimercy2.avif', import.meta.url).href, alt: 'Kiriko & Mercy (Alt)' }
]

onMounted(() => {
  lazyLoadTimer = setTimeout(() => {
    heroFloatImages.value = floatImages
    firstAnimationFrame = requestAnimationFrame(() => {
      secondAnimationFrame = requestAnimationFrame(() => {
        heroEntered.value = true
      })
    })
  }, 200)
})

onUnmounted(() => {
  clearTimeout(lazyLoadTimer)
  if (firstAnimationFrame !== null) cancelAnimationFrame(firstAnimationFrame)
  if (secondAnimationFrame !== null) cancelAnimationFrame(secondAnimationFrame)
})
</script>
