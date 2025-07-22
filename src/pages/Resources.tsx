import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search, Filter, Heart, Brain, Users, Phone, Video, FileText } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'Article' | 'Video' | 'Tool' | 'Hotline' | 'Organization';
  url: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  tags: string[];
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'National Suicide Prevention Lifeline',
      description: '24/7 free and confidential support for people in distress, prevention and crisis resources.',
      category: 'Crisis Support',
      type: 'Hotline',
      url: 'tel:988',
      icon: Phone,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      tags: ['crisis', 'suicide prevention', 'emergency', '24/7']
    },
    {
      id: '2',
      title: 'Crisis Text Line',
      description: 'Free, 24/7 support for those in crisis. Text HOME to 741741 to reach a Crisis Counselor.',
      category: 'Crisis Support',
      type: 'Hotline',
      url: 'sms:741741',
      icon: Phone,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      tags: ['crisis', 'text support', 'emergency', '24/7']
    },
    {
      id: '3',
      title: 'National Alliance on Mental Illness (NAMI)',
      description: 'The nation\'s largest grassroots mental health organization dedicated to building better lives.',
      category: 'Mental Health Organizations',
      type: 'Organization',
      url: 'https://www.nami.org',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      tags: ['mental health', 'advocacy', 'support groups', 'education']
    },
    {
      id: '4',
      title: 'Understanding Anxiety Disorders',
      description: 'Comprehensive guide to recognizing symptoms and treatment options for anxiety disorders.',
      category: 'Anxiety',
      type: 'Article',
      url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      tags: ['anxiety', 'symptoms', 'treatment', 'guide']
    },
    {
      id: '5',
      title: 'Meditation for Beginners',
      description: 'Learn the basics of meditation with this beginner-friendly video series.',
      category: 'Self-Care',
      type: 'Video',
      url: 'https://www.youtube.com/watch?v=ZToicYcHIOU',
      icon: Video,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      tags: ['meditation', 'mindfulness', 'beginner', 'self-care']
    },
    {
      id: '6',
      title: 'Depression Assessment Tool',
      description: 'Self-assessment tool to help identify symptoms of depression. Not a diagnostic tool.',
      category: 'Depression',
      type: 'Tool',
      url: 'https://www.depression.org/depression-screening',
      icon: Brain,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      tags: ['depression', 'assessment', 'screening', 'symptoms']
    },
    {
      id: '7',
      title: 'Headspace: Meditation & Sleep',
      description: 'Popular meditation app with guided sessions for anxiety, sleep, and focus.',
      category: 'Apps & Tools',
      type: 'Tool',
      url: 'https://www.headspace.com',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      tags: ['meditation', 'app', 'sleep', 'anxiety']
    },
    {
      id: '8',
      title: 'The Science of Well-Being',
      description: 'Free Yale course on happiness and well-being, available on Coursera.',
      category: 'Education',
      type: 'Video',
      url: 'https://www.coursera.org/learn/the-science-of-well-being',
      icon: BookOpen,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      tags: ['happiness', 'psychology', 'course', 'well-being']
    },
    {
      id: '9',
      title: 'Mental Health First Aid',
      description: 'Learn how to identify, understand and respond to signs of mental illness and substance use disorders.',
      category: 'Education',
      type: 'Organization',
      url: 'https://www.mentalhealthfirstaid.org',
      icon: Heart,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      tags: ['first aid', 'mental health', 'training', 'education']
    },
    {
      id: '10',
      title: 'Cognitive Behavioral Therapy Techniques',
      description: 'Learn evidence-based CBT techniques for managing negative thoughts and behaviors.',
      category: 'Therapy',
      type: 'Article',
      url: 'https://www.verywellmind.com/cognitive-behavioral-therapy-techniques-2797636',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      tags: ['CBT', 'therapy', 'techniques', 'mental health']
    },
    {
      id: '11',
      title: 'BetterHelp Online Therapy',
      description: 'Professional online therapy with licensed therapists. Get help with anxiety, depression, and more.',
      category: 'Professional Help',
      type: 'Organization',
      url: 'https://www.betterhelp.com',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      tags: ['therapy', 'online', 'professional', 'counseling']
    },
    {
      id: '12',
      title: 'Coping with Stress and Anxiety',
      description: 'Video series on practical strategies for managing stress and anxiety in daily life.',
      category: 'Stress Management',
      type: 'Video',
      url: 'https://www.youtube.com/watch?v=0fL-pn80s-c',
      icon: Video,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      tags: ['stress', 'anxiety', 'coping', 'strategies']
    }
  ];

  const categories = ['All', 'Crisis Support', 'Mental Health Organizations', 'Anxiety', 'Depression', 'Self-Care', 'Apps & Tools', 'Education', 'Therapy', 'Professional Help', 'Stress Management'];
  const types = ['All', 'Article', 'Video', 'Tool', 'Hotline', 'Organization'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return FileText;
      case 'Video': return Video;
      case 'Tool': return Brain;
      case 'Hotline': return Phone;
      case 'Organization': return Users;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Article': return 'text-blue-600 bg-blue-100';
      case 'Video': return 'text-purple-600 bg-purple-100';
      case 'Tool': return 'text-green-600 bg-green-100';
      case 'Hotline': return 'text-red-600 bg-red-100';
      case 'Organization': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <BookOpen className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Resources</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover professional resources, educational content, and support tools to enhance your mental wellness journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Resources Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Need Immediate Help?</h2>
              <p className="text-red-100 mb-4">If you're in crisis, don't wait. Reach out now.</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:988"
                  className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Call 988
                </a>
                <a
                  href="sms:741741"
                  className="bg-red-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-300 transition-colors"
                >
                  Text HOME to 741741
                </a>
              </div>
            </div>
            <Phone className="h-16 w-16 text-red-200" />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const Icon = resource.icon;
            const TypeIcon = getTypeIcon(resource.type);
            
            return (
              <div key={resource.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${resource.bgColor}`}>
                      <Icon className={`h-6 w-6 ${resource.color}`} />
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Access Resource</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Disclaimer</h3>
          <p className="text-sm text-yellow-700">
            These resources are provided for informational purposes only and are not a substitute for professional mental health care. 
            If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately. 
            Always consult with qualified healthcare professionals for personalized advice and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;