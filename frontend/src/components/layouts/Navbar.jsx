import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, User, Plus, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const pageTitles = {
  '/': 'Dashboard',
  '/assets': 'Assets',
  '/issues': 'Issues',
  '/maintenance': 'Maintenance',
  '/history': 'History',
  '/analytics': 'Analytics',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/profile': 'Profile',
}

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const profileRef = useRef(null)
  const quickAddRef = useRef(null)

  const title = pageTitles[location.pathname] || 'Dashboard'

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
      if (quickAddRef.current && !quickAddRef.current.contains(e.target)) setShowQuickAdd(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const quickAddItems = [
    { label: 'New Asset', path: '/assets', action: 'add' },
    { label: 'Report Issue', path: '/issues', action: 'report' },
    { label: 'New Maintenance Task', path: '/maintenance', action: 'new' },
  ]

  return (
    <header className="bg-white border-b border-border px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim()) {
                  navigate(`/assets?search=${encodeURIComponent(searchTerm.trim())}`)
                }
              }}
              className="pl-10 pr-4 py-2 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
            />
          </div>

          <button
            onClick={() => navigate('/notifications')}
            className="p-2 hover:bg-surface rounded-full transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          <div className="relative" ref={quickAddRef}>
            <button
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus size={18} />
              <span>Quick Add</span>
            </button>
            {showQuickAdd && (
              <div className="absolute right-0 top-12 w-56 bg-white border border-border rounded-2xl shadow-lg py-2 z-50">
                {quickAddItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setShowQuickAdd(false)
                      navigate(item.path)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-surface transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-border hover:bg-primary/5 transition-colors"
            >
              <User size={20} />
            </button>
            {showProfile && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-border rounded-2xl shadow-lg py-2 z-50">
                <button
                  onClick={() => { setShowProfile(false); navigate('/profile') }}
                  className="w-full text-left px-4 py-3 hover:bg-surface transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={() => { setShowProfile(false); navigate('/settings') }}
                  className="w-full text-left px-4 py-3 hover:bg-surface transition-colors text-sm font-medium"
                >
                  Settings
                </button>
                <hr className="border-border my-1" />
                <button
                  onClick={() => { setShowProfile(false); logout(); navigate('/login') }}
                  className="w-full text-left px-4 py-3 hover:bg-surface transition-colors text-sm font-medium text-danger flex items-center gap-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
