<template>
    <footer class="footer" :class="{ 'dark-mode': themeStore.isDarkMode, 'nkg-theme': isNkgPage }">
        <div class="footer-container">
            <div class="footer-simple-content">
                <div class="brand-section">
                    <h3>AnaNoSleep</h3>
                    <p class="tagline">专为守望先锋玩家打造的综合性攻略平台</p>
                </div>
                
                <div class="links-section">
                    <router-link to="/">首页</router-link>
                    <span class="divider">/</span>
                    <router-link to="/navigation">游戏导航</router-link>
                    <span class="divider">/</span>
                    <router-link to="/tutorials">攻略教程</router-link>
                    <span class="divider">/</span>
                    <router-link to="/nkg">NKG</router-link>
                    <span class="divider">/</span>
                    <router-link to="/about">关于我们</router-link>
                </div>

                <div class="info-section">
                    <span class="contact">ananosleep_ow@163.com</span>
                    <span class="divider">|</span>
                    <span class="copyright">&copy; 2025 AnaNoSleep</span>
                    <span class="divider">|</span>
                    <a href="#" @click.prevent="showPrivacyModal">隐私政策</a>
                    <span class="divider">|</span>
                    <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备2025200953号-1</a>
                </div>
            </div>
        </div>

        <!-- 隐私政策悬浮窗口 -->
        <div v-if="isPrivacyModalOpen" class="modal-overlay" @click="closePrivacyModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>隐私政策与免责声明</h3>
                    <button class="modal-close" @click="closePrivacyModal">&times;</button>
                </div>
                 <div class="modal-body">
                     <p class="indent-text">本网站为攻略向网站，仅提供信息与内容展示。本站不会收集、存储或分享任何用户的个人信息，也不会使用 Cookie 或其他方式追踪访问者行为。用户可以放心浏览。</p>
                     <p class="indent-text">本站所提供的内容仅供参考，可能存在更新不及时或不完全准确的情况。使用本站内容所产生的任何直接或间接后果，本站概不负责。用户在使用本站内容时，应自行判断与取舍。</p>
                 </div>
                <div class="modal-footer">
                    <button class="modal-btn" @click="closePrivacyModal">我知道了</button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
const route = useRoute()
const isNkgPage = computed(() => route.path === '/nkg')

// 悬浮窗口状态
const isPrivacyModalOpen = ref(false)

// 显示隐私政策窗口
const showPrivacyModal = () => {
    isPrivacyModalOpen.value = true
    // 防止背景滚动
    document.body.style.overflow = 'hidden'
}

// 关闭隐私政策窗口
const closePrivacyModal = () => {
    isPrivacyModalOpen.value = false
    // 恢复背景滚动
    document.body.style.overflow = 'auto'
}
</script>

<style lang="scss" scoped>
.footer {
    /* 使用固定的深色背景，与首页形成对比 */
    background: #1A1A1A;
    color: #FAFAF8;
    transition: all 0.3s ease;
    padding: 3rem 0 2rem 0;
    border-top: 3px solid #B8860B; /* 使用金色 accent */
    position: relative;

    /* 添加微妙的纹理 */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.03;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* 深色模式下使用稍浅的深色 */
    &.dark-mode {
        background: #0F0F0F;
        border-top-color: #D4A84B;
    }

    &.nkg-theme {
        background:
            radial-gradient(circle at 14% 22%, rgba(253, 232, 233, 0.86), transparent 26%),
            linear-gradient(180deg, #fffaf8 0%, #f7eef2 100%);
        color: #2d2630;
        border-top: 1px solid rgba(113, 26, 95, 0.12);
        padding: 2.8rem 0 2.2rem 0;

        &::before {
            opacity: 0.018;
            filter: grayscale(1);
        }
    }

    &.nkg-theme.dark-mode {
        background:
            radial-gradient(circle at 14% 22%, rgba(113, 26, 95, 0.18), transparent 26%),
            linear-gradient(180deg, #17131a 0%, #1d1820 100%);
        color: #f7eff7;
        border-top-color: rgba(227, 186, 198, 0.12);
    }
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-simple-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
}

.brand-section {
    h3 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #B8860B;
        margin-bottom: 0.5rem;
        font-family: 'Playfair Display', Georgia, serif;

        .footer.dark-mode & {
            color: #D4A84B;
        }
    }

    .tagline {
        font-size: 0.95rem;
        color: rgba(250, 250, 248, 0.7);
        margin: 0;
        font-family: 'Source Sans 3', system-ui, sans-serif;
    }
}

.footer.nkg-theme .brand-section {
    h3 {
        color: #711A5F;
        font-family: 'BigNoodleTitling', 'Arial Black', sans-serif;
        letter-spacing: 0.04em;
        font-size: 2rem;
    }

    .tagline {
        color: rgba(45, 38, 48, 0.72);
    }
}

.footer.nkg-theme.dark-mode .brand-section {
    h3 {
        color: #E3BAC6;
    }

    .tagline {
        color: rgba(247, 239, 247, 0.72);
    }
}

.links-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    a {
        color: #FAFAF8;
        text-decoration: none;
        font-size: 0.95rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        position: relative;

        &:hover {
            color: #B8860B;

            .footer.dark-mode & {
                color: #D4A84B;
            }
        }
    }

    .divider {
        color: rgba(250, 250, 248, 0.3);
        font-size: 0.8rem;
    }
}

.footer.nkg-theme .links-section {
    gap: 0.9rem;

    a {
        color: rgba(45, 38, 48, 0.82);

        &:hover {
            color: #711A5F;
        }
    }

    .divider {
        color: rgba(113, 26, 95, 0.24);
    }
}

