"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Home, Award, Database, Image } from 'lucide-react';
import Link from 'next/link'


const PlatformPage = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Data Labeling Platform</h1>
              <Badge variant="secondary" className="text-sm">Beta</Badge>
            </div>
            <nav className="flex space-x-4">
              <button 
                className={`px-3 py-2 rounded-md ${activeTab === 'tasks' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                onClick={() => setActiveTab('tasks')}
              >
                Tasks
              </button>
              <button 
                className={`px-3 py-2 rounded-md ${activeTab === 'upload' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <Link href="/api/auth/logout" className={`px-3 py-2 rounded-md}`}>
                LOGOUT
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-500" />
                <span>Accuracy Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">98.5%</p>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Database className="w-5 h-5 text-green-500" />
                <span>Tasks Completed</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-sm text-gray-500">Total contributions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Image className="w-5 h-5 text-purple-500" />
                <span>Available Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">89</p>
              <p className="text-sm text-gray-500">Ready to label</p>
            </CardContent>
          </Card>

          {/* Task List */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((task) => (
                    <div key={task} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Image Classification Task #{task}</h3>
                        <p className="text-sm text-gray-500">Label objects in street photography</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Start Task
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlatformPage;