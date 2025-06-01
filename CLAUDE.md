# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side HR & Time Tracking System built as a single-page application using vanilla HTML5, CSS3, and JavaScript. The application is designed for small to medium businesses and operates entirely in the browser using LocalStorage for data persistence.

## Development Commands

### Running the Application
```bash
# Simple HTTP server (recommended for testing)
python -m http.server 8000
# OR
npx serve .
```

Then access `http://localhost:8000` in your browser.

### File Structure
- `index.html` - Main HTML file with complete application structure
- `app.js` - Single JavaScript file containing the entire HRSystem class
- `style.css` - Complete CSS styles with responsive design
- `README.md` - Comprehensive Japanese documentation

## Architecture

### Core System Design
The application is built around a single `HRSystem` class that manages all functionality:
- **Data Management**: Uses LocalStorage with keys prefixed as `hr_system_` 
- **State Management**: Centralized in the HRSystem class with methods for each major function
- **UI Management**: Direct DOM manipulation without frameworks

### Key Components
1. **Employees**: CRUD operations for staff management
2. **Attendance**: Clock in/out functionality with work hours calculation  
3. **Timesheet**: Monthly calendar view generation
4. **Reports**: Statistical analysis and data export
5. **Settings**: Work time configuration and data backup/restore

### Data Structure
```javascript
// Employee data structure
{
  id: Number,
  name: String,
  department: String, 
  position: String,
  hireDate: String,
  email: String,
  phone: String,
  createdAt: String
}

// Attendance data structure
{
  id: Number,
  employeeId: Number,
  date: String,      // YYYY-MM-DD format
  clockIn: String,   // HH:MM format
  clockOut: String,  // HH:MM format  
  createdAt: String
}
```

### Navigation System
- Single-page application with section-based navigation
- Mobile-responsive sidebar that transforms into a collapsible menu
- Active section management through CSS classes and JavaScript

### Work Hours Calculation
The system automatically calculates work hours by:
1. Taking clock-in and clock-out times
2. Subtracting configured break time (default 60 minutes)
3. Displaying results in timesheet and reports

## Development Notes

### Styling Approach
- CSS custom properties (variables) for theming
- Responsive grid layouts using CSS Grid and Flexbox
- Mobile-first responsive design with breakpoints at 1024px, 768px, and 480px

### JavaScript Patterns
- Class-based architecture with prototype methods
- Event delegation for dynamic content
- LocalStorage abstraction with error handling
- Notification system for user feedback

### Sample Data
The application automatically generates sample data on first load including 3 employees and 7 days of attendance records.

### Key Methods to Understand
- `loadData(key)` / `saveData(key, data)` - LocalStorage abstraction
- `showSection(sectionName)` - Navigation management
- `calculateWorkHours(clockIn, clockOut)` - Core business logic
- `populateEmployeeSelects()` - Dynamic UI updates