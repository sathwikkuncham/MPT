'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { mockProposals } from '@/lib/mockData'
import React from 'react'

export default function ComparisonPage() {
  const [selectedProposals, setSelectedProposals] = useState<string[]>([])

  const handleProposalSelection = (id: string) => {
    setSelectedProposals(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const selectedProposalDetails = selectedProposals.map(id => mockProposals.find(p => p.id === id))

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-black">Profile Comparison</h1>
        
        {/* Proposal Selection */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-black">Select Proposals to Compare</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {mockProposals.map(proposal => (
                <div key={proposal.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={proposal.id}
                    checked={selectedProposals.includes(proposal.id)}
                    onChange={() => handleProposalSelection(proposal.id)}
                  />
                  <label htmlFor={proposal.id}>{proposal.candidateName}</label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Side-by-Side Comparison */}
        {selectedProposals.length === 2 && (
          <div className="grid grid-cols-2 gap-6">
            {selectedProposalDetails.map((proposal, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-black">{proposal?.candidateName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-black">Key Metrics</h3>
                    <p className="text-sm text-black">Height: {proposal?.biodataDetails?.height || 'N/A'} cm</p>
                    <p className="text-sm text-black">Education: {proposal?.biodataDetails?.education || 'N/A'}</p>
                    <p className="text-sm text-black">Occupation: {proposal?.biodataDetails?.job || 'N/A'}</p>
                    <p className="text-sm text-black">Location: {proposal?.biodataDetails?.location || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-black">Compatibility Analysis</h3>
                    <p className="text-sm text-black">Nakshatra: {proposal?.horoscopeDetails?.nakshatra || 'N/A'}</p>
                    <p className="text-sm text-black">Raashi: {proposal?.horoscopeDetails?.raashi || 'N/A'}</p>
                    <p className="text-sm text-black">Guna Points: {proposal?.horoscopeDetails?.gunaPoints || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Decision Matrix */}
        {selectedProposals.length === 2 && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-black">Decision Matrix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-black font-medium">Criteria</div>
                <div className="text-black font-medium">{selectedProposalDetails[0]?.candidateName}</div>
                <div className="text-black font-medium">{selectedProposalDetails[1]?.candidateName}</div>
                {['Height', 'Education', 'Occupation', 'Location', 'Nakshatra', 'Raashi', 'Guna Points'].map(criteria => (
                  <React.Fragment key={criteria}>
                    <div className="text-black">{criteria}</div>
                    <div className="text-black">
                      {criteria === 'Height' ? selectedProposalDetails[0]?.biodataDetails?.height || 'N/A' :
                       criteria === 'Education' ? selectedProposalDetails[0]?.biodataDetails?.education || 'N/A' :
                       criteria === 'Occupation' ? selectedProposalDetails[0]?.biodataDetails?.job || 'N/A' :
                       criteria === 'Location' ? selectedProposalDetails[0]?.biodataDetails?.location || 'N/A' :
                       criteria === 'Nakshatra' ? selectedProposalDetails[0]?.horoscopeDetails?.nakshatra || 'N/A' :
                       criteria === 'Raashi' ? selectedProposalDetails[0]?.horoscopeDetails?.raashi || 'N/A' :
                       criteria === 'Guna Points' ? selectedProposalDetails[0]?.horoscopeDetails?.gunaPoints || 'N/A' : 'N/A'}
                    </div>
                    <div className="text-black">
                      {criteria === 'Height' ? selectedProposalDetails[1]?.biodataDetails?.height || 'N/A' :
                       criteria === 'Education' ? selectedProposalDetails[1]?.biodataDetails?.education || 'N/A' :
                       criteria === 'Occupation' ? selectedProposalDetails[1]?.biodataDetails?.job || 'N/A' :
                       criteria === 'Location' ? selectedProposalDetails[1]?.biodataDetails?.location || 'N/A' :
                       criteria === 'Nakshatra' ? selectedProposalDetails[1]?.horoscopeDetails?.nakshatra || 'N/A' :
                       criteria === 'Raashi' ? selectedProposalDetails[1]?.horoscopeDetails?.raashi || 'N/A' :
                       criteria === 'Guna Points' ? selectedProposalDetails[1]?.horoscopeDetails?.gunaPoints || 'N/A' : 'N/A'}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Section */}
        {selectedProposals.length === 2 && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-black">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Enter your notes here" className="w-full" />
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