.footer.nkg-theme.dark-mode .links-section {
    a {
        color: rgba(247, 239, 247, 0.82);

        &:hover {
            color: #F0A06E;
        }
    }

    .divider {
        color: rgba(227, 186, 198, 0.2);
    }
}

.info-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.85rem;
    color: rgba(250, 250, 248, 0.6);
    font-family: 'IBM Plex Mono', monospace;

    a {
        color: rgba(250, 250, 248, 0.6);
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
            color: #FAFAF8;
        }
    }

    .divider {
        color: rgba(250, 250, 248, 0.3);
        font-size: 0.8rem;
    }
}

.footer.nkg-theme .info-section {
    color: rgba(45, 38, 48, 0.62);
    font-family: 'Source Sans 3', system-ui, sans-serif;
    font-size: 0.9rem;

    a {
        color: rgba(45, 38, 48, 0.62);

        &:hover {
            color: #711A5F;
        }
    }

    .divider {
        color: rgba(113, 26, 95, 0.2);
    }
}

.footer.nkg-theme.dark-mode .info-section {
    color: rgba(247, 239, 247, 0.66);

    a {
        color: rgba(247, 239, 247, 0.66);

        &:hover {
            color: #F0A06E;
        }
    }

    .divider {
        color: rgba(227, 186, 198, 0.2);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .footer {
        padding: 2rem 0 1.5rem 0;
    }

    .footer-simple-content {
        gap: 1.5rem;
    }

    .brand-section h3 {
        font-size: 1.5rem;
    }

    .links-section {
        gap: 0.6rem;
        flex-direction: column;

        .divider {
            display: none; /* 移动端隐藏分割线 */
        }

        a {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.3s ease;

            &:hover {
                background: rgba(250, 250, 248, 0.1);
            }
        }
    }

    .info-section {
        flex-direction: column;
        gap: 0.75rem;
        font-size: 0.8rem;

        .divider {
            display: none; /* 移动端隐藏分割线 */
        }
    }
}

// 悬浮窗口样式
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease-out;
}

.modal-content {
    background: #fff;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
}

.footer.nkg-theme .modal-content {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(253, 232, 233, 0.9) 100%);
    border: 1px solid rgba(113, 26, 95, 0.12);
    box-shadow: 0 18px 42px rgba(113, 26, 95, 0.16);
}

.footer.dark-mode .modal-content {
    background: #2a2a2a;
    color: #e0e0e0;
}

.footer.nkg-theme.dark-mode .modal-content {
    background: linear-gradient(180deg, rgba(31, 25, 33, 0.98) 0%, rgba(39, 31, 41, 0.94) 100%);
    color: #f7eff7;
    border-color: rgba(227, 186, 198, 0.12);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #eee;
    background: #f8f9fa;

    h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #333;
        margin: 0;
    }
}

.footer.nkg-theme .modal-header {
    background: rgba(255, 255, 255, 0.36);
    border-bottom-color: rgba(113, 26, 95, 0.12);

    h3 {
        color: #711A5F;
    }
}

.footer.dark-mode .modal-header {
    background: #333;
    border-bottom-color: #555;

    h3 {
        color: #e0e0e0;
    }
}

.footer.nkg-theme.dark-mode .modal-header {
    background: rgba(113, 26, 95, 0.16);
    border-bottom-color: rgba(227, 186, 198, 0.12);

    h3 {
        color: #f7eff7;
    }
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #999;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
        background: #f0f0f0;
        color: #333;
    }
}

.footer.nkg-theme .modal-close {
    color: rgba(113, 26, 95, 0.54);

    &:hover {
        background: rgba(113, 26, 95, 0.08);
        color: #711A5F;
    }
}

.footer.dark-mode .modal-close {
    color: #ccc;

    &:hover {
        background: #444;
        color: #e0e0e0;
    }
}

.footer.nkg-theme.dark-mode .modal-close {
    color: rgba(227, 186, 198, 0.68);

    &:hover {
        background: rgba(227, 186, 198, 0.08);
        color: #f7eff7;
    }
}

 .modal-body {
     padding: 2rem;

     p {
         font-size: 1rem;
         line-height: 1.6;
         color: #666;
         margin: 0;
     }

     .indent-text {
         text-indent: 2em;
         margin-bottom: 1rem;
     }
 }

.footer.nkg-theme .modal-body p {
    color: rgba(45, 38, 48, 0.8);
}

.footer.dark-mode .modal-body p {
    color: #ccc;
}

.footer.nkg-theme.dark-mode .modal-body p {
    color: rgba(247, 239, 247, 0.78);
}

.modal-footer {
    padding: 1rem 2rem 2rem;
    text-align: center;
}

.modal-btn {
     background: #ED6516;
    color: #fff;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
         background: #ED6516;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
    }
}

.footer.nkg-theme .modal-btn {
    background: #711A5F;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(113, 26, 95, 0.16);

    &:hover {
        background: #621651;
        box-shadow: 0 12px 24px rgba(113, 26, 95, 0.2);
    }
}

.footer.nkg-theme.dark-mode .modal-btn {
    background: #DD6E32;

    &:hover {
        background: #cb5e23;
        box-shadow: 0 12px 24px rgba(221, 110, 50, 0.2);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

// 响应式设计
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }

    .modal-header {
        padding: 1rem 1.5rem;

        h3 {
            font-size: 1.2rem;
        }
    }

    .modal-body {
        padding: 1.5rem;
    }

    .modal-footer {
        padding: 1rem 1.5rem 1.5rem;
    }
}
</style>
