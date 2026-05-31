# Deployment

How to deploy a customer deck to Cloudflare Workers on the luuk-dev account, and lock it down with Cloudflare Access.

## Account Details

- **Account ID:** `1aeca2f2fd756d1dad2398a75a92c880`
- **Account name:** luuk-dev
- **Worker naming convention:** `customer-deck-{slug}` (e.g., `customer-deck-acme-corp`)
- **URL pattern:** `customer-deck-{slug}.luuk-dev.workers.dev`

---

## Step 1: Build and Deploy

Run from the project directory (`/Users/luuk/git/customer-decks/{slug}/`):

```bash
npm install
npx vite build
npx wrangler deploy
```

### Expected output

```
Uploaded customer-deck-acme-corp (X.XX sec)
Deployed customer-deck-acme-corp triggers (X.XX sec)
  https://customer-deck-acme-corp.luuk-dev.workers.dev
Current Version ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## Step 2: Enable Cloudflare Access on the Worker

After deploying, protect the `workers.dev` URL with Cloudflare Access. Use the Cloudflare API — this takes about 30 seconds.

You need:
- `CF_API_TOKEN` — a token with **Access: Apps and Policies Write** + **Workers Scripts: Edit** permissions on the luuk-dev account
- `ACCOUNT_ID` = `1aeca2f2fd756d1dad2398a75a92c880`
- `WORKER_NAME` = `customer-deck-{slug}` (e.g. `customer-deck-acme-corp`)
- `CUSTOMER_DOMAIN` = the customer's email domain (e.g. `acme.com`)
- `CUSTOMER_NAME` = human-readable customer name (e.g. `Acme Corp`)

### 2a. Enable Access on the Worker's workers.dev URL

```bash
curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/services/${WORKER_NAME}/environments/production/subdomain-enabled" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"enabled": true}'
```

This creates an Access application protecting `customer-deck-{slug}.luuk-dev.workers.dev` automatically.

### 2b. Get the Access application ID for the Worker

```bash
APP_ID=$(curl -s \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  | jq -r --arg name "${WORKER_NAME}" \
    '.result[] | select(.name == $name or (.domain // "" | contains($name))) | .id' \
  | head -1)
echo "App ID: $APP_ID"
```

### 2c. Find the existing "Allow Cloudflare" reusable policy

The "Allow Cloudflare" policy (`@cloudflare.com` emails ending in) already exists on the account from a previous deck. Find its ID:

```bash
CF_POLICY_ID=$(curl -s \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  | jq -r '.result[] | select(.name == "Allow Cloudflare") | .id' \
  | head -1)
echo "CF Policy ID: $CF_POLICY_ID"
```

If it does not exist yet, create it:

```bash
CF_POLICY_ID=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Allow Cloudflare",
    "decision": "allow",
    "include": [{ "email_domain": { "domain": "cloudflare.com" } }],
    "exclude": [],
    "require": []
  }' | jq -r '.result.id')
echo "Created CF Policy ID: $CF_POLICY_ID"
```

### 2d. Create the customer-specific "Allow {Customer}" reusable policy

```bash
CUSTOMER_POLICY_ID=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"name\": \"Allow ${CUSTOMER_NAME}\",
    \"decision\": \"allow\",
    \"include\": [{ \"email_domain\": { \"domain\": \"${CUSTOMER_DOMAIN}\" } }],
    \"exclude\": [],
    \"require\": []
  }" | jq -r '.result.id')
