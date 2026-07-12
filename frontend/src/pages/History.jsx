import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar } from 'lucide-react'

const initialHistory = [
  { id: 1, asset: 'HVAC-001', action: 'Maintenance Completed', user: 'John Doe', date: '2024-12-15', status: 'Success' },
  { id: 2, asset: 'ELEV-001', action: 'Issue Reported', user: 'Jane Smith', date: '2024-12-14', status: 'Pending' },
  { id: 3, asset: 'GEN-001', action: 'Asset Updated', user: 'Mike Johnson', date: '2024-12-13', status: 'Success' },
  { id: 4, asset: 'SRV-001', action: 'Issue Resolved', user: 'Sarah Wilson', date: '2024-12-12', status: 'Success' },
  { id: 5, asset: 'PRT-001', action: 'Asset Created', user: 'John Doe', date: '2024-12-11', status: 'Success' },
  { id: 6, asset: 'HVAC-002', action: 'Maintenance Scheduled', user: 'Jane Smith', date: '2024-12-10', status: 'Pending' },
  { id: 7, asset: 'GEN-002', action: 'Issue Reported', user: 'Mike Johnson', date: '2024-12-09', status: 'Success' },
]

export const History = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)

  const filteredHistory = initialHistory.filter(item => {
    const matchSearch = item.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'All' || item.status === statusFilter
    let matchDate = true
    if (dateFrom) matchDate = matchDate && item.date >= dateFrom
    if (dateTo) matchDate = matchDate && item.date <= dateTo
    return matchSearch && matchStatus && matchDate
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Activity History</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input type="text" placeholder="Search history..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div className="relative">
            <button onClick={() => setShowDatePicker(!showDatePicker)} className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl hover:bg-surface transition-colors">
              <Calendar size={18} /><span>Date Range</span>
            </button>
            {showDatePicker && (
              <div className="absolute right-0 top-12 bg-white border border-border rounded-2xl shadow-lg p-4 z-50">
                <div className="flex gap-3 mb-3">
                  <div><label className="block text-xs text-muted mb-1">From</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                  <div><label className="block text-xs text-muted mb-1">To</label><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setDateFrom(''); setDateTo(''); setShowDatePicker(false) }} className="flex-1 py-2 text-sm border border-border rounded-lg hover:bg-surface">Clear</button>
                  <button onClick={() => setShowDatePicker(false)} className="flex-1 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90">Apply</button>
                </div>
              </div>
            )}
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option>All</option><option>Success</option><option>Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Recent Activity ({filteredHistory.length})</h2>
        </div>
        <div className="divide-y divide-border">
          {filteredHistory.length === 0 && <div className="p-12 text-center text-muted">No activity found</div>}
          {filteredHistory.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="p-6 hover:bg-surface transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 mt-2 rounded-full ${item.status === 'Success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <h3 className="font-medium">{item.action}</h3>
                    <p className="text-sm text-muted mt-1">{item.asset} &middot; {item.user} &middot; {item.date}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${item.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{item.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
