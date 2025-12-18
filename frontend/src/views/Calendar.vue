<template>
  <div class="tool-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="nav-btn" @click="$router.push('/')">← 返回工作流</button>
      <div class="page-title">
        <span class="tool-badge">辅助工具</span>
        <h2>投放日历视图</h2>
      </div>
      <div></div>
    </nav>

    <div class="content">
      <!-- 日历控制区 -->
      <div class="calendar-controls">
        <div class="month-selector">
          <button class="arrow-btn" @click="prevMonth">‹</button>
          <span class="current-month">{{ currentYear }}年 {{ currentMonth }}月</span>
          <button class="arrow-btn" @click="nextMonth">›</button>
        </div>
        <div class="view-switch">
          <button :class="{ active: viewType === 'month' }" @click="viewType = 'month'">月</button>
          <button :class="{ active: viewType === 'week' }" @click="viewType = 'week'">周</button>
          <button :class="{ active: viewType === 'day' }" @click="viewType = 'day'">日</button>
        </div>
        <button class="btn-add" @click="showAddModal = true">+ 添加投放</button>
      </div>

      <!-- 日历主体 -->
      <div class="calendar-wrapper">
        <div class="calendar-header">
          <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-body">
          <div 
            class="calendar-cell" 
            v-for="(cell, index) in calendarCells" 
            :key="index"
            :class="{ 
              'other-month': !cell.currentMonth, 
              'today': cell.isToday,
              'has-events': cell.events.length > 0
            }"
            @click="selectDate(cell)"
          >
            <span class="cell-date">{{ cell.date }}</span>
            <div class="cell-events">
              <div 
                class="event-item" 
                v-for="(event, eIndex) in cell.events.slice(0, 2)" 
                :key="eIndex"
                :class="event.type"
                @click.stop="editEvent(event)"
              >
                {{ event.title }} ({{ event.count }})
              </div>
              <div class="more-events" v-if="cell.events.length > 2">
                +{{ cell.events.length - 2 }} 更多
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 图例 -->
      <div class="legend">
        <div class="legend-item">
          <span class="legend-color koc"></span>
          <span>KOC投放</span>
        </div>
        <div class="legend-item">
          <span class="legend-color kol"></span>
          <span>KOL投放</span>
        </div>
        <div class="legend-item">
          <span class="legend-color ads"></span>
          <span>投流推广</span>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-back" @click="$router.push('/')">返回工作流</button>
    </div>

    <!-- 添加投放弹窗 -->
    <div class="modal-overlay" v-if="showAddModal" @click="showAddModal = false">
      <div class="modal" @click.stop>
        <h3>添加投放计划</h3>
        <div class="add-form">
          <div class="form-group">
            <label>投放类型</label>
            <select v-model="newEvent.type">
              <option value="koc">KOC投放</option>
              <option value="kol">KOL投放</option>
              <option value="ads">投流推广</option>
            </select>
          </div>
          <div class="form-group">
            <label>投放日期</label>
            <input type="date" v-model="newEvent.date" />
          </div>
          <div class="form-group">
            <label>投放数量</label>
            <input type="number" v-model="newEvent.count" placeholder="请输入投放数量" />
          </div>
          <div class="form-group">
            <label>备注说明</label>
            <input v-model="newEvent.note" placeholder="可选填备注" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddModal = false">取消</button>
          <button class="btn-confirm" @click="addEvent">确认添加</button>
        </div>
      </div>
    </div>

    <!-- 编辑投放弹窗 -->
    <div class="modal-overlay" v-if="showEditModal" @click="showEditModal = false">
      <div class="modal" @click.stop>
        <h3>编辑投放计划</h3>
        <div class="add-form">
          <div class="form-group">
            <label>投放类型</label>
            <select v-model="editingEvent.type">
              <option value="koc">KOC投放</option>
              <option value="kol">KOL投放</option>
              <option value="ads">投流推广</option>
            </select>
          </div>
          <div class="form-group">
            <label>投放日期</label>
            <input type="date" v-model="editingEvent.date" />
          </div>
          <div class="form-group">
            <label>投放数量</label>
            <input type="number" v-model="editingEvent.count" />
          </div>
          <div class="form-group">
            <label>备注说明</label>
            <input v-model="editingEvent.note" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-delete" @click="deleteEvent">删除</button>
          <button class="btn-confirm" @click="saveEvent">保存修改</button>
        </div>
      </div>
    </div>

    <!-- 日期详情弹窗 -->
    <div class="modal-overlay" v-if="showDateModal" @click="showDateModal = false">
      <div class="modal" @click.stop>
        <h3>{{ selectedDate.month }}月{{ selectedDate.date }}日 投放计划</h3>
        <div class="date-events" v-if="selectedDate.events && selectedDate.events.length">
          <div 
            class="date-event-item" 
            v-for="(event, index) in selectedDate.events" 
            :key="index"
            :class="event.type"
          >
            <div class="event-info">
              <span class="event-type-tag" :class="event.type">{{ getTypeName(event.type) }}</span>
              <span class="event-count">{{ event.count }} 条</span>
            </div>
            <p class="event-note" v-if="event.note">{{ event.note }}</p>
            <button class="btn-edit-small" @click="editEvent(event)">编辑</button>
          </div>
        </div>
        <div class="no-events" v-else>
          <p>暂无投放计划</p>
        </div>
        <button class="btn-add-date" @click="addEventToDate">+ 添加投放</button>
        <button class="btn-close" @click="showDateModal = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',
  data() {
    return {
      viewType: 'month',
      currentYear: 2025,
      currentMonth: 1,
      weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      showAddModal: false,
      showEditModal: false,
      showDateModal: false,
      selectedDate: {},
      editingEvent: {},
      editingEventIndex: -1,
      newEvent: {
        type: 'koc',
        date: '',
        count: null,
        note: ''
      },
      events: [
        { date: '2025-01-03', type: 'koc', count: 5, note: '首批KOC铺量', title: 'KOC投放' },
        { date: '2025-01-05', type: 'koc', count: 8, note: '', title: 'KOC投放' },
        { date: '2025-01-08', type: 'kol', count: 2, note: '腰部KOL种草', title: 'KOL投放' },
        { date: '2025-01-10', type: 'koc', count: 6, note: '', title: 'KOC投放' },
        { date: '2025-01-12', type: 'ads', count: 3, note: '优质内容投流', title: '投流推广' },
        { date: '2025-01-15', type: 'kol', count: 1, note: '头部KOL合作', title: 'KOL投放' },
        { date: '2025-01-18', type: 'koc', count: 10, note: '', title: 'KOC投放' },
        { date: '2025-01-20', type: 'ads', count: 5, note: '', title: '投流推广' },
        { date: '2025-01-22', type: 'kol', count: 3, note: '', title: 'KOL投放' },
        { date: '2025-01-25', type: 'koc', count: 7, note: '', title: 'KOC投放' }
      ]
    }
  },
  computed: {
    calendarCells() {
      const cells = []
      const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth, 0)
      const startDay = firstDay.getDay()
      const daysInMonth = lastDay.getDate()
      
      // 上月日期
      const prevMonthLastDay = new Date(this.currentYear, this.currentMonth - 1, 0).getDate()
      for (let i = startDay - 1; i >= 0; i--) {
        cells.push({
          date: prevMonthLastDay - i,
          currentMonth: false,
          events: [],
          fullDate: ''
        })
      }
      
      // 本月日期
      const today = new Date()
      for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${this.currentYear}-${String(this.currentMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        const dayEvents = this.events.filter(e => e.date === dateStr)
        cells.push({
          date: i,
          currentMonth: true,
          isToday: today.getFullYear() === this.currentYear && 
                   today.getMonth() + 1 === this.currentMonth && 
                   today.getDate() === i,
          events: dayEvents,
          fullDate: dateStr,
          month: this.currentMonth
        })
      }
      
      // 下月日期
      const remainingCells = 42 - cells.length
      for (let i = 1; i <= remainingCells; i++) {
        cells.push({
          date: i,
          currentMonth: false,
          events: [],
          fullDate: ''
        })
      }
      
      return cells
    }
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12
        this.currentYear--
      } else {
        this.currentMonth--
      }
    },
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1
        this.currentYear++
      } else {
        this.currentMonth++
      }
    },
    selectDate(cell) {
      if (!cell.currentMonth) return
      this.selectedDate = cell
      this.showDateModal = true
    },
    getTypeName(type) {
      const names = { koc: 'KOC投放', kol: 'KOL投放', ads: '投流推广' }
      return names[type] || type
    },
    addEvent() {
      if (!this.newEvent.date || !this.newEvent.count) {
        alert('请填写完整信息')
        return
      }
      const typeNames = { koc: 'KOC投放', kol: 'KOL投放', ads: '投流推广' }
      this.events.push({
        ...this.newEvent,
        title: typeNames[this.newEvent.type]
      })
      this.newEvent = { type: 'koc', date: '', count: null, note: '' }
      this.showAddModal = false
    },
    addEventToDate() {
      this.newEvent.date = this.selectedDate.fullDate
      this.showDateModal = false
      this.showAddModal = true
    },
    editEvent(event) {
      this.editingEvent = { ...event }
      this.editingEventIndex = this.events.findIndex(e => 
        e.date === event.date && e.type === event.type && e.count === event.count
      )
      this.showDateModal = false
      this.showEditModal = true
    },
    saveEvent() {
      if (this.editingEventIndex >= 0) {
        const typeNames = { koc: 'KOC投放', kol: 'KOL投放', ads: '投流推广' }
        this.events[this.editingEventIndex] = {
          ...this.editingEvent,
          title: typeNames[this.editingEvent.type]
        }
      }
      this.showEditModal = false
    },
    deleteEvent() {
      if (this.editingEventIndex >= 0) {
        this.events.splice(this.editingEventIndex, 1)
      }
      this.showEditModal = false
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
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
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
  padding: 30px 40px 100px;
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 16px;
}

