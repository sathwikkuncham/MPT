import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProposalCard } from '@/components/ProposalCard'
import { mockProposals } from '@/lib/mockData'
import { Layout } from '@/components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <Link href="/proposals/new">
              <Button>New Proposal</Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input placeholder="Search proposals..." className="flex-grow" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="initial">Initial</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="final">Final</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

