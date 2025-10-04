const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');

async function syncSheets() {
  try {
    console.log('🔄 Starting Google Sheets sync...');
    
    // Parse service account credentials
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    
    // Create JWT auth instance
    const serviceAccountAuth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    // Initialize the sheet with auth
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Load the document
    await doc.loadInfo();
    console.log(`📊 Loaded sheet: ${doc.title}`);
    
    // Get the first sheet (Announcements)
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    console.log(`📝 Found ${rows.length} rows`);
    
    // Convert to JSON format
    const announcements = rows.map((row, index) => ({
      id: parseInt(row.get('ID')) || (index + 1),
      title: row.get('Title') || '',
      message: row.get('Message') || '',
      date: row.get('Date') || new Date().toISOString().split('T')[0],
      type: (row.get('Type') || 'general').toLowerCase(),
      priority: (row.get('Priority') || 'normal').toLowerCase(),
      active: row.get('Active') === 'TRUE' || row.get('Active') === true,
      expires: row.get('Expires') || null,
      icon: row.get('Icon') || '📢'
    })).filter(item => item.title && item.message); // Only include complete entries
    
    // Create the output JSON
    const output = {
      version: "1.0",
      last_updated: new Date().toISOString(),
      source: "Google Sheets Auto-Sync",
      total_announcements: announcements.length,
      announcements: announcements
    };
    
    // Write to file
    fs.writeFileSync('announcements.json', JSON.stringify(output, null, 2));
    console.log(`✅ Successfully synced ${announcements.length} announcements`);
    
    // Also create emergency updates (filter urgent items)
    const emergencyUpdates = announcements
      .filter(item => item.priority === 'urgent')
      .map(item => ({
        ...item,
        severity: 'urgent',
        created_at: new Date().toISOString()
      }));
    
    const emergencyOutput = {
      version: "1.0",
      last_updated: new Date().toISOString(),
      source: "Google Sheets Auto-Sync",
      emergency_updates: emergencyUpdates
    };
    
    fs.writeFileSync('emergency-updates.json', JSON.stringify(emergencyOutput, null, 2));
    console.log(`🚨 Created ${emergencyUpdates.length} emergency updates`);
    
    console.log('🎉 Sync completed successfully!');
    
  } catch (error) {
    console.error('❌ Error syncing sheets:', error);
    process.exit(1);
  }
}

syncSheets();