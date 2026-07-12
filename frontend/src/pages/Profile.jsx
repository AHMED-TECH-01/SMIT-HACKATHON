import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Briefcase, Calendar, Edit, Camera, X, Save } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const initialActivity = [
  { id: 1, action: 'Completed maintenance on HVAC-001', date: '2 hours ago' },
  { id: 2, action: 'Created new asset PRT-002', date: '1 day ago' },
  { id: 3, action: 'Resolved issue ELEV-001', date: '2 days ago' },
]

export const Profile = () => {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [toast, setToast] = useState('')
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Maintenance Technician',
    phone: '+1 (555) 123-4567',
    joined: 'January 2024',
  })
  const [editData, setEditData] = useState({ ...profileData })

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleSave = () => {
    setProfileData({ ...editData })
    setEditing(false)
    showToast('Profile updated successfully!')
  }

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">{toast}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 bg-white rounded-3xl border border-border shadow-sm p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-surface rounded-full flex items-center justify-center">
                <User size={64} className="text-muted" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
            <p className="text-muted mb-6">{profileData.role}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-surface rounded-xl"><p className="text-2xl font-bold text-primary">156</p><p className="text-xs text-muted">Tasks</p></div>
              <div className="text-center p-3 bg-surface rounded-xl"><p className="text-2xl font-bold text-green-600">98%</p><p className="text-xs text-muted">Success</p></div>
              <div className="text-center p-3 bg-surface rounded-xl"><p className="text-2xl font-bold text-orange-600">4.8</p><p className="text-xs text-muted">Rating</p></div>
            </div>
            {!editing ? (
              <button onClick={() => { setEditData({ ...profileData }); setEditing(true) }} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-surface transition-colors">
                <Edit size={18} /><span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                  <Save size={18} /><span>Save</span>
                </button>
                <button onClick={() => setEditing(false)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-surface transition-colors">
                  <X size={18} /><span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: User, label: 'Full Name', key: 'name' },
                  { icon: Mail, label: 'Email', key: 'email' },
                  { icon: Briefcase, label: 'Role', key: 'role' },
                  { icon: Calendar, label: 'Joined', key: 'joined' },
                ].map(field => (
                  <div key={field.key} className="flex items-center gap-3 p-4 bg-surface rounded-xl">
                    <field.icon size={20} className="text-muted flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted">{field.label}</p>
                      {editing && field.key !== 'joined' ? (
                        <input value={editData[field.key]} onChange={e => setEditData({...editData, [field.key]: e.target.value})} className="w-full bg-white border border-border rounded-lg px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      ) : (
                        <p className="font-medium">{profileData[field.key]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex items-center gap-3 p-4 bg-surface rounded-xl">
                  <Mail size={20} className="text-muted flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted">Phone</p>
                    <input value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} className="w-full bg-white border border-border rounded-lg px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {initialActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 bg-surface rounded-xl">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
