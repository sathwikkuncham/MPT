'use client'

import { useParams } from 'next/navigation'
import { Calendar, User, BookOpen, MessageSquare, ImageIcon, Star } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockProposals } from '@/lib/mockData'
import { Layout } from '@/components/Layout'

export default function ProposalDetail() {
  const { id } = useParams()
  const proposal = mockProposals.find(p => p.id === id)

  if (!proposal) {
    return <Layout><div>Proposal not found</div></Layout>
  }

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="bg-white shadow-sm -mx-4 sm:-mx-6 lg:-mx-8 mb-6">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-black">{proposal.candidateName}</h1>
                <p className="text-black">Received on {new Date(proposal.receivedDate).toLocaleDateString()}</p>
              </div>
              <Badge className="bg-blue-100 text-black">{proposal.currentStage}</Badge>
            </div>
          </div>
        </div>

        {/* Stage Progress */}
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-black mb-4">Progress Tracker</h2>
            <div className="flex items-center gap-2">
              {['Initial Screening', 'Family Meeting', 'Horoscope Matching', 'Final Decision', 'Engagement'].map((stage, index) => (
                <div key={stage} className="flex-1">
                  <div className={`h-2 rounded ${
                    index < 2 ? 'bg-blue-600' : 
                    index === 2 ? 'bg-blue-200' : 
                    'bg-gray-200'
                  }`} />
                  <p className="text-sm mt-2 text-black">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <Tabs defaultValue="biodata" className="bg-white rounded-lg shadow-sm">
            <TabsList className="border-b p-2 bg-blue-50">
              <TabsTrigger value="biodata" className="gap-2 text-black">
                <User className="h-4 w-4" /> Biodata
              </TabsTrigger>
              <TabsTrigger value="horoscope" className="gap-2 text-black">
                <Star className="h-4 w-4" /> Horoscope
              </TabsTrigger>
              <TabsTrigger value="meetings" className="gap-2 text-black">
                <Calendar className="h-4 w-4" /> Meetings
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-2 text-black">
                <BookOpen className="h-4 w-4" /> Notes
              </TabsTrigger>
              <TabsTrigger value="images" className="gap-2 text-black">
                <ImageIcon className="h-4 w-4" /> Images
              </TabsTrigger>
              <TabsTrigger value="comments" className="gap-2 text-black">
                <MessageSquare className="h-4 w-4" /> Comments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="biodata" className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-black">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-black">Height</label>
                      <p>{proposal.biodataDetails?.height ? `${proposal.biodataDetails.height} cm` : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-black">Education</label>
                      <p>{proposal.biodataDetails?.education || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-black">Occupation</label>
                      <p>{proposal.biodataDetails?.job || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-black">Location</label>
                      <p>{proposal.biodataDetails?.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-black">Family Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Parent Details</label>
                      <p>{proposal.biodataDetails?.parentDetails || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Siblings</label>
                      <p>{proposal.biodataDetails?.siblingDetails || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Own House</label>
                      <p>{proposal.biodataDetails?.ownHouse ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Rental Income</label>
                      <p>{proposal.biodataDetails?.rentalIncome ? `₹${proposal.biodataDetails.rentalIncome}` : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="horoscope" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium text-black">Horoscope Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-black">Nakshatra</label>
                    <p>{proposal.horoscopeDetails?.nakshatra || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Raashi</label>
                    <p>{proposal.horoscopeDetails?.raashi || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black">Guna Points</label>
                    <p>{proposal.horoscopeDetails?.gunaPoints || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-black">Compatibility Notes</label>
                  <p className="mt-1">{proposal.horoscopeDetails?.compatibilityNotes || 'N/A'}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="meetings" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium text-black">Meeting History</h3>
                <ul className="space-y-4">
                  <li className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">First Meeting</p>
                        <p className="text-sm text-gray-500">January 20, 2024</p>
                      </div>
                      <Badge>Completed</Badge>
                    </div>
                    <p className="mt-2 text-sm">Initial meeting with the family. Discussed basic expectations and preferences.</p>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">House Visit</p>
                        <p className="text-sm text-gray-500">February 5, 2024</p>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <p className="mt-2 text-sm">Planned visit to the candidate's family home.</p>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium text-black">Notes</h3>
                <p>{proposal.initialImpression || 'No notes available.'}</p>
              </div>
            </TabsContent>

            <TabsContent value="images" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium text-black">Images</h3>
                <p>No images available.</p>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium text-black">Comments</h3>
                <p>No comments available.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}

