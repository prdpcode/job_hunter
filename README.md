# Job Hunter - Frontend Developer Job Tracker

A comprehensive personal job hunting tool built with Next.js 15, designed specifically for frontend developers to efficiently find, track, and apply for job opportunities. This intelligent platform combines AI-powered cover letter generation with a visual Kanban-style application tracker to streamline your job search process.

## 🎯 **What This App Does**

**Job Hunter** is your personal career companion that automates the tedious aspects of job searching while providing intelligent insights about your applications. It helps you:

- **Discover Opportunities** - Search thousands of frontend developer jobs using advanced filters
- **Evaluate Matches** - Get AI-powered match scores based on your skills and experience
- **Generate Cover Letters** - Create personalized cover letters instantly with AI
- **Track Applications** - Visual Kanban board to monitor your application pipeline
- **Stay Organized** - All data saved locally with statistics and progress tracking

Perfect for developers who want to optimize their job search workflow and focus on what matters most - landing interviews and getting hired.

## Features

### 🔍 Job Search
- **Adzuna API Integration** - Search for frontend developer jobs
- **Advanced Filters** - Keywords, location, job type, experience, salary range
- **Real-time Results** - Instant job matching with loading states

### 💼 Smart Job Cards
- **Company Logos** - Automatic logo fetching via unavatar.io
- **Skill Matching** - AI-powered resume match scoring (80%+ Great Match, 60-79% Good Match, <60% Partial Match)
- **Skill Tags** - Extracted and highlighted relevant skills
- **Quick Actions** - View job, save to tracker, generate cover letter

### 🤖 AI Cover Letter Generator
- **Groq API Integration** - Uses Llama 3 model for personalized cover letters
- **Context-Aware** - Tailored for Pradeep C H's profile and experience
- **One-Click Copy** - Easy copying to clipboard
- **History Tracking** - Save and manage generated letters

