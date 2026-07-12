import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Box, 
  AlertTriangle, 
  Wrench, 
  History, 
  BarChart3, 
  Bell, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Database
} from 'lucide-react'
import { motion } from 'framer-motion'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Box, label: 'Assets', path: '/assets' },
  { icon: AlertTriangle, label: 'Issues', path: '/issues' },
  { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
  { icon: History, label: 'History', path: '/history' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: User, label: 'Profile', path: '/profile' },
]

export const Sidebar = ({ open, setOpen }) => {
  const location = useLocation()

  return (
    <motion.aside 
      initial={false}
      animate={{ width: open ? 256 : 80 }}
      className="fixed left-0 top-0 h-full bg-white border-r border-border z-50"
    >
      <div className="p-6 flex items-center justify-between">
        <motion.div 
          animate={{ opacity: open ? 1 : 0 }}
          className="flex items-center gap-2"
        >
          <Database className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">MaintainIQ</span>
        </motion.div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-surface rounded-full transition-colors"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="px-4">
        {menuItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-2xl mb-2 transition-all ${
              location.pathname === item.path 
                ? 'bg-primary text-white shadow-md' 
                : 'text-muted hover:bg-surface hover:text-text'
            }`}
          >
            <item.icon size={20} />
            <motion.span 
              animate={{ opacity: open ? 1 : 0, display: open ? 'inline' : 'none' }}
              className="font-medium"
            >
              {item.label}
            </motion.span>
          </Link>
        ))}
      </nav>
    </motion.aside>
  )
}
