import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Volume2, VolumeX, Brain, Sparkles } from 'lucide-react';

const Meditation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSession, setSelectedSession] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const sessions = [
    {
      title: 'Mindful Breathing',
      duration: 600, // 10 minutes
      description: 'Focus on your breath to center your mind and reduce stress',
      category: 'Beginner',
      color: 'bg-blue-500'
    },
    {
      title: 'Body Scan Relaxation',
      duration: 900, // 15 minutes
      description: 'Progressive muscle relaxation to release physical tension',
      category: 'Intermediate',
      color: 'bg-emerald-500'
    },
    {
      title: 'Loving Kindness',
      duration: 1200, // 20 minutes
      description: 'Cultivate compassion for yourself and others',
      category: 'Advanced',
      color: 'bg-purple-500'
    },
    {
      title: 'Stress Relief',
      duration: 480, // 8 minutes
      description: 'Quick stress relief session for busy days',
      category: 'Quick',
      color: 'bg-orange-500'
    },
    {
      title: 'Sleep Meditation',
      duration: 1800, // 30 minutes
      description: 'Gentle meditation to prepare for restful sleep',
      category: 'Sleep',
      color: 'bg-indigo-500'
    },
    {
      title: 'Anxiety Relief',
      duration: 720, // 12 minutes
      description: 'Calm your mind and reduce anxiety symptoms',
      category: 'Therapeutic',
      color: 'bg-pink-500'
    }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(sessions[selectedSession].duration);
  };

  const handleSessionChange = (index: number) => {
    setSelectedSession(index);
    setTimeLeft(sessions[index].duration);
    setIsPlaying(false);
  };

  const progress = ((sessions[selectedSession].duration - timeLeft) / sessions[selectedSession].duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Brain className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meditation Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your inner peace with our guided meditation sessions designed to reduce stress and improve mental clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Session Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Session</h2>
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <div
                  key={index}
                  onClick={() => handleSessionChange(index)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedSession === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{session.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${session.color}`}>
                      {session.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Timer className="h-4 w-4 mr-1" />
                    {formatTime(session.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meditation Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sessions[selectedSession].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {sessions[selectedSession].description}
                </p>
                
                {/* Progress Circle */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 144 144">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 60}`}
                      strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-sm text-gray-500">remaining</div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center space-x-6 mb-8">
                  <button
                    onClick={handleReset}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="h-6 w-6 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className="p-6 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-6 w-6 text-gray-600" />
                    ) : (
                      <Volume2 className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center justify-center space-x-4">
                  <Volume2 className="h-5 w-5 text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-500">{Math.round(volume * 100)}%</span>
                </div>
              </div>

              {/* Status */}
              <div className="text-center">
                {isPlaying ? (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    <span className="font-medium">Meditation in progress...</span>
                  </div>
                ) : timeLeft === 0 ? (
                  <div className="text-emerald-600 font-medium">
                    Session completed! Well done! 🎉
                  </div>
                ) : (
                  <div className="text-gray-500">
                    Press play to begin your meditation session
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meditation Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Find a quiet, comfortable space where you won't be interrupted</li>
                <li>• Sit with your back straight but not rigid</li>
                <li>• Close your eyes or soften your gaze</li>
                <li>• Focus on your breath and let thoughts come and go naturally</li>
                <li>• Be patient with yourself - meditation is a practice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditation;