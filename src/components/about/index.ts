/**
 * About Page Components
 *
 * Reusable components for the About page and similar sections.
 * All components support dark mode and follow the serif design system.
 *
 * @example
 * ```vue
 * <script setup>
 * import { FeatureCard, SectionHero, QuoteBlock, CTAButton } from '@/components/about'
 * </script>
 * ```
 */

// Feature Types
export { default as FeatureCard } from './FeatureCard.vue'
export type { FeatureCardProps } from './FeatureCard.vue'

// Hero Section
export { default as SectionHero } from './SectionHero.vue'
export type { SectionHeroProps } from './SectionHero.vue'

// Quote Block
export { default as QuoteBlock } from './QuoteBlock.vue'
export type { QuoteBlockProps } from './QuoteBlock.vue'

// CTA Button
export { default as CTAButton } from './CTAButton.vue'
export type { CTAButtonProps } from './CTAButton.vue'

// Re-exports for convenience
export { arrowIcon } from './CTAButton.vue'
