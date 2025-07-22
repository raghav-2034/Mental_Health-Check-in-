import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Brain, 
  Activity, 
  Users, 
  Target, 
  Zap, 
  Calendar,
  ArrowRight,
  Shield,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'Guided Meditation',
      description: 'Access a library of guided meditations for stress relief and mindfulness.',
      link: '/meditation',
      color: 'bg-blue-500'
    },
    {
      icon: Activity,
      title: 'Mood Tracking',
      description: 'Monitor your emotional patterns and identify trends over time.',
      link: '/mood-tracker',
      color: 'bg-emerald-500'
    },
    {
      icon: Target,
      title: 'Quick Assessment',
      description: 'Take rapid mental health screenings to understand your current state.',
      link: '/quick-assessment',
      color: 'bg-purple-500'
    },
    {
      icon: Zap,
      title: 'Stress Indicator',
      description: 'Real-time stress level monitoring with personalized recommendations.',
      link: '/stress-indicator',
      color: 'bg-orange-500'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others on similar wellness journeys for mutual support.',
      link: '/community-support',
      color: 'bg-pink-500'
    },
    {
      icon: Calendar,
      title: 'Self-Care Planner',
      description: 'Create personalized wellness plans and track your progress.',
      link: '/self-care-planner',
      color: 'bg-indigo-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Sessions Completed' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Heart className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Mental Health
              <span className="block text-yellow-300">Companion</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              A comprehensive platform designed to support your mental wellness journey through personalized tools, community support, and professional resources.
            </p>
            
            {isAuthenticated ? (
              <div className="space-y-4">
                <h2 className="text-2xl mb-4">Welcome back, {user?.name}!</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/mood-tracker"
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
                  >
                    <Activity className="h-5 w-5" />
                    <span>Track Your Mood</span>
                  </Link>
                  <Link
                    to="/meditation"
                    className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition-colors flex items-center space-x-2"
                  >
                    <Brain className="h-5 w-5" />
                    <span>Start Meditation</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to support your mental wellness journey in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`inline-flex p-4 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose MindWell?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Privacy & Security
                    </h3>
                    <p className="text-gray-600">
                      Your mental health data is protected with industry-standard encryption and privacy measures.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-emerald-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Evidence-Based
                    </h3>
                    <p className="text-gray-600">
                      All our tools and resources are based on proven psychological research and best practices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Track Progress
                    </h3>
                    <p className="text-gray-600">
                      Monitor your mental health journey with detailed insights and personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-white rounded-full shadow-sm">
                  <Heart className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Start Your Journey Today
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of users who have improved their mental wellness with our comprehensive platform.
              </p>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;