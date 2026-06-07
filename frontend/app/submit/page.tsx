'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Submit() {
  const router = useRouter()
  const [subject, setSubject] = useState('Math')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [codeSnippet, setCodeSnippet] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFile(e.target.files[0])
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAudioFile(e.target.files[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('subject', subject)
      formData.append('topic', topic)
      formData.append('difficulty', difficulty)
      if (imageFile) formData.append('image', imageFile)
      if (audioFile) formData.append('audio', audioFile)
      if (codeSnippet) formData.append('code', codeSnippet)

      const token = localStorage.getItem('token')
      const response = await axios.post('/api/submissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      router.push(`/analysis/${response.data.id}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-dark to-neural-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink">
          Submit Your Work
        </h1>
        <p className="text-text-muted mb-8">Upload handwritten notes, diagrams, audio, or code</p>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded focus:outline-none focus:border-primary"
              >
                <option>Math</option>
                <option>Physics</option>
                <option>Computer Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded focus:outline-none focus:border-primary"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded focus:outline-none focus:border-primary"
              placeholder="e.g., Calculus, Recursion, Forces"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Upload Handwritten Solution
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded"
            />
            {imageFile && <p className="text-accent-green text-sm mt-2">✓ {imageFile.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Record Audio Explanation
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded"
            />
            {audioFile && <p className="text-accent-green text-sm mt-2">✓ {audioFile.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Code Snippet
            </label>
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded focus:outline-none focus:border-primary font-mono"
              placeholder="Paste your code here..."
              rows={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent-pink text-white font-bold py-3 rounded hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all"
          >
            {loading ? 'Analyzing...' : 'Submit & Analyze'}
          </button>
        </form>
      </div>
    </div>
  )
}
