# About Page Components

Reusable Vue 3 components for the About page with TypeScript support, dark mode, and GSAP animations.

## Components

### FeatureCard

A feature card component with hover animations and dark mode support. Can be used as a router-link, anchor, or standalone div.

**Props:**
- `title` (string, required): Card title
- `description` (string, required): Card description text
- `icon` (string, required): Icon SVG string
- `to` (string, optional): Router link path
- `href` (string, optional): External link URL
- `tag` (string, optional): HTML tag when not a link (default: 'div')
- `showArrow` (boolean, optional): Show arrow indicator

**Usage:**
```vue
<FeatureCard
  title="攻略教程"
  description="详细的英雄技能解析、对位技巧和实战策略"
  :icon="bookIcon"
  link="/tutorials"
/>
```

### SectionHero

A hero section component with animated entrance effects and support for accent text.

**Props:**
- `label` (string, optional): Small label text displayed above title
- `title` (string, required): Main heading text
- `subtitle` (string, optional): Subtitle text with `<accent>` tags
- `showRule` (boolean, optional): Show decorative rule (default: true)
- `animate` (boolean, optional): Enable entrance animation (default: true)
- `animationDelay` (number, optional): Animation delay in seconds (default: 0)

**Usage:**
```vue
<SectionHero
  label="ABOUT"
  title="关于我们"
  subtitle="<accent>AnaNoSleep</accent> — 专为守望先锋玩家打造的综合性攻略平台"
/>
```

### QuoteBlock

A decorative quote component with icon, animated text, and optional author/source information.

**Props:**
- `text` (string, required): Quote text with `<accent>` tags for highlights
- `author` (string, optional): Author name
- `source` (string, optional): Source/title
- `variant` ('opening' | 'mission' | 'default', optional): Visual variant
- `showIcon` (boolean, optional): Show quote icon (default: true)
- `animate` (boolean, optional): Enable scroll animation (default: true)
- `animationStart` (string, optional): Scroll trigger position (default: 'top 80%')

**Usage:**
```vue
<QuoteBlock
  variant="opening"
  text="欢迎来到 <accent>AnaNoSleep</accent>！这里是专为守望先锋玩家打造的综合性攻略平台。"
/>

<QuoteBlock
  variant="mission"
  text="通过专业的攻略内容，帮助玩家从新手成长为高手。"
  author="AnaNoSleep Team"
/>
```

### CTAButton

A call-to-action button with ripple effects, animations, and multiple variants.

**Props:**
- `text` (string, optional): Button text content
- `icon` (string, optional): Icon SVG string
- `iconPosition` ('left' | 'right', optional): Icon position (default: 'right')
- `variant` ('primary' | 'secondary' | 'outline' | 'ghost', optional): Button variant (default: 'primary')
- `size` ('sm' | 'md' | 'lg', optional): Button size (default: 'md')
- `to` (string, optional): Router link path
- `href` (string, optional): External link URL
- `tag` (string, optional): HTML tag when not a link (default: 'button')
- `disabled` (boolean, optional): Disabled state (default: false)
- `pulse` (boolean, optional): Enable pulse animation (default: false)
- `ripple` (boolean, optional): Enable ripple effect (default: true)

**Events:**
- `click`: Emitted when button is clicked

**Usage:**
```vue
<CTAButton
  text="浏览教程"
  :icon="arrowIcon"
  variant="primary"
  link="/tutorials"
/>

<CTAButton
  text="了解更多"
  variant="secondary"
  @click="handleClick"
/>
```

## Installation

1. Copy the component files to your project:
   ```
   src/components/about/
   ├── FeatureCard.vue
   ├── SectionHero.vue
   ├── QuoteBlock.vue
   ├── CTAButton.vue
   ├── index.ts
   └── README.md
   ```

2. Import and use in your Vue components:

```vue
<script setup lang="ts">
import { FeatureCard, SectionHero, QuoteBlock, CTAButton } from '@/components/about'
import { arrowIcon } from '@/components/about'

const bookIcon = `<svg>...</svg>`
</script>

<template>
  <div>
    <SectionHero title="Welcome" />
    <QuoteBlock text="Your quote here" />
    <FeatureCard title="Feature" description="Description" :icon="bookIcon" />
    <CTAButton text="Get Started" :icon="arrowIcon" />
  </div>
</template>
```

## Features

- ✅ TypeScript support with full type definitions
- ✅ Dark mode compatible
- ✅ GSAP animations with ScrollTrigger
- ✅ Responsive design
- ✅ Accessibility support (reduced motion, focus styles, high contrast)
- ✅ Customizable variants and sizes
- ✅ Slot support for additional content
- ✅ Consistent with serif design system

## Dependencies

- Vue 3
- GSAP (with ScrollTrigger plugin)
- Theme store (for dark mode)

## Browser Support

Modern browsers supporting:
- CSS Grid
- CSS Custom Properties
- ES2020+

## License

MIT
