<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    class="serif-cta-button"
    :class="variantClasses"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Icon (before) -->
    <span v-if="icon && iconPosition === 'left'" class="serif-cta-button__icon serif-cta-button__icon--left">
      <span v-html="icon" class="serif-cta-button__icon-svg"></span>
    </span>

    <!-- Button Text -->
    <span class="serif-cta-button__text">
      <slot>{{ text }}</slot>
    </span>

    <!-- Icon (after) -->
    <span v-if="icon && iconPosition === 'right'" class="serif-cta-button__icon serif-cta-button__icon--right">
      <span v-html="icon" class="serif-cta-button__icon-svg"></span>
    </span>

    <!-- Shine Effect -->
    <div class="serif-cta-button__shine"></div>

    <!-- Ripple Effect Container -->
    <div class="serif-cta-button__ripple-container">
      <div
        v-for="ripple in ripples"
        :key="ripple.id"
        class="serif-cta-button__ripple"
        :style="ripple.style"
      ></div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * CTAButton Component
 *
 * A call-to-action button component with animations,
 * ripple effects, and support for multiple variants.
 *
 * @example
 * ```vue
 * <CTAButton
 *   text="浏览教程"
 *   :icon="arrowIcon"
 *   variant="primary"
 *   link="/tutorials"
 * />
 *
 * <CTAButton
 *   text="了解更多"
 *   variant="secondary"
 *   @click="handleClick"
 * />
 * ```
 */

interface Props {
  /** Button text content */
  text?: string
  /** Icon SVG string */
  icon?: string
  /** Icon position */
  iconPosition?: 'left' | 'right'
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Router link path */
  to?: string
  /** External link URL */
  href?: string
  /** HTML tag when not a link */
  tag?: string
  /** Disabled state */
  disabled?: boolean
  /** Enable pulse animation */
  pulse?: boolean
  /** Enable ripple effect on click */
  ripple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  iconPosition: 'right',
  variant: 'primary',
  size: 'md',
  tag: 'button',
  disabled: false,
  pulse: false,
  ripple: true,
})

const emit = defineEmits<{
  click: [event: Event]
}>()

// Variant classes
const variantClasses = computed(() => ({
  'serif-cta-button--primary': props.variant === 'primary',
  'serif-cta-button--secondary': props.variant === 'secondary',
  'serif-cta-button--outline': props.variant === 'outline',
  'serif-cta-button--ghost': props.variant === 'ghost',
  'serif-cta-button--sm': props.size === 'sm',
  'serif-cta-button--md': props.size === 'md',
  'serif-cta-button--lg': props.size === 'lg',
  'serif-cta-button--pulse': props.pulse,
  'serif-cta-button--disabled': props.disabled,
}))

// Resolve component tag
const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return props.tag
})

// Ripple effect
const ripples = ref<Array<{ id: number; style: Record<string, string> }>([])
let rippleId = 0

const createRipple = (event: MouseEvent) => {
  if (!props.ripple || props.disabled) return

  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const id = rippleId++
  ripples.value.push({
    id,
    style: {
      left: `${x}px`,
      top: `${y}px`,
    },
  })

  // Remove ripple after animation
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 600)
}

const handleClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  if (props.ripple && event instanceof MouseEvent) {
    createRipple(event)
  }

  emit('click', event)
}

const handleMouseEnter = () => {
  // Can be used for additional hover effects
}

const handleMouseLeave = () => {
  // Can be used for additional hover effects
}