echo "Customer Policy ID: $CUSTOMER_POLICY_ID"
```

### 2e. Attach both policies to the Access application

```bash
curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "[
    { \"id\": \"${CF_POLICY_ID}\",       \"precedence\": 1 },
    { \"id\": \"${CUSTOMER_POLICY_ID}\", \"precedence\": 2 }
  ]"
```

---

## Step 3: Verify

Open the URL in a private browser window. You should hit the Cloudflare Access login page. Log in with a `@cloudflare.com` or `@{customer-domain}` email — both should be granted access. Any other email should be blocked.

```
https://customer-deck-{slug}.luuk-dev.workers.dev
```

---

## Full deploy + protect script (copy-paste)

```bash
#!/bin/bash
set -e

ACCOUNT_ID="1aeca2f2fd756d1dad2398a75a92c880"
WORKER_NAME="customer-deck-acme-corp"   # <-- change
CUSTOMER_NAME="Acme Corp"               # <-- change
CUSTOMER_DOMAIN="acme.com"              # <-- change
CF_API_TOKEN="${CLOUDFLARE_API_TOKEN}"  # set in env

# 1. Build and deploy
npx vite build
npx wrangler deploy

# 2. Enable Access on workers.dev
curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/services/${WORKER_NAME}/environments/production/subdomain-enabled" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"enabled": true}'

# 3. Get app ID
APP_ID=$(curl -s \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  | jq -r --arg name "${WORKER_NAME}" \
    '.result[] | select(.domain // "" | contains($name)) | .id' \
  | head -1)

# 4. Get or create "Allow Cloudflare" reusable policy
CF_POLICY_ID=$(curl -s \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  | jq -r '.result[] | select(.name == "Allow Cloudflare") | .id' | head -1)

if [ -z "$CF_POLICY_ID" ]; then
  CF_POLICY_ID=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies" \
    -H "Authorization: Bearer ${CF_API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data '{"name":"Allow Cloudflare","decision":"allow","include":[{"email_domain":{"domain":"cloudflare.com"}}],"exclude":[],"require":[]}' \
    | jq -r '.result.id')
fi

# 5. Create customer policy
CUSTOMER_POLICY_ID=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{\"name\":\"Allow ${CUSTOMER_NAME}\",\"decision\":\"allow\",\"include\":[{\"email_domain\":{\"domain\":\"${CUSTOMER_DOMAIN}\"}}],\"exclude\":[],\"require\":[]}" \
  | jq -r '.result.id')

# 6. Attach both policies
curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "[{\"id\":\"${CF_POLICY_ID}\",\"precedence\":1},{\"id\":\"${CUSTOMER_POLICY_ID}\",\"precedence\":2}]"

echo "Done. Deck live at: https://${WORKER_NAME}.luuk-dev.workers.dev"
echo "Protected by Access — allows @cloudflare.com and @${CUSTOMER_DOMAIN}"
```

---

## Pre-deployment Checklist

Before deploying, verify:

1. `wrangler.jsonc` has the correct `name` (`customer-deck-{slug}`) and `account_id`
2. `wrangler.jsonc` has `"assets": { "directory": "./dist" }` with no `binding` key
3. All slide components import correctly
4. The `deck-content.ts` file exports a valid `DeckContent` object
5. The `dist/` folder exists (run `npx vite build` first)
6. You have `CLOUDFLARE_API_TOKEN` set with **Access: Apps and Policies Write** permissions
7. You know the customer's email domain (e.g. `acme.com`) — needed for the Access policy

---

## Troubleshooting

### "Authentication error"
Wrangler needs to be authenticated. Run `npx wrangler login` first, or ensure `CLOUDFLARE_API_TOKEN` is set.

### "Cannot use assets with a binding in an assets-only Worker"
Remove the `binding` key from the `assets` block in `wrangler.jsonc`. The config must be exactly:
```jsonc
"assets": {
  "directory": "./dist"
}
```

### "The entry-point file at ... was not found"
You ran `npx wrangler deploy` without building first. Run `npx vite build` and retry.

### Access app ID returns empty
The Access application is created asynchronously after enabling the workers.dev URL. Wait 5-10 seconds and retry step 2b.

### "Allow Cloudflare" policy not found
It hasn't been created yet on the luuk-dev account. Run step 2c to create it — it will be reused by all future decks automatically.

---

## Custom Domains (optional, future)

To use a custom domain like `acme.decks.luuk.dev`:

1. Add a DNS record for `*.decks.luuk.dev` pointing to Workers
2. Add a route in `wrangler.jsonc`:
   ```jsonc
   {
     "routes": [
       { "pattern": "acme.decks.luuk.dev", "custom_domain": true }
     ]
   }
   ```

This is not set up yet. For now, use the default `workers.dev` URL.
