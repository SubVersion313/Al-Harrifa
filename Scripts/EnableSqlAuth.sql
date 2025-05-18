-- Enable SQL Server Authentication mode
USE [master]
GO

-- Check if SQL Server Authentication is already enabled
DECLARE @AuthMode INT
SELECT @AuthMode = CONVERT(INT, value_in_use)
FROM sys.configurations
WHERE name = 'is integrated security only'

IF @AuthMode = 1
BEGIN
    -- Enable SQL Server Authentication
    EXEC xp_instance_regwrite 
        N'HKEY_LOCAL_MACHINE', 
        N'Software\Microsoft\MSSQLServer\MSSQLServer',
        N'LoginMode', 
        REG_DWORD,
        2;
    
    PRINT 'SQL Server Authentication mode has been enabled. Please restart SQL Server for changes to take effect.';
END
ELSE
BEGIN
    PRINT 'SQL Server Authentication mode is already enabled.';
END
GO 