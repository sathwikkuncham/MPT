'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { mockProposals } from '@/lib/mockData'
import { Layout } from '@/components/Layout'

export default function NewProposalForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const router = useRouter()

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, we would add the new proposal to the database here
    // For now, we'll just redirect to the dashboard
    router.push('/')
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-black">New Proposal</h1>
            <p className="text-black">Enter proposal details</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {['Basic Info', 'Biodata', 'Horoscope', 'Images'].map((stepName, i) => (
                <div key={stepName} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    i + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {i + 1}
                  </div>
                  {i < 3 && (
                    <div className={`w-24 h-1 ${
                      i + 1 < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Basic Info', 'Biodata', 'Horoscope', 'Images'].map((stepName) => (
                <span key={stepName} className="text-sm text-black">{stepName}</span>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input id="candidateName" required />
                </div>
                
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" required />
                </div>
                
                <div>
                  <Label htmlFor="receivedDate">Received Date</Label>
                  <Input id="receivedDate" type="date" required />
                </div>
                
                <div>
                  <Label htmlFor="brokerName">Broker Name (if any)</Label>
                  <Input id="brokerName" />
                </div>
                
                <div>
                  <Label htmlFor="initialComments">Initial Comments</Label>
                  <Textarea id="initialComments" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" />
                </div>
                
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" />
                </div>
                
                <div>
                  <Label htmlFor="job">Job</Label>
                  <Input id="job" />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="nakshatra">Nakshatra</Label>
                  <Input id="nakshatra" />
                </div>
                
                <div>
                  <Label htmlFor="raashi">Raashi</Label>
                  <Input id="raashi" />
                </div>
                
                <div>
                  <Label htmlFor="gunaPoints">Guna Points</Label>
                  <Input id="gunaPoints" type="number" />
                </div>
                
                <div>
                  <Label htmlFor="compatibilityNotes">Compatibility Notes</Label>
                  <Textarea id="compatibilityNotes" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="images">Upload Images</Label>
                  <Input id="images" type="file" multiple accept="image/*" />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button 
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="text-black border-black"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step === totalSteps ? (
                <Button type="submit" className="bg-blue-600 text-white">Submit</Button>
              ) : (
                <Button type="button" onClick={nextStep} className="bg-blue-600 text-white">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
      </div>
    </Layout>
  )
}

