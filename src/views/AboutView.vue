<template>
  <div class="about-section" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <div class="container">
      <h1 class="section-title">关于我们</h1>
      <div class="about-content">
        <div class="about-text">
          <h2>AnaNoSleep</h2>
          <p>欢迎来到AnaNoSleep！这里是专为守望先锋玩家打造的综合性攻略平台。</p>
          <p>我们致力于为玩家提供最全面、最实用的游戏攻略和教程，帮助每一位玩家提升游戏技巧，享受更好的游戏体验。</p>
          
          <h3>网站特色</h3>
          <ul>
            <li><strong>攻略教程：</strong>详细的英雄技能解析、对位技巧和实战策略</li>
            <li><strong>网页导航：</strong>守望先锋相关网站导航</li>
            <li><strong>NKG：</strong>探索南开大学守望先锋校队的故事</li>
          </ul>

          <h3>我们的使命</h3>
          <p>通过专业的攻略内容和友好的社区环境，帮助玩家从新手成长为高手，让每个人都能在守望先锋2的世界中找到属于自己的乐趣。</p>
          
          <p>无论你是刚接触游戏的新玩家，还是希望进一步提升技术的老玩家，这里都有适合你的内容。让我们一起探索守望先锋2的精彩世界！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
.about-section {
  min-height: 100vh;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &.dark-mode {
    background: #1a1a1a;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 6rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
  color: #333;
  user-select: none; // 禁止文本选择
}

.dark-mode .section-title {
  color: #e0e0e0;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-text {
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ED6516;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #666;
  }

  ul {
    margin: 1rem 0 2rem 2rem;
  }

  li {
    margin-bottom: 0.5rem;
    color: #666;
    line-height: 1.6;
  }

  strong {
    color: #ED6516;
  }
}

.about-section.dark-mode .about-text {
  h3 {
    color: #e0e0e0;
  }

  p {
    color: #ccc;
  }

  li {
    color: #ccc;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .container {
    padding: 5rem 1rem 3rem;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .about-text {
    padding: 0 1rem;

    h2 {
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    p,
    li {
      font-size: 1rem;
      line-height: 1.7;
    }
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .about-text {
    h2 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    p,
    li {
      font-size: 0.95rem;
    }
  }
}
</style>

