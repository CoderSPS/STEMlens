'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SessionNew() {
  const [subject, setSubject] = useState('Math')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        '/api/sessions',
        { subject, topic, difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      window.location.href = `/session/${response.data.id}`
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-dark to-neural-bg p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink">
          Start Guided Session
        </h1>
        <p className="text-text-muted mb-8">Get AI-powered step-by-step guidance</p>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-neural-bg border border-primary border-opacity-20 rounded-lg p-8 space-y-6">
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
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-3 rounded focus:outline-none focus:border-primary"
              placeholder="e.g., Chain Rule, Recursion, Newton's Laws"
              required
            />
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent-pink text-white font-bold py-3 rounded hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all"
          >
            {loading ? 'Starting Session...' : 'Start Session'}
          </button>
        </form>
      </div>
    </div>
  )
}
