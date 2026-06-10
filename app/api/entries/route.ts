import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = formData.get('name') as string
  const message = formData.get('message') as string
  const file = formData.get('image') as File | null

  let imageUrl: string | undefined

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
    const upload = await cloudinary.uploader.upload(base64, {
      folder: 'birthday-alebasi',
    })
    imageUrl = upload.secure_url
  }

  const entry = await prisma.entry.create({
    data: { name, message, imageUrl },
  })

  return NextResponse.json(entry)
}