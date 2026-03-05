// Minimal Node HTTP/HTTPS server with custom routing for BrandSpark
// HTTP  : http://localhost:5500/
// HTTPS : https://localhost:5501/  (with local self-signed cert)
//
// Routes:
// - /, /index.html, /index.html/               -> index.html
// - /index.html/thanks.html/ (and canonical)   -> thanks.html
// - /thanks.html, /thanks.html/                -> thanks.html
// - /styles.css                                -> styles.css
// - /app.jsx                                   -> app.jsx
// Everything else -> 404

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const selfsigned = require("selfsigned");

// IMPORTANT: We run HTTPS on 5501 (for https://localhost:5501/...)
// and plain HTTP on 5500. You cannot serve both HTTP and HTTPS on the same port.
const HTTPS_PORT = 5501;
const HTTP_PORT = 5500;
const ROOT_DIR = __dirname;

function sendFile(res, filepath, contentType) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.statusCode = err.code === "ENOENT" ? 404 : 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(err.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  });
}

function handleRequest(req, res) {
  const url = req.url || "/";

  // Canonicalize to trailing slash for nested thanks route
  if (url === "/index.html/thanks.html") {
    res.statusCode = 301;
    res.setHeader("Location", "/index.html/thanks.html/");
    res.end();
    return;
  }

  if (url === "/" || url === "/index.html" || url === "/index.html/") {
    return sendFile(
      res,
      path.join(ROOT_DIR, "index.html"),
      "text/html; charset=utf-8"
    );
  }

  if (
    url === "/thanks.html" ||
    url === "/thanks.html/" ||
    url === "/index.html/thanks.html/"
  ) {
    return sendFile(
      res,
      path.join(ROOT_DIR, "thanks.html"),
      "text/html; charset=utf-8"
    );
  }

  if (url === "/styles.css") {
    return sendFile(
      res,
      path.join(ROOT_DIR, "styles.css"),
      "text/css; charset=utf-8"
    );
  }

  if (url === "/app.jsx") {
    return sendFile(
      res,
      path.join(ROOT_DIR, "app.jsx"),
      "text/javascript; charset=utf-8"
    );
  }

  if (url === "/terms/" || url === "/terms.html") {
    return sendFile(
      res,
      path.join(ROOT_DIR, "terms.html"),
      "text/html; charset=utf-8"
    );
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not found");
}

// HTTP server
const httpServer = http.createServer(handleRequest);
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP  server listening at  http://localhost:${HTTP_PORT}/`);
  console.log(`       also at           http://localhost:${HTTP_PORT}/index.html/`);
});

// HTTPS server (auto-generates a self-signed certificate with selfsigned)
try {
  const attrs = [{ name: "commonName", value: "localhost" }];
  const pems = selfsigned.generate(attrs, {
    days: 365,
    keySize: 2048,
    algorithm: "sha256",
  });

  // Configure HTTPS with modern TLS settings and strong cipher suites
  const httpsServer = https.createServer(
    {
      key: pems.private,
      cert: pems.cert,
      // Force modern TLS (helps avoid SSL_ERROR_NO_CYPHER_OVERLAP in some browsers)
      minVersion: "TLSv1.2",
      honorCipherOrder: true,
      // Common strong ciphers supported by modern browsers
      ciphers: [
        "TLS_AES_256_GCM_SHA384",
        "TLS_CHACHA20_POLY1305_SHA256",
        "TLS_AES_128_GCM_SHA256",
        "ECDHE-ECDSA-AES256-GCM-SHA384",
        "ECDHE-RSA-AES256-GCM-SHA384",
        "ECDHE-ECDSA-AES128-GCM-SHA256",
        "ECDHE-RSA-AES128-GCM-SHA256",
      ].join(":"),
    },
    handleRequest
  );
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS server listening at https://localhost:${HTTPS_PORT}/`);
    console.log(`       also at          https://localhost:${HTTPS_PORT}/index.html/`);
  });
} catch (e) {
  console.warn("HTTPS not started due to an error generating self-signed cert:", e);
}