### 📊 Application Tracker
- **Kanban Board** - Drag-and-drop interface with 4 columns:
  - Saved (bookmarked jobs)
  - Applied (submitted applications)
  - Interview (got responses)
  - Rejected (didn't work out)
- **Local Storage** - All data persists locally
- **Quick Status Updates** - Mark jobs as applied with one click

### 📈 Dashboard Stats
- Total jobs found today
- Jobs saved to tracker
- Applications sent
- Interviews scheduled
- Current usage streak

## 🛠 **Technology Stack**

### **Frontend Framework**
- **Next.js 15** - Latest React framework with App Router for optimal performance
- **TypeScript** - Full type safety and better development experience
- **React 18** - Modern React with server components and hooks

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Lucide React** - Beautiful, consistent icons for modern interfaces
- **Custom Dark Theme** - Professional #0a0a0a background with #2563eb accent colors

### **Interactive Features**
- **@dnd-kit** - Modern drag-and-drop library for the Kanban board
- **date-fns** - Robust date manipulation utilities
- **clsx & tailwind-merge** - Conditional styling and className optimization

### **API Integration**
- **Adzuna API** - Comprehensive job search database
- **Groq API** - Fast AI inference with Llama 3 model for cover letters
- **unavatar.io** - Automatic company logo fetching

### **Data Management**
- **LocalStorage API** - Client-side persistence for all user data
- **React Hooks** - State management and side effects
- **Custom Utils** - Skill extraction, match scoring, and data processing

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Next.js Dev Tools** - Hot reload and development server

## 🚀 **Quick Start Guide**

### **Prerequisites**
- Node.js 18+ installed
- Git for version control
- API keys from Adzuna and Groq (see setup below)

### **1. Installation**

```bash
# Clone the repository
git clone <your-repository-url>
cd job-hunter

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

### **2. API Setup**

#### **Get Adzuna API Keys (Free)**
1. Visit [https://developer.adzuna.com](https://developer.adzuna.com)
2. Create a free developer account
3. Navigate to your dashboard
4. Copy your `APP_ID` and `APP_KEY`
5. Add to `.env.local`:
   ```env
   ADZUNA_APP_ID=your_app_id_here
   ADZUNA_APP_KEY=your_app_key_here
   ```

#### **Get Groq API Key**
1. Visit [https://groq.com](https://groq.com)
2. Sign up for free account
3. Get API key from dashboard
4. Add to `.env.local`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

### **3. Run the Application**

```bash
# Start development server
npm run dev

# Or build for production
npm run build
npm start
```

**Visit** [http://localhost:3000](http://localhost:3000) to start using Job Hunter!

### **4. Environment Variables Summary**

Your `.env.local` file should contain:
```env
# Job Search API
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key

# AI Cover Letter Generation
GROQ_API_KEY=your_groq_api_key
```

## Pages

- **/** - Main dashboard with job search and results
- **/tracker** - Kanban application tracker
- **/cover-letter** - Cover letter history and management

## 📁 **Project Architecture**

```
job-hunter/
├── 📄 README.md                    # This documentation file
├── 📄 package.json                 # Dependencies and scripts
├── 📄 .env.local.example           # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 tailwind.config.ts           # Tailwind CSS configuration
├── 📄 next.config.mjs              # Next.js configuration
└── 📁 src/
    ├── 📁 app/                     # Next.js App Router pages
    │   ├── 📁 api/                 # API routes
    │   │   ├── 📄 jobs/route.ts    # Job search endpoint
    │   │   └── 📄 cover-letter/route.ts # Cover letter generation
    │   ├── 📁 cover-letter/        # Cover letter history page
    │   ├── 📁 tracker/             # Application tracker page
    │   ├── 📄 layout.tsx           # Root layout component
    │   ├── 📄 page.tsx             # Main dashboard page
    │   └── 📄 globals.css          # Global styles
    ├── 📁 components/              # Reusable React components
    │   ├── 📄 Dashboard.tsx        # Main dashboard container
    │   ├── 📄 JobSearch.tsx        # Job search form and filters
    │   ├── 📄 JobCards.tsx         # Job results container
    │   ├── 📄 JobCard.tsx          # Individual job card component
    │   ├── 📄 CoverLetterModal.tsx # AI cover letter modal
    │   ├── 📄 StatsBar.tsx         # Dashboard statistics
    │   ├── 📄 KanbanColumn.tsx     # Kanban board column
    │   └── 📄 TrackedJobCard.tsx   # Tracked job card for Kanban
    └── 📁 lib/                     # Utility libraries and types
        ├── 📄 types.ts             # TypeScript type definitions
        ├── 📄 utils.ts             # Helper functions and utilities
        └── 📄 localStorage.ts      # Local storage management
```

## 🎨 **Design System**

### **Color Palette**
- **Background**: `#0a0a0a` (Deep black)
- **Primary**: `#2563eb` (Blue accent)
- **Cards**: `#1a1a1a` (Dark gray)
- **Borders**: `#222222` (Subtle borders)
- **Text**: `#ffffff` (White primary)
- **Muted**: `#9ca3af` (Gray secondary)

### **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes**: Responsive scaling from mobile to desktop

### **Component Patterns**
- **Cards**: Rounded corners with subtle borders
- **Buttons**: Consistent hover states and transitions
- **Modals**: Backdrop blur and smooth animations
- **Forms**: Dark inputs with focus states

## Key Features Explained

### Resume Match Scoring
The app analyzes job descriptions against Pradeep's skills:
- Angular, TypeScript, JavaScript, Next.js, React
- Figma, UI/UX, ECharts, Node.js, Git
- REST API, Agile, Supabase, CSS, HTML
- Windsurf, Cursor, AI

### AI Cover Letters
Generated using a personalized system prompt that includes:
- Pradeep's 3+ years experience
- Angular, Next.js, AI-native development
- Future Fit (wearfuturefit.com) project
- Current role at BXP Support and Solutions
- Bangalore location

### Data Persistence
All application data is stored in localStorage:
- Tracked jobs with status updates
- Generated cover letters
- Dashboard statistics
- Usage streak tracking

## Deployment

The app can be deployed on any platform that supports Next.js:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

Remember to add your environment variables to your hosting platform's configuration.

## Contributing

This is a personal tool built for Pradeep C H's job hunting needs. The codebase is clean and modular, making it easy to customize for other use cases or extend with additional features.

## License

MIT License - feel free to use this as a template for your own job hunting tools.
