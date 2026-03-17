<template>
  <div class="serif-quote-block" :class="variantClasses">
    <!-- Quote Icon -->
    <svg
      v-if="showIcon"
      class="serif-quote-block__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
    </svg>

    <!-- Quote Content -->
    <div class="serif-quote-block__content">
      <p class="serif-quote-block__text" ref="textRef">
        <template v-for="(part, index) in parsedText" :key="index">
          <component
            :is="part.isAccent ? 'span' : 'span'"
            :class="part.isAccent ? 'serif-accent-text' : ''"
          >
            {{ part.text }}
          </component>
        </template>
      </p>

      <!-- Optional Author/Citation -->
      <footer v-if="author" class="serif-quote-block__footer">
        <span class="serif-quote-block__author">{{ author }}</span>
        <span v-if="source" class="serif-quote-block__source">{{ source }}</span>
      </footer>
    </div>

    <!-- Slot for additional content -->
    <div v-if="$slots.default" class="serif-quote-block__extra">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * QuoteBlock Component
 *
 * A decorative quote component with icon, animated text,
 * and optional author/source information.
 *
 * @example
 * ```vue
 * <QuoteBlock
 *   text="欢迎来到 <accent>AnaNoSleep</accent>！这里是专为守望先锋玩家打造的综合性攻略平台。"
 *   :show-icon="true"
 *   variant="opening"
 * />
 *
 * <QuoteBlock
 *   text="通过专业的攻略内容，帮助玩家从新手成长为高手。"
 *   author="AnaNoSleep Team"
 *   variant="mission"
 * />
 * ```
 */

interface Props {
  /** Quote text content with optional <accent> tags for highlighted text */
  text: string
  /** Optional author name */
  author?: string
  /** Optional source/title */
  source?: string
  /** Visual variant: 'opening' (with icon) | 'mission' (centered) | 'default' */
  variant?: 'opening' | 'mission' | 'default'
  /** Show quote icon */
  showIcon?: boolean
  /** Enable scroll-triggered animation */
  animate?: boolean
  /** Scroll trigger position (percentage of viewport) */
  animationStart?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showIcon: true,
  animate: true,
  animationStart: 'top 80%',
})

// Template refs
const textRef = ref<HTMLElement | null>(null)

// Parse text for accent tags
const parsedText = computed(() => {
  const regex = /<accent>(.*?)<\/accent>/g
  const parts: Array<{ text: string; isAccent: boolean }> = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(props.text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: props.text.slice(lastIndex, match.index),
        isAccent: false,
      })
    }
    parts.push({
      text: match[1],
      isAccent: true,
    })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < props.text.length) {
    parts.push({
      text: props.text.slice(lastIndex),
      isAccent: false,
    })
  }

  return parts.length > 0 ? parts : [{ text: props.text, isAccent: false }]
})

// Variant classes
const variantClasses = computed(() => ({
  'serif-quote-block--opening': props.variant === 'opening',
  'serif-quote-block--mission': props.variant === 'mission',
  'serif-quote-block--default': props.variant === 'default',
}))

// Initialize animations
const initAnimations = () => {
  if (!props.animate || !textRef.value) return

  gsap.from(textRef.value.closest('.serif-quote-block'), {
    scrollTrigger: {
      trigger: textRef.value.closest('.serif-quote-block'),
      start: props.animationStart,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: props.variant === 'mission' ? 60 : 40,
    duration: 0.8,
    ease: 'power2.out',
  })
}

onMounted(() => {
  initAnimations()
})

// Expose methods
defineExpose({
  initAnimations,
})
</script>

<style lang="scss" scoped>
/* ============================================
   QUOTE BLOCK COMPONENT
   ============================================ */

.s-serif-quote-block {
  position: relative;
  padding: 3rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Opening Variant - Icon positioned absolutely */
.s-serif-quote-block--opening {
  padding: 3rem 0 3rem 4rem;
  margin-bottom: 4rem;
}

.s-serif-quote-block__icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  color: var(--serif-accent);
  opacity: 0.25;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.s-serif-quote-block--opening:hover .serif-quote-block__icon {
  opacity: 0.35;
  transform: scale(1.1);
}

/* Mission Variant - Centered */
.s-serif-quote-block--mission {
  padding: 3rem 2rem;
  text-align: center;
}

.s-serif-quote-block__content {
  position: relative;
}

.s-serif-quote-block__text {
  font-family: var(--serif-font-display);
  font-size: 1.75rem;
  line-height: 1.8;
  color: var(--serif-foreground);
  margin: 0;
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

.s-serif-quote-block__footer {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.s-serif-quote-block--mission .serif-quote-block__footer {
  align-items: center;
}

.s-serif-quote-block__author {
  font-family: var(--serif-font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--serif-foreground);
}

.s-serif-quote-block__source {
  font-size: 0.875rem;
  color: var(--serif-muted-foreground);
  font-style: italic;
}

.s-serif-quote-block__extra {
  margin-top: 2rem;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
  .serif-quote-block--opening {
    padding: 3rem 0;
  }

  .serif-quote-block__icon {
    position: relative;
    margin-bottom: 1rem;
    width: 40px;
    height: 40px;
  }

  .serif-quote-block__text {
    font-size: 1.35rem;
  }

  .serif-quote-block--mission {
    padding: 2rem 1rem;
  }

  .serif-quote-block__author {
    font-size: 0.95rem;
  }

  .serif-quote-block__source {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .serif-quote-block__text {
    font-size: 1.15rem;
  }
}

/* ============================================
   ACCESSIBILITY
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  .serif-quote-block,
  .serif-quote-block *,
  .serif-quote-block *::before,
  .serif-quote-block *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
