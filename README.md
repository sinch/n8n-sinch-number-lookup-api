# n8n-nodes-number-lookup-api

This is an n8n community node. It lets you use [Sinch Number Lookup API](https://developers.sinch.com/docs/number-lookup/) in your n8n workflows.

Sinch Number Lookup API provides real-time phone number validation and verification services. With quick and easy access to Number Lookup, you can enhance your communications and keep your database clean. The API checks against first-party numbering sources and provides real-time feedback to improve communication by validating and verifying numbers, boosting delivery conversion rates, and saving money on marketing campaigns.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Lookup

Performs a comprehensive number lookup operation. You can select one or more features to include in the lookup request:

- **Line Type**: Identify the type of phone line (mobile, landline, VoIP, etc.) including carrier information and porting status
- **SIM Swap**: Detect if the SIM card has been swapped recently (configurable time periods from 4 hours to 30 days)
- **VoIP Detection**: Check if the number is a VoIP (Voice over IP) number with probability scoring
- **RND (Reassigned Number Database)**: Determine if the number has been reassigned to a new subscriber since your last contact date

## Credentials

This node uses OAuth2 (Client Credentials) authentication. To set up credentials:

### Prerequisites

1. Sign up for a [Sinch account](https://dashboard.sinch.com/signup)
2. Create a new project in the [Sinch Dashboard](https://dashboard.sinch.com/)
3. Navigate to **APIs** → **Number Lookup** to enable the API
4. Go to **Settings** → **Access Keys** to obtain your credentials

### Setting up credentials in n8n

1. In n8n, create new credentials of type "Sinch Number Lookup Api OAuth2 API"
2. Fill in the following fields:
   - **Project ID**: Your Sinch project ID (UUID format, e.g., `395fcbf6-20d6-4e76-8242-77106018e191`)
   - **Client ID**: Your access key ID from Sinch Dashboard
   - **Client Secret**: Your access key secret from Sinch Dashboard
3. Click "Connect" to authenticate

The credentials use the Sinch OAuth2 token endpoint (`https://auth.sinch.com/oauth2/token`) with client credentials grant type.

## Compatibility

This node has been tested with **n8n v1.0+** and uses the n8n nodes API v1.

## Usage

### Basic Number Lookup

1. Add the **Sinch Number Lookup Api** node to your workflow
2. Configure your credentials
3. Enter your **Project ID** (the UUID of your Sinch project)
4. Enter a phone number in **E.164 format** (e.g., `+48123321123`)
   - Must start with `+` followed by country code and number
   - No spaces, dashes, or other formatting
5. Select one or more **Features** to query
6. Execute the node

### Using the RND (Reassigned Number Database) Feature

When using the RND feature, you must provide a **Contact Date**:

1. Select "RND" from the Features list
2. A **Contact Date** field will appear
3. Enter the date when you last contacted this number
4. The API will check if the number was reassigned after that date

### Example Workflow

```
Manual Trigger → Sinch Number Lookup Api → IF (check results)
```

Use the lookup results to:
- Filter out invalid numbers before sending SMS/calls
- Detect high-risk numbers (recent SIM swaps, VoIP)
- Clean your contact database
- Validate user-provided phone numbers in real-time

### Response Data

The node returns comprehensive information about the queried number:

```json
{
  "number": "+12312312312",
  "countryCode": "US",
  "line": {
    "type": "Mobile",
    "carrier": "T-Mobile USA",
    "mobileCountryCode": "310",
    "mobileNetworkCode": "260",
    "ported": true,
    "portingDate": "2023-01-15T00:00:00Z"
  },
  "simSwap": {
    "swapped": false,
    "swapPeriod": "SP24H"
  },
  "voIPDetection": {
    "probability": "Low"
  },
  "rnd": {
    "disconnected": false
  },
  "traceId": "84c1fd4063c38d9f3900d06e56542d48"
}
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Sinch Number Lookup API Documentation](https://developers.sinch.com/docs/number-lookup-api-v2)
* [Sinch Dashboard](https://dashboard.sinch.com/)
* [Sinch API Reference](https://developers.sinch.com/docs/number-lookup-api-v2/api-reference/number-lookup-v2/numberlookupv2)
* [Get Support](https://www.sinch.com/contact-us/)
