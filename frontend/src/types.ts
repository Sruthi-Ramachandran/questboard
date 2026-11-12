export type QuestCategory = 'HEALTH' | 'LEARNING' | 'WORK' | 'PERSONAL' | 'CREATIVE'
export type QuestDifficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface Quest {
  id: number
  title: string
  description: string
  category: QuestCategory
  difficulty: QuestDifficulty
  xpReward: number
  completed: boolean
}
