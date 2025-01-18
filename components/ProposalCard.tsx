import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Proposal } from '@/lib/mockData'

interface ProposalCardProps {
  proposal: Proposal
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{proposal.candidateName}</CardTitle>
        <Badge>{proposal.currentStage}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Location: {proposal.biodataDetails?.location || 'N/A'}</p>
        <p className="text-sm text-gray-500">Occupation: {proposal.biodataDetails?.job || 'N/A'}</p>
        <p className="text-sm text-gray-500">Received: {new Date(proposal.receivedDate).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/proposals/${proposal.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Button variant="ghost">Quick Action</Button>
      </CardFooter>
    </Card>
  )
}

