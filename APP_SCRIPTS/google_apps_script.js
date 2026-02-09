function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var sheetId = '1ltiRQZkBi8Tv29MhMfGg-ftYLwJ6yTV0Rwap_cG3VjU'; // Add your sheet ID here
        var doc = SpreadsheetApp.openById(sheetId);
        var sheet = doc.getSheets()[0];

        // Ensure headers exist
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
        var desiredHeaders = ["Timestamp", "Reg. No.", "Student Name", "Email", "Department", "Year", "Phone", "Expectations"];

        if (headers[0] === "") {
            sheet.appendRow(desiredHeaders);
            headers = desiredHeaders; // Update local headers variable
        }

        // Get all existing data to check for duplicates
        // Assuming Reg. No. is at index 1 and Email is at index 3 based on desiredHeaders order
        // We read all data from row 2
        var dataRange = sheet.getDataRange();
        var data = [];
        if (dataRange.getLastRow() > 1) {
            data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        }

        var newRegNo = e.parameter["Reg. No."];
        var newEmail = e.parameter["Email"];

        // Check for duplicates
        // Column indices (0-based) in 'data' array correspond to desiredHeaders:
        // 0: Timestamp, 1: Reg. No., 2: Name, 3: Email ...
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var existingRegNo = String(row[1]); // Ensure string comparison
            var existingEmail = String(row[3]);

            if (existingRegNo === newRegNo) {
                return ContentService
                    .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Duplicate Registration: Reg. No. already registered.' }))
                    .setMimeType(ContentService.MimeType.JSON);
            }
            if (existingEmail === newEmail) {
                return ContentService
                    .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Duplicate Registration: Email already registered.' }))
                    .setMimeType(ContentService.MimeType.JSON);
            }
        }

        var nextRow = sheet.getLastRow() + 1;
        var newRow = desiredHeaders.map(function (header) {
            if (header === "Timestamp") {
                // Return explicitly formatted string with Time
                return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
            }
            return e.parameter[header];
        });

        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function setup() {
    var sheetId = '1ltiRQZkBi8Tv29MhMfGg-ftYLwJ6yTV0Rwap_cG3VjU';
    var doc = SpreadsheetApp.openById(sheetId);
    var sheet = doc.getSheets()[0];
    var desiredHeaders = ["Timestamp", "Reg. No.", "Student Name", "Email", "Department", "Year", "Phone", "Expectations"];

    if (sheet.getLastRow() === 0) {
        sheet.appendRow(desiredHeaders);
    }
}
