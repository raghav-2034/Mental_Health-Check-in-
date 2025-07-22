# Mental Health Check-in Website

A comprehensive web application designed to support mental wellness through various tools and resources. This platform provides users with meditation guides, mood tracking, stress assessment, community support, and personalized wellness activities.

you can verify the website using the following link : https://lovely-seahorse-1b63ce.netlify.app/
## 🌟 Features

### Core Functionality
- **User Authentication**: Secure registration and login system
- **Mood Tracking**: Monitor and analyze emotional patterns over time
- **Meditation Center**: Guided meditation sessions and mindfulness exercises
- **Quick Assessment**: Rapid mental health screening tools
- **Stress Indicator**: Real-time stress level monitoring
- **Community Support**: Connect with others on similar wellness journeys
- **Wellness Activities**: Curated self-care exercises and activities
- **Mental Health Resources**: Educational content and professional resources
- **Self-Care Planner**: Personalized wellness planning tools
- **Mood Analysis**: Detailed insights into emotional patterns

### Pages & Routes
- **Home** (`/`) - Main landing page
- **Authentication**
  - Login (`/login`)
  - Registration (`/register`)
- **Wellness Tools**
  - Meditation (`/meditation`)
  - Mood Tracker (`/mood-tracker`)
  - Quick Assessment (`/quick-assessment`)
  - Stress Indicator (`/stress-indicator`)
  - Analyse Mood (`/analyse-mood`)
  - Mental Analysis (`/mental-analysis`)
  - Self-Care Planner (`/self-care-planner`)
- **Support & Resources**
  - Community Support (`/community-support`)
  - Wellness Activities (`/wellness-activities`)
  - Resources (`/resources`)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mental-health-checkin-website.git
   cd mental-health-checkin-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Project Structure Setup**
   Ensure your project structure matches:
   ```
   project-root/
   ├── server.js
   ├── package.json
   ├── users.json (created automatically)
   └── project_website-main/
       └── project_website-main/
           └── home/
               ├── index.html
               ├── login.html
               ├── register.html
               ├── meditation.html
               ├── mood-tracker.html
               ├── quick-assessment.html
               ├── stress-indicator.html
               ├── community-support.html
               ├── wellness-activities.html
               ├── resources.html
               ├── analyse-mood.html
               ├── mental-analysis.html
               ├── self-care-planner.html
               └── [CSS/JS files]
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Data Storage**: JSON file-based storage
- **Authentication**: Custom implementation with encoded passwords

## 📋 API Endpoints

### Authentication
- `POST /register` - User registration
  - Body: `{ email, password, ...other user data }`
  - Response: Success message or error

- `POST /login` - User login
  - Body: `{ email, password }`
  - Response: User data (without password) or error

### Pages (GET Routes)
All page routes serve static HTML files:
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/meditation` - Meditation tools
- `/mood-tracker` - Mood tracking interface
- `/quick-assessment` - Mental health assessment
- `/stress-indicator` - Stress monitoring
- `/community-support` - Community features
- `/wellness-activities` - Wellness exercises
- `/resources` - Educational resources
- `/analyse-mood` - Mood analysis tools
- `/mental-analysis` - Detailed mental health analysis
- `/self-care-planner` - Self-care planning tools

## 🔒 Security Features

- Password encoding for user authentication
- Input validation and sanitization
- Error handling for invalid routes
- Secure file-based user storage

## 📊 Data Management

User data is stored in a local `users.json` file with the following structure:
```json
[
  {
    "email": "user@example.com",
    "password": "encoded_password",
    "registeredAt": "2024-01-01T00:00:00.000Z",
    "...": "additional user data"
  }
]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

- The server automatically creates a `users.json` file for data storage
- Static files are served from the nested directory structure
- 404 errors redirect to the home page
- The application runs on port 3000 by default (configurable via PORT environment variable)

## 🔮 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Enhanced security with JWT tokens
- Real-time chat for community support
- Mobile application
- Professional therapist integration
- Advanced analytics and reporting
- Appointment scheduling system

for any queries , contact : raghavreddy676@gmail.com 
