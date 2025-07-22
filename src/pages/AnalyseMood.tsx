import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Smile, Frown, Meh, Sun, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface MoodData {
  date: string;
  mood: number;
  factors: string[];
  notes: string;
}

const AnalyseMood: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [timeRange, setTimeRange] = useState('30');
  const [analysisType, setAnalysisType] = useState('trend');

  useEffect(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodData(JSON.parse(savedMoods));
    }
  }, []);

  const getFilteredData = () => {
    const days = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return moodData.filter(entry => new Date(entry.date) >= cutoffDate);
  };

  const filteredData = getFilteredData();

  const getMoodStats = () => {
    if (filteredData.length === 0) return null;

    const moodValues = filteredData.map(entry => entry.mood);
    const average = moodValues.reduce((sum, mood) => sum + mood, 0) / moodValues.length;
    const highest = Math.max(...moodValues);
    const lowest = Math.min(...moodValues);
    
    // Count mood distributions
    const moodCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    moodValues.forEach(mood => {
      moodCounts[mood as keyof typeof moodCounts]++;
    });

    // Most common factors
    const factorCounts: { [key: string]: number } = {};
    filteredData.forEach(entry => {
      entry.factors.forEach(factor => {
        factorCounts[factor] = (factorCounts[factor] || 0) + 1;
      });
    });

    const topFactors = Object.entries(factorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([factor, count]) => ({ factor, count }));

    return {
      average: average.toFixed(1),
      highest,
      lowest,
      moodCounts,
      topFactors,
      totalEntries: filteredData.length
    };
  };

  const chartData = filteredData.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.mood,
    fullDate: entry.date
  }));

  const moodDistributionData = [
    { name: 'Very Sad', value: getMoodStats()?.moodCounts[1] || 0, color: '#ef4444' },
    { name: 'Sad', value: getMoodStats()?.moodCounts[2] || 0, color: '#f97316' },
    { name: 'Neutral', value: getMoodStats()?.moodCounts[3] || 0, color: '#eab308' },
    { name: 'Happy', value: getMoodStats()?.moodCounts[4] || 0, color: '#22c55e' },
    { name: 'Very Happy', value: getMoodStats()?.moodCounts[5] || 0, color: '#10b981' }
  ].filter(item => item.value > 0);

  const factorData = getMoodStats()?.topFactors.map(item => ({
    factor: item.factor,
    count: item.count
  })) || [];

  const getMoodIcon = (mood: number) => {
    switch (mood) {
      case 1: return <Frown className="h-5 w-5 text-red-500" />;
      case 2: return <Cloud className="h-5 w-5 text-orange-500" />;
      case 3: return <Meh className="h-5 w-5 text-yellow-500" />;
      case 4: return <Smile className="h-5 w-5 text-green-500" />;
      case 5: return <Sun className="h-5 w-5 text-emerald-500" />;
      default: return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMoodLabel = (mood: number) => {
    switch (mood) {
      case 1: return 'Very Sad';
      case 2: return 'Sad';
      case 3: return 'Neutral';
      case 4: return 'Happy';
      case 5: return 'Very Happy';
      default: return 'Unknown';
    }
  };

  const getInsights = () => {
    const stats = getMoodStats();
    if (!stats) return [];

    const insights = [];
    const avg = parseFloat(stats.average);

    if (avg >= 4) {
      insights.push({
        type: 'positive',
        title: 'Great Mood Trend!',
        message: `Your average mood is ${stats.average}/5. You're maintaining excellent emotional wellness!`
      });
    } else if (avg >= 3) {
      insights.push({
        type: 'neutral',
        title: 'Stable Mood Pattern',
        message: `Your average mood is ${stats.average}/5. You're managing well with room for improvement.`
      });
    } else {
      insights.push({
        type: 'concern',
        title: 'Focus on Self-Care',
        message: `Your average mood is ${stats.average}/5. Consider focusing on activities that boost your mood.`
      });
    }

    if (stats.topFactors.length > 0) {
      const topFactor = stats.topFactors[0];
      insights.push({
        type: 'info',
        title: 'Key Mood Influencer',
        message: `"${topFactor.factor}" appears most frequently in your mood entries (${topFactor.count} times).`
      });
    }

    return insights;
  };

  const stats = getMoodStats();
  const insights = getInsights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 rounded-full">
              <BarChart3 className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mood Analysis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gain deeper insights into your emotional patterns and identify trends to support your mental wellness.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Time Range:</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Analysis Type:</label>
              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="trend">Trend Analysis</option>
                <option value="distribution">Mood Distribution</option>
                <option value="factors">Influencing Factors</option>
              </select>
            </div>
          </div>
        </div>

        {stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Mood</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.average}/5</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Highest Mood</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{stats.highest}</span>
                      {getMoodIcon(stats.highest)}
                    </div>
                  </div>
                  <Sun className="h-8 w-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Lowest Mood</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{stats.lowest}</span>
                      {getMoodIcon(stats.lowest)}
                    </div>
                  </div>
                  <Cloud className="h-8 w-8 text-gray-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEntries}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      insight.type === 'positive' ? 'bg-green-50 border-green-500' :
                      insight.type === 'neutral' ? 'bg-blue-50 border-blue-500' :
                      insight.type === 'concern' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-purple-50 border-purple-500'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trend Chart */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Mood Distribution */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Factors */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Mood Factors</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={factorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Entries */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Mood Entries</h3>
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {filteredData.slice(-5).reverse().map((entry, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getMoodIcon(entry.mood)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {getMoodLabel(entry.mood)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mood data available</h3>
            <p className="text-gray-600 mb-6">
              Start tracking your mood to see detailed analysis and insights.
            </p>
            <a
              href="/mood-tracker"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Mood Tracking
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyseMood;