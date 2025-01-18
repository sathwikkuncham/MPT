'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Layout } from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { mockProposals } from '@/lib/mockData'

export default function StageManagementPage() {
  const { id } = useParams()
  const proposal = mockProposals.find(p => p.id === id)
  const [currentStage, setCurrentStage] = useState(proposal?.currentStage || '')
  const [decision, setDecision] = useState<'Yes' | 'No' | 'Maybe' | ''>('')
  const [notes, setNotes] = useState('')

  const stages = ['Initial Screening', 'Family Meeting', 'Horoscope Matching', 'Negotiation', 'Final Decision']
  const currentStageIndex = stages.indexOf(currentStage)

  const requirements = [
    'Family background check',
    'Financial status verification',
    'Horoscope compatibility',
    'Personal meeting',
    'Reference check'
  ]

  const [completedRequirements, setCompletedRequirements] = useState<string[]>([])

  const handleRequirementToggle = (requirement: string) => {
    setCompletedRequirements(prev =>
      prev.includes(requirement)
        ? prev.filter(r => r !== requirement)
        : [...prev, requirement]
    )
  }

  if (!proposal) {
    return <div>Proposal not found</div>
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Stage Management: {proposal.candidateName}</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Stage: {currentStage}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              {stages.map((stage, index) => (
                <div key={stage} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStageIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-8 h-1 ${
                      index < currentStageIndex ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Select value={currentStage} onValueChange={setCurrentStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select new stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Stage Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={decision} onValueChange={setDecision as (value: string) => void}>
              <SelectTrigger>
                <SelectValue placeholder="Select decision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Maybe">Maybe</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              className="mt-4"
              placeholder="Notes for stage completion"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Requirements Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            {requirements.map(requirement => (
              <div key={requirement} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={requirement}
                  checked={completedRequirements.includes(requirement)}
                  onCheckedChange={() => handleRequirementToggle(requirement)}
                />
                <label htmlFor={requirement}>{requirement}</label>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Plan next steps" />
            <Button className="mt-4">Save and Proceed</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

