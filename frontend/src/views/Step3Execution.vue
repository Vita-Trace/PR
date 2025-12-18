<template>
  <div class="step-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="nav-btn" @click="$router.push('/')">← 返回首页</button>
      <div class="step-indicator">
        <span class="step-badge">步骤 3/4</span>
        <h2>落地执行与内容管控</h2>
      </div>
      <button class="nav-btn help-btn" @click="showHelp = true">❓ 帮助</button>
    </nav>

    <div class="content">
      <!-- 模块1：AI Brief生成器 -->
      <section class="module">
        <h3 class="module-title">📝 AI Brief 生成器</h3>
        <p class="module-subtitle">遵循 "1+3+1" 黄金法则</p>
        <div class="brief-form">
          <div class="brief-section">
            <div class="section-header">
              <span class="section-number">1</span>
              <h4>核心卖点</h4>
              <span class="section-tip">聚焦单痛点，避免信息分散</span>
            </div>
            <textarea v-model="brief.coreSelling" placeholder="输入1个核心卖点，例如：3秒速干，告别黏腻感"></textarea>
          </div>

          <div class="brief-section">
            <div class="section-header">
              <span class="section-number">3</span>
              <h4>SEO 埋词</h4>
              <span class="section-tip">标题/正文前30字/话题标签</span>
            </div>
            <div class="seo-inputs">
              <div class="seo-item">
                <label>标题关键词</label>
                <input v-model="brief.seoTitle" placeholder="品牌词+品类词" />
              </div>
              <div class="seo-item">
                <label>正文前30字</label>
                <input v-model="brief.seoContent" placeholder="场景词+痛点词" />
              </div>
              <div class="seo-item">
                <label>话题标签</label>
                <input v-model="brief.seoTags" placeholder="#品牌名 #品类词 #场景词" />
              </div>
            </div>
          </div>

          <div class="brief-section">
            <div class="section-header">
              <span class="section-number">1</span>
              <h4>视觉参考</h4>
              <span class="section-tip">光影、手持姿势、场景等参考图</span>
            </div>
            <div class="upload-area" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" multiple hidden />
              <div v-if="brief.images.length === 0" class="upload-placeholder">
                <span class="upload-icon">📷</span>
                <p>点击或拖拽上传参考图</p>
              </div>
              <div v-else class="upload-preview">
                <div class="preview-item" v-for="(img, index) in brief.images" :key="index">
                  <img :src="img" alt="参考图" />
                  <button class="remove-btn" @click.stop="removeImage(index)">×</button>
                </div>
                <div class="add-more" @click.stop="triggerUpload">+</div>
              </div>
            </div>
          </div>

          <button class="btn-generate" @click="generateBrief" :disabled="isGenerating">
            {{ isGenerating ? '生成中...' : '生成标准化 Brief' }}
          </button>
        </div>
      </section>

      <!-- 模块2：审稿三道防线 -->
      <section class="module">
        <h3 class="module-title">🛡️ 审稿三道防线</h3>
        <div class="defense-cards">
          <div class="defense-card">
            <div class="defense-header ctr">
              <span class="defense-icon">👁️</span>
              <h4>吸睛度 (CTR检查)</h4>
            </div>
            <div class="defense-content">
              <div class="check-points">
                <h5>检查要点</h5>
                <ul>
                  <li>标题是否使用"痛点+情绪/数字+解决方案"公式</li>
                  <li>封面是否有视觉冲击力</li>
                  <li>前3秒是否有吸引力</li>
                </ul>
              </div>
              <div class="examples">
                <div class="example bad" @click="showCtrExample = true">
                  <span class="example-label">❌ 错误示例</span>
                  <p>分享一款好用的精华液</p>
                </div>
                <div class="example good">
                  <span class="example-label">✅ 正确示例</span>
                  <p>熬夜党看这里！3天淡纹的急救精华</p>
                </div>
              </div>
            </div>
          </div>

          <div class="defense-card">
            <div class="defense-header cvr">
              <span class="defense-icon">💰</span>
              <h4>转化率 (CVR检查)</h4>
            </div>
            <div class="defense-content">
              <div class="check-points">
                <h5>检查要点</h5>
                <ul>
                  <li>内容逻辑：痛点场景→试其他方法→引出产品→效果对比</li>
                  <li>是否有清晰的行动号召(CTA)</li>
                  <li>产品卖点是否突出</li>
                </ul>
              </div>
              <div class="examples">
                <div class="example bad">
                  <span class="example-label">❌ 错误示例</span>
                  <p>直接介绍产品功能</p>
                </div>
                <div class="example good">
                  <span class="example-label">✅ 正确示例</span>
                  <p>先讲痛点再引出解决方案</p>
                </div>
              </div>
            </div>
          </div>

          <div class="defense-card">
            <div class="defense-header risk">
              <span class="defense-icon">⚠️</span>
              <h4>安全性 (Risk Control)</h4>
            </div>
            <div class="defense-content">
              <div class="check-points">
                <h5>检查要点</h5>
                <ul>
                  <li>是否包含违规词汇（绝对化用语等）</li>
                  <li>是否有版权风险（露出竞品等）</li>
                  <li>是否符合平台规范</li>
                </ul>
              </div>
              <div class="examples">
                <div class="example bad">
                  <span class="example-label">❌ 违规词</span>
                  <p>最好、第一、100%有效</p>
                </div>
                <div class="example good">
                  <span class="example-label">✅ 合规词</span>
                  <p>亲测好用、个人推荐、使用感受</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块3：商务谈判话术 -->
      <section class="module">
        <h3 class="module-title">💬 商务谈判话术</h3>
        <div class="negotiation-cards">
          <div class="negotiation-card">
            <div class="negotiation-icon">🔒</div>
            <h4>锁权益</h4>
            <div class="speech-template">
              <p class="speech-title">话术模板：</p>
              <p class="speech-content">"我们这次合作希望能锁定30天的置顶权益，同时希望您在发布后24小时内不发其他同类产品内容，您看可以吗？"</p>
            </div>
          </div>
          <div class="negotiation-card">
            <div class="negotiation-icon">📈</div>
            <h4>要补量</h4>
            <div class="speech-template">
              <p class="speech-title">话术模板：</p>
              <p class="speech-content">"根据您过往数据，这篇内容互动量低于预期，能否补发一条story/快拍进行二次曝光？或者下一次合作给我们优惠价格？"</p>
            </div>
          </div>
          <div class="negotiation-card">
            <div class="negotiation-icon">🔄</div>
            <h4>置换</h4>
            <div class="speech-template">
              <p class="speech-title">话术模板：</p>
              <p class="speech-content">"我们可以提供产品置换合作，您可以先体验我们的产品，如果觉得好用再分享真实感受，不需要硬广形式，您看如何？"</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-prev" @click="$router.push('/step2')">← 上一步：选资源</button>
      <button class="btn-next" @click="$router.push('/step4')">下一步：做复盘 →</button>
    </div>

    <!-- 帮助弹窗 -->
    <div class="modal-overlay" v-if="showHelp" @click="showHelp = false">
      <div class="modal" @click.stop>
        <h3>📖 本页指引</h3>
        <ul>
          <li>1. 使用AI Brief生成器创建标准化内容简报</li>
          <li>2. 按"三道防线"审核博主提交的内容</li>
          <li>3. 参考商务谈判话术争取更多合作权益</li>
        </ul>
        <button class="btn-close" @click="showHelp = false">我知道了</button>
      </div>
    </div>

    <!-- CTR示例优化弹窗 -->
    <div class="modal-overlay" v-if="showCtrExample" @click="showCtrExample = false">
      <div class="modal example-modal" @click.stop>
        <h3>💡 标题优化示例</h3>
        <div class="example-compare">
          <div class="compare-item bad">
            <h4>❌ 原标题</h4>
            <p>分享一款好用的精华液</p>
            <div class="issues">
              <span class="issue-tag">缺乏痛点</span>
              <span class="issue-tag">无情绪触发</span>
              <span class="issue-tag">无数据支撑</span>
            </div>
          </div>
          <div class="compare-arrow">→</div>
          <div class="compare-item good">
            <h4>✅ 优化后</h4>
            <p>熬夜党看这里！3天淡纹的急救精华（亲测有效）</p>
            <div class="improvements">
              <span class="improve-tag">人群定位：熬夜党</span>
              <span class="improve-tag">数字量化：3天</span>
              <span class="improve-tag">解决方案：淡纹急救</span>
            </div>
          </div>
        </div>
        <button class="btn-close" @click="showCtrExample = false">我知道了</button>
      </div>
    </div>

    <!-- Brief生成成功弹窗 -->
    <div class="modal-overlay" v-if="showBriefSuccess" @click="showBriefSuccess = false">
      <div class="modal" @click.stop>
        <h3>✅ Brief 生成成功</h3>
        <p class="success-msg">已为您生成标准化 Brief 文档</p>
        <button class="btn-download" @click="downloadBrief">📄 下载 Word 版 Brief</button>
        <button class="btn-close secondary" @click="showBriefSuccess = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step3Execution',
  data() {
    return {
      showHelp: false,
      showCtrExample: false,
      showBriefSuccess: false,
      isGenerating: false,
      brief: {
        coreSelling: '',
        seoTitle: '',
        seoContent: '',
        seoTags: '',
        images: []
      }
    }
  },
  methods: {
    triggerUpload() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      const files = Array.from(e.target.files)
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.brief.images.push(event.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
    handleDrop(e) {
      const files = Array.from(e.dataTransfer.files)
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (event) => {
            this.brief.images.push(event.target.result)
          }
          reader.readAsDataURL(file)
        }
      })
    },
    removeImage(index) {
      this.brief.images.splice(index, 1)
    },
    generateBrief() {
      if (!this.brief.coreSelling) {
        alert('请输入核心卖点')
        return
      }
      this.isGenerating = true
      setTimeout(() => {
        this.isGenerating = false
        this.showBriefSuccess = true
      }, 1000)
    },
    downloadBrief() {
      // 模拟下载
      const content = `
品牌投放 Brief
================

【核心卖点】
${this.brief.coreSelling || '未填写'}

【SEO关键词布局】
标题关键词：${this.brief.seoTitle || '未填写'}
正文前30字：${this.brief.seoContent || '未填写'}
话题标签：${this.brief.seoTags || '未填写'}

【视觉参考】
已上传 ${this.brief.images.length} 张参考图
      `
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Brief.txt'
      a.click()
      URL.revokeObjectURL(url)
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
  background: linear-gradient(135deg, #10b981, #059669);
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
  margin-bottom: 8px;
}

.module-subtitle {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.brief-section {
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.section-header h4 {
  font-size: 16px;
  color: #1e293b;
}

.section-tip {
  font-size: 12px;
  color: #94a3b8;
  margin-left: auto;
}

.brief-section textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.3s;
}

.brief-section textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.seo-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.seo-item label {
  display: block;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}

.seo-item input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.seo-item input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.02);
}

