
# Google Sheets API CLI

A Node.js command-line tool to **read and write data to Google Sheets** using a service account.

---

## Features

- Read data from a Google Sheet range
- Write data to a Google Sheet range
- Automatic token refresh if expired
- Scope limited to Google Sheets API access
- CLI support (`google-sheets-cli`) or direct Node execution (`index.js`)

---

## Installation

```bash
# Install dependencies
npm install googleapis

# (Optional) Install CLI globally
npm install -g
# This registers "google-sheets-cli" as a global command
```

Check global packages:

```bash
npm list -g --depth=0
```

---

## Setup

### 1. Generate Service Account Keys
- Go to **Google Cloud Console**.
- Create a Service Account.
- Navigate to **Keys > Add Key > JSON**.
- Download and rename the file as:

```bash
service-account.json
```

### 2. Share your Google Sheet
- Open the target Google Sheet.
- Share it with the **`client_email`** from your `service-account.json`.

---

##  Authorization Scope

Located in `auth.js`.

```javascript
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
```

- **Default:** Access only to Google Sheets.
- To add permissions (e.g., Drive access), extend the `scopes` array accordingly.

---

##  Usage

### CLI Mode (Global Command)

```bash
google-sheets-cli read <spreadsheetId> <range>
```

### Node.js Mode

```bash
node index.js read <spreadsheetId> <range>
node index.js write <spreadsheetId> <range> <data>
```

---

## Usage Examples

### Read Range

```bash
node index.js read "1abcExampleSheetId" "Sheet1!A1:C5"
```

### Read with Hidden Elements Visible

```bash
node index.js read "1abcExampleSheetId" "Sheet1!A1:C5" false
```

### Write Static Data

```bash
node index.js write "1abcExampleSheetId" "Sheet1!A1:B3" "[['Name','Score'],['Alice','95'],['Bob','88']]"
```

### Write a Formula

```bash
node index.js write "1abcExampleSheetId" "Sheet1!C1" "[['=SUM(B2:B3)']]"
```

### Overwrite a Large Range

```bash
node index.js write "1abcExampleSheetId" "Sheet1!A1:Z50" "[[...]]"
```

---

## Token Management

- Tokens are automatically refreshed when expired.
- No manual action required by the user.

---

## Project Structure

```
.
├── index.js           # Main script to parse arguments and execute
├── auth.js            # Authentication and token management
├── service-account.json # Google Service Account credentials
└── README.md
```

---

## License

MIT © Jazmin S.R.


