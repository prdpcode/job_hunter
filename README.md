# Job Hunter - Frontend Developer Job Tracker

A personal job hunting tool built with Next.js 15 for finding and tracking frontend developer opportunities. Features AI-powered cover letter generation and a Kanban-style application tracker.

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

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with dark theme
- **UI Components**: Custom components with Lucide icons
- **Drag & Drop**: @dnd-kit for Kanban board
- **APIs**: Adzuna (jobs), Groq (AI cover letters)
- **Storage**: LocalStorage for data persistence
- **TypeScript**: Full type safety

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd job-hunter
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and add your API keys:

```bash
cp .env.local.example .env.local
```

Required environment variables:
```env
# Adzuna API Configuration
ADZUNA_APP_ID=your_app_id_here
ADZUNA_APP_KEY=your_app_key_here

# Groq API Configuration  
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Get API Keys

#### Adzuna API (Free)
1. Sign up at [https://developer.adzuna.com](https://developer.adzuna.com)
2. Get your APP_ID and APP_KEY from the dashboard
3. Add them to your `.env.local` file

#### Groq API (Free tier available)
1. Sign up at [https://groq.com](https://groq.com)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pages

- **/** - Main dashboard with job search and results
- **/tracker** - Kanban application tracker
- **/cover-letter** - Cover letter history and management

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes for jobs and cover letters
│   ├── cover-letter/ # Cover letter history page
│   ├── tracker/      # Application tracker page
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Dashboard page
│   └── globals.css   # Global styles
├── components/
│   ├── Dashboard.tsx
│   ├── JobSearch.tsx
│   ├── JobCards.tsx
│   ├── JobCard.tsx
│   ├── CoverLetterModal.tsx
│   ├── StatsBar.tsx
│   ├── KanbanColumn.tsx
│   └── TrackedJobCard.tsx
└── lib/
    ├── types.ts      # TypeScript definitions
    ├── utils.ts      # Utility functions
    └── localStorage.ts # Local storage management
```

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
