<template>
  <div class="home">
    <!-- 顶部区 -->
    <header class="header">
      <div class="logo-section">
        <div class="logo">
          <span class="logo-icon">📈</span>
          <span class="logo-text">Brand Growth Engine</span>
        </div>
        <p class="slogan">你的品牌增长投放 SOP</p>
      </div>
      <div class="user-actions">
        <button class="btn-login">登录</button>
        <button class="btn-register">注册</button>
      </div>
    </header>

    <!-- 核心主题区 -->
    <section class="hero">
      <h1 class="main-title">品牌 PR 投放全流程 SOP</h1>
      <p class="subtitle">全流程数据化，新手也能投出好效果</p>
      
      <!-- 三大核心优势卡片 -->
      <div class="advantage-cards">
        <div class="advantage-card pink" @mouseenter="hoverCard(0)" @mouseleave="leaveCard(0)">
          <div class="card-icon" :class="{ active: activeCard === 0 }">📊</div>
          <h3>数据驱动决策</h3>
          <p>通过五维评估模型筛选投放资源，精准定位高转化账号</p>
        </div>
        <div class="advantage-card blue" @mouseenter="hoverCard(1)" @mouseleave="leaveCard(1)">
          <div class="card-icon" :class="{ active: activeCard === 1 }">📋</div>
          <h3>标准化流程</h3>
          <p>覆盖从策略到复盘的全流程 SOP 模板，降低经验依赖</p>
        </div>
        <div class="advantage-card green" @mouseenter="hoverCard(2)" @mouseleave="leaveCard(2)">
          <div class="card-icon" :class="{ active: activeCard === 2 }">🤖</div>
          <h3>AI 辅助工具</h3>
          <p>智能生成策略、分析竞品，提升投放效率与效果可控性</p>
        </div>
      </div>
    </section>

    <!-- 流程区 -->
    <section class="workflow">
      <h2>核心投放流程</h2>
      <div class="workflow-steps">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
          <div class="step-arrow" v-if="index < steps.length - 1">→</div>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width: 0%"></div>
      </div>
      <button class="btn-start" @click="startWorkflow">立即启动工作流</button>
    </section>

    <!-- 辅助工具入口 -->
    <section class="tools-section">
      <h2>辅助工具</h2>
      <div class="tool-cards">
        <div class="tool-card" @click="$router.push('/calendar')">
          <span class="tool-icon">📅</span>
          <h4>投放日历视图</h4>
          <p>可视化管理投放排期</p>
        </div>
        <div class="tool-card" @click="$router.push('/competitor')">
          <span class="tool-icon">🔍</span>
          <h4>竞品投放分析</h4>
          <p>AI分析竞品策略</p>
        </div>
      </div>
    </section>

    <!-- 底部区 -->
    <footer class="footer">
      <p>全流程数据化，新手也能投出好效果</p>
      <p class="copyright">© 2025 Brand Growth Engine. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      activeCard: null,
      steps: [
        { title: '定策略', desc: '明确品牌阶段与核心指标' },
        { title: '选资源', desc: '精准筛选高转化账号' },
        { title: '控执行', desc: '标准化Brief与内容管控' },
        { title: '做复盘', desc: '数据分析与优化迭代' }
      ]
    }
  },
  methods: {
    hoverCard(index) {
      this.activeCard = index
    },
    leaveCard() {
      this.activeCard = null
    },
    startWorkflow() {
      this.$router.push('/step1')
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #6366f1;
}

.logo-icon {
  font-size: 32px;
}

.slogan {
  color: #64748b;
  font-size: 14px;
}

.user-actions {
  display: flex;
  gap: 12px;
}

.btn-login {
  padding: 10px 24px;
  border: 2px solid #6366f1;
  background: transparent;
  color: #6366f1;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-login:hover {
  background: #6366f1;
  color: white;
}

.btn-register {
  padding: 10px 24px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.hero {
  text-align: center;
  padding: 80px 20px;
}

.main-title {
  font-size: 48px;
  color: #1e293b;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 18px;
  color: #64748b;
  margin-bottom: 60px;
}

.advantage-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.advantage-card {
  width: 320px;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.advantage-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.advantage-card.pink {
  background: linear-gradient(135deg, #fdf2f8, #fce7f3);
  border: 1px solid #fbcfe8;
}

.advantage-card.blue {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 1px solid #bfdbfe;
}

.advantage-card.green {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border: 1px solid #a7f3d0;
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.card-icon.active {
  transform: scale(1.2) rotate(10deg);
}

.advantage-card h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 12px;
}

.advantage-card p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

.workflow {
  padding: 80px 20px;
  background: white;
  text-align: center;
}

.workflow h2 {
  font-size: 32px;
  color: #1e293b;
  margin-bottom: 50px;
}

.workflow-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto 40px;
}

.step {
  display: flex;
  align-items: center;
  gap: 15px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.step-content h4 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 4px;
}

.step-content p {
  font-size: 12px;
  color: #94a3b8;
}

.step-arrow {
  font-size: 24px;
  color: #cbd5e1;
  margin: 0 10px;
}

.progress-bar {
  width: 80%;
  max-width: 600px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  margin: 0 auto 40px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 3px;
  transition: width 0.5s;
}

.btn-start {
  padding: 16px 48px;
  font-size: 18px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-start:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.tools-section {
  padding: 60px 20px;
  text-align: center;
}

.tools-section h2 {
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 40px;
}

.tool-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.tool-card {
  width: 250px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.tool-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 16px;
}

.tool-card h4 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 8px;
}

.tool-card p {
  font-size: 14px;
  color: #64748b;
}

.footer {
  padding: 40px 20px;
  background: #1e293b;
  text-align: center;
}

.footer p {
  color: #94a3b8;
  margin-bottom: 10px;
}

.footer .copyright {
  font-size: 12px;
  color: #64748b;
}
</style>
