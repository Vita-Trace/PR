<template>
  <div class="tool-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="nav-btn" @click="$router.push('/')">← 返回工作流</button>
      <div class="page-title">
        <span class="tool-badge">辅助工具</span>
        <h2>竞品投放分析</h2>
      </div>
      <div></div>
    </nav>

    <div class="content">
      <!-- 模块1：AI竞品数据抓取 -->
      <section class="module">
        <h3 class="module-title">🤖 AI 竞品数据抓取</h3>
        <div class="analyze-form">
          <div class="form-row">
            <div class="form-group">
              <label>竞品品牌</label>
              <input v-model="form.brand" placeholder="请输入竞品品牌名称" />
            </div>
            <div class="form-group">
              <label>投放平台</label>
              <select v-model="form.platform">
                <option value="xiaohongshu">小红书</option>
                <option value="douyin">抖音</option>
                <option value="weibo">微博</option>
                <option value="bilibili">B站</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>分析周期</label>
              <select v-model="form.period">
                <option value="7">近7天</option>
                <option value="30">近30天</option>
                <option value="90">近90天</option>
              </select>
            </div>
            <div class="form-group">
              <label>分析维度</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.dimensions" value="volume" /> 投放量
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.dimensions" value="talent" /> 达人矩阵
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.dimensions" value="keyword" /> 关键词
                </label>
              </div>
            </div>
          </div>
          <button class="btn-analyze" @click="startAnalysis" :disabled="isAnalyzing">
            {{ isAnalyzing ? 'AI 分析中...' : '开始竞品分析' }}
          </button>
        </div>
      </section>

      <!-- 模块2：竞品分析结果 -->
      <section class="module" v-if="showResults">
        <h3 class="module-title">📊 竞品分析结果</h3>
        
        <!-- 品牌标签切换 -->
        <div class="brand-tabs">
          <button 
            v-for="brand in analyzedBrands" 
            :key="brand.id"
            :class="{ active: activeBrand === brand.id }"
            @click="activeBrand = brand.id"
          >
            {{ brand.name }}
          </button>
        </div>

        <!-- 数据模块 -->
        <div class="data-modules">
          <!-- 投放量趋势图 -->
          <div class="data-card">
            <h4>📈 投放量趋势</h4>
            <div class="trend-chart">
              <div class="chart-bars">
                <div 
                  class="bar-column" 
                  v-for="(data, index) in trendData" 
                  :key="index"
                >
                  <div class="bar" :style="{ height: data.value + '%' }">
                    <span class="bar-value">{{ data.count }}</span>
                  </div>
                  <span class="bar-label">{{ data.week }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 达人矩阵对比 -->
          <div class="data-card">
            <h4>👥 达人矩阵对比</h4>
            <div class="talent-matrix">
              <div class="matrix-row">
                <span class="matrix-label">头部KOL (50w+)</span>
                <div class="matrix-bar-track">
                  <div class="matrix-bar brand-a" style="width: 15%"></div>
                  <div class="matrix-bar brand-b" style="width: 25%"></div>
                </div>
                <div class="matrix-values">
                  <span class="brand-a-value">8%</span>
                  <span class="brand-b-value">12%</span>
                </div>
              </div>
              <div class="matrix-row">
                <span class="matrix-label">腰部KOL (5-50w)</span>
                <div class="matrix-bar-track">
                  <div class="matrix-bar brand-a" style="width: 35%"></div>
                  <div class="matrix-bar brand-b" style="width: 45%"></div>
                </div>
                <div class="matrix-values">
                  <span class="brand-a-value">22%</span>
                  <span class="brand-b-value">28%</span>
                </div>
              </div>
              <div class="matrix-row">
                <span class="matrix-label">KOC (1-5w)</span>
                <div class="matrix-bar-track">
                  <div class="matrix-bar brand-a" style="width: 70%"></div>
                  <div class="matrix-bar brand-b" style="width: 50%"></div>
                </div>
                <div class="matrix-values">
                  <span class="brand-a-value">70%</span>
                  <span class="brand-b-value">60%</span>
                </div>
              </div>
            </div>
            <div class="matrix-legend">
              <span class="legend-a">● 竞品A</span>
              <span class="legend-b">● 竞品B</span>
            </div>
          </div>

          <!-- 内容关键词云 -->
          <div class="data-card full-width">
            <h4>🔤 内容关键词云</h4>
            <div class="keyword-cloud">
              <span 
                class="cloud-word" 
                v-for="(word, index) in keywordCloud" 
                :key="index"
                :style="{ fontSize: word.size + 'px', opacity: word.opacity }"
              >
                {{ word.text }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块3：机会点总结 -->
      <section class="module" v-if="showResults">
        <h3 class="module-title">💡 机会点总结</h3>
        <div class="opportunity-list">
          <div class="opportunity-item" v-for="(item, index) in opportunities" :key="index">
            <div class="opportunity-icon" :class="item.type">
              {{ item.icon }}
            </div>
            <div class="opportunity-content">
              <h5>{{ item.title }}</h5>
              <p>{{ item.desc }}</p>
            </div>
            <div class="opportunity-action">
              <span class="priority-tag" :class="item.priority">{{ item.priorityLabel }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-report" @click="generateReport" v-if="showResults">📄 生成竞品分析报告</button>
      <button class="btn-back" @click="$router.push('/')">返回工作流</button>
    </div>

    <!-- 报告生成成功弹窗 -->
    <div class="modal-overlay" v-if="showReportModal" @click="showReportModal = false">
      <div class="modal" @click.stop>
        <div class="success-icon">✅</div>
        <h3>报告生成成功</h3>
        <p class="success-msg">竞品分析报告已准备就绪</p>
        <button class="btn-download" @click="downloadReport">📥 下载 PDF 报告</button>
        <button class="btn-close" @click="showReportModal = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitorAnalysis',
  data() {
    return {
      isAnalyzing: false,
      showResults: false,
      showReportModal: false,
      activeBrand: 'brandA',
      form: {
        brand: '',
        platform: 'xiaohongshu',
        period: '30',
        dimensions: ['volume', 'talent', 'keyword']
      },
      analyzedBrands: [
        { id: 'brandA', name: '竞品 A' },
        { id: 'brandB', name: '竞品 B' }
      ],
      trendData: [
        { week: '第1周', value: 45, count: 23 },
        { week: '第2周', value: 60, count: 31 },
        { week: '第3周', value: 80, count: 42 },
        { week: '第4周', value: 55, count: 28 }
      ],
      keywordCloud: [
        { text: '平价替代', size: 28, opacity: 1 },
        { text: '学生党', size: 24, opacity: 0.9 },
        { text: '敏感肌', size: 26, opacity: 0.95 },
        { text: '油皮', size: 22, opacity: 0.85 },
        { text: '保湿', size: 30, opacity: 1 },
        { text: '熬夜急救', size: 20, opacity: 0.8 },
        { text: '约会妆', size: 18, opacity: 0.75 },
        { text: '素颜霜', size: 24, opacity: 0.9 },
        { text: '防晒', size: 26, opacity: 0.95 },
        { text: '提亮', size: 22, opacity: 0.85 },
        { text: '控油', size: 20, opacity: 0.8 },
        { text: '修复', size: 18, opacity: 0.75 },
        { text: '精华', size: 28, opacity: 1 },
        { text: '面膜', size: 24, opacity: 0.9 },
        { text: '护肤步骤', size: 16, opacity: 0.7 }
      ],
      opportunities: [
        {
          icon: '📊',
          type: 'volume',
          title: '增加腰部KOL投放比例',
          desc: '竞品B在腰部KOL投放占比达28%，高于我方22%，建议增加腰部博主合作',
          priority: 'high',
          priorityLabel: '高优先级'
        },
        {
          icon: '🔑',
          type: 'keyword',
          title: '布局"敏感肌"场景词',
          desc: '竞品在敏感肌相关内容布局较多，我方可加强该场景词覆盖',
          priority: 'high',
          priorityLabel: '高优先级'
        },
        {
          icon: '👥',
          type: 'talent',
          title: '挖掘竞品优质合作博主',
          desc: '发现3位与竞品合作的高互动博主，可尝试建联',
          priority: 'mid',
          priorityLabel: '中优先级'
        },
        {
          icon: '📅',
          type: 'timing',
          title: '优化投放节奏',
          desc: '竞品第3周投放量明显增加，与促销节点相关，建议同步调整节奏',
          priority: 'low',
          priorityLabel: '低优先级'
        }
      ]
    }
  },
  methods: {
    startAnalysis() {
      if (!this.form.brand) {
        alert('请输入竞品品牌名称')
        return
      }
      this.isAnalyzing = true
      setTimeout(() => {
        this.isAnalyzing = false
        this.showResults = true
        this.analyzedBrands[0].name = this.form.brand
      }, 2000)
    },
    generateReport() {
      this.showReportModal = true
    },
    downloadReport() {
      const content = `
竞品投放分析报告
================
分析品牌：${this.form.brand}
分析平台：${this.form.platform === 'xiaohongshu' ? '小红书' : this.form.platform}
分析周期：近${this.form.period}天

【投放量趋势】
${this.trendData.map(d => `${d.week}: ${d.count}条`).join('\n')}

【达人矩阵】
- 头部KOL: 竞品A 8% / 竞品B 12%
- 腰部KOL: 竞品A 22% / 竞品B 28%
- KOC: 竞品A 70% / 竞品B 60%

【核心关键词】
${this.keywordCloud.slice(0, 8).map(k => k.text).join('、')}

【机会点总结】
${this.opportunities.map(o => `[${o.priorityLabel}] ${o.title}\n${o.desc}`).join('\n\n')}
      `
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = '竞品分析报告.txt'
      a.click()
      URL.revokeObjectURL(url)
      this.showReportModal = false
    }
  }
}
</script>

<style scoped>
.tool-page {
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

.page-title {
  text-align: center;
}

.tool-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 4px;
}

.page-title h2 {
  font-size: 20px;
  color: #1e293b;
}

.content {
  padding: 30px 40px 120px;
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

.analyze-form {
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.checkbox-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #1e293b;
}

.btn-analyze {
  padding: 14px 32px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-analyze:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
}

.btn-analyze:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.brand-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.brand-tabs button {
  padding: 10px 24px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
}

.brand-tabs button.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-color: transparent;
}

.data-modules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.data-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
}

.data-card.full-width {
  grid-column: 1 / -1;
}

.data-card h4 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 20px;
}

