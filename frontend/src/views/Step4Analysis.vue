<template>
  <div class="step-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="nav-btn" @click="$router.push('/')">← 返回首页</button>
      <div class="step-indicator">
        <span class="step-badge">步骤 4/4</span>
        <h2>复盘与数据分析</h2>
      </div>
      <button class="nav-btn help-btn" @click="showHelp = true">❓ 帮助</button>
    </nav>

    <div class="content">
      <!-- 模块1：核心指标 -->
      <section class="module">
        <h3 class="module-title">📊 核心指标</h3>
        <div class="metric-cards">
          <div class="metric-card">
            <div class="metric-icon cpe">💰</div>
            <h4>CPE 单次互动成本</h4>
            <div class="metric-formula">
              <span class="formula">CPE = 笔记费用 ÷（点赞 + 收藏 + 评论）</span>
            </div>
            <div class="metric-standards">
              <div class="standard-row">
                <span class="category">美妆类</span>
                <span class="value good">优秀 ≤¥3</span>
                <span class="value warning">预警 &gt;¥8</span>
              </div>
              <div class="standard-row">
                <span class="category">数码类</span>
                <span class="value good">优秀 ≤¥5</span>
                <span class="value warning">预警 &gt;¥12</span>
              </div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon ctr">👁️</div>
            <h4>CTR 点击率</h4>
            <div class="metric-formula">
              <span class="formula">CTR = 点击数 ÷ 曝光数 × 100%</span>
            </div>
            <div class="metric-standards">
              <div class="standard-row">
                <span class="category">大盘平均</span>
                <span class="value">5%-8%</span>
              </div>
              <div class="standard-row">
                <span class="category">爆文潜力</span>
                <span class="value good">&gt;10%</span>
              </div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon search">🔍</div>
            <h4>回搜率</h4>
            <div class="metric-formula">
              <span class="formula">用户看完笔记后搜索品牌的比例</span>
            </div>
            <div class="metric-standards">
              <div class="standard-row">
                <span class="category">种草入心</span>
                <span class="value good">&gt;3%</span>
              </div>
              <div class="standard-row">
                <span class="category">需优化</span>
                <span class="value warning">&lt;1%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块2：投放效果看板 -->
      <section class="module">
        <h3 class="module-title">📈 投放效果看板</h3>
        <div class="dashboard-grid">
          <div class="dashboard-card chart-card">
            <div class="card-header">
              <h5>互动成本趋势</h5>
              <div class="time-switch">
                <button :class="{ active: timeRange === 'day' }" @click="timeRange = 'day'">按天</button>
                <button :class="{ active: timeRange === 'week' }" @click="timeRange = 'week'">按周</button>
              </div>
            </div>
            <div class="chart-placeholder">
              <div class="trend-line">
                <div class="trend-point" v-for="(point, index) in trendData" :key="index" :style="{ height: point + '%', left: (index * 16) + '%' }">
                  <span class="point-value">¥{{ (10 - point/10).toFixed(1) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="dashboard-card stats-card">
            <div class="stat-item">
              <span class="stat-label">总互动量</span>
              <span class="stat-value">128,456</span>
              <span class="stat-change positive">+23.5%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">平均CPE</span>
              <span class="stat-value">¥4.2</span>
              <span class="stat-change negative">+8.3%</span>
            </div>
          </div>
          <div class="dashboard-card chart-card">
            <div class="card-header">
              <h5>渠道CTR对比</h5>
            </div>
            <div class="bar-chart">
              <div class="bar-item">
                <span class="bar-label">KOC</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 75%"></div>
                </div>
                <span class="bar-value">7.5%</span>
              </div>
              <div class="bar-item">
                <span class="bar-label">KOL</span>
                <div class="bar-track">
                  <div class="bar-fill kol" style="width: 85%"></div>
                </div>
                <span class="bar-value">8.5%</span>
              </div>
              <div class="bar-item">
                <span class="bar-label">投流</span>
                <div class="bar-track">
                  <div class="bar-fill ads" style="width: 62%"></div>
                </div>
                <span class="bar-value">6.2%</span>
              </div>
            </div>
          </div>
          <div class="dashboard-card stats-card">
            <div class="stat-item">
              <span class="stat-label">爆文率</span>
              <span class="stat-value">12.8%</span>
              <span class="stat-change positive">+2.1%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">回搜率</span>
              <span class="stat-value">4.3%</span>
              <span class="stat-change positive">+0.8%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块3：赛马机制矩阵 -->
      <section class="module">
        <h3 class="module-title">🏇 赛马机制（波士顿矩阵）</h3>
        <div class="matrix-section">
          <div class="matrix-chart">
            <div class="matrix-axis-y">
              <span>高</span>
              <span class="axis-label">回搜率</span>
              <span>低</span>
            </div>
            <div class="matrix-grid">
              <div class="matrix-quadrant star">
                <span class="quadrant-icon">⭐</span>
                <span class="quadrant-name">明星达人</span>
                <span class="quadrant-count">12人</span>
              </div>
              <div class="matrix-quadrant cashcow">
                <span class="quadrant-icon">🐄</span>
                <span class="quadrant-name">现金牛</span>
                <span class="quadrant-count">28人</span>
              </div>
              <div class="matrix-quadrant question">
                <span class="quadrant-icon">❓</span>
                <span class="quadrant-name">问题达人</span>
                <span class="quadrant-count">8人</span>
              </div>
              <div class="matrix-quadrant dog">
                <span class="quadrant-icon">🐕</span>
                <span class="quadrant-name">瘦狗</span>
                <span class="quadrant-count">5人</span>
              </div>
            </div>
            <div class="matrix-axis-x">
              <span>高</span>
              <span class="axis-label">投放成本</span>
              <span>低</span>
            </div>
          </div>
          <div class="matrix-legend">
            <div class="legend-item star">
              <div class="legend-header">
                <span class="legend-icon">⭐</span>
                <h5>明星达人</h5>
              </div>
              <p>高回搜、高成本</p>
              <span class="legend-action">策略：重点维护</span>
            </div>
            <div class="legend-item cashcow">
              <div class="legend-header">
                <span class="legend-icon">🐄</span>
                <h5>现金牛</h5>
              </div>
              <p>高回搜、低成本</p>
              <span class="legend-action">策略：核心资产</span>
            </div>
            <div class="legend-item question">
              <div class="legend-header">
                <span class="legend-icon">❓</span>
                <h5>问题达人</h5>
              </div>
              <p>低回搜、高成本</p>
              <span class="legend-action">策略：优化合作</span>
            </div>
            <div class="legend-item dog">
              <div class="legend-header">
                <span class="legend-icon">🐕</span>
                <h5>瘦狗</h5>
              </div>
              <p>低回搜、低成本</p>
              <span class="legend-action">策略：逐步淘汰</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块4：优化行动计划 -->
      <section class="module">
        <h3 class="module-title">📋 优化行动计划</h3>
        <div class="action-table">
          <div class="table-header">
            <span class="col-action">行动项</span>
            <span class="col-priority">优先级</span>
            <span class="col-owner">负责人</span>
            <span class="col-deadline">截止日期</span>
          </div>
          <div class="table-body">
            <div class="table-row" v-for="(action, index) in actionPlan" :key="index">
              <span class="col-action">{{ action.action }}</span>
              <span class="col-priority">
                <span class="priority-tag" :class="action.priority">{{ action.priorityLabel }}</span>
              </span>
              <span class="col-owner">{{ action.owner }}</span>
              <span class="col-deadline">{{ action.deadline }}</span>
            </div>
          </div>
        </div>
        <button class="btn-add-action" @click="showAddAction = true">+ 添加行动项</button>
      </section>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-prev" @click="$router.push('/step3')">← 上一步：控执行</button>
      <button class="btn-complete" @click="completeWorkflow">完成投放流程 ✓</button>
    </div>

    <!-- 帮助弹窗 -->
    <div class="modal-overlay" v-if="showHelp" @click="showHelp = false">
      <div class="modal" @click.stop>
        <h3>📖 本页指引</h3>
        <ul>
          <li>1. 关注CPE、CTR、回搜率三大核心指标</li>
          <li>2. 通过看板了解整体投放效果</li>
          <li>3. 用波士顿矩阵分类管理达人</li>
          <li>4. 制定具体的优化行动计划</li>
        </ul>
        <button class="btn-close" @click="showHelp = false">我知道了</button>
      </div>
    </div>

    <!-- 流程完成弹窗 -->
    <div class="modal-overlay" v-if="showComplete" @click="showComplete = false">
      <div class="modal complete-modal" @click.stop>
        <div class="complete-icon">🎉</div>
        <h3>投放流程已完成！</h3>
        <p class="complete-msg">恭喜您完成了本次投放工作流，可导出复盘报告进行存档</p>
        <button class="btn-export" @click="exportReport">📄 导出复盘报告 (PDF)</button>
        <button class="btn-close secondary" @click="$router.push('/')">返回首页</button>
      </div>
    </div>

    <!-- 添加行动项弹窗 -->
    <div class="modal-overlay" v-if="showAddAction" @click="showAddAction = false">
      <div class="modal" @click.stop>
        <h3>添加行动项</h3>
        <div class="add-form">
          <div class="form-group">
            <label>行动项</label>
            <input v-model="newAction.action" placeholder="请输入行动项内容" />
          </div>
          <div class="form-group">
            <label>优先级</label>
            <select v-model="newAction.priority">
              <option value="high">高</option>
              <option value="mid">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div class="form-group">
            <label>负责人</label>
            <input v-model="newAction.owner" placeholder="请输入负责人" />
          </div>
          <div class="form-group">
            <label>截止日期</label>
            <input type="date" v-model="newAction.deadline" />
          </div>
        </div>
        <button class="btn-close" @click="addAction">确认添加</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step4Analysis',
  data() {
    return {
      showHelp: false,
      showComplete: false,
      showAddAction: false,
      timeRange: 'week',
      trendData: [60, 45, 55, 40, 35, 50, 30],
      actionPlan: [
        { action: '增加腰部KOL投放比例', priority: 'high', priorityLabel: '高', owner: '运营部', deadline: '2025-01-15' },
        { action: '优化封面图吸睛度', priority: 'high', priorityLabel: '高', owner: '设计部', deadline: '2025-01-10' },
        { action: '淘汰CPE>10的低效账号', priority: 'mid', priorityLabel: '中', owner: '投放部', deadline: '2025-01-20' },
        { action: '测试新场景词组合', priority: 'low', priorityLabel: '低', owner: '内容部', deadline: '2025-01-25' }
      ],
      newAction: {
        action: '',
        priority: 'mid',
        owner: '',
        deadline: ''
      }
    }
  },
  methods: {
    completeWorkflow() {
      this.showComplete = true
    },
    exportReport() {
      const content = `
投放复盘报告
============

【核心数据】
- 总互动量：128,456 (+23.5%)
- 平均CPE：¥4.2
- 爆文率：12.8%
- 回搜率：4.3%

【达人分类】
- 明星达人：12人
- 现金牛：28人
- 问题达人：8人
- 瘦狗：5人

【优化计划】
${this.actionPlan.map(a => `- [${a.priorityLabel}] ${a.action} (${a.owner}, ${a.deadline})`).join('\n')}
      `
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = '投放复盘报告.txt'
      a.click()
      URL.revokeObjectURL(url)
    },
    addAction() {
      if (!this.newAction.action) {
        alert('请输入行动项')
        return
      }
      const priorityMap = { high: '高', mid: '中', low: '低' }
      this.actionPlan.push({
        ...this.newAction,
        priorityLabel: priorityMap[this.newAction.priority]
      })
      this.newAction = { action: '', priority: 'mid', owner: '', deadline: '' }
      this.showAddAction = false
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
  background: linear-gradient(135deg, #f59e0b, #d97706);
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

.metric-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.metric-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  text-align: center;
}

.metric-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 16px;
}

.metric-icon.cpe {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.metric-icon.ctr {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.metric-icon.search {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}

.metric-card h4 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 16px;
}

.metric-formula {
  margin-bottom: 16px;
}

.formula {
  font-size: 12px;
  color: #64748b;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
}

.metric-standards {
  text-align: left;
}

.standard-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 13px;
}

.category {
  color: #64748b;
  min-width: 60px;
}

.value {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.value.good {
  background: #d1fae5;
  color: #059669;
}

.value.warning {
  background: #fef3c7;
  color: #d97706;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.dashboard-card {
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h5 {
  font-size: 14px;
  color: #64748b;
}

.time-switch {
  display: flex;
  gap: 4px;
}

.time-switch button {
  padding: 6px 12px;
  border: none;
  background: white;
  border-radius: 6px;
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s;
}

.time-switch button.active {
  background: #6366f1;
  color: white;
}

.chart-placeholder {
  height: 150px;
  position: relative;
  padding: 20px 0;
}

.trend-line {
  position: relative;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

.trend-point {
  width: 8px;
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s;
}

.trend-point:hover {
  opacity: 0.8;
}

.point-value {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #64748b;
  white-space: nowrap;
  margin-bottom: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.trend-point:hover .point-value {
  opacity: 1;
}

.stats-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #1e293b;
  display: block;
}

.stat-change {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 20px;
}

.stat-change.positive {
  background: #d1fae5;
  color: #059669;
}

.stat-change.negative {
  background: #fecaca;
  color: #dc2626;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-label {
  font-size: 13px;
  color: #64748b;
  min-width: 40px;
}

.bar-track {
  flex: 1;
  height: 24px;
  background: #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  border-radius: 12px;
  transition: width 0.5s;
}

.bar-fill.kol {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.bar-fill.ads {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.bar-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  min-width: 50px;
}

.matrix-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.matrix-chart {
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr 30px;
  gap: 10px;
}

.matrix-axis-y {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #94a3b8;
}

.axis-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 12px;
  color: #64748b;
}

.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
}

.matrix-quadrant {
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.matrix-quadrant:hover {
  transform: scale(1.02);
}

.matrix-quadrant.star {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.matrix-quadrant.cashcow {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}

.matrix-quadrant.question {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
}

.matrix-quadrant.dog {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
}

.quadrant-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}

.quadrant-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  display: block;
  margin-bottom: 4px;
}

.quadrant-count {
  font-size: 12px;
  color: #64748b;
}

.matrix-axis-x {
  grid-column: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #94a3b8;
}

.matrix-axis-x .axis-label {
  writing-mode: horizontal-tb;
  transform: none;
}

.matrix-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.legend-item {
  padding: 16px;
  border-radius: 12px;
}

.legend-item.star {
  background: #fffbeb;
  border: 1px solid #fde68a;
}

.legend-item.cashcow {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.legend-item.question {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
}

.legend-item.dog {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.legend-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.legend-icon {
  font-size: 20px;
}

.legend-header h5 {
  font-size: 14px;
  color: #1e293b;
}

.legend-item p {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.legend-action {
  font-size: 11px;
  padding: 4px 10px;
  background: white;
  border-radius: 20px;
  color: #6366f1;
}

.action-table {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 20px;
  background: #f8fafc;
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 20px;
  border-top: 1px solid #f1f5f9;
  font-size: 14px;
  color: #1e293b;
  transition: background 0.3s;
}

.table-row:hover {
  background: #f8fafc;
}

.priority-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
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

.btn-add-action {
  padding: 12px 24px;
  border: 2px dashed #cbd5e1;
  background: transparent;
  border-radius: 10px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add-action:hover {
  border-color: #6366f1;
  color: #6366f1;
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

.btn-prev, .btn-complete {
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

.btn-complete {
  border: none;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.btn-complete:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
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

.complete-modal {
  text-align: center;
}

.complete-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.modal h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 16px;
}

.complete-msg {
  color: #64748b;
  margin-bottom: 24px;
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
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-close.secondary {
  background: #f1f5f9;
  color: #64748b;
}

.btn-export {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.add-form {
  margin-bottom: 20px;
}

.add-form .form-group {
  margin-bottom: 16px;
}

.add-form label {
  display: block;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}

.add-form input,
.add-form select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .metric-cards {
    grid-template-columns: 1fr;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .matrix-section {
    grid-template-columns: 1fr;
  }
}
</style>
