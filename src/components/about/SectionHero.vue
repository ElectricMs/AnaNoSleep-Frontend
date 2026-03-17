<template>
  <section class="serif-section-hero">
    <div class="serif-container">
      <!-- Section Label -->
      <div class="serif-section-label-hero" ref="labelRef">
        <span class="serif-line"></span>
        <span class="serif-label-text">{{ label }}</span>
        <span class="serif-line"></span>
      </div>

      <h1 class="serif-hero-title" ref="titleRef">{{ title }}</h1>
      <p class="serif-hero-subtitle" ref="subtitleRef">
        <template v-for="(part, index) in parsedSubtitle" :key="index">
          <component
            :is="part.isAccent ? 'span' : 'span'"
            :class="part.isAccent ? 'serif-accent-text' : ''"
          >
            {{ part.text }}
          </component>
          <span v-if="index < parsedSubtitle.length - 1"> </span>
        </template>
      </p>

      <!-- Decorative Rule -->
      <div v-if="showRule" class="serif-hero-rule" ref="ruleRef"></div>

      <!-- Slot for additional content -->
      <div v-if="$slots.default" class="serif-hero-content" ref="contentRef">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

/**
 * SectionHero Component
 *
 * A hero section component with animated entrance effects.
 * Features section labels, animated title, subtitle with accent support,
 * and optional decorative rule.
 *
 * @example
 * ```vue
 * <SectionHero
 *   label="ABOUT"
 *   title="关于我们"
 *   subtitle="<accent>AnaNoSleep</accent> — 专为守望先锋玩家打造的综合性攻略平台"
 *   :show-rule="true"
 * />
 * ```
 */

interface Props {
  /** Small label text displayed above title */
  label?: string
  /** Main heading text */
  title: string
  /** Subtitle text with optional accent markup using <accent> tags */
  subtitle?: string
  /** Show decorative rule below subtitle */
  showRule?: boolean
  /** Enable entrance animation */
  animate?: boolean
  /** Animation stagger delay in seconds */
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  subtitle: '',
  showRule: true,
  animate: true,
  animationDelay: 0,
})

// Template refs for animations
const labelRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ruleRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// Parse subtitle for accent tags
const parsedSubtitle = computed(() => {
  if (!props.subtitle) return []

  const parts: Array<{ text: string; isAccent: boolean }> = []
  const regex = /<accent>(.*?)<\/accent>/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(props.subtitle!)) !== null) {
    // Add text before accent tag
    if (match.index > lastIndex) {
      parts.push({
        text: props.subtitle!.slice(lastIndex, match.index),
        isAccent: false,
      })
    }
    // Add accent text
    parts.push({
      text: match[1],
      isAccent: true,
    })
    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < props.subtitle!.length) {
    parts.push({
      text: props.subtitle!.slice(lastIndex),
      isAccent: false,
    })
  }

  return parts.length > 0 ? parts : [{ text: props.subtitle, isAccent: false }]
})

// Initialize entrance animations
const initAnimations = () => {
  if (!props.animate) return

  const elements = [
    labelRef.value,
    titleRef.value,
    subtitleRef.value,
    ruleRef.value,
    contentRef.value,
  ].filter(Boolean)

  const timeline = gsap.timeline({
    delay: props.animationDelay,
  })

  // Label animation
  if (labelRef.value) {
    timeline.from(
      labelRef.value,
      {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.out',
      },
      0
    )
  }

  // Title animation
  if (titleRef.value) {
    timeline.from(
      titleRef.value,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.3'
    )
  }

  // Subtitle animation
  if (subtitleRef.value) {
    timeline.from(
      subtitleRef.value,
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.4'
    )
  }

  // Rule animation
  if (ruleRef.value) {
    timeline.from(
      ruleRef.value,
      {
        scaleX: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )
  }

  // Content animation
  if (contentRef.value) {
    timeline.from(
      contentRef.value,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.2'
    )
  }
}

onMounted(() => {
  initAnimations()
})

// Expose methods for parent control
defineExpose({
  initAnimations,
})
</script>

<style lang="scss" scoped>
/* ============================================
   SECTION HERO COMPONENT
   ============================================ */

.s-serif-section-hero {
  padding: 5rem 0 5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Subtle noise texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.25;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  /* Animated gradient background */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(184, 134, 11, 0.15) 0%,
      transparent 50%
    );
    animation: rotateGradient 20s linear infinite;
    pointer-events: none;
    opacity: 0.5;
  }
}

@keyframes rotateGradient {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.s-serif-section-label-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.s-serif-line {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--serif-border) 50%,
    transparent 100%
  );
}

.s-serif-label-text {
  font-family: var(--serif-font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--serif-accent);
  text-shadow: 0 0 20px rgba(184, 134, 11, 0.15);
}

.s-serif-hero-title {
  font-family: var(--serif-font-display);
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--serif-foreground);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.s-serif-hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--serif-muted-foreground);
  max-width: 640px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 2;
}

.s-serif-accent-text {
  color: var(--serif-accent);
  font-style: italic;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--serif-accent) 0%,
      transparent 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
}

.s-serif-hero-rule {
  width: 80px;
  height: 3px;
  background: var(--serif-accent);
  margin: 2rem auto 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 15px rgba(184, 134, 11, 0.15);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 4px;
    height: 4px;
    background: var(--serif-accent);
    border-radius: 50%;
    transform: translateY(-50%);
    animation: pulseDot 2s ease-in-out infinite;
  }

  &::before {
    left: -8px;
    animation-delay: 0s;
  }

  &::after {
    right: -8px;
    animation-delay: 1s;
  }
}

@keyframes pulseDot {
  0%, 100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-50%) scale(1.2);
  }
}

.s-serif-hero-content {
  margin-top: 3rem;
  position: relative;
  z-index: 2;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
  .serif-section-hero {
    padding: 4rem 0 4rem 0;
  }

  .serif-section-label-hero {
    margin-bottom: 2rem;
    gap: 1rem;

    .serif-line {
      max-width: 60px;
    }
  }

  .serif-hero-title {
    font-size: 2.5rem;
  }

  .serif-hero-subtitle {
    font-size: 1rem;
  }

  .serif-hero-rule {
    width: 60px;
  }

  .serif-hero-content {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .serif-hero-title {
    font-size: 2rem;
  }

  .serif-hero-subtitle {
    font-size: 0.95rem;
  }
}

/* ============================================
   ACCESSIBILITY
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  .serif-section-hero::after,
  .serif-hero-rule::before,
  .serif-hero-rule::after {
    animation: none !important;
  }
}
</style>
