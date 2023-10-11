#!/bin/bash

# Cloudflare API Token
CLOUDFLARE_API_TOKEN="rJDhZUXE_WiqoQg_tNwd8zKuvGlDisBh6ZQ6g2fL"

# Cloudflare Zone ID
ZONE_ID="a5d454fee207df6f9d2bf6aa9aeb89f9"

# Clear Cloudflare Cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
