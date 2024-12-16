import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const todos = await prisma.todo.findMany({
    where: {
      assigneeId: session.user.id
    }
  })

  return NextResponse.json(todos)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, type } = await req.json()

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      type,
      assigneeId: session.user.id
    }
  })

  return NextResponse.json(todo)
}

