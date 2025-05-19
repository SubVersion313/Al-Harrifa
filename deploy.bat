@echo off
echo Deploying Al-Harrifa to MonsterASP...

REM Build the project
echo Building project...
dotnet publish -c Release -o ./publish

REM Create necessary directories
echo Creating directories...
mkdir publish\wwwroot\uploads
mkdir publish\logs

REM Copy static files
echo Copying static files...
xcopy /E /I /Y wwwroot\* publish\wwwroot\

REM Create web.config
echo Creating web.config...
(
echo ^<?xml version="1.0" encoding="utf-8"?^>
echo ^<configuration^>
echo   ^<system.webServer^>
echo     ^<handlers^>
echo       ^<add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" /^>
echo     ^</handlers^>
echo     ^<aspNetCore processPath="dotnet" arguments=".\Al-Harrifa.dll" stdoutLogEnabled="true" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" /^>
echo   ^</system.webServer^>
echo ^</configuration^>
) > publish\web.config

echo Deployment package created in the 'publish' directory.
echo Please upload the contents of the 'publish' directory to your MonsterASP hosting.
echo Don't forget to update the connection string in appsettings.Production.json with your MonsterASP database credentials. 