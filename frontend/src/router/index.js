import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Step1Strategy from '@/views/Step1Strategy.vue'
import Step2Resources from '@/views/Step2Resources.vue'
import Step3Execution from '@/views/Step3Execution.vue'
import Step4Analysis from '@/views/Step4Analysis.vue'
import Calendar from '@/views/Calendar.vue'
import CompetitorAnalysis from '@/views/CompetitorAnalysis.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/step1', name: 'Step1', component: Step1Strategy },
  { path: '/step2', name: 'Step2', component: Step2Resources },
  { path: '/step3', name: 'Step3', component: Step3Execution },
  { path: '/step4', name: 'Step4', component: Step4Analysis },
  { path: '/calendar', name: 'Calendar', component: Calendar },
  { path: '/competitor', name: 'Competitor', component: CompetitorAnalysis }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
