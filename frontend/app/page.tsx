'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-dark to-neural-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink">
          NeuroSTEM Atlas
        </h1>
        <p className="text-xl text-text-muted mb-8 max-w-2xl">
          AI × STEM education platform that reconstructs, diagnoses, and teaches STEM reasoning from handwritten work, diagrams, voice, and code.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/auth/signup" className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-accent-pink transition-colors">
            Get Started
          </a>
          <a href="/auth/login" className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
