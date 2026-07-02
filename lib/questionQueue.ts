export type Question = { id: string; text: string }

const STORAGE_KEY = 'dinamicas_queue_v1'
const LAST_SHOWN_KEY = 'dinamicas_last_shown_v1'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function loadQueue(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveQueue(queue: Question[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
}

function getLastShownId(): string | null {
  return localStorage.getItem(LAST_SHOWN_KEY)
}

function setLastShownId(id: string) {
  localStorage.setItem(LAST_SHOWN_KEY, id)
}

export function getNextQuestion(allQuestions: Question[]): Question | null {
  if (allQuestions.length === 0) return null

  let queue = loadQueue()

  // Si la cola está vacía o quedó desincronizada (cambiaron las preguntas en la BD), se rearma
  const queueIsValid = queue.length > 0 && queue.every(q => allQuestions.some(a => a.id === q.id))

  if (!queueIsValid) {
    queue = shuffle(allQuestions)
    const lastShown = getLastShownId()
    if (queue[0].id === lastShown && queue.length > 1) {
      [queue[0], queue[1]] = [queue[1], queue[0]]
    }
  }

  const [next, ...rest] = queue
  saveQueue(rest)
  setLastShownId(next.id)
  return next
}