.arrow-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.arrow-btn:hover {
  background: #f1f5f9;
}

.current-month {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  min-width: 140px;
  text-align: center;
}

.view-switch {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 8px;
}

.view-switch button {
  padding: 8px 20px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
}

.view-switch button.active {
  background: white;
  color: #1e293b;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-add {
  padding: 10px 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.calendar-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  overflow: hidden;
  margin-bottom: 24px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8fafc;
}

.weekday {
  padding: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-cell {
  min-height: 100px;
  padding: 8px;
  border: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.3s;
}

.calendar-cell:hover {
  background: #f8fafc;
}

.calendar-cell.other-month {
  background: #fafafa;
}

.calendar-cell.other-month .cell-date {
  color: #cbd5e1;
}

.calendar-cell.today {
  background: #eff6ff;
}

.calendar-cell.today .cell-date {
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell-date {
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 6px;
}

.cell-events {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-item {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: all 0.3s;
}

.event-item:hover {
  transform: scale(1.02);
}

.event-item.koc {
  background: #d1fae5;
  color: #059669;
}

.event-item.kol {
  background: #dbeafe;
  color: #2563eb;
}

.event-item.ads {
  background: #fef3c7;
  color: #d97706;
}

.more-events {
  font-size: 10px;
  color: #94a3b8;
  padding: 2px 8px;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64748b;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.koc {
  background: #10b981;
}

.legend-color.kol {
  background: #3b82f6;
}

.legend-color.ads {
  background: #f59e0b;
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
}

.btn-back {
  padding: 12px 48px;
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
  max-width: 450px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal h3 {
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 24px;
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

.add-form input:focus,
.add-form select:focus {
  outline: none;
  border-color: #6366f1;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
}

.btn-confirm {
  flex: 1;
  padding: 12px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-delete {
  flex: 1;
  padding: 12px;
  border: none;
  background: #fecaca;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.date-events {
  margin-bottom: 20px;
}

.date-event-item {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  position: relative;
}

.date-event-item.koc {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.date-event-item.kol {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.date-event-item.ads {
  background: #fffbeb;
  border: 1px solid #fde68a;
}

.event-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.event-type-tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.event-type-tag.koc {
  background: #10b981;
  color: white;
}

.event-type-tag.kol {
  background: #3b82f6;
  color: white;
}

.event-type-tag.ads {
  background: #f59e0b;
  color: white;
}

.event-count {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.event-note {
  font-size: 13px;
  color: #64748b;
}

.btn-edit-small {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  font-size: 12px;
  color: #64748b;
  cursor: pointer;
}

.no-events {
  text-align: center;
  padding: 30px;
  color: #94a3b8;
}

.btn-add-date {
  width: 100%;
  padding: 12px;
  border: 2px dashed #cbd5e1;
  background: transparent;
  border-radius: 10px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  margin-bottom: 12px;
  transition: all 0.3s;
}

.btn-add-date:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.btn-close {
  width: 100%;
  padding: 12px;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
