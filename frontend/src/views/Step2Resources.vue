<template>
  <div class="step-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="nav-btn" @click="$router.push('/')">← 返回首页</button>
      <div class="step-indicator">
        <span class="step-badge">步骤 2/4</span>
        <h2>资源筹备与筛选</h2>
      </div>
      <button class="nav-btn help-btn" @click="showHelp = true">❓ 帮助</button>
    </nav>

    <div class="content">
      <!-- 模块1：挖掘渠道 -->
      <section class="module">
        <h3 class="module-title">🔍 挖掘渠道</h3>
        <div class="channel-cards">
          <div class="channel-card">
            <div class="channel-icon">🎯</div>
            <h4>竞品截流法</h4>
            <div class="channel-steps">
              <div class="channel-step">1. 搜索竞品品牌词</div>
              <div class="channel-step">2. 查看合作笔记博主</div>
              <div class="channel-step">3. 筛选优质账号建联</div>
            </div>
          </div>
          <div class="channel-card">
            <div class="channel-icon">💧</div>
            <h4>挖掘自来水</h4>
            <div class="channel-steps">
              <div class="channel-step">1. 搜索品牌词/品类词</div>
              <div class="channel-step">2. 筛选非商业素人内容</div>
              <div class="channel-step">3. 联系真实用户合作</div>
            </div>
          </div>
          <div class="channel-card">
            <div class="channel-icon">🔗</div>
            <h4>顺藤摸瓜法</h4>
            <div class="channel-steps">
              <div class="channel-step">1. 找到优质合作博主</div>
              <div class="channel-step">2. 查看"相似博主"推荐</div>
              <div class="channel-step">3. 批量建联同类账号</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块2：AI智能筛选工具 -->
      <section class="module">
        <h3 class="module-title">🤖 AI 智能筛选工具</h3>
        <div class="filter-form">
          <div class="form-row">
            <div class="form-group">
              <label>账号类型</label>
              <select v-model="filter.accountType">
                <option value="">全部</option>
                <option value="koc">KOC (1-5万粉)</option>
                <option value="mid">腰部KOL (5-50万粉)</option>
                <option value="top">头部KOL (50万+粉)</option>
              </select>
            </div>
            <div class="form-group">
              <label>粉丝范围</label>
              <div class="range-inputs">
                <input type="number" v-model="filter.fansMin" placeholder="最小" />
                <span>-</span>
                <input type="number" v-model="filter.fansMax" placeholder="最大" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>行业领域</label>
              <select v-model="filter.industry">
                <option value="">全部行业</option>
                <option value="beauty">美妆护肤</option>
                <option value="fashion">穿搭时尚</option>
                <option value="food">美食探店</option>
                <option value="life">生活家居</option>
                <option value="mother">母婴育儿</option>
                <option value="tech">数码科技</option>
              </select>
            </div>
            <div class="form-group">
              <label>互动率要求</label>
              <select v-model="filter.engageRate">
                <option value="">不限</option>
                <option value="high">高互动 (&gt;5%)</option>
                <option value="mid">中等 (2-5%)</option>
                <option value="low">较低 (&lt;2%)</option>
              </select>
            </div>
          </div>
          <button class="btn-filter" @click="filterBloggers" :disabled="isFiltering">
            {{ isFiltering ? 'AI筛选中...' : 'AI 筛选博主资源' }}
          </button>
        </div>
      </section>

      <!-- 模块3：五维鉴别模型 -->
      <section class="module">
        <h3 class="module-title">📊 五维鉴别模型</h3>
        <div class="five-model">
          <div class="model-item" @mouseenter="activeModel = 0" @mouseleave="activeModel = null">
            <div class="model-header">
              <span class="model-icon">👍</span>
              <h5>赞粉比</h5>
            </div>
            <div class="model-content">
              <div class="model-standard">
                <span class="label">标准值：</span>
                <span class="value good">2.0 - 5.0</span>
              </div>
              <div class="model-risk">
                <span class="label">风险提示：</span>
                <span class="value warning">&lt;1.0 疑似买粉</span>
              </div>
            </div>
            <div class="model-tooltip" v-if="activeModel === 0">
              例：某账号粉丝10w，总赞只有8k，赞粉比0.08，疑似买粉账号
            </div>
          </div>

          <div class="model-item" @mouseenter="activeModel = 1" @mouseleave="activeModel = null">
            <div class="model-header">
              <span class="model-icon">🔥</span>
              <h5>爆文率 & 中位数</h5>
            </div>
            <div class="model-content">
              <div class="model-standard">
                <span class="label">标准值：</span>
                <span class="value good">爆文率 ≥10%</span>
              </div>
              <div class="model-risk">
                <span class="label">风险提示：</span>
                <span class="value warning">看中位数而非均值</span>
              </div>
            </div>
            <div class="model-tooltip" v-if="activeModel === 1">
              看近10篇笔记中位数，避免被单篇爆款拉高均值
            </div>
          </div>

          <div class="model-item" @mouseenter="activeModel = 2" @mouseleave="activeModel = null">
            <div class="model-header">
              <span class="model-icon">💰</span>
              <h5>恰饭频率</h5>
            </div>
            <div class="model-content">
              <div class="model-standard">
                <span class="label">标准值：</span>
                <span class="value good">广告占比 &lt;30%</span>
              </div>
              <div class="model-risk">
                <span class="label">风险提示：</span>
                <span class="value warning">&gt;50% 粉丝疲劳</span>
              </div>
            </div>
            <div class="model-tooltip" v-if="activeModel === 2">
              广告笔记占比过高会导致粉丝疲劳，互动下滑
            </div>
          </div>

          <div class="model-item" @mouseenter="activeModel = 3" @mouseleave="activeModel = null">
            <div class="model-header">
              <span class="model-icon">💬</span>
              <h5>评论区健康度</h5>
            </div>
            <div class="model-content">
              <div class="model-standard">
                <span class="label">有效评论：</span>
                <span class="value good">问链接/功效</span>
              </div>
              <div class="model-risk">
                <span class="label">无效评论：</span>
                <span class="value warning">泛泛夸赞/无意义</span>
              </div>
            </div>
            <div class="model-tooltip" v-if="activeModel === 3">
              区分"有效评论"（问链接/功效）和"无效评论"（泛泛夸赞）
            </div>
          </div>

          <div class="model-item" @mouseenter="activeModel = 4" @mouseleave="activeModel = null">
            <div class="model-header">
              <span class="model-icon">🔎</span>
              <h5>收录检测</h5>
            </div>
            <div class="model-content">
              <div class="model-standard">
                <span class="label">检测方式：</span>
                <span class="value good">搜索博主名</span>
              </div>
              <div class="model-risk">
                <span class="label">合格标准：</span>
                <span class="value warning">能找到最新笔记</span>
              </div>
            </div>
            <div class="model-tooltip" v-if="activeModel === 4">
              搜索博主名能找到最新笔记，才算"可投账号"
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-prev" @click="$router.push('/step1')">← 上一步：定策略</button>
      <button class="btn-next" @click="$router.push('/step3')">下一步：控执行 →</button>
    </div>

    <!-- 帮助弹窗 -->
    <div class="modal-overlay" v-if="showHelp" @click="showHelp = false">
      <div class="modal" @click.stop>
        <h3>📖 本页指引</h3>
        <ul>
          <li>1. 选择挖掘渠道方法获取优质账号</li>
          <li>2. 使用AI筛选工具快速匹配博主资源</li>
          <li>3. 用五维模型鉴别账号真实质量</li>
          <li>4. 悬停风险提示查看具体案例</li>
        </ul>
        <button class="btn-close" @click="showHelp = false">我知道了</button>
      </div>
    </div>

    <!-- 博主列表弹窗 -->
    <div class="modal-overlay" v-if="showBloggers" @click="showBloggers = false">
      <div class="modal blogger-modal" @click.stop>
        <h3>🎯 推荐博主列表</h3>
        <div class="blogger-list">
          <div class="blogger-item" v-for="(blogger, index) in bloggerList" :key="index">
            <div class="blogger-avatar">{{ blogger.name.charAt(0) }}</div>
            <div class="blogger-info">
              <h5>{{ blogger.name }}</h5>
              <p>{{ blogger.category }}</p>
            </div>
            <div class="blogger-stats">
              <div class="stat">
                <span class="stat-label">粉丝</span>
                <span class="stat-value">{{ blogger.fans }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">赞粉比</span>
                <span class="stat-value" :class="blogger.ratio >= 2 ? 'good' : 'warning'">{{ blogger.ratio }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">爆文率</span>
                <span class="stat-value">{{ blogger.hotRate }}%</span>
              </div>
            </div>
            <button class="btn-contact">建联</button>
          </div>
        </div>
        <button class="btn-close" @click="showBloggers = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step2Resources',
  data() {
    return {
      showHelp: false,
      showBloggers: false,
      isFiltering: false,
      activeModel: null,
      filter: {
        accountType: '',
        fansMin: null,
        fansMax: null,
        industry: '',
        engageRate: ''
      },
      bloggerList: [
        { name: '美妆小达人', category: '美妆护肤', fans: '8.2万', ratio: 3.5, hotRate: 15 },
        { name: '护肤研究所', category: '美妆护肤', fans: '12.6万', ratio: 2.8, hotRate: 12 },
        { name: '成分党小王', category: '美妆护肤', fans: '5.3万', ratio: 4.2, hotRate: 18 },
        { name: '素颜女神', category: '生活分享', fans: '3.8万', ratio: 3.1, hotRate: 22 },
        { name: '日常护肤记', category: '美妆护肤', fans: '6.7万', ratio: 2.5, hotRate: 10 }
      ]
    }
  },
  methods: {
    filterBloggers() {
      this.isFiltering = true
      setTimeout(() => {
        this.isFiltering = false
        this.showBloggers = true
      }, 1200)
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
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
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

.channel-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.channel-card {
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s;
}

.channel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.channel-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.channel-card h4 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 16px;
}

.channel-steps {
  text-align: left;
}

.channel-step {
  padding: 10px 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #64748b;
}

.filter-form {
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
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-inputs input {
  flex: 1;
}

.range-inputs span {
  color: #94a3b8;
}

.btn-filter {
  padding: 14px 32px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-filter:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.btn-filter:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.five-model {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.model-item {
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}

.model-item:hover {
  background: #f1f5f9;
  transform: translateY(-3px);
}

.model-header {
  text-align: center;
  margin-bottom: 16px;
}

.model-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}

.model-header h5 {
  font-size: 14px;
  color: #1e293b;
}

.model-content {
  font-size: 12px;
}

.model-standard,
.model-risk {
  margin-bottom: 8px;
}

.label {
  color: #94a3b8;
  display: block;
  margin-bottom: 4px;
}

.value {
  font-weight: 500;
}

.value.good {
  color: #10b981;
}

.value.warning {
  color: #f59e0b;
}

.model-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 12px;
  width: 200px;
  text-align: center;
  z-index: 10;
  margin-bottom: 10px;
}

.model-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1e293b;
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
  color: #64748b;
}

.btn-prev:hover {
  background: #f1f5f9;
}

.btn-next {
  border: none;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
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

.blogger-modal {
  max-width: 700px;
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
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.blogger-list {
  margin-bottom: 20px;
}

.blogger-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 12px;
}

.blogger-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.blogger-info {
  flex: 1;
}

.blogger-info h5 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 4px;
}

.blogger-info p {
  font-size: 12px;
  color: #94a3b8;
}

.blogger-stats {
  display: flex;
  gap: 20px;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.stat-value.good {
  color: #10b981;
}

.stat-value.warning {
  color: #f59e0b;
}

.btn-contact {
  padding: 8px 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-contact:hover {
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .channel-cards {
    grid-template-columns: 1fr;
  }
  .five-model {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .five-model {
    grid-template-columns: 1fr;
  }
}
</style>
