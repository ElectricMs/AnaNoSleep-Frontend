<template>
    <footer class="footer" :class="{ 'dark-mode': themeStore.isDarkMode }">
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
                    <span class="contact">📧 ananosleep_ow@163.com</span>
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
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

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
    background: #333E48;
    color: #e0e0e0;
    transition: all 0.3s ease;
    padding: 2rem 0; // 减少上下内边距

    &.dark-mode {
        background: #1a1a1a;
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
        font-size: 1.5rem;
        font-weight: 700;
        color: #ED6516;
        margin-bottom: 0.5rem;
    }

    .tagline {
        font-size: 0.9rem;
        color: #aaa;
        margin: 0;
    }
}

.links-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    a {
        color: #e0e0e0;
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.3s ease;
        font-weight: 500;

        &:hover {
            color: #ED6516;
        }
    }

    .divider {
        color: #555;
        font-size: 0.8rem;
    }
}

.info-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.85rem;
    color: #999;

    a {
        color: #999;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #ccc;
        }
    }

    .divider {
        color: #555;
        font-size: 0.8rem;
    }
}

// 响应式设计
@media (max-width: 768px) {
    .footer {
        padding: 1.5rem 0;
    }

    .footer-simple-content {
        gap: 1.2rem;
    }

    .links-section {
        gap: 0.6rem;
    }

    .info-section {
        flex-direction: column;
        gap: 0.5rem;

        .divider {
            display: none; // 移动端隐藏分割线，改为垂直堆叠
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

.footer.dark-mode .modal-content {
    background: #2a2a2a;
    color: #e0e0e0;
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

.footer.dark-mode .modal-header {
    background: #333;
    border-bottom-color: #555;

    h3 {
        color: #e0e0e0;
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

.footer.dark-mode .modal-close {
    color: #ccc;

    &:hover {
        background: #444;
        color: #e0e0e0;
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

.footer.dark-mode .modal-body p {
    color: #ccc;
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
