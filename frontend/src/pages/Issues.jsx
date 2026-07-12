import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus, AlertCircle, Clock, User, FileText, ArrowUpRight, X, CheckCircle } from 'lucide-react'

const initialIssues = [
  { id: 1, title: 'HVAC System Not Cooling', asset: 'HVAC-001', priority: 'High', status: 'Open', reporter: 'John Doe', date: '2 hours ago', description: 'The HVAC system on Floor 1 is not cooling properly. Temperature is currently 78F and rising.', location: 'Floor 1' },
  { id: 2, title: 'Elevator Making Noise', asset: 'ELEV-001', priority: 'Medium', status: 'In Progress', reporter: 'Jane Smith', date: '5 hours ago', description: 'Elevator making unusual grinding noises when stopping at Floor 2. Needs inspection.', location: 'Main Lobby' },
  { id: 3, title: 'Server Rack Overheating', asset: 'SRV-001', priority: 'Critical', status: 'Open', reporter: 'Mike Johnson', date: '1 day ago', description: 'Server rack temperature exceeded threshold. Cooling fans may be malfunctioning.', location: 'Server Room' },
]

const emptyIssue = { title: '', asset: '', priority: 'Medium', status: 'Open', reporter: '', description: '', location: '' }

export const Issues = () => {
  const [issues, setIssues] = useState(initialIssues)
  const [selectedIssue, setSelectedIssue] = useState(initialIssues[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showReportModal, setShowReportModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [formData, setFormData] = useState(emptyIssue)
  const [assignTo, setAssignTo] = useState('')
  const [toast, setToast] = useState('')

  const filteredIssues = issues.filter(i => {
    const matchSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.reporter.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'All' || i.status === filterStatus
    return matchSearch && matchStatus
  })

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleReportIssue = () => {
    if (!formData.title || !formData.asset) return
    const newIssue = { ...formData, id: Date.now(), date: 'Just now', reporter: formData.reporter || 'You' }
    setIssues([newIssue, ...issues])
    setSelectedIssue(newIssue)
    setShowReportModal(false)
    setFormData(emptyIssue)
    showToast('Issue reported successfully!')
  }

  const handleUpdateStatus = (newStatus) => {
    const updated = issues.map(i => i.id === selectedIssue.id ? { ...i, status: newStatus } : i)
    setIssues(updated)
    setSelectedIssue({ ...selectedIssue, status: newStatus })
    showToast(`Issue status updated to ${newStatus}!`)
  }

  const handleAssign = () => {
    if (!assignTo) return
    setShowAssignModal(false)
    setAssignTo('')
    showToast(`Issue assigned to ${assignTo}!`)
  }

  const handleResolve = () => {
    handleUpdateStatus('Resolved')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">{toast}</div>
      )}

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-border shadow-sm flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Issues ({filteredIssues.length})</h2>
            <button onClick={() => { setFormData(emptyIssue); setShowReportModal(true) }} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
              <Plus size={18} />
              <span>Report Issue</span>
            </button>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input type="text" placeholder="Search issues..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-border rounded-xl bg-surface text-sm focus:outline-none">
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {filteredIssues.length === 0 && <div className="text-center py-12 text-muted">No issues found</div>}
          {filteredIssues.map((issue, index) => (
            <motion.div key={issue.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedIssue(issue)}
              className={`p-4 rounded-2xl mb-3 cursor-pointer transition-all ${selectedIssue?.id === issue.id ? 'bg-primary/5 border-2 border-primary' : 'bg-surface border-2 border-transparent hover:bg-surface/80'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{issue.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${issue.priority === 'Critical' ? 'bg-red-100 text-red-600' : issue.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{issue.priority}</span>
                  </div>
                  <p className="text-sm text-muted">{issue.asset} &middot; {issue.reporter}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${issue.status === 'Open' ? 'bg-red-100 text-red-600' : issue.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{issue.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedIssue && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-border shadow-sm flex flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">{selectedIssue.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${selectedIssue.priority === 'Critical' ? 'bg-red-100 text-red-600' : selectedIssue.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{selectedIssue.priority}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${selectedIssue.status === 'Open' ? 'bg-red-100 text-red-600' : selectedIssue.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{selectedIssue.status}</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2"><AlertCircle size={18} /> Issue Details</h3>
              <div className="bg-surface p-4 rounded-2xl">
                <p className="text-muted mb-4">{selectedIssue.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted">Asset</p><p className="font-medium">{selectedIssue.asset}</p></div>
                  <div><p className="text-sm text-muted">Reported By</p><p className="font-medium">{selectedIssue.reporter}</p></div>
                  <div><p className="text-sm text-muted">Reported At</p><p className="font-medium">{selectedIssue.date}</p></div>
                  <div><p className="text-sm text-muted">Location</p><p className="font-medium">{selectedIssue.location}</p></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock size={18} /> Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4"><div className="w-2 h-2 bg-primary rounded-full mt-2"></div><div className="flex-1"><p className="font-medium">Issue Reported</p><p className="text-sm text-muted">{selectedIssue.date}</p></div></div>
                {selectedIssue.status !== 'Open' && <div className="flex gap-4"><div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div><div className="flex-1"><p className="font-medium">Acknowledged</p><p className="text-sm text-muted">1 hour ago</p></div></div>}
                {selectedIssue.status === 'Resolved' && <div className="flex gap-4"><div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div><div className="flex-1"><p className="font-medium">Resolved</p><p className="text-sm text-muted">Just now</p></div></div>}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border">
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setShowAssignModal(true)} className="flex items-center justify-center gap-2 p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                <User size={18} /><span>Assign</span>
              </button>
              <button onClick={() => handleUpdateStatus(selectedIssue.status === 'Open' ? 'In Progress' : 'Open')} className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-surface transition-colors">
                <AlertCircle size={18} /><span>Update Status</span>
              </button>
              <button onClick={handleResolve} className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                <CheckCircle size={18} /><span>Resolve</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showReportModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Report New Issue</h2>
                <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-surface rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Title</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Issue title" /></div>
                <div><label className="block text-sm font-medium mb-1">Asset</label><input value={formData.asset} onChange={e => setFormData({...formData, asset: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. HVAC-001" /></div>
                <div><label className="block text-sm font-medium mb-1">Priority</label>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Location</label><input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Floor 1" /></div>
                <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-24 resize-none" placeholder="Describe the issue..." /></div>
                <button onClick={handleReportIssue} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">Report Issue</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAssignModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Assign Issue</h2>
                <button onClick={() => setShowAssignModal(false)} className="p-2 hover:bg-surface rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Assign To</label><input value={assignTo} onChange={e => setAssignTo(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Enter name" /></div>
                <button onClick={handleAssign} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">Assign</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
