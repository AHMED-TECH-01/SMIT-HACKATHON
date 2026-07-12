import { useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Download, Copy, Printer, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'

const initialAssets = [
  { id: 1, name: 'HVAC System', code: 'HVAC-001', category: 'HVAC', location: 'Floor 1', status: 'Operational', nextService: '2024-01-20' },
  { id: 2, name: 'Elevator', code: 'ELEV-001', category: 'Elevator', location: 'Main Lobby', status: 'Under Maintenance', nextService: '2024-01-15' },
  { id: 3, name: 'Generator', code: 'GEN-001', category: 'Power', location: 'Basement', status: 'Operational', nextService: '2024-02-01' },
  { id: 4, name: 'Server Rack', code: 'SRV-001', category: 'IT', location: 'Server Room', status: 'Operational', nextService: '2024-01-25' },
]

const emptyAsset = { name: '', code: '', category: '', location: '', status: 'Operational', nextService: '' }

export const Assets = () => {
  const [searchParams] = useSearchParams()
  const [assets, setAssets] = useState(initialAssets)
  const [selectedAsset, setSelectedAsset] = useState(initialAssets[0])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState(emptyAsset)
  const [toast, setToast] = useState('')
  const qrRef = useRef(null)

  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleAdd = () => {
    if (!formData.name || !formData.code) return
    const newAsset = { ...formData, id: Date.now() }
    setAssets([...assets, newAsset])
    setSelectedAsset(newAsset)
    setShowAddModal(false)
    setFormData(emptyAsset)
    showToast('Asset added successfully!')
  }

  const handleEdit = () => {
    if (!formData.name || !formData.code) return
    const updated = assets.map(a => a.id === selectedAsset.id ? { ...a, ...formData } : a)
    setAssets(updated)
    setSelectedAsset({ ...selectedAsset, ...formData })
    setShowEditModal(false)
    showToast('Asset updated successfully!')
  }

  const handleDelete = () => {
    const remaining = assets.filter(a => a.id !== selectedAsset.id)
    setAssets(remaining)
    setSelectedAsset(remaining[0] || null)
    setShowDeleteConfirm(false)
    showToast('Asset deleted successfully!')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://maintainiq.com/asset/${selectedAsset.id}`)
    showToast('Link copied to clipboard!')
  }

  const handleDownloadQR = () => {
    const canvas = document.querySelector(`#qr-canvas-${selectedAsset.id}`)
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${selectedAsset.code}-QR.png`
      link.href = canvas.toDataURL()
      link.click()
      showToast('QR code downloaded!')
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html><head><title>${selectedAsset.code} - QR Code</title>
      <style>body{font-family:sans-serif;text-align:center;padding:40px;}h1{margin-bottom:8px;}p{color:#666;}</style>
      </head><body>
      <h1>${selectedAsset.name}</h1>
      <p>${selectedAsset.code} &middot; ${selectedAsset.location}</p>
      <div id="print-qr"></div>
      </body></html>
    `)
    const canvas = document.querySelector(`#qr-canvas-${selectedAsset.id}`)
    if (canvas) {
      const img = printWindow.document.createElement('img')
      img.src = canvas.toDataURL()
      img.width = 200
      img.height = 200
      printWindow.document.getElementById('print-qr').appendChild(img)
    }
    setTimeout(() => { printWindow.print(); printWindow.close() }, 500)
    showToast('Print dialog opened!')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-3xl border border-border shadow-sm flex flex-col"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Assets ({filteredAssets.length})</h2>
            <button 
              onClick={() => { setFormData(emptyAsset); setShowAddModal(true) }}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus size={18} />
              <span>Add Asset</span>
            </button>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {filteredAssets.length === 0 && (
            <div className="text-center py-12 text-muted">No assets found</div>
          )}
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAsset(asset)}
              className={`p-4 rounded-2xl mb-3 cursor-pointer transition-all ${
                selectedAsset?.id === asset.id 
                  ? 'bg-primary/5 border-2 border-primary' 
                  : 'bg-surface border-2 border-transparent hover:bg-surface/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{asset.name}</h3>
                  <p className="text-sm text-muted">{asset.code} &middot; {asset.location}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  asset.status === 'Operational' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {asset.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedAsset && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-border shadow-sm flex flex-col"
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{selectedAsset.name}</h2>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-surface rounded-3xl">
                <QRCodeSVG value={`https://maintainiq.com/asset/${selectedAsset.id}`} size={160} />
                <QRCodeCanvas id={`qr-canvas-${selectedAsset.id}`} value={`https://maintainiq.com/asset/${selectedAsset.id}`} size={160} className="hidden" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface p-4 rounded-2xl">
                <p className="text-sm text-muted">Asset Code</p>
                <p className="font-semibold">{selectedAsset.code}</p>
              </div>
              <div className="bg-surface p-4 rounded-2xl">
                <p className="text-sm text-muted">Category</p>
                <p className="font-semibold">{selectedAsset.category}</p>
              </div>
              <div className="bg-surface p-4 rounded-2xl">
                <p className="text-sm text-muted">Location</p>
                <p className="font-semibold">{selectedAsset.location}</p>
              </div>
              <div className="bg-surface p-4 rounded-2xl">
                <p className="text-sm text-muted">Status</p>
                <p className={`font-semibold ${
                  selectedAsset.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {selectedAsset.status}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-4">Maintenance History</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-surface rounded-2xl">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Routine Maintenance</p>
                      <p className="text-sm text-muted">Dec {10 + i}, 2024 &middot; Tech John Doe</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <button 
                onClick={() => { setFormData({ ...selectedAsset }); setShowEditModal(true) }}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-surface transition-colors"
              >
                <Edit size={18} />
                <span className="hidden lg:inline">Edit</span>
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-red-50 transition-colors text-danger"
              >
                <Trash2 size={18} />
                <span className="hidden lg:inline">Delete</span>
              </button>
              <button 
                onClick={handleDownloadQR}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-surface transition-colors"
              >
                <Download size={18} />
                <span className="hidden lg:inline">Download QR</span>
              </button>
              <button 
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-surface transition-colors"
              >
                <Copy size={18} />
                <span className="hidden lg:inline">Copy Link</span>
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-surface transition-colors"
              >
                <Printer size={18} />
                <span className="hidden lg:inline">Print</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Add New Asset</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-surface rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Asset name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Code</label>
                  <input value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. HVAC-002" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. HVAC" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Floor 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Operational</option>
                    <option>Under Maintenance</option>
                    <option>Out of Service</option>
                  </select>
                </div>
                <button onClick={handleAdd} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">Add Asset</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showEditModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Edit Asset</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-surface rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Code</label>
                  <input value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Operational</option>
                    <option>Under Maintenance</option>
                    <option>Out of Service</option>
                  </select>
                </div>
                <button onClick={handleEdit} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showDeleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <h2 className="text-xl font-bold mb-2">Delete Asset</h2>
              <p className="text-muted mb-6">Are you sure you want to delete <strong>{selectedAsset.name}</strong>? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 border border-border rounded-xl hover:bg-surface transition-colors font-medium">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-danger text-white rounded-xl hover:bg-red-700 transition-colors font-medium">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
