'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockProposals } from '@/lib/mockData'
import { ProposalCard } from '@/components/ProposalCard'

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProposals, setSelectedProposals] = useState<string[]>([])

  const toggleProposalSelection = (id: string) => {
    setSelectedProposals(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Search Proposals</h1>
        
        {/* Search Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Input placeholder="Candidate Name" className="flex-grow" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Current Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Screening</SelectItem>
                  <SelectItem value="meeting">Family Meeting</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="final">Final Decision</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" className="w-[180px]" placeholder="Received After" />
            </div>
            <div className="flex justify-between">
              <Button variant="outline">More Filters</Button>
              <div className="space-x-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Search Results Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date Received</SelectItem>
                <SelectItem value="stage">Current Stage</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setViewMode('grid')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('list')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </Button>
          </div>
          <Button variant="outline">Save Search</Button>
        </div>
        
        {/* Search Results */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {mockProposals.map((proposal) => (
            <div key={proposal.id} className="relative">
              <Checkbox
                checked={selectedProposals.includes(proposal.id)}
                onCheckedChange={() => toggleProposalSelection(proposal.id)}
                className="absolute top-2 left-2 z-10"
              />
              <ProposalCard proposal={proposal} />
            </div>
          ))}
        </div>
        
        {/* Bulk Actions */}
        {selectedProposals.length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <span>{selectedProposals.length} selected</span>
            <Button variant="outline">Update Stage</Button>
            <Button variant="outline">Assign To</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

