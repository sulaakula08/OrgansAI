import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, FileImage, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import ResultDisplay from '../components/ResultDisplay'

const organLabels = {
  heart: 'Heart',
  lungs: 'Lungs',
  brain: 'Brain',
  liver: 'Liver',
  kidney: 'Kidney',
  eye: 'Eye',
}

const OrganDetail = () => {
  const { organName } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    age: '',
    symptoms: '',
    medicalHistory: '',
    additionalInfo: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
    }))
    setImages([...images, ...newImages])
  }

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (images.length === 0) {
      setError('Please upload at least one image')
      return
    }

    if (!user) {
      navigate('/signin')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      images.forEach((img) => {
        formDataToSend.append('images', img.file)
      })
      formDataToSend.append('organ', organName)
      formDataToSend.append('age', formData.age)
      formDataToSend.append('symptoms', formData.symptoms)
      formDataToSend.append('medical_history', formData.medicalHistory)
      formDataToSend.append('additional_info', formData.additionalInfo)

      const response = await axios.post('/api/analyze', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ResultDisplay result={result} organName={organName} onBack={() => setResult(null)} />
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 dark:text-primary-400 hover:underline mb-4 flex items-center"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
            {organLabels[organName] || organName} Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload medical images and provide patient information for AI analysis
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card space-y-6"
        >
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Medical Images (CT scans, X-rays, etc.)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={loading}
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  PNG, JPG, DICOM up to 10MB
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Patient Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="input-field"
                placeholder="Enter patient age"
                min="0"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Symptoms
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Describe symptoms (e.g., chest pain, shortness of breath)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medical History
              </label>
              <textarea
                value={formData.medicalHistory}
                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Previous conditions, medications, allergies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="input-field"
                rows="2"
                placeholder="Any other relevant information"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Analysis...</span>
              </>
            ) : (
              <>
                <FileImage className="w-5 h-5" />
                <span>Analyze Images</span>
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default OrganDetail

