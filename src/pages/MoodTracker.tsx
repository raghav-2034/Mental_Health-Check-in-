import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Smile, Frown, Meh, Sun, Cloud, CloudRain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MoodEntry {
  date: string;
  mood: number;
  notes: string;
  factors: string[];
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const moodOptions = [
    { value: 1, label: 'Very Sad', icon: Frown, color: 'text-red-500', bg: 'bg-red-100' },
    { value: 2, label: 'Sad', icon: CloudRain, color: 'text-orange-500', bg: 'bg-orange-100' },
    { value: 3, label: 'Neutral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { value: 4, label: 'Happy', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    { value: 5, label: 'Very Happy', icon: Sun, color: 'text-emerald-500', bg: 'bg-emerald-100' }
  ];

  const moodFactors = [
    'Sleep Quality', 'Exercise', 'Work/School', 'Social Interactions', 'Weather',
    'Health', 'Nutrition', 'Stress Level', 'Relationships', 'Accomplishments'
  ];

  useEffect(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }
  }, []);

  const saveMoodEntry = () => {
    if (selectedMood === null) return;

    const entry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      notes,
      factors: selectedFactors
    };

    const updatedHistory = [...moodHistory.filter(m => m.date !== entry.date), entry];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));

    // Reset form
    setSelectedMood(null);
    setNotes('');
    setSelectedFactors([]);
  };

  const toggleFactor = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const getMoodIcon = (mood: number) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.icon : Meh;
  };

  const getMoodColor = (mood: number) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.color : 'text-gray-500';
  };

  const chartData = moodHistory
    .slice(-30)
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood,
      fullDate: entry.date
    }));

  const averageMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
    : '0';

  const last7Days = moodHistory.slice(-7);
  const weeklyAverage = last7Days.length > 0
    ? (last7Days.reduce((sum, entry) => sum + entry.mood, 0) / last7Days.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-100 rounded-full">
              <TrendingUp className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mood Tracker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your daily emotions and identify patterns to better understand your mental wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Today's Mood
              </h2>

              {/* Mood Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How are you feeling today?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setSelectedMood(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedMood === option.value
                            ? `border-blue-500 ${option.bg}`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mx-auto ${option.color}`} />
                        <div className="text-xs mt-1 text-gray-600">{option.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mood Factors */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What influenced your mood?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {moodFactors.map((factor) => (
                    <button
                      key={factor}
                      onClick={() => toggleFactor(factor)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedFactors.includes(factor)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {factor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How was your day? What made you feel this way?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Save Button */}
              <button
                onClick={saveMoodEntry}
                disabled={selectedMood === null}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save Mood Entry
              </button>
            </div>
          </div>

          {/* Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Average</p>
                    <p className="text-2xl font-bold text-gray-900">{averageMood}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">{weeklyAverage}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-emerald-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{moodHistory.length}</p>
                  </div>
                  <div className="flex space-x-1">
                    {moodHistory.slice(-5).map((entry, index) => {
                      const Icon = getMoodIcon(entry.mood);
                      return (
                        <Icon
                          key={index}
                          className={`h-4 w-4 ${getMoodColor(entry.mood)}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Trend Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trend (Last 30 Days)</h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Start tracking your mood to see trends and patterns</p>
                </div>
              )}
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
              {moodHistory.length > 0 ? (
                <div className="space-y-3">
                  {moodHistory.slice(-5).reverse().map((entry, index) => {
                    const Icon = getMoodIcon(entry.mood);
                    return (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Icon className={`h-6 w-6 ${getMoodColor(entry.mood)} flex-shrink-0 mt-1`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-gray-500">
                              {moodOptions.find(opt => opt.value === entry.mood)?.label}
                            </span>
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                          )}
                          {entry.factors.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {entry.factors.map((factor, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                >
                                  {factor}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No mood entries yet. Start tracking your daily emotions!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;