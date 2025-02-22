"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Database, Image } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

const PlatformPage = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewsPerImage, setReviewsPerImage] = useState('');
  const [targetedDemographic, setTargetedDemographic] = useState('None');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFolders, setUploadedFolders] = useState<string[]>([]); // State for uploaded folders
  const [classificationType, setClassificationType] = useState('Classification'); // State for classification type

  useEffect(() => {
    // Fetch existing folders when the component mounts
    const fetchFolders = async () => {
      try {
        const response = await axios.get('/api/folders');
        setUploadedFolders(response.data); // Set the uploaded folders
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Handle the upload logic here
      console.log('Uploading file:', selectedFile.name); // Log the file name
      console.log('Classification Type:', classificationType); // Log the classification type

      // nihal save it locally here
      
      // After successful upload, add folder name to the state
      setUploadedFolders((prev) => [...prev, selectedFile.name]); // Add folder name to the state
      setIsModalOpen(false); // Closing the modal
      setSelectedFile(null); // Reset selected file
      setClassificationType('Segmentation'); // Reset type
    }
  };

  const handleUploadClick = () => {
    setActiveTab('upload');
    setIsModalOpen(true);
  };

  const handleFolderClick = (folderName: string) => {
    // Logic to navigate to the analytics page for the folder
    console.log('Folder clicked:', folderName);
    // Add your navigation logic here, e.g., using router.push('/analytics/[folderName]');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                onClick={handleUploadClick}
              >
                Upload
              </button>
              <Link href="/api/auth/logout" className="px-3 py-2 rounded-md">
                LOGOUT
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Folders Uploaded Section */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Folders Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFolders.map((folder, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer" onClick={() => handleFolderClick(folder)}>
                      <div>
                        <h3 className="font-medium">{folder}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modal for Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Upload Files</h2>
            <input
              type="file"
              accept=".zip"
              onChange={handleFileChange}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Reviews per Image:</label>
              <input
                type="number"
                value={reviewsPerImage}
                onChange={(e) => setReviewsPerImage(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Targeted Demographic:</label>
              <select
                value={targetedDemographic}
                onChange={(e) => setTargetedDemographic(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="None">None</option>
                <option value="Adults">Adults</option>
                <option value="Teens">Teens</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Classification Type:</label>
              <select
                value={classificationType}
                onChange={(e) => setClassificationType(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="Classification">Classification</option>
                <option value="Segmentation">Segmentation</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-black rounded-md">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformPage;
