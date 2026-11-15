import type { Quest, QuestCategory, QuestDifficulty } from '../types'

const API_URL = 'http://localhost:8080/api/quests'

export async function getQuests(): Promise<Quest[]> {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Could not load quests')
  return response.json()
}

export async function createQuest(input: {
  title: string
  description: string
  category: QuestCategory
  difficulty: QuestDifficulty
}): Promise<Quest> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  })
  if (!response.ok) throw new Error('Could not create quest')
  return response.json()
}


export async function completeQuest(id: number): Promise<Quest> {
  const response = await fetch(`${API_URL}/${id}/complete`, {
    method: 'PATCH'
  })

  if (!response.ok) {
    throw new Error('Could not complete quest')
  }

  return response.json()
}

export async function getTotalXp(): Promise<number> {
  const response = await fetch(`${API_URL}/xp`)

  if (!response.ok) {
    throw new Error('Could not load XP')
  }

  return response.json()
}

export async function updateQuest(
  id: number,
  input: {
    title: string
    description: string
    category: QuestCategory
    difficulty: QuestDifficulty
  }
): Promise<Quest> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  })

  if (!response.ok) throw new Error('Could not update quest')
  return response.json()
}

export async function deleteQuest(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) throw new Error('Could not delete quest')
}