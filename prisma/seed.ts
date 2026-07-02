import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  '¿Dónde y cómo fue la primera vez que nos conocimos?',
  'Cuéntanos un dato random sobre mí que creas que pocos saben',
  'Menciona tres valores o cualidades que admiras de mí y que te inspiran',
  'Si pudieras regalarme un superpoder por mi cumpleaños, ¿cuál sería y por qué?',
  '¿Recuerdas un momento en el que sentiste que te inspiré o te animé a hacer algo diferente?',
  '¿Cuál es el talento o habilidad que más admiras en mí?',
  'Cuéntame de un momento en que sentiste que fui un apoyo importante para ti',
  'Si yo fuera un personaje de un cuento, ¿quién sería y por qué?',
  'Si mi vida fuera una película, ¿qué título tendría?',
  '¿Cuál crees que sería mi profesión en una vida paralela?',
  'Si yo tuviera una estatua en una plaza, ¿qué estaría haciendo?',
  '¿Cuál fue tu primera impresión de mí? ¿Qué tan acertada o equivocada terminó siendo?',
  'Si tuvieras que guardar un solo recuerdo conmigo para siempre, ¿cuál elegirías?',
  '¿Qué haría yo si me ganara la lotería mañana?',
  'Si yo tuviera que participar en un reality show, ¿cuál ganaría?',
  '¿Cuál es el recuerdo más feliz que tienes conmigo?',
  '¿Qué cualidad mía crees que me ha ayudado más a llegar hasta donde estoy?',
  '¿Qué hago que te hace sentir querido, acompañado o valorado?',
  '¿Qué tres palabras usarías para presentarme a alguien que no me conoce?',
  '¿Qué es algo que aprendiste de mí?',
  'Si pudieras darme un consejo para seguir creciendo, ¿cuál sería?',
  '¿En qué situación crees que suelo complicarme más de la cuenta?',
  '¿Qué me recomendarías dejar atrás este año?',
  'Si tuvieras que ponerme una multa por algo, ¿por qué sería?',
  '¿Qué me recomendarías priorizar durante este nuevo año?',
  '¿En qué aspecto crees que debería creer más en mí misma?',
  '¿Qué cosas te recuerdan a mí?',
  'Cuando piensas en mí, ¿qué sabor viene a tu mente? Descríbelo',
  'Cuando piensas en mí, ¿qué color viene a tu mente?',
]

async function main() {
  // Borra las preguntas de ejemplo/prueba antes de cargar las oficiales
  await prisma.question.deleteMany({})

  await prisma.question.createMany({
    data: questions.map(text => ({ text })),
  })
  console.log(`✅ ${questions.length} preguntas oficiales creadas`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })