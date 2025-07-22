import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, Check, Clock, Heart, Brain, Activity } from 'lucide-react';

interface SelfCareTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  duration: number; // in minutes
  date: string;
  time: string;
  completed: boolean;
  recurring: boolean;
  recurringDays: string[];
}

const SelfCarePlanner: React.FC = () => {
  const [tasks, setTasks] = useState<SelfCareTask[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<SelfCareTask | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const categories = [
    { name: 'Physical', icon: Activity, color: 'bg-green-500' },
    { name: 'Mental', icon: Brain, color: 'bg-blue-500' },
    { name: 'Emotional', icon: Heart, color: 'bg-pink-500' },
    { name: 'Social', icon: Calendar, color: 'bg-purple-500' },
    { name: 'Spiritual', icon: Heart, color: 'bg-indigo-500' },
    { name: 'Creative', icon: Edit2, color: 'bg-yellow-500' }
  ];

  const priorityColors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200'
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const savedTasks = localStorage.getItem('selfCareTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selfCareTasks', JSON.stringify(tasks));
  }, [tasks]);

  const [newTask, setNewTask] = useState<Partial<SelfCareTask>>({
    title: '',
    description: '',
    category: 'Physical',
    priority: 'Medium',
    duration: 30,
    date: selectedDate,
    time: '09:00',
    completed: false,
    recurring: false,
    recurringDays: []
  });

  const addTask = () => {
    if (newTask.title && newTask.category) {
      const task: SelfCareTask = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description || '',
        category: newTask.category,
        priority: newTask.priority || 'Medium',
        duration: newTask.duration || 30,
        date: newTask.date || selectedDate,
        time: newTask.time || '09:00',
        completed: false,
        recurring: newTask.recurring || false,
        recurringDays: newTask.recurringDays || []
      };

      setTasks(prev => [...prev, task]);
      setNewTask({
        title: '',
        description: '',
        category: 'Physical',
        priority: 'Medium',
        duration: 30,
        date: selectedDate,
        time: '09:00',
        completed: false,
        recurring: false,
        recurringDays: []
      });
      setShowAddTask(false);
    }
  };

  const updateTask = () => {
    if (editingTask && editingTask.title) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? editingTask : task
      ));
      setEditingTask(null);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTasksForDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const getDailyStats = () => {
    const todayTasks = getTasksForDate(selectedDate);
    const completed = todayTasks.filter(task => task.completed).length;
    const total = todayTasks.length;
    const totalTime = todayTasks.reduce((sum, task) => sum + task.duration, 0);
    const completedTime = todayTasks.filter(task => task.completed).reduce((sum, task) => sum + task.duration, 0);

    return { completed, total, totalTime, completedTime };
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : Activity;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : 'bg-gray-500';
  };

  const stats = getDailyStats();
  const progressPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <Calendar className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Self-Care Planner</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create personalized wellness plans and track your progress with scheduled self-care activities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}/{stats.total}</p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Planned</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTime}m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedTime}m</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Date Selection and Add Button */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Tasks for Selected Date */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Self-Care Tasks for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>

          {getTasksForDate(selectedDate).length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks planned</h3>
              <p className="text-gray-600 mb-4">Add your first self-care task for today!</p>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {getTasksForDate(selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((task) => {
                  const Icon = getCategoryIcon(task.category);
                  return (
                    <div
                      key={task.id}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                        task.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <button
                            onClick={() => toggleCompleted(task.id)}
                            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              task.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 hover:border-green-500'
                            }`}
                          >
                            {task.completed && <Check className="h-4 w-4 text-white" />}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`p-2 rounded-lg ${getCategoryColor(task.category)}`}>
                                <Icon className="h-4 w-4 text-white" />
                              </div>
                              <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {task.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full border ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                            </div>
                            
                            {task.description && (
                              <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{task.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Activity className="h-4 w-4" />
                                <span>{task.duration} min</span>
                              </div>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {task.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingTask(task)}
                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        {(showAddTask || editingTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {editingTask ? 'Edit Task' : 'Add New Task'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editingTask ? editingTask.title : newTask.title}
                      onChange={(e) => editingTask 
                        ? setEditingTask({ ...editingTask, title: e.target.value })
                        : setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Morning meditation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editingTask ? editingTask.description : newTask.description}
                      onChange={(e) => editingTask 
                        ? setEditingTask({ ...editingTask, description: e.target.value })
                        : setNewTask({ ...newTask, description: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      placeholder="Optional description..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={editingTask ? editingTask.category : newTask.category}
                        onChange={(e) => editingTask 
                          ? setEditingTask({ ...editingTask, category: e.target.value })
                          : setNewTask({ ...newTask, category: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={editingTask ? editingTask.priority : newTask.priority}
                        onChange={(e) => editingTask 
                          ? setEditingTask({ ...editingTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })
                          : setNewTask({ ...newTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        value={editingTask ? editingTask.time : newTask.time}
                        onChange={(e) => editingTask 
                          ? setEditingTask({ ...editingTask, time: e.target.value })
                          : setNewTask({ ...newTask, time: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                      <input
                        type="number"
                        value={editingTask ? editingTask.duration : newTask.duration}
                        onChange={(e) => editingTask 
                          ? setEditingTask({ ...editingTask, duration: parseInt(e.target.value) })
                          : setNewTask({ ...newTask, duration: parseInt(e.target.value) })
                        }
                        min="5"
                        max="480"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddTask(false);
                      setEditingTask(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingTask ? updateTask : addTask}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingTask ? 'Update' : 'Add'} Task
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

export default SelfCarePlanner;