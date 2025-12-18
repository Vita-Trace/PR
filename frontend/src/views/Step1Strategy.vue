<template>
  <div class="step-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="nav-btn" @click="$router.push('/')">← 返回首页</button>
      <div class="step-indicator">
        <span class="step-badge">步骤 1/4</span>
        <h2>定策略 & 划指标</h2>
      </div>
      <button class="nav-btn help-btn" @click="showHelp = true">❓ 帮助</button>
    </nav>

    <div class="content">
      <!-- 模块1：品牌阶段判断 -->
      <section class="module">
        <h3 class="module-title">🎯 品牌阶段判断</h3>
        <div class="stage-cards">
          <div 
            class="stage-card" 
            :class="{ active: selectedStage === 'seed', green: selectedStage === 'seed' }"
            @click="selectStage('seed')"
          >
            <div class="stage-icon">🌱</div>
            <h4>种草期</h4>
            <p class="stage-desc">新品牌 / 新品类</p>
            <div class="metrics">
              <span class="metric-tag">CPE 单次互动成本</span>
              <span class="metric-tag">爆文率</span>
              <span class="metric-tag">回搜率</span>
            </div>
          </div>
          <div 
            class="stage-card" 
            :class="{ active: selectedStage === 'convert', blue: selectedStage === 'convert' }"
            @click="selectStage('convert')"
          >
            <div class="stage-icon">🚀</div>
            <h4>转化期</h4>
            <p class="stage-desc">成熟品牌</p>
            <div class="metrics">
              <span class="metric-tag">ROI 投资回报率</span>
              <span class="metric-tag">进店 UV</span>
              <span class="metric-tag">GMV</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块2：AI策略生成器 -->
      <section class="module">
        <h3 class="module-title">🤖 AI 智能策略生成器</h3>
        <div class="ai-form">
          <div class="form-row">
            <div class="form-group">
              <label>品牌阶段</label>
              <select v-model="form.stage">
                <option value="">请选择</option>
                <option value="seed">种草期</option>
                <option value="convert">转化期</option>
              </select>
            </div>
            <div class="form-group">
              <label>行业品类</label>
              <select v-model="form.industry">
                <option value="">请选择</option>
                <option value="beauty">美妆护肤</option>
                <option value="food">食品饮料</option>
                <option value="fashion">服饰箱包</option>
                <option value="tech">数码3C</option>
                <option value="home">家居生活</option>
                <option value="mother">母婴用品</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>投放预算 (元)</label>
              <input type="number" v-model="form.budget" placeholder="请输入预算金额" />
            </div>
            <div class="form-group">
              <label>核心目标</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.goals" value="exposure" /> 品牌曝光
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.goals" value="seed" /> 产品种草
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.goals" value="sales" /> 销售转化
                </label>
              </div>
            </div>
          </div>
          <button class="btn-generate" @click="generateStrategy" :disabled="isGenerating">
            {{ isGenerating ? '生成中...' : '生成 AI 投放策略' }}
          </button>
        </div>
      </section>

      <!-- 模块3：预算分配模型 -->
      <section class="module">
        <h3 class="module-title">💰 预算分配模型</h3>
        <div class="budget-section">
          <div class="pie-chart">
            <div class="pie">
              <div class="pie-segment koc"></div>
              <div class="pie-segment kol"></div>
              <div class="pie-segment ads"></div>
            </div>
            <div class="pie-legend">
              <div class="legend-item">
                <span class="legend-color koc"></span>
                <span>70% KOC 铺量</span>
              </div>
              <div class="legend-item">
                <span class="legend-color kol"></span>
                <span>20% KOL 种草</span>
              </div>
              <div class="legend-item">
                <span class="legend-color ads"></span>
                <span>10% 投流放大</span>
              </div>
            </div>
          </div>
          <div class="budget-desc">
            <div class="desc-item">
              <h5>🌾 KOC 铺量 (70%)</h5>
              <p>大量素人/尾部博主内容，提升搜索覆盖，形成品牌声量基础</p>
            </div>
            <div class="desc-item">
              <h5>⭐ KOL 种草 (20%)</h5>
              <p>中腰部博主深度种草，建立品牌信任，带动用户心智</p>
            </div>
            <div class="desc-item">
              <h5>📢 投流放大 (10%)</h5>
              <p>优质内容加热，放大爆文效果，快速提升曝光</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块4：KFS关键词策略 -->
      <section class="module">
        <h3 class="module-title">🔑 KFS 关键词闭环策略</h3>
        <div class="keyword-cards">
          <div class="keyword-card">
            <div class="keyword-icon">🏷️</div>
            <h5>品牌词</h5>
            <p>品牌名称、产品线名</p>
            <div class="keyword-example">例：XX品牌、XX系列</div>
          </div>
          <div class="keyword-card">
            <div class="keyword-icon">📦</div>
            <h5>品类词</h5>
            <p>产品品类、功能词</p>
            <div class="keyword-example">例：精华液、防晒霜</div>
          </div>
          <div class="keyword-card">
            <div class="keyword-icon">🎬</div>
            <h5>场景/痛点词</h5>
            <p>使用场景、用户痛点</p>
            <div class="keyword-example">例：熬夜急救、约会妆容</div>
          </div>
        </div>
        <div class="strategy-tip">
          💡 <strong>策略提示：</strong>在标题、正文前30字、话题标签中植入 "品牌词 + 品类词 + 场景词" 组合，提升搜索可见性
        </div>
      </section>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-prev" disabled>← 上一步</button>
      <button class="btn-next" @click="$router.push('/step2')">下一步：选资源 →</button>
    </div>

    <!-- 帮助弹窗 -->
    <div class="modal-overlay" v-if="showHelp" @click="showHelp = false">
      <div class="modal" @click.stop>
        <h3>📖 本页指引</h3>
        <ul>
          <li>1. 首先选择您的品牌阶段（种草期/转化期）</li>
          <li>2. 填写AI策略生成器表单，获取个性化投放建议</li>
          <li>3. 参考预算分配比例规划投放资金</li>
          <li>4. 根据KFS策略规划关键词布局</li>
        </ul>
        <button class="btn-close" @click="showHelp = false">我知道了</button>
      </div>
    </div>

    <!-- 策略结果弹窗 -->
    <div class="modal-overlay" v-if="showStrategy" @click="showStrategy = false">
      <div class="modal strategy-modal" @click.stop>
        <h3>🎯 AI 投放策略建议</h3>
        <div class="strategy-content">
          <div class="strategy-section">
            <h4>📊 核心指标建议</h4>
            <p>基于您选择的 <strong>{{ form.stage === 'seed' ? '种草期' : '转化期' }}</strong> 阶段，建议重点关注：</p>
            <ul>
              <li v-if="form.stage === 'seed'">CPE 控制在 ¥2-5 以内</li>
              <li v-if="form.stage === 'seed'">爆文率目标 ≥ 10%</li>
              <li v-if="form.stage === 'seed'">回搜率目标 ≥ 3%</li>
              <li v-if="form.stage === 'convert'">ROI 目标 ≥ 1:3</li>
              <li v-if="form.stage === 'convert'">进店UV成本 ≤ ¥10</li>
            </ul>
          </div>
          <div class="strategy-section">
            <h4>💰 预算分配建议</h4>
            <p>总预算：<strong>¥{{ form.budget?.toLocaleString() || 0 }}</strong></p>
            <ul>
              <li>KOC铺量：¥{{ Math.round((form.budget || 0) * 0.7).toLocaleString() }}</li>
              <li>KOL种草：¥{{ Math.round((form.budget || 0) * 0.2).toLocaleString() }}</li>
              <li>投流放大：¥{{ Math.round((form.budget || 0) * 0.1).toLocaleString() }}</li>
            </ul>
          </div>
          <div class="strategy-section">
            <h4>📅 执行节奏建议</h4>
            <p>建议投放周期：<strong>4-6周</strong></p>
            <ul>
              <li>第1-2周：KOC内容铺量，建立基础声量</li>
              <li>第3-4周：KOL深度种草，建立用户信任</li>
              <li>第5-6周：优质内容投流，放大效果</li>
            </ul>
          </div>
        </div>
        <button class="btn-close" @click="showStrategy = false">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step1Strategy',
  data() {
    return {
      selectedStage: '',
      showHelp: false,
      showStrategy: false,
      isGenerating: false,
      form: {
        stage: '',
        industry: '',
        budget: null,
        goals: []
      }
    }
  },
  methods: {
    selectStage(stage) {
      this.selectedStage = stage
      this.form.stage = stage
    },
    generateStrategy() {
      if (!this.form.stage || !this.form.industry || !this.form.budget) {
        alert('请填写完整信息')
        return
      }
      this.isGenerating = true
      setTimeout(() => {
        this.isGenerating = false
        this.showStrategy = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
.step-page {
  min-height: 100vh;
  background: #f8fafc;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.step-indicator {
  text-align: center;
}

.step-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 4px;
}

.step-indicator h2 {
  font-size: 20px;
  color: #1e293b;
}

.content {
  padding: 30px 40px 100px;
  max-width: 1200px;
  margin: 0 auto;
}

.module {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.module-title {
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.stage-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.stage-card {
  padding: 30px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.stage-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.stage-card.active.green {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
}

.stage-card.active.blue {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}

.stage-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.stage-card h4 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 8px;
}

.stage-desc {
  color: #64748b;
  margin-bottom: 16px;
}

.metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.metric-tag {
  padding: 6px 12px;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 12px;
  color: #64748b;
}

.ai-form {
  max-width: 800px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.checkbox-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #1e293b;
}

.btn-generate {
  padding: 14px 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.btn-generate:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.budget-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: center;
}

.pie-chart {
  text-align: center;
}

.pie {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(
    #10b981 0deg 252deg,
    #3b82f6 252deg 324deg,
    #f59e0b 324deg 360deg
  );
  margin: 0 auto 20px;
  position: relative;
}

.pie::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  padding-left: 40px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.koc { background: #10b981; }
.legend-color.kol { background: #3b82f6; }
.legend-color.ads { background: #f59e0b; }

.budget-desc {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.desc-item {
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
}

.desc-item h5 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 8px;
}

.desc-item p {
  font-size: 14px;
  color: #64748b;
}

.keyword-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.keyword-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  text-align: center;
}

.keyword-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.keyword-card h5 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 8px;
}

.keyword-card p {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.keyword-example {
  font-size: 12px;
  color: #94a3b8;
  padding: 8px;
  background: white;
  border-radius: 6px;
}

.strategy-tip {
  padding: 16px 20px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-radius: 10px;
  font-size: 14px;
  color: #92400e;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 40px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
}

.btn-prev, .btn-next {
  padding: 12px 32px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-prev {
  border: 1px solid #e2e8f0;
  background: white;
  color: #94a3b8;
}

.btn-prev:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-next {
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.strategy-modal {
  max-width: 600px;
}

.modal h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 20px;
}

.modal ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.modal li {
  margin-bottom: 10px;
  color: #64748b;
}

.btn-close {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.strategy-content {
  margin-bottom: 20px;
}

.strategy-section {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
}

.strategy-section h4 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 12px;
}

.strategy-section p {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 10px;
}

.strategy-section ul {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .budget-section {
    grid-template-columns: 1fr;
  }
  .keyword-cards {
    grid-template-columns: 1fr;
  }
}
</style>
