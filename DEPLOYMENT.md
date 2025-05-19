# Deploying Al-Harrifa to MonsterASP

## Prerequisites
1. .NET 6.0 SDK installed on your local machine
2. MonsterASP hosting account with:
   - SQL Server database
   - ASP.NET Core hosting
   - FTP access

## Deployment Steps

### 1. Database Setup
1. Log in to your MonsterASP control panel
2. Create a new SQL Server database
3. Note down the following details:
   - Server name (e.g., `your-server.monsterasp.net`)
   - Database name
   - Username
   - Password

### 2. Update Configuration
1. Open `appsettings.Production.json`
2. Update the connection string with your MonsterASP database details:
```json
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER.monsterasp.net;Database=YOUR_DATABASE;User=YOUR_USERNAME;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
}
```

### 3. Build and Deploy
1. Run the deployment script:
```bash
deploy.bat
```
2. This will create a `publish` directory with all necessary files

### 4. Upload to MonsterASP
1. Connect to your MonsterASP hosting via FTP
2. Upload all contents from the `publish` directory to your website's root directory
3. Make sure to maintain the following directory structure:
   - `/wwwroot/uploads` - For product images
   - `/logs` - For application logs

### 5. Database Migration
1. Connect to your MonsterASP database using SQL Server Management Studio
2. Run the `SampleData.sql` script to create the database schema and initial data

### 6. Verify Deployment
1. Visit your website URL
2. Test the following functionality:
   - User registration and login
   - Product browsing
   - Product creation
   - Image uploads
   - Shopping cart

## Troubleshooting

### Common Issues
1. **Database Connection Error**
   - Verify connection string in `appsettings.Production.json`
   - Check if database credentials are correct
   - Ensure SQL Server is running on MonsterASP

2. **Image Upload Issues**
   - Check if `/wwwroot/uploads` directory exists and has write permissions
   - Verify file size limits in `appsettings.Production.json`

3. **Application Errors**
   - Check the logs in `/logs` directory
   - Verify all required files are uploaded
   - Ensure proper file permissions

### Support
If you encounter any issues during deployment, please contact MonsterASP support or create an issue in the project repository. 