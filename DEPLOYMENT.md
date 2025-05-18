# El-Harrifa Deployment Guide

This guide provides step-by-step instructions for deploying the El-Harrifa e-commerce platform for course evaluation.

## Prerequisites

1. Development Environment:
   - .NET 7.0 SDK
   - MySQL Server
   - Visual Studio 2022 or VS Code
   - Git

2. Required Accounts:
   - GitHub account (for code hosting)
   - Azure Student account (for free hosting)

## Deployment Steps

### 1. Code Preparation

1. Run the cleanup script:
   ```bash
   cd Frontend
   cleanup.bat
   ```

2. Update configuration:
   - Edit `appsettings.Production.json`
   - Set database connection string
   - Configure logging path

3. Test locally:
   ```bash
   dotnet run
   ```

### 2. Database Setup

1. Create MySQL database:
   ```sql
   CREATE DATABASE El_Harrifa;
   ```

2. Run database script:
   ```bash
   mysql -u student -p El_Harrifa < El_Harrifa.sql
   ```

3. Verify tables:
   ```sql
   USE El_Harrifa;
   SHOW TABLES;
   ```

### 3. Azure Deployment

1. Create Azure Web App:
   - Go to Azure Portal
   - Create new Web App
   - Select .NET 7.0 runtime
   - Choose free tier

2. Configure deployment:
   - Set up GitHub Actions
   - Configure environment variables
   - Set up MySQL connection

3. Deploy:
   - Push to GitHub
   - Monitor deployment
   - Verify application

### 4. Post-Deployment

1. Verify functionality:
   - User registration
   - Product listing
   - Shopping cart
   - Checkout process

2. Test security:
   - Login/Logout
   - Password reset
   - File upload
   - Session management

3. Performance check:
   - Page load times
   - Image loading
   - Database queries
   - Error handling

## Course Evaluation Checklist

- [ ] Code organization
- [ ] Database design
- [ ] Security implementation
- [ ] User interface
- [ ] Error handling
- [ ] Documentation
- [ ] Deployment
- [ ] Testing

## Troubleshooting

1. Database Connection:
   - Verify connection string
   - Check MySQL service
   - Test database access

2. Application Errors:
   - Check logs in `logs` directory
   - Verify file permissions
   - Test local deployment

3. Performance Issues:
   - Optimize images
   - Check database indexes
   - Monitor memory usage

## Support

For course-related issues:
1. Check documentation
2. Review error logs
3. Contact course instructor

## Notes

- This is a course project deployment
- Basic security measures are implemented
- Some features are simplified
- Database is configured for demonstration

## Author

[Your Name]
Course: [Course Name]
Year: 2024 