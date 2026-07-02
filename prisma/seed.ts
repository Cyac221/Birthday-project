import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  '¿Cuál fue tu primera impresión de Bela?',
  '¿Cuál es el recuerdo más gracioso que tienes con ella?',
  'Si Bela fuera un personaje de película, ¿cuál sería?',
  '¿Qué canción te recuerda a Bela?',
  '¿Cuál es su manía más adorable?',
  'Dile a Bela algo que nunca le has dicho',
  '¿Qué esperas para el próximo año de Bela?',
  // Aqui se agregan el resto de preguntas
]

async function main() {
  await prisma.question.createMany({
    data: questions.map(text => ({ text })),
  })
  console.log(`✅ ${questions.length} preguntas creadas`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })