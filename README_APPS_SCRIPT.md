# Google Apps Script Setup Instructions

1.  Open your Google Sheet with ID: `1ltiRQZkBi8Tv29MhMfGg-ftYLwJ6yTV0Rwap_cG3VjU`.
2.  Go to `Extensions` > `Apps Script`.
3.  Delete any code in the `Code.gs` file and paste the content from `google_apps_script.js`.
4.  Run the `setup()` function once to initialize the headers if the sheet is empty. You may need to grant permissions.
5.  Click on `Deploy` > `New deployment`.
6.  Select type: `Web app`.
7.  Description: "Form Submission API".
8.  Execute as: `Me`.
9.  Who has access: `Anyone`. (This is crucial for the form to work without user login).
10. Click `Deploy`.
11. Copy the `Web App URL` provided.
12. Paste this URL into the `app/page.tsx` file where it says `const GOOGLE_SCRIPT_URL = '...'`.