.trend-chart {
  height: 200px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 180px;
  padding-bottom: 30px;
  position: relative;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.bar {
  width: 40px;
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  border-radius: 6px 6px 0 0;
  position: relative;
  transition: height 0.5s;
  min-height: 20px;
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.bar-label {
  margin-top: 10px;
  font-size: 12px;
  color: #94a3b8;
}

.talent-matrix {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.matrix-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.matrix-label {
  font-size: 13px;
  color: #64748b;
  min-width: 120px;
}

.matrix-bar-track {
  flex: 1;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.matrix-bar {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: width 0.5s;
}

.matrix-bar.brand-a {
  background: #6366f1;
  z-index: 2;
}

.matrix-bar.brand-b {
  background: #ec4899;
  opacity: 0.6;
  z-index: 1;
}

.matrix-values {
  display: flex;
  gap: 8px;
  min-width: 80px;
}

.brand-a-value {
  font-size: 12px;
  color: #6366f1;
  font-weight: 600;
}

.brand-b-value {
  font-size: 12px;
  color: #ec4899;
  font-weight: 600;
}

.matrix-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  font-size: 13px;
}

.legend-a {
  color: #6366f1;
}

.legend-b {
  color: #ec4899;
}

.keyword-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 20px;
}

.cloud-word {
  color: #6366f1;
  cursor: default;
  transition: all 0.3s;
}

.cloud-word:hover {
  transform: scale(1.1);
  color: #8b5cf6;
}

.opportunity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.opportunity-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s;
}

.opportunity-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.opportunity-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.opportunity-icon.volume {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.opportunity-icon.keyword {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}

.opportunity-icon.talent {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
}

.opportunity-icon.timing {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.opportunity-content {
  flex: 1;
}

.opportunity-content h5 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 6px;
}

.opportunity-content p {
  font-size: 14px;
  color: #64748b;
}

.priority-tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.priority-tag.high {
  background: #fecaca;
  color: #dc2626;
}

.priority-tag.mid {
  background: #fef3c7;
  color: #d97706;
}

.priority-tag.low {
  background: #d1fae5;
  color: #059669;
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
  justify-content: center;
  gap: 16px;
}

.btn-report {
  padding: 12px 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-report:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.btn-back {
  padding: 12px 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 10px;
  font-size: 16px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-back:hover {
  background: #f1f5f9;
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
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.modal h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 12px;
}

.success-msg {
  color: #64748b;
  margin-bottom: 24px;
}

.btn-download {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 12px;
}

.btn-close {
  width: 100%;
  padding: 14px;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .data-modules {
    grid-template-columns: 1fr;
  }
}
</style>
