# Deployment Verification Script
Write-Host "Starting Deployment Verification..." -ForegroundColor Green

# 1. Check Database Connection
Write-Host "`n1. Testing Database Connection..." -ForegroundColor Yellow
try {
    $connectionString = "Server=localhost;Database=El_Harrifa;User=student;Password=course123;"
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    Write-Host "Database connection successful!" -ForegroundColor Green
    $connection.Close()
}
catch {
    Write-Host "Database connection failed: $_" -ForegroundColor Red
}

# 2. Check Application Files
Write-Host "`n2. Verifying Application Files..." -ForegroundColor Yellow
$requiredFiles = @(
    "Program.cs",
    "Startup.cs",
    "appsettings.Production.json",
    "El_Harrifa.sql",
    "README.md",
    "DEPLOYMENT.md"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "Found $file" -ForegroundColor Green
    }
    else {
        Write-Host "Missing $file" -ForegroundColor Red
    }
}

# 3. Check Frontend Files
Write-Host "`n3. Verifying Frontend Files..." -ForegroundColor Yellow
$frontendFiles = @(
    "Frontend/index.html",
    "Frontend/css/style.css",
    "Frontend/js/main.js"
)

foreach ($file in $frontendFiles) {
    if (Test-Path $file) {
        Write-Host "Found $file" -ForegroundColor Green
    }
    else {
        Write-Host "Missing $file" -ForegroundColor Red
    }
}

# 4. Check Configuration
Write-Host "`n4. Verifying Configuration..." -ForegroundColor Yellow
if (Test-Path "appsettings.Production.json") {
    $config = Get-Content "appsettings.Production.json" | ConvertFrom-Json
    Write-Host "Configuration loaded successfully" -ForegroundColor Green
    Write-Host "Connection String: $($config.ConnectionStrings.DefaultConnection)" -ForegroundColor Gray
}

# 5. Check Logs Directory
Write-Host "`n5. Verifying Logs Directory..." -ForegroundColor Yellow
if (Test-Path "logs") {
    Write-Host "Logs directory exists" -ForegroundColor Green
}
else {
    Write-Host "Creating logs directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "logs"
}

# 6. Final Status
Write-Host "`nDeployment Verification Complete!" -ForegroundColor Green
Write-Host "Please check the results above for any issues." -ForegroundColor Yellow
Write-Host "If all checks passed, your deployment is ready!" -ForegroundColor Green

# Wait for user input before closing
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 