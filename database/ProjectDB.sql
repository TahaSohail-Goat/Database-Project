-- Create Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ProjectDB')
BEGIN
    CREATE DATABASE ProjectDB;
END;

-- Use the database
USE ProjectDB;

-- Create Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        UserID INT PRIMARY KEY IDENTITY(1,1),
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        Email NVARCHAR(100) UNIQUE NOT NULL,
        Phone NVARCHAR(20),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
END;

-- Create Projects Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Projects' AND xtype='U')
BEGIN
    CREATE TABLE Projects (
        ProjectID INT PRIMARY KEY IDENTITY(1,1),
        ProjectName NVARCHAR(100) NOT NULL,
        Description NVARCHAR(MAX),
        UserID INT NOT NULL,
        Status NVARCHAR(50) DEFAULT 'Active',
        StartDate DATETIME,
        EndDate DATETIME,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
    );
END;

-- Create Tasks Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tasks' AND xtype='U')
BEGIN
    CREATE TABLE Tasks (
        TaskID INT PRIMARY KEY IDENTITY(1,1),
        ProjectID INT NOT NULL,
        TaskName NVARCHAR(100) NOT NULL,
        Description NVARCHAR(MAX),
        Status NVARCHAR(50) DEFAULT 'Pending',
        Priority NVARCHAR(50) DEFAULT 'Medium',
        AssignedTo INT,
        DueDate DATETIME,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID) ON DELETE CASCADE,
        FOREIGN KEY (AssignedTo) REFERENCES Users(UserID)
    );
END;

-- Insert Sample Data
IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'john.doe@example.com')
BEGIN
    INSERT INTO Users (FirstName, LastName, Email, Phone) VALUES
    ('John', 'Doe', 'john.doe@example.com', '+1234567890'),
    ('Jane', 'Smith', 'jane.smith@example.com', '+0987654321'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', '+1122334455');
END;

IF NOT EXISTS (SELECT * FROM Projects WHERE ProjectName = 'Project Alpha')
BEGIN
    INSERT INTO Projects (ProjectName, Description, UserID, Status, StartDate) VALUES
    ('Project Alpha', 'First project for testing', 1, 'Active', GETDATE()),
    ('Project Beta', 'Second project for development', 2, 'Active', GETDATE());
END;

IF NOT EXISTS (SELECT * FROM Tasks WHERE TaskName = 'Setup Database')
BEGIN
    INSERT INTO Tasks (ProjectID, TaskName, Description, Status, Priority, AssignedTo, DueDate) VALUES
    (1, 'Setup Database', 'Create and configure database schema', 'In Progress', 'High', 1, DATEADD(DAY, 5, GETDATE())),
    (1, 'Create API Endpoints', 'Develop REST API for project', 'Pending', 'High', 2, DATEADD(DAY, 10, GETDATE())),
    (2, 'Frontend Design', 'Design UI mockups', 'Pending', 'Medium', 3, DATEADD(DAY, 7, GETDATE()));
END;

-- Verify Database Created
SELECT 'Database ProjectDB created successfully!' AS Message;
SELECT 'Tables created: Users, Projects, Tasks' AS Message;
