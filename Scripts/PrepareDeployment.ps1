# Deployment Preparation Script
Write-Host "Starting deployment package preparation..." -ForegroundColor Green

# Create deployment directory
$deployDir = "..\Deployment"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy necessary files and folders
Write-Host "Copying project files..." -ForegroundColor Yellow
$foldersToCopy = @(
    "Controllers",
    "Models",
    "Views",
    "Services",
    "Helpers",
    "Frontend",
    "Data"
)

foreach ($folder in $foldersToCopy) {
    if (Test-Path "..\$folder") {
        Copy-Item "..\$folder" -Destination $deployDir -Recurse
    }
}

# Copy necessary files
$filesToCopy = @(
    "Program.cs",
    "Startup.cs",
    "appsettings.Production.json",
    "El_Harrifa.sql",
    "README.md"
)

foreach ($file in $filesToCopy) {
    if (Test-Path "..\$file") {
        Copy-Item "..\$file" -Destination $deployDir
    }
}

# Clean up unnecessary files
Write-Host "Cleaning up unnecessary files..." -ForegroundColor Yellow
$filesToRemove = @(
    "*.user",
    "*.suo",
    "*.userosscache",
    "*.sln.docstates",
    "*.userprefs",
    "*.dbmdl",
    "*.jfm",
    "*.pfx",
    "*.publishsettings",
    "*.zip",
    "*.rar"
)

foreach ($pattern in $filesToRemove) {
    Get-ChildItem -Path $deployDir -Filter $pattern -Recurse | Remove-Item -Force
}

# Remove development-only directories
$dirsToRemove = @(
    "bin",
    "obj",
    "TestResults",
    "logs",
    ".git",
    ".vs",
    "Tests"
)

foreach ($dir in $dirsToRemove) {
    if (Test-Path "$deployDir\$dir") {
        Remove-Item "$deployDir\$dir" -Recurse -Force
    }
}

# Create ZIP file
Write-Host "Creating deployment package..." -ForegroundColor Yellow
$zipFile = "..\El-Harrifa-Deployment.zip"
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($deployDir, $zipFile)

# Cleanup
Remove-Item $deployDir -Recurse -Force

Write-Host "`nDeployment package preparation completed!" -ForegroundColor Green
Write-Host "Package created at: $zipFile" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Upload the ZIP file to MonsterASP.NET" -ForegroundColor White
Write-Host "2. Extract the contents in your hosting directory" -ForegroundColor White
Write-Host "3. Configure your database connection" -ForegroundColor White
Write-Host "4. Set up your application pool" -ForegroundColor White 