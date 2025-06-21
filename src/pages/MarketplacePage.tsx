import React, { useState } from 'react';
import { Search, Filter, Grid, List, Eye, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NFT {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  organization: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  likes: number;
  views: number;
}

export const MarketplacePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const mockNFTs: NFT[] = [
    {
      id: '1',
      title: 'Digital Diploma - Computer Science',
      description: 'Official Computer Science degree from Tech University',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '0.05 ETH',
      organization: 'Tech University',
      category: 'education',
      rarity: 'Legendary',
      likes: 24,
      views: 156
    },
    {
      id: '2',
      title: 'Championship Final Ticket',
      description: 'Exclusive access to the 2024 Championship Final',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '0.02 ETH',
      organization: 'SportsFest',
      category: 'tickets',
      rarity: 'Epic',
      likes: 45,
      views: 289
    },
    {
      id: '3',
      title: 'Team Collectible #001',
      description: 'Limited edition team collectible with special perks',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '0.01 ETH',
      organization: 'FC Champions',
      category: 'collectibles',
      rarity: 'Rare',
      likes: 67,
      views: 234
    },
    {
      id: '4',
      title: 'Conference Badge 2024',
      description: 'Attendee badge for TechConf 2024',
      image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'Free',
      organization: 'TechConf',
      category: 'tickets',
      rarity: 'Common',
      likes: 12,
      views: 78
    },
    {
      id: '5',
      title: 'Membership Card - Gold',
      description: 'Gold tier membership with exclusive benefits',
      image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '0.03 ETH',
      organization: 'Premium Club',
      category: 'membership',
      rarity: 'Epic',
      likes: 33,
      views: 167
    },
    {
      id: '6',
      title: 'Artist Collaboration #042',
      description: 'Unique artwork collaboration piece',
      image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '0.08 ETH',
      organization: 'Art Collective',
      category: 'collectibles',
      rarity: 'Legendary',
      likes: 89,
      views: 445
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'education', label: 'Education' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'membership', label: 'Membership' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-400/10';
      case 'Rare': return 'text-blue-400 bg-blue-400/10';
      case 'Epic': return 'text-purple-400 bg-purple-400/10';
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const filteredNFTs = mockNFTs.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            NFT Marketplace
          </h1>
          <p className="text-xl text-gray-400">
            Discover and collect unique digital assets from trusted organizations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search NFTs, organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex bg-dark-800 border border-dark-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredNFTs.length} NFTs found
          </p>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredNFTs.map((nft) => (
            <div
              key={nft.id}
              className={`group bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {nft.title}
                  </h3>
                  {viewMode === 'list' && (
                    <Link
                      to={`/nft/${nft.id}`}
                      className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {nft.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary-400 font-medium">
                    {nft.organization}
                  </span>
                  <span className="text-white font-bold">
                    {nft.price}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{nft.views}</span>
                    </div>
                  </div>
                  {viewMode === 'grid' && (
                    <Link
                      to={`/nft/${nft.id}`}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-12">
          <button className="px-8 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white hover:bg-dark-700 transition-colors">
            Load More NFTs
          </button>
        </div>
      </div>
    </div>
  );
};