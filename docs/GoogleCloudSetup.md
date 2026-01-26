# Google Cloud Project Setup Guide for Gratia PWA

To enable Google Drive synchronization for Gratia PWA, you need to register the application in the Google Cloud Console and obtain an **OAuth 2.0 Client ID**. This ID allows the app to securely request access to the user's "Application Data" folder in their Google Drive.

## 1. Create a Google Cloud Project

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click on the project dropdown in the top bar (it usually says "Select a project" or the name of a current project).
3.  Click **"New Project"**.
4.  Enter a name (e.g., `Gratia PWA`).
5.  Click **"Create"**.
6.  Wait for the notification that the project is created, then **select the project**.

## 2. Enable the Google Drive API

1.  In the left sidebar, navigate to **"APIs & Services" > "Enabled APIs & services"**.
2.  Click **"+ ENABLE APIS AND SERVICES"** at the top.
3.  Search for **"Google Drive API"**.
4.  Click on the result and then click **"Enable"**.

## 3. Configure the OAuth Consent Screen

1.  In the left sidebar, go to **"APIs & Services" > "OAuth consent screen"**.
2.  For **User Type**, select **"External"** (this allows any Google account to sign in, but requires verification for wide release; for personal/testing use, it's fine).
3.  Click **"Create"**.
4.  **App Information**:
    - **App name**: Gratia PWA
    - **User support email**: Select your email.
    - **Developer contact information**: Enter your email.
5.  Click **"Save and Continue"**.
6.  **Scopes**:
    - Click **"Add or Remove Scopes"**.
    - In the filter box, type `drive.appdata`.
    - Select the scope: `.../auth/drive.appdata` (See, create, and delete its own configuration data in your Google Drive).
    - _Note: If you don't see it, you may need to manually add `https://www.googleapis.com/auth/drive.appdata` in the table._
    - Also ensure `openid`, `auth/userinfo.email`, and `auth/userinfo.profile` are selected (usually default).
    - Click **"Update"**, then **"Save and Continue"**.
7.  **Test Users**:
    - **Crucial Step:** Since the app is "External" and "In Testing", you **must** add your own email address (and any other testers) here.
    - Click **"+ ADD USERS"**, enter your Gmail address, and click **"Add"**.
    - Click **"Save and Continue"**.
8.  Review the summary and click **"Back to Dashboard"**.

## 4. Create OAuth Credentials (Client ID)

1.  In the left sidebar, go to **"APIs & Services" > "Credentials"**.
2.  Click **"+ CREATE CREDENTIALS"** and select **"OAuth client ID"**.
3.  **Application type**: Select **"Web application"**.
4.  **Name**: `Gratia PWA Client` (or similar).
5.  **Authorized JavaScript origins**:
    - This is where your app is hosted. You need to add both your local development URL and your production URL.
    - Click **"ADD URI"** and enter: `http://localhost:5173` (Default Vite port).
    - Click **"ADD URI"** again and enter your GitHub Pages URL (e.g., `https://newerik.github.io` - _Update this once you know your final URL_).
6.  **Authorized redirect URIs**: You can leave this empty for the GIS Token Model (popup flow), or add the same URLs as above if prompted.
7.  Click **"Create"**.

## 5. Save Your Client ID

1.  A popup will appear with your **Client ID** and **Client Secret**.
2.  **Copy the Client ID**. (It looks like `123456789-abcdefg...apps.googleusercontent.com`).
3.  You do **not** need the Client Secret for this client-side architecture.
4.  Create a `.env` file in your project root (if you haven't already) and add:

```env
VITE_GOOGLE_CLIENT_ID=your-copied-client-id-here
```

## 6. Verification (Optional for Personal Use)

If you only use this app yourself or with the specific "Test Users" you added, you do **not** need to submit the app for Google verification. You will see a "Google hasn't verified this app" warning screen when logging in; you can click "Advanced" > "Go to Gratia PWA (unsafe)" to proceed.

---

**Next Steps:**
Once you have the `VITE_GOOGLE_CLIENT_ID`, we can implement the authentication logic in the React app.
