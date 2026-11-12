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
