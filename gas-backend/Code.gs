function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    storage: 'google-sheets'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const answers = data.answers; // This is the array [Timestamp, Q1, Q2, Q3, Q4, Q5, Comments]
    
    // Open the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // Use the first sheet
    
    // If the sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Comentarios']);
    }
    
    // Append the data
    sheet.appendRow(answers);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Response saved to Google Sheets'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
