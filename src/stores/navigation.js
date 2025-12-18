import { defineStore } from 'pinia'

// 导入图片资源
import patchNotesImg from '@/assets/images/patch-notes.png'
import overlabImg from '@/assets/images/overlab.png'
import overhubImg from '@/assets/images/overhub.png'
import mapleqaqImg from '@/assets/images/mapleqaq.png'
import liquipediaImg from '@/assets/images/liquipedia.png'
import owticsImg from '@/assets/images/owtics.png'
import stadiumbuildsImg from '@/assets/images/stadiumbuilds.png'
import wikiImg from '@/assets/images/wiki.png'
import owtvImg from '@/assets/images/owtv.png'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navigationData: [
      {
        title: "官方补丁说明",
        description: "查看守望先锋官方中文补丁说明，了解最新或过往版本更新内容，补丁说明更新存在延迟，可访问英文官网查看最新更新",
        image: patchNotesImg,
        link: "https://ow.blizzard.cn/news/patch-notes"
      },
      {
        title: "春语实验室",
        description: "由b站up主“守望at春语”维护的英雄数据百科网站，提供详细的英雄技能数据介绍",
        image: overlabImg,
        link: "https://overlab.cn/zh/wiki"
      },
      {
        title: "OVERHUB",
        description: "由KINDYEAR大佬维护的游戏助手网站，包含角斗领域出装搭配、地图工坊代码查询、机器人等工具",
        image: overhubImg,
        link: "https://overhub.cn/"
      },
      {
        title: "小鱿万事屋",
        description: "由b站up主“D开头的大佬”维护的工具集网站，包含队友组队匹配、游戏日历等实用工具，会根据游戏版本更新及时更新最新工具",
        image: mapleqaqImg,
        link: "https://ow.mapleqaq.top/"
      },
      {
        title: "Liquipedia",
        description: "守望先锋液体百科（英文），提供最详尽的比赛对阵和选手信息查询",
        image: liquipediaImg,
        link: "https://liquipedia.net/overwatch/Main_Page"
      },
      {
        title: "OWTICS.GG",
        description: "外服数据查询网站，提供英雄选取率胜率等信息查询，提供可视化数据展示",
        image: owticsImg,
        link: "https://owtics.gg/en/"
      },
      {
        title: "角斗领域构筑",
        description: "外服常用的角斗领域出装查询网站，预设更多更新，代码无法直接导入国服，但适合参考",
        image: stadiumbuildsImg,
        link: "https://stadiumbuilds.io/"
      },
      {
        title: "wiki",
        description: "英文守望先锋维基百科，可查看英雄、地图等信息，较中文站更详细",
        image: wikiImg,
        link: "https://overwatch.fandom.com/wiki/Overwatch_Wiki"
      },
      {
        title: "OWTV",
        description: "由CommanderX创建的英文赛事网站，包含owcs赛程、新闻和对选手的采访",
        image: owtvImg,
        link: "https://owtv.gg/"
      },

    ],

    tutorialsData: [
      {
        title: "源氏进阶技巧：龙刃团战运用",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/genji-advanced"
      },
      {
        title: "莱因哈特坦克定位与保护策略",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/reinhardt-tank"
      },
      {
        title: "安娜辅助视野控制与睡针技巧",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/ana-support"
      },
      {
        title: "猎空时空跳跃与骚扰战术",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/tracer-flanking"
      },
      {
        title: "黑百合狙击位置与预瞄技巧",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/widowmaker-sniper"
      },
      {
        title: "路霸钩子连招与团战定位",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/roadhog-combo"
      },
      {
        title: "天使复活时机与生存技巧",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/mercy-survival"
      },
      {
        title: "法老之鹰空中控制与火箭技巧",
        image: "/assets/hero-tutorial-DwFBQc9T.jpg", // 使用构建后的路径
        link: "/tutorials/pharah-aerial"
      }
    ]
  }),

  actions: {
    navigateToPage(link) {
      console.log('导航到:', link)
      
      // 创建确认对话框
      const userConfirmed = confirm(`即将跳转到: ${link}\n\n点击"确定"继续，点击"取消"返回`)
      
      if (userConfirmed) {
        // 用户确认后执行跳转逻辑
        this.performNavigation(link)
      } else {
        // 用户取消，不执行任何操作
        console.log('用户取消了导航')
      }
    },

    performNavigation(link) {
      // 根据不同的链接类型执行不同的跳转逻辑
      if (link.startsWith('/')) {
        // 内部路由跳转
        this.navigateToInternalRoute(link)
      } else if (link.startsWith('http')) {
        // 外部链接跳转
        this.navigateToExternalLink(link)
      } else {
        // 其他类型的链接
        console.log('未知链接类型:', link)
      }
    },

    navigateToInternalRoute(route) {
      // 内部路由跳转逻辑
      console.log('执行内部路由跳转:', route)
      
      // 这里可以使用 Vue Router 进行跳转
      // 由于这是在 store 中，需要通过参数传递 router 实例
      // 或者通过事件总线通知组件进行跳转
      
      // 示例：通过 window.location 进行页面跳转
      if (window.location.pathname !== route) {
        window.location.href = route
      }
    },

    navigateToExternalLink(url) {
      // 外部链接跳转逻辑
      console.log('执行外部链接跳转:', url)
      
      // 在新标签页中打开外部链接
      window.open(url, '_blank', 'noopener,noreferrer')
    },

    openTutorial(link) {
      console.log('打开教程:', link)
      // 这里可以添加实际的教程打开逻辑
      alert(`即将打开教程: ${link}`)
    }
  }
})

