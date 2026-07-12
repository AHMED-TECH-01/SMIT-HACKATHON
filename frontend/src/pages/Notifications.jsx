import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'

const initialNotifications = [
  { id: 1, type: 'critical', title: 'HVAC-001 Temperature Alert', message: 'Temperature exceeded threshold', time: '5 min ago', read: false },
  { id: 2, type: 'warning', title: 'Maintenance Due', message: 'ELEV-001 service scheduled tomorrow', time: '1 hour ago', read: false },
  { id: 3, type: 'info', title: 'New Asset Added', message: 'PRT-002 has been registered', time: '2 hours ago', read: true },
  { id: 4, type: 'success', title: 'Issue Resolved', message: 'GEN-001 maintenance completed', time: '5 hours ago', read: true },
  { id: 5, type: 'warning', title: 'Low Inventory', message: 'HVAC filters running low', time: '1 day ago', read: true },
]

export const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const getIcon = (type) => {
    switch (type) {
      case 'critical': return AlertTriangle
      case 'warning': return AlertTriangle
      case 'success': return CheckCircle
      default: return Info
    }
  }

  const getColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'success': return 'text-green-600 bg-green-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    showToast('All notifications marked as read')
  }

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
    showToast('Notification dismissed')
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">{toast}</div>}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications {unreadCount > 0 && <span className="text-sm font-normal text-muted">({unreadCount} unread)</span>}</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-primary text-sm font-medium hover:underline">Mark all as read</button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        {notifications.length === 0 && <div className="p-12 text-center text-muted">No notifications</div>}
        {notifications.map((notif, idx) => {
          const Icon = getIcon(notif.type)
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => markAsRead(notif.id)}
              className={`p-6 hover:bg-surface transition-colors border-b border-border last:border-0 cursor-pointer ${!notif.read ? 'bg-blue-50/30' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getColor(notif.type)}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{notif.title}</h3>
                      <p className="text-sm text-muted mt-1">{notif.message}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); dismissNotification(notif.id) }} className="p-1 hover:bg-surface rounded-lg transition-colors flex-shrink-0">
                      <X size={16} className="text-muted" />
                    </button>
                  </div>
                  <p className="text-xs text-muted mt-2">{notif.time}</p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
