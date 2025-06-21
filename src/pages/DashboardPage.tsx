import React, { useState } from 'react';
import { Plus, BarChart3, Users, Calendar, Settings, Upload, QrCode, Eye, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const mockCampaigns = [
    {
      id: '1',
      name: 'Digital Diplomas 2024',
      type: 'Education',
      status: 'Active',
      total: 500,
      claimed: 342,
      created: '2024-01-15'
    },
    {
      id: '2',
      name: 'Student ID Cards',
      type: 'Identity',
      status: 'Active',
      total: 1200,
      claimed: 856,
      created: '2024-02-01'
    },
    {
      id: '3',
      name: 'Alumni Network Pass',
      type: 'Membership',
      status: 'Draft',
      total: 0,
      claimed: 0,
      created: '2024-03-10'
    }
  ];

  const stats = [
    { label: 'Total Campaigns', value: '12', change: '+2 this month', icon: BarChart3 },
    { label: 'Active NFTs', value: '3,456', change: '+234 this week', icon: Users },
    { label: 'Total Claims', value: '1,198', change: '+45 today', icon: Calendar },
    { label: 'Verification Rate', value: '98.5%', change: '+0.3% this month', icon: Settings }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400">Please sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user.name}
              </h1>
              <p className="text-gray-400">
                {user.organization?.name} Dashboard
              </p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-medium hover:from-primary-700 hover:to-primary-800 transition-all">
              <Plus className="w-5 h-5" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-dark-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-dark-800 border border-dark-700 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-xs text-green-400">{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Create Campaign</h3>
                </div>
                <p className="text-gray-400 mb-4">Upload metadata and launch a new NFT campaign</p>
                <button className="w-full py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors">
                  Get Started
                </button>
              </div>

              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">QR Verification</h3>
                </div>
                <p className="text-gray-400 mb-4">Generate QR codes for NFT verification</p>
                <button className="w-full py-2 bg-secondary-600 hover:bg-secondary-700 rounded-lg text-white transition-colors">
                  Generate QR
                </button>
              </div>

              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-accent-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">View Analytics</h3>
                </div>
                <p className="text-gray-400 mb-4">Track performance and engagement metrics</p>
                <button className="w-full py-2 bg-accent-600 hover:bg-accent-700 rounded-lg text-white transition-colors">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Campaigns</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </button>
            </div>

            <div className="space-y-4">
              {mockCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-6 bg-dark-800 border border-dark-700 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{campaign.type}</span>
                        <span>•</span>
                        <span>Created {campaign.created}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-dark-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-white">{campaign.total}</p>
                      <p className="text-sm text-gray-400">Total Supply</p>
                    </div>
                    <div className="text-center p-4 bg-dark-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary-400">{campaign.claimed}</p>
                      <p className="text-sm text-gray-400">Claimed</p>
                    </div>
                    <div className="text-center p-4 bg-dark-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-secondary-400">
                        {campaign.total > 0 ? Math.round((campaign.claimed / campaign.total) * 100) : 0}%
                      </p>
                      <p className="text-sm text-gray-400">Completion</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 bg-secondary-600/20 text-secondary-400 rounded-lg hover:bg-secondary-600/30 transition-colors">
                        <QrCode className="w-4 h-4" />
                        <span>QR Code</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 bg-accent-600/20 text-accent-400 rounded-lg hover:bg-accent-600/30 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
                <div className="h-64 bg-dark-700/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Chart visualization would go here</p>
                </div>
              </div>
              
              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">User Engagement</h3>
                <div className="h-64 bg-dark-700/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Engagement metrics would go here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Organization Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Organization Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.organization?.name}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-dark-800 border border-dark-700 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Blockchain Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Default Network
                    </label>
                    <select className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none">
                      <option>Polygon</option>
                      <option>Ethereum</option>
                      <option>Optimism</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};