.upload-placeholder {
  color: #94a3b8;
}

.upload-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
}

.upload-preview {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.add-more {
  width: 100px;
  height: 100px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s;
}

.add-more:hover {
  border-color: #10b981;
  color: #10b981;
}

.btn-generate {
  padding: 14px 32px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

.btn-generate:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.defense-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.defense-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  border: 1px solid #e2e8f0;
}

.defense-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.defense-header.ctr {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.defense-header.cvr {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.defense-header.risk {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
}

.defense-icon {
  font-size: 28px;
}

.defense-header h4 {
  font-size: 16px;
  color: #1e293b;
}

.defense-content {
  padding: 20px;
}

.check-points h5 {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.check-points ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.check-points li {
  font-size: 13px;
  color: #1e293b;
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.check-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.example {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.example.bad {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.example.good {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.example:hover {
  transform: translateX(5px);
}

.example-label {
  font-size: 12px;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}

.example p {
  font-size: 13px;
  color: #64748b;
}

.negotiation-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.negotiation-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  text-align: center;
}

.negotiation-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.negotiation-card h4 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 16px;
}

.speech-template {
  text-align: left;
  padding: 16px;
  background: white;
  border-radius: 10px;
}

.speech-title {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.speech-content {
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
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
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.btn-next:hover {
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

.example-modal {
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
  background: linear-gradient(135deg, #10b981, #059669);
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

.success-msg {
  text-align: center;
  color: #64748b;
  margin-bottom: 20px;
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
}

.example-compare {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.compare-item {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
}

.compare-item.bad {
  background: #fef2f2;
}

.compare-item.good {
  background: #ecfdf5;
}

.compare-item h4 {
  font-size: 14px;
  margin-bottom: 12px;
}

.compare-item p {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 12px;
}

.compare-arrow {
  font-size: 24px;
  color: #94a3b8;
}

.issues, .improvements {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.issue-tag {
  padding: 4px 10px;
  background: #fecaca;
  color: #dc2626;
  border-radius: 20px;
  font-size: 11px;
}

.improve-tag {
  padding: 4px 10px;
  background: #a7f3d0;
  color: #059669;
  border-radius: 20px;
  font-size: 11px;
}

@media (max-width: 1024px) {
  .defense-cards, .negotiation-cards {
    grid-template-columns: 1fr;
  }
  .seo-inputs {
    grid-template-columns: 1fr;
  }
}
</style>
