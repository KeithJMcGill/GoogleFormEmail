function sendEmails() 
{
  // This constant is written in column i for rows for which an email
  // has been sent successfully.
  var EMAIL_SENT = "EMAIL_SENT";
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var startRow = 2;  // First row of data to process
  var numRows = rows.getNumRows();   // Number of rows to process
  var dataRange = sheet.getRange(startRow, 1, numRows, 9); // Fetch the range of cells
  var data = dataRange.getValues(); // Fetch values for each row in the range
  for (var i = 0; i < data.length; ++i) 
  {
    var row = data[i];
    var firstName = row[1];  // Second column
    var lastName = row[2];       // Third column
    var emailAddress = row[3];     // Fourth column
    var studentID = row[4];     // Fifth column
    var messageType = row[5];     // Sixth column
    var professor = row[6];     // Seventh column
    var mathProblem = row[7];     // Eighth column
    var emailSent = row[8];     // Ninth column
    var subject = "Department Email";
    var professorEmail = "";
    var message = "Name: " + firstName + " " + lastName + "\nEmail Address: " + emailAddress + "\nStudent ID: " + studentID + "\nMessage :" + messageType;
    if (emailSent != EMAIL_SENT && firstName != "") // Prevents sending duplicates
    {
      if (professor == "NONE")
      {
        sheet.getRange(startRow + i, 9).setValue(EMAIL_SENT);
        SpreadsheetApp.flush();  // Make sure the cell is updated right away in case the script is interrupted
        break;
      }
      else if (mathProblem != 7)
      {
        sheet.getRange(startRow + i, 9).setValue(EMAIL_SENT);
        SpreadsheetApp.flush();  // Make sure the cell is updated right away in case the script is interrupted
        break;
      }
      else if (professor == "Professors Name") // Change to the professors name
      {
        professorEmail = "Professors Email"; // Change to the professors email address
      }
      MailApp.sendEmail(professorEmail, subject, message);
      sheet.getRange(startRow + i, 9).setValue(EMAIL_SENT);
      SpreadsheetApp.flush();  // Make sure the cell is updated right away in case the script is interrupted
    }
  }
};