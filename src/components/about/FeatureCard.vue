<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    class="serif-feature-card"
    :class="{ 'serif-feature-card--interactive': isInteractive }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="serif-feature-card__icon-wrapper">
      <div class="serif-feature-card__icon">
        <div class="serif-feature-card__icon-bg"></div>
        <div v-html="icon" class="serif-feature-card__icon-svg"></div>
      </div>
    </div>

    <div class="serif-feature-card__content">
      <h3 class="serif-feature-card__title">{{ title }}</h3>
      <p class="serif-feature-card__description">{{ description }}</p>
    </div>

    <div v-if="showArrow" class="serif-feature-card__arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </div>

    <div class="serif-feature-card__shine"></div>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '../../stores/theme'

/**
 * FeatureCard Component
 *
 * A reusable feature card component with hover animations and dark mode support.
 * Can be used as a link (router-link or anchor) or a standalone card.
 *
 * @example
 * ```vue
 * <FeatureCard
 *   title="攻略教程"
 *   description="详细的英雄技能解析、对位技巧和实战策略"
 *   :icon="bookIcon"
 *   link="/tutorials"
 * />
 * ```
 */

interface Props {
  /** Card title */
  title: string
  /** Card description text */
  description: string
  /** Icon SVG string */
  icon: string
  /** Router link path (uses router-link) */
  to?: string
  /** External link URL (uses anchor tag) */
  href?: string
  /** HTML tag to use when not a link (default: div) */
  tag?: string
  /** Show arrow indicator (default: true for links) */
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  showArrow: undefined,
})

const themeStore = useThemeStore()
const cardRef = ref<HTMLElement | null>(null)

// Determine if card should be interactive
const isInteractive = computed(() => !!props.to || !!props.href)

// Show arrow by default for links
const shouldShowArrow = computed(() => {
  if (props.showArrow !== undefined) return props.showArrow
  return isInteractive.value
})

// Resolve the component tag
const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return props.tag
})

// GSAP animation handlers
const handleMouseEnter = () => {
  if (!isInteractive.value || !cardRef.value) return

  // Add hover class for CSS animations
  cardRef.value.classList.add('serif-feature-card--hovered')
}

const handleMouseLeave = () => {
  if (!cardRef.value) return

  cardRef.value.classList.remove('serif-feature-card--hovered')
}

// Expose ref for parent animations
defineExpose({
  cardRef,
})
</script>

<style lang="scss" scoped>
/* ============================================
   FEATURE CARD COMPONENT
   ============================================ */

.s-serif-feature-card {
  --serif-card-padding: 2rem 2.5rem;
  --serif-card-gap: 2rem;
  --serif-icon-size: 56px;
  --serif-arrow-size: 40px;
  --serif-transition-duration: 0.4s;
  --serif-accent-glow: rgba(184, 134, 11, 0.15);
}

.s-serif-about.dark-mode {
  .s-serif-feature-card {
    --serif-accent-glow: rgba(184, 134, 11, 0.25);
  }
}

.s-serif-feature-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--serif-card-gap);
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  padding: var(--serif-card-padding);
  background: var(--serif-card);
  border: 1px solid var(--serif-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all var(--serif-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  /* Enhanced shadow */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08),
              0 1px 3px rgba(0, 0, 0, 0.1);

  /* Glow effect in dark mode */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      135deg,
      var(--serif-accent) 0%,
      transparent 50%,
      transparent 100%
    );
    border-radius: 12px;
    opacity: 0;
    transition: opacity var(--serif-transition-duration) ease;
    z-index: -1;
  }

  &--interactive {
    cursor: pointer;
  }

  &:hover,
  &--hovered {
    transform: translateX(8px);
    border-color: var(--serif-accent);
    box-shadow: 0 8px 30px var(--serif-accent-glow),
                0 4px 12px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 0.1;
    }

    .serif-feature-card__icon {
      transform: scale(1.05);
      background: var(--serif-accent);
      color: var(--serif-accent-foreground);
      box-shadow: 0 4px 15px var(--serif-accent-glow);
    }

    .serif-feature-card__icon-bg {
      opacity: 1;
      transform: scale(1);
    }

    .serif-feature-card__title {
      color: var(--serif-accent);
    }

    .serif-feature-card__arrow {
      transform: translateX(6px);
      color: var(--serif-accent);
    }

    .serif-feature-card__shine {
      transform: translateX(200%);
    }
  }

  &:active {
    transform: translateX(4px) scale(0.98);
    box-shadow: 0 4px 15px var(--serif-accent-glow);
  }

  &:focus-visible {
    outline: 2px solid var(--serif-accent);
    outline-offset: 2px;
  }
}

.s-serif-feature-card__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.s-serif-feature-card__icon {
  width: var(--serif-icon-size);
  height: var(--serif-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--serif-muted);
  border-radius: 12px;
  color: var(--serif-accent);
  transition: all var(--serif-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    width: 28px;
    height: 28px;
    position: relative;
    z-index: 2;
  }
}

.s-serif-feature-card__icon-bg {
  position: absolute;
  inset: 0;
  background: var(--serif-accent);
  opacity: 0;
  transform: scale(0);
  transition: all var(--serif-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.s-serif-feature-card__content {
  flex: 1;
}

.s-serif-feature-card__title {
  font-family: var(--serif-font-display);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--serif-foreground);
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.s-serif-feature-card__description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--serif-muted-foreground);
  margin: 0;
}

.s-serif-feature-card__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--serif-arrow-size);
  height: var(--serif-arrow-size);
  color: var(--serif-muted-foreground);
  transition: all var(--serif-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
}

.s-serif-feature-card__shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: skewX(-25deg);
  transition: transform 0.6s ease;
  pointer-events: none;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 1024px) {
  .s-serif-feature-card {
    --serif-card-padding: 1.5rem 2rem;
    --serif-card-gap: 1.5rem;
    --serif-arrow-size: 36px;
  }

  .serif-feature-card__arrow svg {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 768px) {
  .s-serif-feature-card {
    --serif-card-padding: 1.5rem;
    --serif-card-gap: 1rem;
    grid-template-columns: 1fr;
    text-align: center;

    &:hover,
    &--hovered {
      transform: translateY(-4px);
    }

    &:active {
      transform: translateY(-2px) scale(0.98);
    }
  }

  .serif-feature-card__icon-wrapper {
    justify-content: center;
  }

  .serif-feature-card__arrow {
    display: none;
  }

  .serif-feature-card__icon {
    --serif-icon-size: 48px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .serif-feature-card__title {
    font-size: 1.25rem;
  }

  .serif-feature-card__description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .serif-feature-card__title {
    font-size: 1.125rem;
  }

  .serif-feature-card__description {
    font-size: 0.9rem;
  }
}

/* ============================================
   ACCESSIBILITY
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  .serif-feature-card,
  .serif-feature-card *,
  .serif-feature-card *::before,
  .serif-feature-card *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .serif-feature-card {
    border-width: 2px;
  }
}
</style>
