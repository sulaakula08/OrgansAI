import { motion } from 'framer-motion'
import { ArrowLeft, Download, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const ResultDisplay = ({ result, organName, onBack }) => {
  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  // Parse result data - adjust based on actual API response structure
  const analysisData = result.analysis || {}
  const findings = result.findings || []
  const recommendations = result.recommendations || []
  const confidence = result.confidence || 0

  // Sample chart data - replace with actual data from API
  const chartData = [
    { name: 'Normal', value: 75 },
    { name: 'Abnormal', value: 20 },
    { name: 'Critical', value: 5 },
  ]

  const riskData = [
    { name: 'Low Risk', value: 60 },
    { name: 'Medium Risk', value: 30 },
    { name: 'High Risk', value: 10 },
  ]

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="text-primary-600 dark:text-primary-400 hover:underline mb-4 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Analysis
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
            Analysis Results - {organName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered analysis completed successfully
          </p>
        </motion.div>

        {/* Confidence Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Analysis Confidence
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {confidence}% confidence in the analysis results
              </p>
            </div>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(confidence / 100) * 351.86} 351.86`}
                  className="text-primary-600"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {confidence}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Findings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-primary-600" />
              Key Findings
            </h3>
            <div className="space-y-3">
              {findings.length > 0 ? (
                findings.map((finding, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{finding}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200">
                    {result.summary || 'No significant findings detected in the analysis.'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{rec}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-gray-800 dark:text-gray-200">
                    Continue regular monitoring. Consult with a healthcare professional for detailed interpretation.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Analysis Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Risk Assessment
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Detailed Analysis */}
        {result.detailed_analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Detailed Analysis Report
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {result.detailed_analysis}
              </p>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4 mt-6"
        >
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
          <button onClick={onBack} className="btn-secondary">
            New Analysis
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultDisplay

