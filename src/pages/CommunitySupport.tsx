import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Plus, Send, Clock, User } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  category: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const CommunitySupport: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah M.',
      avatar: '👩‍💻',
      content: 'Today marks 30 days of consistent meditation practice! Started with just 5 minutes and now I can comfortably sit for 20 minutes. The difference in my anxiety levels is remarkable. To anyone just starting - small steps really do add up! 🧘‍♀️',
      timestamp: '2 hours ago',
      likes: 24,
      comments: [
        {
          id: '1',
          author: 'Mike R.',
          content: 'Congratulations! That\'s amazing progress. I\'m on day 10 myself.',
          timestamp: '1 hour ago'
        }
      ],
      category: 'Meditation'
    },
    {
      id: '2',
      author: 'Alex J.',
      avatar: '👨‍🎨',
      content: 'Having a tough day dealing with work stress. The pressure feels overwhelming sometimes. Anyone have strategies that work for them when everything feels like too much?',
      timestamp: '4 hours ago',
      likes: 18,
      comments: [
        {
          id: '1',
          author: 'Emma K.',
          content: 'I use the 4-7-8 breathing technique when I feel overwhelmed. It really helps ground me.',
          timestamp: '3 hours ago'
        },
        {
          id: '2',
          author: 'David L.',
          content: 'Taking a 10-minute walk outside works wonders for me. Fresh air and movement help reset my mind.',
          timestamp: '2 hours ago'
        }
      ],
      category: 'Stress'
    },
    {
      id: '3',
      author: 'Maria C.',
      avatar: '👩‍🏫',
      content: 'Wanted to share a small victory - I finally talked to my therapist about my social anxiety. It was scary but I feel so much lighter now. If you\'re on the fence about seeking help, this is your sign to take that step! 💪',
      timestamp: '6 hours ago',
      likes: 42,
      comments: [
        {
          id: '1',
          author: 'Rachel P.',
          content: 'So proud of you! That takes real courage. You\'re inspiring others to take that step too.',
          timestamp: '5 hours ago'
        }
      ],
      category: 'Anxiety'
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = ['General', 'Anxiety', 'Depression', 'Stress', 'Meditation', 'Recovery', 'Relationships'];

  const addPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You',
        avatar: '👤',
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: [],
        category: selectedCategory
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  const addLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 rounded-full">
              <Users className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Support</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with others on similar wellness journeys. Share experiences, offer support, and build meaningful connections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                  <span>Be kind and supportive</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MessageCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Share experiences respectfully</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-purple-500 mt-0.5" />
                  <span>Respect privacy and boundaries</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>No medical advice</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-purple-50 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* New Post Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowNewPost(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Share Your Story</span>
              </button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share with the Community</h3>
                <div className="mb-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts, experiences, or ask for support..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addPost}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{post.author}</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => addLike(post.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments.length}</span>
                        </button>
                      </div>
                      
                      {/* Comments */}
                      {post.comments.length > 0 && (
                        <div className="mt-4 border-t pt-4">
                          <div className="space-y-3">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="flex space-x-3">
                                <User className="h-4 w-4 text-gray-400 mt-1" />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Crisis Resources */}
            <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Crisis Resources</h3>
              <p className="text-sm text-red-700 mb-4">
                If you're experiencing a mental health crisis, please reach out for immediate help:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700">National Crisis Hotline: <strong>988</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700">Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700">Emergency Services: <strong>911</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;