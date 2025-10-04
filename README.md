# 📊 Arbaeen Walk - Backend Sync System

## 🎯 **Purpose**
This repository automatically syncs Google Sheets data to JSON files for the Arbaeen Walk mobile app.

## 🔄 **How It Works**
1. **Edit Google Sheets** with announcements and updates
2. **GitHub Actions runs** every 5 minutes automatically  
3. **JSON files are generated** and hosted on GitHub
4. **Mobile app fetches** fresh data automatically

## 📋 **Files in This Repository**

### **Core Files:**
- `sync-script.js` - Main sync logic with Google Sheets API
- `package.json` - Dependencies and project info
- `.github/workflows/sync-sheets.yml` - GitHub Actions automation

### **Generated Files (Auto-created):**
- `announcements.json` - Main announcements feed
- `emergency-updates.json` - Urgent alerts only

## ⚙️ **Setup Requirements**

### **GitHub Secrets (Required):**
Add these in Repository Settings → Secrets → Actions:

1. **`GOOGLE_SHEET_ID`** - Your Google Sheet ID from the URL
2. **`GOOGLE_SERVICE_ACCOUNT`** - Complete JSON from Google Cloud service account

### **Google Sheet Structure:**
Your sheet must have these columns:
| ID | Title | Message | Date | Type | Priority | Active | Expires | Icon |

## 🚀 **Usage**

### **Manual Sync:**
1. Go to **Actions** tab
2. Click **"Sync Google Sheets to JSON"**
3. Click **"Run workflow"**

### **Automatic Sync:**
- Runs every 5 minutes automatically
- Triggered on any code push
- Creates JSON files in repository root

## 📱 **App Integration**

Your mobile app fetches data from:
```
https://raw.githubusercontent.com/hasankaz/arbaeen-backend/main/announcements.json
https://raw.githubusercontent.com/hasankaz/arbaeen-backend/main/emergency-updates.json
```

## ✅ **Features**
- ✅ **Free hosting** on GitHub Pages
- ✅ **Automatic sync** every 5 minutes  
- ✅ **Mobile-friendly** JSON format
- ✅ **Priority-based** emergency alerts
- ✅ **Version tracking** with Git history
- ✅ **Team collaboration** via Google Sheets

## 🔧 **Technical Details**
- **Node.js 18** runtime
- **Google Sheets API v4** integration  
- **JWT authentication** for service accounts
- **GitHub Actions** for automation
- **JSON output** optimized for mobile apps

---

*Last updated: October 4, 2025*  
*Part of the Arbaeen Walk mobile app ecosystem*