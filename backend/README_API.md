## Backend API - QR Code Generator

Base URL: `http://localhost:3000`

All responses use JSON and follow this common wrapper:

```ts
type ApiResponse = {
  ok: boolean,
  msg: string,
  data: null | string
}
```

### POST /qrCode/generateQRCode

- Description: Generate a QR code from a text payload and return a PNG Data URL.
- Method: `POST`
- Path: `/qrCode/generateQRCode`
- Content-Type: `application/json`

Request body (required):

```json
{
  "text": "string" // the text or URL to encode as a QR code (required)
}
```

Successful response (HTTP 200):

```json
{
  "ok": true,
  "msg": "Success",
  "data": "data:image/png;base64,iVBORw0KGgo..."
}
```

Client error (HTTP 400) — validation failed:

```json
{
  "ok": false,
  "msg": "Error",
  "data": null
}
```

Rate limit (HTTP 429):

```json
{
  "ok": false,
  "msg": "Too many requests. Try again later",
  "data": null
}
```

Notes & behavior
- The endpoint trims and escapes input; empty `text` values are rejected.
- The server applies a rate limiter configured to a 60-second window (see `backend/src/server.ts`).
- CORS is enabled for all origins in development by default.
- Returned `data` is a Data URL (PNG). You can set it directly as an `<img>` `src` or decode it into a blob if you need to save or download the image.

Usage examples

cURL

```bash
curl -s -X POST http://localhost:3000/qrCode/generateQRCode \
  -H "Content-Type: application/json" \
  -d '{"text":"https://example.com"}'
```

Node (axios)

```js
import axios from 'axios'

const res = await axios.post('http://localhost:3000/qrCode/generateQRCode', { text: 'Hello' })
if (res.data.ok) console.log(res.data.data)
```

Browser Fetch (display image)

```js
fetch('http://localhost:3000/qrCode/generateQRCode', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'https://example.com' })
})
.then(r => r.json())
.then(res => {
  if (res.ok) {
    const img = document.createElement('img')
    img.src = res.data
    document.body.appendChild(img)
  } else {
    console.error('API error', res.msg)
  }
})
```

Convert Data URL to Blob (download)

```js
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new Blob([u8arr], { type: mime })
}

// usage: const blob = dataURLtoBlob(res.data)
```

Production notes & recommendations
- Protect the endpoint with more restrictive CORS rules and authentication if exposing to the public.
- Consider adding content-length / size limits for input and response payloads to avoid abuse.
- Serve generated images as binary resources (e.g., return `image/png`) if you need direct image endpoints rather than Data URLs.
- Cache results for repeated inputs to reduce CPU cost when generating the same QR code frequently.

Implementation
- The route implementation is in `backend/src/routes/Qrcode.ts` and uses the `qrcode` npm package to generate Data URLs.

