import { useEffect, useMemo, useState } from 'react'
import { Sparkles, Plus, Flame, Trophy, Target, BookOpen, Heart, Briefcase, Palette, Zap } from 'lucide-react'
import {
  createQuest,
  getQuests,
  completeQuest,
  getTotalXp,
  updateQuest,
  deleteQuest
} from './services/questApi'
import type { Quest, QuestCategory, QuestDifficulty } from './types'
import './App.css'


const categoryIcon: Record<QuestCategory, typeof Heart> = {
  HEALTH: Heart, LEARNING: BookOpen, WORK: Briefcase, PERSONAL: Target, CREATIVE: Palette
}
const categoryColour: Record<QuestCategory, string> = {
  HEALTH: 'pink', LEARNING: 'blue', WORK: 'orange', PERSONAL: 'purple', CREATIVE: 'green'
}

export default function App() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [filterDifficulty, setFilterDifficulty] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [totalXp, setTotalXp] = useState(0)
  const [completingId, setCompletingId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<QuestCategory>('LEARNING')
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('EASY')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

async function refresh() {
  try {
    const [questData, xpData] = await Promise.all([
      getQuests(),
      getTotalXp()
    ])

    setQuests(questData)
    setTotalXp(xpData)
    setError('')
  } catch {
    setError('Cannot reach the API. Start the Spring Boot backend on port 8080.')
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { void refresh() }, [])

  const filteredQuests = quests.filter(quest => {
    // Search by title or description
    const matchesSearch =
      quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quest.description || '').toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by category
    const matchesCategory =
      filterCategory === 'ALL' || quest.category === filterCategory

    // Filter by difficulty
    const matchesDifficulty =
      filterDifficulty === 'ALL' || quest.difficulty === filterDifficulty

    // Filter by completion status
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'ACTIVE' && !quest.completed) ||
      (filterStatus === 'COMPLETED' && quest.completed)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesStatus
    )
  })
  const completed = quests.filter(q => q.completed).length
  const earnedXp = totalXp
  const progress = Math.min(100, (earnedXp % 500) / 5)
  const level = Math.floor(earnedXp / 500) + 1

  const suggestions = useMemo(() => [
    { label: 'Read for 20 minutes', category: 'LEARNING' as QuestCategory, icon: BookOpen },
    { label: 'Take a refreshing walk', category: 'HEALTH' as QuestCategory, icon: Heart },
    { label: 'Tidy one small space', category: 'PERSONAL' as QuestCategory, icon: Target }
  ], [])

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault()

    if (!title.trim() || saving) return

    try {
      setSaving(true)

      if (editingId !== null) {
        await updateQuest(editingId, {
          title: title.trim(),
          description,
          category,
          difficulty
        })
      } else {
        await createQuest({
          title: title.trim(),
          description,
          category,
          difficulty
        })
      }

      setTitle('')
      setDescription('')
      setCategory('LEARNING')
      setDifficulty('EASY')
      setEditingId(null)
      setError('')

      await refresh()
    } catch {
      setError('Quest could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(quest: Quest) {
    setEditingId(quest.id)
    setTitle(quest.title)
    setDescription(quest.description || '')
    setCategory(quest.category)
    setDifficulty(quest.difficulty)

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  async function handleComplete(id: number) {
    if (completingId !== null) return

    try {
      setCompletingId(id)

      await completeQuest(id)

      await refresh()
    } catch {
      setError('Could not complete quest. Please try again.')
    } finally {
      setCompletingId(null)
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this quest?'
    )

    if (!confirmed || deletingId !== null) return

    try {
      setDeletingId(id)

      await deleteQuest(id)

      if (editingId === id) {
        setEditingId(null)
        setTitle('')
        setDescription('')
        setCategory('LEARNING')
        setDifficulty('EASY')
      }

      await refresh()
    } catch {
      setError('Could not delete quest. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Sparkles size={22}/></span><span>questboard</span></div>
        <div className="side-label">WORKSPACE</div>
        <a className="nav active"><Target size={18}/> My quests</a>
        <a className="nav"><Trophy size={18}/> Achievements <span className="soon">SOON</span></a>
        <a className="nav"><Flame size={18}/> Daily streak <span className="soon">SOON</span></a>
        <div className="sidebar-bottom"><div className="mini-avatar">Q</div><div><b>Quest explorer</b><small>Your adventure starts here</small></div></div>
      </aside>

      <section className="main-content">
        <header className="topbar"><span>MY SPACE / <b>QUESTS</b></span><span className="today">✨ Make today count</span></header>
        <section className="hero">
          <div><div className="eyebrow">YOUR PERSONAL ADVENTURE</div><h1>Small steps.<br/><span>Big adventures.</span></h1><p>Every quest completed is a little win. What will you conquer today?</p></div>
          <div className="hero-art"><div className="sunburst">✦</div><div className="hero-orb">🚀</div><div className="floating-star star-one">✦</div><div className="floating-star star-two">✧</div><div className="hero-caption">LET'S LEVEL UP!</div></div>
        </section>

        <section className="stats-grid">
          <div className="stat-card xp"><div className="stat-icon"><Zap size={20}/></div><small>TOTAL XP EARNED</small><strong>{earnedXp} <em>XP</em></strong><span>Keep collecting those points!</span></div>
          <div className="stat-card level"><div className="stat-icon"><Trophy size={20}/></div><small>YOUR LEVEL</small><strong>Level {level}</strong><span>Every expert starts somewhere</span></div>
          <div className="stat-card done"><div className="stat-icon"><Target size={20}/></div><small>QUESTS COMPLETED</small><strong>{completed}</strong><span>Wins worth celebrating</span></div>
        </section>

        <section className="level-panel"><div className="level-copy"><b>🌈 Your next level is waiting!</b><span>{earnedXp % 500} / 500 XP to Level {level + 1}</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }}/></div></section>

        <div className="section-heading"><div><div className="eyebrow">THE ADVENTURE LOG</div><h2>Your quests <span>({quests.length})</span></h2></div><span className="live-pill">● LIVE QUESTS</span></div>
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="empty-state">Loading your adventure…</div> : quests.length === 0 ? (
          <div className="empty-state"><div className="empty-emoji">🗺️</div><h3>Your story starts here</h3><p>Create your first quest and start earning XP.</p></div>
        ) : (
            <>
          <div className="filter-panel">

            <input
              type="text"
              placeholder="Search quests..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Categories</option>
              <option value="HEALTH">Health</option>
              <option value="LEARNING">Learning</option>
              <option value="WORK">Work</option>
              <option value="PERSONAL">Personal</option>
              <option value="CREATIVE">Creative</option>
            </select>

            <select
              value={filterDifficulty}
              onChange={e => setFilterDifficulty(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <button
              type="button"
              className="clear-filters-button"
              onClick={() => {
                setSearchTerm('')
                setFilterCategory('ALL')
                setFilterDifficulty('ALL')
                setFilterStatus('ALL')
              }}
            >
              Clear Filters
            </button>

          </div>
          <div className="filter-results">
            Showing <strong>{filteredQuests.length}</strong> of{' '}
            <strong>{quests.length}</strong> quests
          </div>
          <div className="quest-grid">
            {filteredQuests.map(quest => {
            const Icon = categoryIcon[quest.category]
            return <article className={`quest-card ${categoryColour[quest.category]}`} key={quest.id}>

              <div className="quest-card-top"><span className="category-icon"><Icon size={19}/></span><span className="xp-chip">+{quest.xpReward} XP</span></div>
              <h3>{quest.title}</h3><p>{quest.description || 'Your next little adventure.'}</p>
              <div className="quest-meta">
                <span>{quest.category}</span>
                <span className="difficulty">{quest.difficulty}</span>

              </div>


        {quest.completed ? (
          <button className="complete-button completed" disabled>
            ✓ Completed
          </button>
        ) : (
          <button
            className="complete-button"
            onClick={() => handleComplete(quest.id)}
            disabled={completingId !== null}
          >
            {completingId === quest.id ? 'Completing...' : 'Complete Quest ✓'}
          </button>
        )}

        <div className="quest-actions">
          <button
            className="edit-button"
            onClick={() => handleEdit(quest)}
            disabled={saving || deletingId !== null}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => handleDelete(quest.id)}
            disabled={deletingId !== null || saving}
          >
            {deletingId === quest.id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        </article>

          })}
      {filteredQuests.length === 0 && (
        <p className="no-quests">
          No quests found. Try changing your search or filters.
        </p>
      )}
      </div>
      </>
        )}

        <section className="create-section">
          <div className="section-heading"><div><div className="eyebrow">ADD TO YOUR ADVENTURE</div><h2>{editingId !== null ? 'Edit your quest' : 'Create a quest'} <span>✦</span></h2></div></div>
          <form className="quest-form" onSubmit={handleCreate}>
            <label>Quest title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Learn something new today" maxLength={100} required/></label>
            <label>Description <input value={description} onChange={e => setDescription(e.target.value)} placeholder="What's the plan?" maxLength={500}/></label>
            <div className="form-row">
              <label>
                Category
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as QuestCategory)}
                >
                  <option value="LEARNING">Learning</option>
                  <option value="HEALTH">Health</option>
                  <option value="WORK">Work</option>
                  <option value="PERSONAL">Personal</option>
                  <option value="CREATIVE">Creative</option>
                </select>
              </label>

              <label>
                Difficulty
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as QuestDifficulty)}
                  disabled={
                    editingId !== null &&
                    quests.find(q => q.id === editingId)?.completed === true
                  }
                >
                  <option value="EASY">Easy · 10 XP</option>
                  <option value="MEDIUM">Medium · 25 XP</option>
                  <option value="HARD">Hard · 50 XP</option>
                </select>
              </label>

            </div>
            <button className="create-button" type="submit" disabled={saving}>
              <Plus size={18}/>
              {saving
                ? 'Saving...'
                : editingId !== null
                  ? 'Update quest'
                  : 'Create quest'}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setEditingId(null)
                  setTitle('')
                  setDescription('')
                  setCategory('LEARNING')
                  setDifficulty('EASY')
                }}
              >
                Cancel editing
              </button>
            )}
          </form>
        </section>
        <section className="suggestions"><h3>Need a little inspiration?</h3><div className="suggestion-list">{suggestions.map(item => <button key={item.label} onClick={() => {setTitle(item.label); setCategory(item.category)}}><item.icon size={16}/>{item.label}<Plus size={15}/></button>)}</div></section>
        <footer>MADE WITH ✦ AND A LITTLE BIT OF MAGIC · QUESTBOARD</footer>
      </section>
    </main>
  )
}
