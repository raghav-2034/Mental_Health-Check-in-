import React, { useState } from 'react';
import { Activity, Clock, User, Star, Play, CheckCircle, Heart, Brain, Zap } from 'lucide-react';

interface WellnessActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  instructions: string[];
  benefits: string[];
  completed?: boolean;
}

const WellnessActivities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<WellnessActivity | null>(null);

  const activities: WellnessActivity[] = [
    {
      id: '1',
      title: 'Morning Gratitude Practice',
      description: 'Start your day with appreciation and positivity',
      duration: '5 minutes',
      difficulty: 'Beginner',
      category: 'Mindfulness',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      instructions: [
        'Find a quiet space and sit comfortably',
        'Take three deep breaths to center yourself',
        'Think of three things you\'re grateful for today',
        'Spend a moment appreciating each item on your list',
        'Notice how this practice makes you feel'
      ],
      benefits: [
        'Improved mood and outlook',
        'Reduced stress and anxiety',
        'Better sleep quality',
        'Enhanced overall well-being'
      ]
    },
    {
      id: '2',
      title: 'Progressive Muscle Relaxation',
      description: 'Release physical tension throughout your body',
      duration: '15 minutes',
      difficulty: 'Intermediate',
      category: 'Relaxation',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      instructions: [
        'Lie down in a comfortable position',
        'Start with your toes, tense for 5 seconds then release',
        'Move up to your calves, then thighs, continuing upward',
        'Include your abdomen, chest, arms, and face',
        'End by tensing your whole body, then completely relax'
      ],
      benefits: [
        'Reduced muscle tension',
        'Lower stress levels',
        'Better sleep quality',
        'Increased body awareness'
      ]
    },
    {
      id: '3',
      title: 'Mindful Walking',
      description: 'Turn a simple walk into a meditative practice',
      duration: '10 minutes',
      difficulty: 'Beginner',
      category: 'Movement',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      instructions: [
        'Choose a quiet route, indoor or outdoor',
        'Walk at a slower pace than usual',
        'Focus on the sensation of your feet touching the ground',
        'Notice your breathing rhythm as you walk',
        'When your mind wanders, gently return focus to walking'
      ],
      benefits: [
        'Improved focus and concentration',
        'Reduced rumination',
        'Light physical exercise',
        'Connection with nature'
      ]
    },
    {
      id: '4',
      title: 'Breathing Square Technique',
      description: 'Regulate your breath to calm your nervous system',
      duration: '3 minutes',
      difficulty: 'Beginner',
      category: 'Breathing',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      instructions: [
        'Sit comfortably with your back straight',
        'Inhale for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale for 4 counts',
        'Hold empty for 4 counts, then repeat'
      ],
      benefits: [
        'Reduced anxiety',
        'Better emotional regulation',
        'Improved focus',
        'Lowered heart rate'
      ]
    },
    {
      id: '5',
      title: 'Body Scan Meditation',
      description: 'Develop awareness of physical sensations',
      duration: '20 minutes',
      difficulty: 'Intermediate',
      category: 'Mindfulness',
      icon: Star,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      instructions: [
        'Lie down comfortably with eyes closed',
        'Start by noticing your breath',
        'Slowly scan from the top of your head down',
        'Notice sensations without trying to change them',
        'If you find tension, breathe into that area'
      ],
      benefits: [
        'Increased body awareness',
        'Reduced physical tension',
        'Better sleep preparation',
        'Enhanced mindfulness'
      ]
    },
    {
      id: '6',
      title: 'Energy Boost Stretches',
      description: 'Quick stretches to revitalize your body and mind',
      duration: '8 minutes',
      difficulty: 'Beginner',
      category: 'Movement',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      instructions: [
        'Stand with feet hip-width apart',
        'Reach arms overhead and stretch up',
        'Roll shoulders backward and forward',
        'Stretch each arm across your chest',
        'Do gentle neck rotations'
      ],
      benefits: [
        'Increased energy levels',
        'Better posture',
        'Reduced muscle stiffness',
        'Improved circulation'
      ]
    }
  ];

  const categories = ['All', 'Mindfulness', 'Relaxation', 'Movement', 'Breathing'];

  const filteredActivities = selectedCategory === 'All' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const completeActivity = (activityId: string) => {
    setCompletedActivities(prev => [...prev, activityId]);
    setSelectedActivity(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Activity className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellness Activities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover curated self-care exercises and activities designed to support your mental wellness journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedActivities.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((completedActivities.length / activities.length) * 100)}%
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => {
            const Icon = activity.icon;
            const isCompleted = completedActivities.includes(activity.id);
            
            return (
              <div
                key={activity.id}
                className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-green-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${activity.bgColor}`}>
                      <Icon className={`h-6 w-6 ${activity.color}`} />
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{activity.duration}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    disabled={isCompleted}
                  >
                    {isCompleted ? 'Completed' : 'Start Activity'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${selectedActivity.bgColor}`}>
                      <selectedActivity.icon className={`h-8 w-8 ${selectedActivity.color}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedActivity.title}</h2>
                      <p className="text-gray-600">{selectedActivity.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                    <ol className="space-y-2">
                      {selectedActivity.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedActivity.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => completeActivity(selectedActivity.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Complete Activity</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessActivities;