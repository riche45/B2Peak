import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Download, QrCode, ExternalLink, Check, AlertCircle } from 'lucide-react';

export const NFTDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');

  // Mock NFT data - in real app this would be fetched based on ID
  const nft = {
    id,
    title: 'Digital Diploma - Computer Science',
    description: 'Official Computer Science degree certificate issued by Tech University. This NFT serves as a tamper-proof digital credential that can be verified anywhere in the world.',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '0.05 ETH',
    organization: 'Tech University',
    category: 'Education',
    rarity: 'Legendary',
    likes: 24,
    views: 156,
    owner: '0x1234...5678',
    contractAddress: '0xabcd...efgh',
    tokenId: '42',
    blockchain: 'Polygon',
    created: '2024-01-15',
    attributes: [
      { trait_type: 'Degree', value: 'Bachelor of Science' },
      { trait_type: 'Major', value: 'Computer Science' },
      { trait_type: 'Year', value: '2024' },
      { trait_type: 'Honors', value: 'Cum Laude' },
      { trait_type: 'Institution', value: 'Tech University' }
    ],
    benefits: [
      'Digital verification of degree completion',
      'Access to alumni network',
      'Reduced verification time for employers',
      'Permanent record on blockchain'
    ]
  };

  const handleVerify = async () => {
    setVerificationStatus('pending');
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    setShowQR(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/marketplace"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* NFT Image */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800 border border-dark-700">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-400/20 text-yellow-400">
                  {nft.rarity}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                    isLiked ? 'bg-red-500/20 text-red-400' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={generateQRCode}
                className="flex items-center justify-center space-x-2 py-3 bg-secondary-600 hover:bg-secondary-700 rounded-xl text-white font-medium transition-colors"
              >
                <QrCode className="w-5 h-5" />
                <span>Generate QR</span>
              </button>
              <button
                onClick={handleVerify}
                disabled={verificationStatus === 'pending'}
                className="flex items-center justify-center space-x-2 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 rounded-xl text-white font-medium transition-colors"
              >
                {verificationStatus === 'pending' && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {verificationStatus === 'verified' && <Check className="w-5 h-5" />}
                {verificationStatus === 'failed' && <AlertCircle className="w-5 h-5" />}
                <span>
                  {verificationStatus === 'pending' ? 'Verifying...' : 
                   verificationStatus === 'verified' ? 'Verified' : 
                   verificationStatus === 'failed' ? 'Failed' : 'Verify'}
                </span>
              </button>
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {nft.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <span>By {nft.organization}</span>
                <span>•</span>
                <span>{nft.category}</span>
              </div>
            </div>

            {/* Price and Stats */}
            <div className="flex items-center justify-between p-6 bg-dark-800 border border-dark-700 rounded-2xl">
              <div>
                <p className="text-sm text-gray-400 mb-1">Price</p>
                <p className="text-2xl font-bold text-white">{nft.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Engagement</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-white">{nft.likes} likes</span>
                  <span className="text-white">{nft.views} views</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {nft.description}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Benefits & Utilities</h3>
              <ul className="space-y-2">
                {nft.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attributes */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Attributes</h3>
              <div className="grid grid-cols-2 gap-3">
                {nft.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="p-3 bg-dark-800 border border-dark-700 rounded-lg"
                  >
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {attr.trait_type}
                    </p>
                    <p className="text-white font-medium">{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Details */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Blockchain Details</h3>
              <div className="space-y-3 p-4 bg-dark-800 border border-dark-700 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-sm">{nft.contractAddress}</span>
                    <button className="text-primary-400 hover:text-primary-300">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token ID</span>
                  <span className="text-white">{nft.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Blockchain</span>
                  <span className="text-white">{nft.blockchain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Owner</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-sm">{nft.owner}</span>
                    <button className="text-primary-400 hover:text-primary-300">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Modal */}
            {showQR && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 max-w-md w-full">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Verification QR Code
                    </h3>
                    <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <p className="text-dark-900 text-sm">QR Code Here</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">
                      Scan this code to verify the authenticity of this NFT
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setShowQR(false)}
                        className="flex-1 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors"
                      >
                        Close
                      </button>
                      <button className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};