// Default arrow icon for convenience
export const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`

// Export icon for consumers
defineExpose({
  arrowIcon,
})
</script>

<style lang="scss" scoped>
/* ============================================
   CTA BUTTON COMPONENT
   ============================================ */

.s-serif-cta-button {
  --serif-btn-padding-x: 2.5rem;
  --serif-btn-padding-y: 1rem;
  --serif-btn-font-size: 1rem;
  --serif-btn-min-height: 48px;
  --serif-btn-gap: 0.75rem;
  --serif-btn-radius: 8px;
  --serif-btn-transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --serif-btn-shadow: 0 4px 15px rgba(184, 134, 11, 0.15);
  --serif-btn-shadow-hover: 0 8px 25px rgba(184, 134, 11, 0.25);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--serif-btn-gap);
  padding: var(--serif-btn-padding-y) var(--serif-btn-padding-x);
  font-family: var(--serif-font-body);
  font-size: var(--serif-btn-font-size);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: var(--serif-btn-radius);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: var(--serif-btn-min-height);
  transition: all var(--serif-btn-transition);
  white-space: nowrap;

  /* Gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.15) 100%
    );
    opacity: 0;
    transition: opacity var(--serif-btn-transition);
  }

  /* Disabled state */
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* Primary Variant */
.s-serif-cta-button--primary {
  background: var(--serif-accent);
  color: var(--serif-accent-foreground);
  box-shadow: var(--serif-btn-shadow);

  &:hover:not(.serif-cta-button--disabled) {
    background: var(--serif-accent-secondary);
    box-shadow: var(--serif-btn-shadow-hover);
    transform: translateY(-3px);

    &::before {
      opacity: 1;
    }

    .serif-cta-button__icon {
      transform: translateX(4px);
    }

    .serif-cta-button__icon--left {
      transform: translateX(-4px);
    }

    .serif-cta-button__shine {
      transform: translateX(200%);
    }
  }

  &:active:not(.serif-cta-button--disabled) {
    transform: translateY(-1px);
  }
}

/* Secondary Variant */
.s-serif-cta-button--secondary {
  background: var(--serif-muted);
  color: var(--serif-foreground);
  border: 1px solid var(--serif-border);

  &:hover:not(.serif-cta-button--disabled) {
    background: var(--serif-card);
    border-color: var(--serif-accent);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

    .serif-cta-button__text {
      color: var(--serif-accent);
    }
  }
}

/* Outline Variant */
.s-serif-cta-button--outline {
  background: transparent;
  color: var(--serif-foreground);
  border: 2px solid var(--serif-border);

  &:hover:not(.serif-cta-button--disabled) {
    border-color: var(--serif-accent);
    background: transparent;

    .serif-cta-button__text {
      color: var(--serif-accent);
    }
  }
}

/* Ghost Variant */
.s-serif-cta-button--ghost {
  background: transparent;
  color: var(--serif-muted-foreground);

  &:hover:not(.serif-cta-button--disabled) {
    background: var(--serif-muted);
    color: var(--serif-foreground);
  }
}

/* Size Variants */
.s-serif-cta-button--sm {
  --serif-btn-padding-x: 1.5rem;
  --serif-btn-padding-y: 0.625rem;
  --serif-btn-font-size: 0.875rem;
  --serif-btn-min-height: 36px;
}

.s-serif-cta-button--lg {
  --serif-btn-padding-x: 3rem;
  --serif-btn-padding-y: 1.25rem;
  --serif-btn-font-size: 1.125rem;
  --serif-btn-min-height: 56px;
}

/* Pulse Animation */
.s-serif-cta-button--pulse {
  animation: pulseButton 2s ease-in-out infinite;
}

@keyframes pulseButton {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.s-serif-cta-button--pulse:hover {
  animation: none;
}

/* Button Text */
.s-serif-cta-button__text {
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

/* Button Icon */
.s-serif-cta-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--serif-btn-transition);
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
}

.s-serif-cta-button__icon-svg {
  display: block;
}

/* Shine Effect */
.s-serif-cta-button__shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transform: skewX(-25deg);
  transition: transform 0.6s ease;
  pointer-events: none;
  z-index: 1;
}

/* Ripple Effect */
.s-serif-cta-button__ripple-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--serif-btn-radius);
  pointer-events: none;
}

.s-serif-cta-button__ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%) scale(0);
  animation: rippleEffect 0.6s ease-out;
  pointer-events: none;
}

@keyframes rippleEffect {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(4);
  }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
  .serif-cta-button {
    width: 100%;
    justify-content: center;
  }
}

/* ============================================
   ACCESSIBILITY
   ============================================ */
.s-serif-cta-button:focus-visible {
  outline: 2px solid var(--serif-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .serif-cta-button,
  .serif-cta-button *,
  .serif-cta-button *::before,
  .serif-cta-button *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
