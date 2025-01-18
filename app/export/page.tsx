'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockProposals } from '@/lib/mockData'

export default function ExportPage() {
  const [selectedProposals, setSelectedProposals] = useState<string[]>([])
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf')

  const toggleProposalSelection = (id: string) => {
    setSelectedProposals(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleFieldSelection = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  const handleExport = () => {
    // In a real application, this would trigger the export process
    console.log('Exporting', selectedProposals, 'with fields', selectedFields, 'in', exportFormat, 'format')
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Export Proposals</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Proposals</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto">
              {mockProposals.map(proposal => (
                <div key={proposal.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={proposal.id}
                    checked={selectedProposals.includes(proposal.id)}
                    onCheckedChange={() => toggleProposalSelection(proposal.id)}
                  />
                  <label htmlFor={proposal.id}>{proposal.candidateName}</label>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Select Fields</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto">
              {[
                'Candidate Name',
                'Contact Person',
                'Received Date',
                'Current Stage',
                'Overall Status',
                'Biodata Details',
                'Horoscope Details',
                'Meeting History',
                'Comments'
              ].map(field => (
                <div key={field} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={field}
                    checked={selectedFields.includes(field)}
                    onCheckedChange={() => toggleFieldSelection(field)}
                  />
                  <label htmlFor={field}>{field}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Select value={exportFormat} onValueChange={(value: 'pdf' | 'excel') => setExportFormat(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport}>
                Export {selectedProposals.length} Proposal{selectedProposals.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

