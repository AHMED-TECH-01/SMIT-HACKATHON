import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Box, 
  AlertTriangle, 
  Wrench, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight,
  Activity
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const stats = [
  { label: 'Total Assets', value: '1,248', icon: Box, color: 'bg-blue-100 text-blue-600', path: '/assets' },
  { label: 'Active Issues', value: '34', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-600', path: '/issues' },
  { label: 'Maintenance Today', value: '12', icon: Wrench, color: 'bg-green-100 text-green-600', path: '/maintenance' },
  { label: 'Resolved Today', value: '28', icon: CheckCircle2, color: 'bg-purple-100 text-purple-600', path: '/history' },
]

const chartData = [
  { name: 'Mon', issues: 4, maintenance: 2 },
  { name: 'Tue', issues: 6, maintenance: 5 },
  { name: 'Wed', issues: 3, maintenance: 4 },
  { name: 'Thu', issues: 8, maintenance: 6 },
  { name: 'Fri', issues: 5, maintenance: 7 },
  { name: 'Sat', issues: 2, maintenance: 3 },
  { name: 'Sun', issues: 1, maintenance: 1 },
]

const recentActivities = [
  { id: 1, action: 'Reported issue for Printer-001', user: 'John Doe', time: '2 min ago' },
  { id: 2, action: 'Completed maintenance on HVAC-23', user: 'Jane Smith', time: '15 min ago' },
  { id: 3, action: 'Added new asset: Laptop-456', user: 'Mike Johnson', time: '1 hour ago' },
]

const upcomingServices = [
  { id: 1, asset: 'HVAC-01', date: 'Today, 2:00 PM', priority: 'High' },
  { id: 2, asset: 'Elevator-02', date: 'Tomorrow, 10:00 AM', priority: 'Medium' },
  { id: 3, asset: 'Generator-05', date: 'Dec 20, 3:00 PM', priority: 'Low' },
]

const criticalIssues = [
  { id: 1, asset: 'Asset-001', name: 'HVAC System', location: 'Floor 1' },
  { id: 2, asset: 'Asset-002', name: 'Elevator', location: 'Floor 2' },
  { id: 3, asset: 'Asset-003', name: 'Generator', location: 'Floor 3' },
]

export const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate(stat.path)}
            className="bg-white p-6 rounded-3xl border border-border shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon size={28} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-3xl border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Maintenance Activity</h2>
            <select className="border border-border rounded-xl px-3 py-2 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px'
                  }}
                />
                <Line type="monotone" dataKey="issues" stroke="#EF4444" strokeWidth={3} />
                <Line type="monotone" dataKey="maintenance" stroke="#2563EB" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-3xl border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Upcoming Services</h2>
            <Calendar size={20} className="text-muted" />
          </div>
          <div className="space-y-4">
            {upcomingServices.map((service) => (
              <div key={service.id} className="p-4 bg-surface rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{service.asset}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    service.priority === 'High' 
                      ? 'bg-red-100 text-red-600' 
                      : service.priority === 'Medium' 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-green-100 text-green-600'
                  }`}>
                    {service.priority}
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{service.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-3xl border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Activity size={20} className="text-muted" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-surface rounded-2xl transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted">{activity.user} &middot; {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-3xl border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Critical Issues</h2>
            <button 
              onClick={() => navigate('/issues')}
              className="text-primary text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {criticalIssues.map((issue) => (
              <div 
                key={issue.id} 
                onClick={() => navigate('/issues')}
                className="flex items-center justify-between p-4 bg-red-50 rounded-2xl cursor-pointer hover:bg-red-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-red-800">{issue.name} Not Responding</p>
                  <p className="text-sm text-red-600">Location: {issue.location}</p>
                </div>
                <ArrowUpRight size={20} className="text-red-600" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
