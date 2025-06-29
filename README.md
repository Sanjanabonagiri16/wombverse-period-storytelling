# 🌟 Wombverse Period Storytelling 🌟

A modern, real-time storytelling platform built with React, TypeScript, and Supabase. Share and connect with stories from the community with live updates and beautiful, consistent styling.

## ✨ Features

- **Real-Time Story Updates**: New stories appear instantly across all users
- **Live Interactions**: Reactions and comments update in real-time
- **Consistent Design**: Beautiful, cohesive color scheme throughout
- **Modern UI**: Sleek and responsive design powered by Tailwind CSS
- **Fast Development**: Built on Vite for quick hot-reloading
- **Cross-Platform**: Run on Node.js and npm for flexibility

## 🚀 Real-Time Features

### ✨ **Live Story Updates**
- New stories appear instantly on the Stories page
- Story modifications reflect in real-time
- Story deletions remove immediately from all users' views
- Live notifications when new stories are added

### ✨ **Live Interactions**
- Reaction counts update instantly across all users
- Comment counts update in real-time
- Bookmark status updates immediately

### ✨ **Real-Time Indicators**
- Green dot showing "Live updates enabled"
- Floating notifications for new stories
- Multiple Supabase real-time channels

## 🗄️ Database Setup

**IMPORTANT**: Before the real-time features can work, you need to set up your database tables.

### Step 1: Access Your Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `zxcczifkldwuelhibbwm`
3. Navigate to **SQL Editor** in the left sidebar

### Step 2: Run the Database Setup Script
1. Copy the entire contents of `database-setup.sql` from your project
2. Paste it into the SQL Editor in your Supabase dashboard
3. Click **Run** to execute the script
4. You should see: `"Database setup completed successfully!"`

### Step 3: Verify Tables Created
In your Supabase dashboard, go to **Table Editor** and verify these tables exist:
- ✅ `profiles`
- ✅ `stories`
- ✅ `reactions`
- ✅ `comments`
- ✅ `bookmarks`

## 🎨 Color Consistency

The application uses a consistent color palette throughout:

### **Womb Color Palette**
- `womb-charcoal`: `#1a1a1a` (Near Black)
- `womb-crimson`: `#800000` (Dark Maroon)
- `womb-plum`: `#5C4033` (Dark Brown)
- `womb-softwhite`: `#f9fafb` (White)
- `womb-warmgrey`: `#6b7280` (Grey)
- `womb-deepgrey`: `#1f2937` (Darker Grey)

## 🚀 Prerequisites

- Node.js installed (version 16 or higher)
- npm installed
- Supabase account and project

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sanjanabonagiri16/wombverse-period-storytelling.git
cd wombverse-period-storytelling
npm install
```

## 🏃‍♂️ Running the Application

To start the development server, run:

```bash
npm run dev
```

Then, open your browser and navigate to `http://localhost:5173`.

## 🧪 Testing Real-Time Features

### **Test Story Creation**
1. Open your app in two different browser windows/tabs
2. Sign in with the same account in both
3. Create a story in one window
4. Watch it appear instantly in the other window

### **Test Reactions**
1. Open a story in two windows
2. Add a reaction in one window
3. See the reaction count update in both windows

### **Test Comments**
1. Open a story in two windows
2. Add a comment in one window
3. See the comment count update in both windows

## 🛠️ Build

To build the production version, run:

```bash
npm run build
```

## 🐛 Troubleshooting

### **If Stories Aren't Saving**
1. Check if you're signed in
2. Verify the database tables exist (run the SQL script)
3. Check browser console for errors
4. Ensure Supabase client is properly configured

### **If Real-Time Isn't Working**
1. Verify you're connected to the internet
2. Check if Supabase real-time is enabled in your project
3. Look for console errors about real-time connections
4. Ensure the database tables have real-time enabled

### **If Colors Look Wrong**
1. Clear your browser cache
2. Restart the development server
3. Verify Tailwind CSS is properly configured

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Ensure all database tables are created
4. Test with a fresh browser session

## 🔗 Links

- **Live Demo**: [https://wombverse.netlify.app/](https://wombverse.netlify.app/)
- **GitHub Repository**: [https://github.com/Sanjanabonagiri16/wombverse-period-storytelling](https://github.com/Sanjanabonagiri16/wombverse-period-storytelling)

---

**🎉 Congratulations!** Your Wombverse Period Storytelling app now has full real-time functionality with consistent, beautiful styling! 