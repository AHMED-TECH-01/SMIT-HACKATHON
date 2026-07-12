import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, BarChart3 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const repairData = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 19 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 22 },
  { month: 'May', count: 18 },
  { month: 'Jun', count: 25 },
]

const categoryData = [
  { name: 'HVAC', value: 35 },
  { name: 'Elevator', value: 25 },
  { name: 'IT', value: 20 },
  { name: 'Power', value: 20 },
]

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444']

const stats = [
  { label: 'Total Repairs', value: '1,248', change: '+12%', trend: 'up', icon: TrendingUp },
  { label: 'Maintenance Cost', value: '$45,230', change: '-5%', trend: 'down', icon: DollarSign },
  { label: 'Avg Downtime', value: '3.2h', change: '-8%', trend: 'down', icon: Clock },
  { label: 'Open Issues', value: '34', change: '+2%', trend: 'up', icon: AlertTriangle },
]

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <select className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-border shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-surface rounded-xl">
                <stat.icon size={24} className="text-primary" />
              </div>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </span>
            </div>
            <p className="text-muted text-sm">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-3xl border border-border shadow-sm"
        >
          <h3 className="font-semibold mb-6">Repair Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={repairData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={3} fill="#2563EB10" />
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
          <h3 className="font-semibold mb-6">Issue Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
