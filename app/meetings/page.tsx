'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MeetingSchedulerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Meeting Scheduler</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          {/* Meeting Form */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Meeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initial">Initial Meeting</SelectItem>
                    <SelectItem value="family">Family Meeting</SelectItem>
                    <SelectItem value="horoscope">Horoscope Matching</SelectItem>
                    <SelectItem value="final">Final Discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                <Input placeholder="Enter attendee names" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <Input placeholder="Enter meeting location" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
                <Textarea placeholder="Enter meeting agenda" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Schedule Meeting</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Previous Meetings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Previous Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { date: '2024-02-15', type: 'Initial Meeting', attendees: 'John Doe, Jane Smith' },
                { date: '2024-02-10', type: 'Family Meeting', attendees: 'John Doe, Jane Smith, Mr. & Mrs. Doe' },
                { date: '2024-02-05', type: 'Horoscope Matching', attendees: 'John Doe, Jane Smith, Astrologer' },
              ].map((meeting, index) => (
                <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{meeting.type}</p>
                    <p className="text-sm text-gray-500">{meeting.attendees}</p>
                  </div>
                  <div className="text-right">
                    <Badge>{meeting.date}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

