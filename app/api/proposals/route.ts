import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const proposals = await prisma.proposal.findMany({
    include: {
      biodataDetails: true,
      horoscopeDetails: true,
    },
  })
  return NextResponse.json(proposals)
}

export async function POST(request: Request) {
  const data = await request.json()
  const proposal = await prisma.proposal.create({
    data: {
      ...data,
      biodataDetails: { create: data.biodataDetails },
      horoscopeDetails: { create: data.horoscopeDetails },
    },
    include: {
      biodataDetails: true,
      horoscopeDetails: true,
    },
  })
  return NextResponse.json(proposal)
}

