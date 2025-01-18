'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockProposals } from '@/lib/mockData'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const stageData = mockProposals.reduce((acc, proposal) => {
    acc[proposal.currentStage] = (acc[proposal.currentStage] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(stageData).map(([name, value]) => ({ name, value }))

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Reports & Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">{mockProposals.length}</p>
                  <p className="text-sm text-gray-500">Total Proposals</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockProposals.filter(p => p.overallStatus === 'Positive').length}
                  </p>
                  <p className="text-sm text-gray-500">Positive Outcomes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockProposals.filter(p => p.currentStage === 'Final Decision').length}
                  </p>
                  <p className="text-sm text-gray-500">In Final Stage</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round((mockProposals.filter(p => p.overallStatus === 'Positive').length / mockProposals.length) * 100)}%
                  </p>
                  <p className="text-sm text-gray-500">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Stage-wise Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Timeline Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-40"
              />
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-40"
              />
              <Button>Apply</Button>
            </div>
            <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
              Timeline chart placeholder
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center mb-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="initial">Initial Screening</SelectItem>
              <SelectItem value="meeting">Family Meeting</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="final">Final Decision</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>
    </Layout>
  )
}

