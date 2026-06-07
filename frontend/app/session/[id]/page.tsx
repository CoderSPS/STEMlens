'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function Session() {
  const params = useParams()
  const sessionId = params.id as string
  const [session, setSession] = useState<any>(null)
  const [stepText, setStepText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/api/sessions/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setSession(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch session')
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) fetchSession()
  }, [sessionId])

  const handleSubmitStep = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `/api/sessions/${sessionId}/step`,
        { step_text: stepText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setSession(response.data.session)
      setStepText('')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit step')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-neural-dark flex items-center justify-center">Loading session...</div>
  if (error) return <div className="min-h-screen bg-neural-dark flex items-center justify-center text-red-400">{error}</div>
  if (!session) return <div className="min-h-screen bg-neural-dark flex items-center justify-center">No session found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-dark to-neural-bg p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink mb-2">
            {session.topic}
          </h1>
          <p className="text-text-muted">
            {session.subject} • {session.difficulty} • Step {(session.session_steps || []).length + 1}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-neural-bg border border-primary border-opacity-20 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-accent-green mb-4">Your Progress</h2>
              <div className="space-y-4">
                {session.session_steps?.map((step: any, i: number) => (
                  <div key={i} className="bg-neural-dark border-l-4 border-primary p-4 rounded">
                    <div className="font-bold text-primary mb-2">Step {i + 1}</div>
                    <p className="text-text-primary mb-3">{step.user_step_text}</p>
                    <div className="bg-neural-bg p-3 rounded">
                      <p className="text-sm text-text-muted mb-1">AI Feedback:</p>
                      <p className="text-text-primary">{step.ai_feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmitStep} className="bg-neural-bg border border-primary border-opacity-20 rounded-lg p-8">
              <h3 className="text-xl font-bold text-accent-orange mb-4">Submit Your Next Step</h3>
              <textarea
                value={stepText}
                onChange={(e) => setStepText(e.target.value)}
                className="w-full bg-neural-dark border border-primary border-opacity-30 text-text-primary p-4 rounded focus:outline-none focus:border-primary font-mono"
                placeholder="Write your solution step or question..."
                rows={5}
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 bg-gradient-to-r from-primary to-accent-pink text-white font-bold py-3 rounded hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all"
              >
                {submitting ? 'Getting Feedback...' : 'Get AI Feedback'}
              </button>
            </form>
          </div>

          <div className="bg-neural-bg border border-primary border-opacity-20 rounded-lg p-8 h-fit">
            <h3 className="text-xl font-bold text-accent-pink mb-4">💡 Hint</h3>
            {session.session_steps && session.session_steps.length > 0 ? (
              <p className="text-text-primary">
                {session.session_steps[session.session_steps.length - 1].ai_hint}
              </p>
            ) : (
              <p className="text-text-muted">Submit your first step to get a hint</p>
            )}

            <div className="mt-6 pt-6 border-t border-primary border-opacity-20">
              <p className="text-sm text-text-muted mb-4">Session Info</p>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-text-muted">Subject</p>
                  <p className="text-text-primary font-semibold">{session.subject}</p>
                </div>
                <div>
                  <p className="text-text-muted">Difficulty</p>
                  <p className="text-text-primary font-semibold">{session.difficulty}</p>
                </div>
                <div>
                  <p className="text-text-muted">Steps Completed</p>
                  <p className="text-text-primary font-semibold">{session.session_steps?.length || 0}</p>
                </div>
              </div>
            </div>

            <a
              href="/dashboard"
              className="w-full block text-center mt-6 border-2 border-primary text-primary font-bold py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
