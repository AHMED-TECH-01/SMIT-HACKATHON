import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building, Shield, Bell, Palette, User, Save } from 'lucide-react'

const tabs = [
  { id: 'organization', label: 'Organization', icon: Building },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'profile', label: 'Profile', icon: User },
]

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('organization')
  const [toast, setToast] = useState('')

  const [orgSettings, setOrgSettings] = useState({ name: 'MaintainIQ Corp', email: 'admin@maintainiq.com', timezone: 'UTC' })
  const [securitySettings, setSecuritySettings] = useState({ twoFactor: false, sessionTimeout: '30', passwordLength: '8' })
  const [notifSettings, setNotifSettings] = useState({ emailAlerts: true, pushAlerts: true, maintenanceReminders: true, issueUpdates: true })
  const [appearanceSettings, setAppearanceSettings] = useState({ theme: 'light', language: 'English', compactMode: false })

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleSave = () => {
    showToast('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">{toast}</div>}
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-border shadow-sm p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-surface text-muted hover:text-text'}`}>
                  <Icon size={20} /><span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">{tabs.find(t => t.id === activeTab)?.label} Settings</h2>

            {activeTab === 'organization' && (
              <div className="space-y-6">
                <div><label className="block text-sm font-medium mb-2">Company Name</label><input value={orgSettings.name} onChange={e => setOrgSettings({...orgSettings, name: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                <div><label className="block text-sm font-medium mb-2">Email</label><input value={orgSettings.email} onChange={e => setOrgSettings({...orgSettings, email: e.target.value})} type="email" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                <div><label className="block text-sm font-medium mb-2">Timezone</label>
                  <select value={orgSettings.timezone} onChange={e => setOrgSettings({...orgSettings, timezone: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>UTC</option><option>EST</option><option>PST</option><option>CST</option><option>IST</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                  <div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-muted">Add an extra layer of security</p></div>
                  <button onClick={() => setSecuritySettings({...securitySettings, twoFactor: !securitySettings.twoFactor})} className={`w-12 h-6 rounded-full transition-colors ${securitySettings.twoFactor ? 'bg-primary' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.twoFactor ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                </div>
                <div><label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                  <select value={securitySettings.sessionTimeout} onChange={e => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="15">15 minutes</option><option value="30">30 minutes</option><option value="60">1 hour</option><option value="120">2 hours</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-2">Minimum Password Length</label>
                  <select value={securitySettings.passwordLength} onChange={e => setSecuritySettings({...securitySettings, passwordLength: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="6">6 characters</option><option value="8">8 characters</option><option value="12">12 characters</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                {[
                  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive alerts via email' },
                  { key: 'pushAlerts', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                  { key: 'maintenanceReminders', label: 'Maintenance Reminders', desc: 'Get reminded about upcoming maintenance' },
                  { key: 'issueUpdates', label: 'Issue Updates', desc: 'Get notified when issues are updated' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-surface rounded-xl">
                    <div><p className="font-medium">{item.label}</p><p className="text-sm text-muted">{item.desc}</p></div>
                    <button onClick={() => setNotifSettings({...notifSettings, [item.key]: !notifSettings[item.key]})} className={`w-12 h-6 rounded-full transition-colors ${notifSettings[item.key] ? 'bg-primary' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifSettings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div><label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="flex gap-3">
                    {['light', 'dark', 'system'].map(theme => (
                      <button key={theme} onClick={() => setAppearanceSettings({...appearanceSettings, theme})} className={`flex-1 py-3 rounded-xl border-2 transition-colors capitalize font-medium ${appearanceSettings.theme === theme ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-surface'}`}>{theme}</button>
                    ))}
                  </div>
                </div>
                <div><label className="block text-sm font-medium mb-2">Language</label>
                  <select value={appearanceSettings.language} onChange={e => setAppearanceSettings({...appearanceSettings, language: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>English</option><option>Spanish</option><option>French</option><option>German</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                  <div><p className="font-medium">Compact Mode</p><p className="text-sm text-muted">Use a more compact layout</p></div>
                  <button onClick={() => setAppearanceSettings({...appearanceSettings, compactMode: !appearanceSettings.compactMode})} className={`w-12 h-6 rounded-full transition-colors ${appearanceSettings.compactMode ? 'bg-primary' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${appearanceSettings.compactMode ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div><label className="block text-sm font-medium mb-2">Display Name</label><input defaultValue="John Doe" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                <div><label className="block text-sm font-medium mb-2">Email</label><input defaultValue="john@example.com" type="email" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                <div><label className="block text-sm font-medium mb-2">Role</label><input defaultValue="Maintenance Technician" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                <div><label className="block text-sm font-medium mb-2">Phone</label><input defaultValue="+1 (555) 123-4567" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-border">
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                <Save size={18} /><span>Save Changes</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
