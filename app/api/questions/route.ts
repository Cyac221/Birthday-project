import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      where: { isActive: true },
      select: { id: true, text: true },
    })
    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error en API questions:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}