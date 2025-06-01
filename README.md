# 🏢 HR & Time Tracking System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Comprehensive HR & Time Tracking System for small and medium businesses  
> Web application with professional-level UI/UX

## 📋 Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Technical Specifications](#technical-specifications)
- [Installation](#installation)
- [Usage](#usage)
- [Feature Details](#feature-details)
- [Data Management](#data-management)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contributing](#contributing)

## 🎯 Overview

The HR & Time Tracking System is a comprehensive human resources and attendance management system specifically designed for the needs of small and medium businesses. It uses modern web technologies to provide an intuitive user interface and powerful functionality.

### ✨ Features

- 🎨 **Modern UI/UX**: Minimalist and professional design
- 📱 **Responsive**: Mobile, tablet, and desktop support
- ⚡ **Fast**: Lightweight implementation with Vanilla JavaScript
- 💾 **Local Storage**: Data persistence within the browser
- 🔒 **Secure**: Safe client-side data management
- 🌐 **Offline Support**: No internet connection required

## 🚀 Main Features

### 📊 Dashboard
- Real-time statistics display
- Today's attendance status overview
- Recent activity history
- Visual data presentation

### 👥 Employee Management
- Employee information registration, editing, and deletion
- Department and position management
- Contact information management
- Hire date and status management

### ⏰ Attendance Management
- Clock-in and clock-out recording
- Automatic work hours calculation
- Break time consideration
- Real-time attendance status

### 📅 Timesheet
- Monthly attendance table generation
- Individual employee and overall display
- Work hours aggregation
- Weekend and holiday identification

### 📈 Reporting Features
- Period-based statistical reports
- Individual employee analysis
- Work hours analysis
- Data export (JSON format)

### ⚙️ Settings Management
- Work time configuration
- Break time settings
- Data backup and restore
- System settings

## 🛠 Technical Specifications

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling (Grid, Flexbox, CSS Variables)
- **JavaScript (ES6+)**: Class-based design, modular structure

### External Libraries
- **Font Awesome 6.0**: Icon library
- **Inter Font**: Typography

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Data Storage
- **LocalStorage**: Browser-based data persistence
- **JSON**: Structured data format

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/izag8216/hr.git
cd hr
```

### 2. File Structure Verification
```
hr/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── app.js             # JavaScript application
└── README.md          # This file
```

### 3. Launch
Simply open `index.html` in a browser to start using the application.

```bash
# Using a simple HTTP server (recommended)
python -m http.server 8000
# or
npx serve .
```

Access `http://localhost:8000` in your browser

## 📖 Usage

### Initial Launch
1. Open `index.html` in a browser
2. Sample data is automatically generated
3. Review the overview on the dashboard

### Adding Employees
1. Select "Employee Management" from the sidebar
2. Click the "Add Employee" button
3. Enter required information and save

### Recording Attendance
1. Navigate to the "Attendance Management" section
2. Select an employee
3. Click the "Clock In" or "Clock Out" button

### Generating Reports
1. Navigate to the "Reports" section
2. Set the time period
3. Click the "Generate Report" button

## 🔧 Feature Details

### Dashboard Features
- **Statistics Cards**: Total employees, currently present, average work hours, absent employees
- **Attendance Summary**: Real-time display of today's attendance status
- **Activity History**: Latest clock-in and clock-out records

### Employee Management Features
- **CRUD Operations**: Create, Read, Update, Delete
- **Validation**: Required field checking
- **Search & Filter**: Employee search functionality

### Attendance Management Features
- **Time Recording**: Automatic recording of clock-in and clock-out times
- **Duplicate Check**: Prevention of duplicate clock-ins on the same day
- **Work Hours Calculation**: Automatic calculation considering break time

### Timesheet Features
- **Monthly Display**: Calendar-format attendance display
- **Weekend Identification**: Visual distinction of weekends
- **Total Hours**: Automatic aggregation of monthly work hours

### Reporting Features
- **Period Specification**: Report generation for any specified period
- **Statistical Analysis**: Average work hours, attendance rate, etc.
- **Export**: Data output in JSON format

## 💾 Data Management

### Data Structure
```javascript
// Employee Data
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

// Attendance Data
{
  id: Number,
  employeeId: Number,
  date: String,
  clockIn: String,
  clockOut: String,
  createdAt: String
}
```

### Backup & Restore
- **Backup**: Export as JSON file from the settings screen
- **Restore**: Import JSON file to restore data
- **Clear**: Bulk deletion of all data

## 🎨 Customization

### Theme Customization
Edit CSS Variables in `style.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #48bb78;
  /* Other color settings */
}
```

### Feature Extension
Extend class methods in `app.js`:

```javascript
// Example of adding new features
HRSystem.prototype.customFeature = function() {
  // Custom feature implementation
};
```

## 🐛 Troubleshooting

### Common Issues

**Q: Data is not being saved**
A: Please check if the browser's LocalStorage is enabled. It may be restricted in private browsing mode.

**Q: Responsive design is not displaying correctly**
A: Clear the browser cache and reload the page.

**Q: Japanese characters are garbled**
A: Please check if the HTML file's character encoding is set to UTF-8.

### Debugging Methods
1. Open browser developer tools (F12)
2. Check error messages in the Console tab
3. Verify data in Application tab > Local Storage

## 📄 License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2025 izag8216

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🤝 Contributing

Contributions to the project are welcome!

### How to Contribute
1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a pull request

### Development Guidelines
- Maintain code style consistency
- Add appropriate comments
- Update documentation when adding features
- Aim for small, testable changes

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/izag8216/hr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/izag8216/hr/discussions)

## 🔄 Update History

### v1.0.0 (2025-01-XX)
- Initial release
- Basic HR and attendance management features
- Responsive design
- Data backup and restore functionality

---

<div align="center">

**[⬆ Back to Top](#-hr--time-tracking-system)**

Made with ❤️ by [izag8216](https://github.com/izag8216)

</div> 