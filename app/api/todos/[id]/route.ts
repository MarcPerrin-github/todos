import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, status, type } = await req.json()

  const todo = await prisma.todo.update({
    where: {
      id: params.id,
      assigneeId: session.user.id
    },
    data: {
      title,
      description,
      status,
      type
    }
  })

  return NextResponse.json(todo)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.todo.delete({
    where: {
      id: params.id,
      assigneeId: session.user.id
    }
  })

  return NextResponse.json({ message: 'Todo deleted successfully' })
}

