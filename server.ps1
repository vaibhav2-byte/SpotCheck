# Lightweight Local HTTP Server for SpotCheck RAG
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "SpotCheck RAG Server running on http://localhost:$port/"
$baseDir = $PSScriptRoot

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($rawPath) -or $rawPath -eq "/") {
            $rawPath = "index.html"
        }

        # Security check: prevent directory traversal
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($baseDir, $rawPath))
        if (-not $filePath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $filePath -PathType Leaf)) {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = switch ($extension) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            ".svg"  { "image/svg+xml" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".ico"  { "image/x-icon" }
            default { "application/octet-stream" }
        }

        $response.ContentType = $contentType
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.Close()
    }
}
finally {
    $listener.Stop()
}
