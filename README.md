

# ITM CONNECT

ITM CONNECT is a comprehensive platform designed to enhance student engagement and community interaction within ITM universities. This application serves as a central hub for students to communicate, collaborate, and stay informed about campus activities.

## 🌟 Key Features

### 1. Real-Time Communication
- **Chat System**: Connect with peers through text and voice channels
- **Group Discussions**: Join topic-specific channels for academic and social interactions
- **Direct Messaging**: Private communication between students

### 2. Issue Management
- **Issue Reporting**: Easy-to-use interface for reporting campus-related issues
- **Status Tracking**: Real-time updates on reported issues
- **Priority System**: Issues are categorized and prioritized for efficient resolution
- **Public/Private Options**: Choose to make issues public or keep them private

### 3. Event Management
- **Event Creation**: Create and manage campus events
- **Club Activities**: Dedicated space for club announcements and activities
- **RSVP System**: Track event attendance and participation
- **Budget Tracking**: Monitor event expenses and budgets
- **Calendar Integration**: Sync events with personal calendars

### 4. Resource Sharing
- **Community Resources**: Share and access educational materials
- **Leaderboard System**: Gamified points system for active contributors
- **Resource Categories**: Organized content for easy navigation
- **Following System**: Follow contributors to stay updated

## 💻 Technical Stack

- **Frontend**: Next.js 13 with App Router
- **UI Components**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Real-time Features**: Supabase Realtime

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/itm-connect.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Add your Supabase credentials to `.env.local`

4. Run the development server
```bash
npm run dev
```

## 🏗 Project Structure

```
itm-connect/
├── app/                    # Next.js 13 app directory
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── chat/             # Chat related components
│   ├── events/           # Event management components
│   ├── issues/           # Issue tracking components
│   ├── resources/        # Resource sharing components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions and store
│   ├── store/            # Zustand store configurations
│   └── utils/            # Helper functions
└── public/               # Static assets
```
