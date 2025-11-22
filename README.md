# OrganCare AI - Modern AI Medical Platform

A comprehensive medical AI platform built with React.js for analyzing medical images of different organs using artificial intelligence.

## Features

### Frontend (React.js)
- 🏠 **Homepage/Dashboard** - Grid layout with organ blocks (heart, lungs, brain, liver, kidney, eye)
- 📤 **Image Upload** - Upload medical images (CT scans, X-rays, etc.) with drag-and-drop support
- 🔐 **Authentication** - Sign-up/sign-in functionality (ready for backend integration)
- 👤 **Profile Management** - View and manage past analysis results
- 📄 **About Us Page** - Information about the platform
- 🎨 **Modern UI** - Dark/light theme toggle with smooth animations
- 📱 **Responsive Design** - Fully responsive for desktop, tablet, and mobile
- ✨ **Animations** - Smooth scrolling, hover effects, and loading states

## Tech Stack

### Frontend
- React.js 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router (routing)
- Axios (API calls)
- Recharts (data visualization)
- Lucide React (icons)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Project Structure

```
organCareAI/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ResultDisplay.jsx
│   │   ├── contexts/        # React contexts (Theme, Auth)
│   │   │   ├── ThemeContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── OrganDetail.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── About.jsx
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Usage

1. **Select Organ**: Choose an organ from the homepage grid
2. **Upload Images**: Upload medical images (CT scans, X-rays, etc.)
3. **Provide Information**: Fill in patient information (age, symptoms, medical history)
4. **Analyze**: Click "Analyze Images" to process with AI
5. **View Results**: See detailed analysis with visualizations, findings, and recommendations
6. **Manage Results**: View past analyses in your profile

## Backend Integration

This frontend is designed to work with a backend API. The API endpoints expected are:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Analysis
- `POST /api/analyze` - Analyze organ images (requires authentication)
- `GET /api/results` - Get user's analysis results
- `GET /api/results/{id}` - Get specific analysis result
- `DELETE /api/results/{id}` - Delete analysis result

To connect to your backend, update the API base URL in the frontend code or configure it via environment variables.

## Development

### Frontend Development
- Hot reload enabled with Vite
- Tailwind CSS with JIT compilation
- Dark mode support via class-based theming
- Proxy configured in `vite.config.js` for API calls

## Production Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

## Features in Detail

### Theme Toggle
- Light and dark themes
- Persists user preference in localStorage
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Breakpoints for mobile, tablet, and desktop
- Collapsible mobile navigation menu

### Animations
- Framer Motion for smooth page transitions
- Hover effects on interactive elements
- Loading states with spinners
- Smooth scrolling between sections

## License

MIT License

## Disclaimer

This platform is for educational and demonstration purposes. The AI analysis results are simulated and should not be used for actual medical diagnosis. Always consult qualified healthcare professionals for medical decisions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
