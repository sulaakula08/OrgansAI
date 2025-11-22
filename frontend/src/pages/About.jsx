import { motion } from 'framer-motion'
import { Heart, Shield, Zap, Users, Target, Award } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'State-of-the-art machine learning models trained on extensive medical imaging datasets',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and stored securely with HIPAA-compliant practices',
    },
    {
      icon: Heart,
      title: 'Comprehensive Reports',
      description: 'Detailed analysis with visual diagrams, charts, and actionable recommendations',
    },
    {
      icon: Target,
      title: 'Multi-Organ Support',
      description: 'Specialized AI models for heart, lungs, brain, liver, kidney, and eye analysis',
    },
    {
      icon: Users,
      title: 'Healthcare Professionals',
      description: 'Designed to assist medical professionals in diagnosis and treatment planning',
    },
    {
      icon: Award,
      title: 'Research-Backed',
      description: 'Built on peer-reviewed research and validated medical imaging techniques',
    },
  ]

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About OrganCare AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Revolutionizing medical diagnosis through advanced artificial intelligence
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              OrganCare AI is dedicated to making advanced medical imaging analysis accessible
              to healthcare professionals worldwide. Our platform leverages cutting-edge artificial
              intelligence to provide accurate, fast, and comprehensive analysis of medical images
              for various organs.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe that AI can augment the capabilities of medical professionals, helping them
              make more informed decisions and ultimately improve patient outcomes. Our goal is to
              bridge the gap between advanced AI technology and practical medical applications.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Technology Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• React.js - Modern UI framework</li>
                  <li>• Tailwind CSS - Utility-first styling</li>
                  <li>• Framer Motion - Smooth animations</li>
                  <li>• Recharts - Data visualization</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Backend & AI
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• FastAPI - High-performance API framework</li>
                  <li>• Python - AI/ML processing</li>
                  <li>• JWT - Secure authentication</li>
                  <li>• Deep Learning Models - Medical image analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Important Disclaimer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            OrganCare AI is designed to assist healthcare professionals in medical image analysis.
            The results provided by our AI models are for informational purposes only and should
            not be used as a substitute for professional medical judgment, diagnosis, or treatment.
            Always consult with qualified healthcare professionals for medical decisions.
          </p>
        </motion.section>
      </div>
    </div>
  )
}

export default About

