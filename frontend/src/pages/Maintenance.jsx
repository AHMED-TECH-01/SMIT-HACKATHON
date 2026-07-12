import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Filter, X } from 'lucide-react'

const initialColumns = [
  { status: 'Reported', issues: [
    { id: 1, title: 'HVAC filter change', asset: 'HVAC-001', priority: 'Medium' },
    { id: 2, title: 'Generator oil check', asset: 'GEN-001', priority: 'Low' }
  ]},
  { status: 'Assigned', issues: [
    { id: 3, title: 'Elevator inspection', asset: 'ELEV-001', priority: 'High' }
  ]},
  { status: 'In Progress', issues: [
    { id: 4, title: 'Server room cooling', asset: 'SRV-001', priority: 'Critical' }
  ]},
  { status: 'Resolved', issues: [
    { id: 5, title: 'Printer maintenance', asset: 'PRT-001', priority: 'Low' }
  ]}
]

const emptyTask = { title: '', asset: '', priority: 'Medium' }

export const Maintenance = () => {
  const [columns, setColumns] = useState(initialColumns)
  const [filterPriority, setFilterPriority] = useState('All')
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [formData, setFormData] = useState(emptyTask)
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleNewTask = () => {
    if (!formData.title || !formData.asset) return
    const newTask = { ...formData, id: Date.now() }
    const updated = [...columns]
    updated[0] = { ...updated[0], issues: [...updated[0].issues, newTask] }
    setColumns(updated)
    setShowNewTaskModal(false)
    setFormData(emptyTask)
    showToast('Task created successfully!')
  }

  const handleMoveTask = (taskId, fromColIdx, direction) => {
    const updated = [...columns]
    const task = updated[fromColIdx].issues.find(i => i.id === taskId)
    if (!task) return
    const newColIdx = fromColIdx + direction
    if (newColIdx < 0 || newColIdx >= columns.length) return
    updated[fromColIdx] = { ...updated[fromColIdx], issues: updated[fromColIdx].issues.filter(i => i.id !== taskId) }
    updated[newColIdx] = { ...updated[newColIdx], issues: [...updated[newColIdx].issues, task] }
    setColumns(updated)
    showToast(`Task moved to ${updated[newColIdx].status}`)
  }

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">{toast}</div>}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Maintenance Board</h1>
        <div className="flex items-center gap-3">
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <button onClick={() => { setFormData(emptyTask); setShowNewTaskModal(true) }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
            <Plus size={18} /><span>New Task</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col, idx) => (
          <motion.div key={col.status} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-surface rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{col.status}</h3>
              <span className="text-sm text-muted">{col.issues.length}</span>
            </div>
            <div className="space-y-3">
              {col.issues
                .filter(i => filterPriority === 'All' || i.priority === filterPriority)
                .map((issue) => (
                <div key={issue.id} className="bg-white p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">{issue.title}</h4>
                  <p className="text-sm text-muted mb-2">{issue.asset}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${issue.priority === 'Critical' ? 'bg-red-100 text-red-600' : issue.priority === 'High' ? 'bg-orange-100 text-orange-600' : issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{issue.priority}</span>
                    <div className="flex gap-1">
                      {idx > 0 && (
                        <button onClick={() => handleMoveTask(issue.id, idx, -1)} className="text-xs px-2 py-1 bg-surface rounded-lg hover:bg-border transition-colors">&larr;</button>
                      )}
                      {idx < columns.length - 1 && (
                        <button onClick={() => handleMoveTask(issue.id, idx, 1)} className="text-xs px-2 py-1 bg-surface rounded-lg hover:bg-border transition-colors">&rarr;</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showNewTaskModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">New Maintenance Task</h2>
                <button onClick={() => setShowNewTaskModal(false)} className="p-2 hover:bg-surface rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Title</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Task title" /></div>
                <div><label className="block text-sm font-medium mb-1">Asset</label><input value={formData.asset} onChange={e => setFormData({...formData, asset: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. HVAC-001" /></div>
                <div><label className="block text-sm font-medium mb-1">Priority</label>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                  </select>
                </div>
                <button onClick={handleNewTask} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">Create Task</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
