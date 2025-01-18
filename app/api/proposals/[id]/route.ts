import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const proposal = await prisma.proposal.findUnique({
    where: { id: params.id },
    include: {
      biodataDetails: true,
      horoscopeDetails: true,
      stageTrackings: true,
      meetings: true,
      images: true,
      comments: true,
    },
  })
  if (!proposal) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
  }
  return NextResponse.json(proposal)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const proposal = await prisma.proposal.update({
    where: { id: params.id },
    data: {
      ...data,
      biodataDetails: { update: data.biodataDetails },
      horoscopeDetails: { update: data.horoscopeDetails },
    },
    include: {
      biodataDetails: true,
      horoscopeDetails: true,
    },
  })
  return NextResponse.json(proposal)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.proposal.delete({
    where: { id: params.id },
  })
  return NextResponse.json({ message: 'Proposal deleted successfully' })
}

