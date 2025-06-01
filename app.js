// HR & Time Tracking System - JavaScript
class HRSystem {
    constructor() {
        this.employees = this.loadData('employees') || [];
        this.attendance = this.loadData('attendance') || [];
        this.settings = this.loadData('settings') || this.getDefaultSettings();
        this.currentEmployee = null;
        this.editingEmployeeId = null;
        
        this.init();
    }

    // 初期化
    init() {
        this.setupEventListeners();
        this.updateCurrentTime();
        this.loadDashboard();
        this.loadEmployees();
        this.loadAttendance();
        this.populateEmployeeSelects();
        this.setDefaultDates();
        
        // 時刻を1秒ごとに更新
        setInterval(() => this.updateCurrentTime(), 1000);
    }

    // デフォルト設定
    getDefaultSettings() {
        return {
            workStartTime: '09:00',
            workEndTime: '18:00',
            breakTime: 60,
            company: 'サンプル会社',
            timezone: 'Asia/Tokyo'
        };
    }

    // データの保存
    saveData(key, data) {
        try {
            localStorage.setItem(`hr_system_${key}`, JSON.stringify(data));
        } catch (error) {
            this.showNotification('データの保存に失敗しました', 'error');
        }
    }

    // データの読み込み
    loadData(key) {
        try {
            const data = localStorage.getItem(`hr_system_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            this.showNotification('データの読み込みに失敗しました', 'error');
            return null;
        }
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // ナビゲーション
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // モバイルメニュー
        document.querySelector('.menu-toggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });

        // 従業員管理
        document.getElementById('addEmployeeBtn').addEventListener('click', () => {
            this.showEmployeeModal();
        });

        document.getElementById('employeeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEmployee();
        });

        document.querySelector('.modal-close').addEventListener('click', () => {
            this.hideEmployeeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideEmployeeModal();
        });

        // 勤怠管理
        document.getElementById('clockInBtn').addEventListener('click', () => {
            this.clockIn();
        });

        document.getElementById('clockOutBtn').addEventListener('click', () => {
            this.clockOut();
        });

        // タイムシート
        document.getElementById('generateTimesheetBtn').addEventListener('click', () => {
            this.generateTimesheet();
        });

        // レポート
        document.getElementById('generateReportBtn').addEventListener('click', () => {
            this.generateReport();
        });

        document.getElementById('exportReportBtn').addEventListener('click', () => {
            this.exportReport();
        });

        // 設定
        document.getElementById('workStartTime').addEventListener('change', (e) => {
            this.settings.workStartTime = e.target.value;
            this.saveData('settings', this.settings);
        });

        document.getElementById('workEndTime').addEventListener('change', (e) => {
            this.settings.workEndTime = e.target.value;
            this.saveData('settings', this.settings);
        });

        document.getElementById('breakTime').addEventListener('change', (e) => {
            this.settings.breakTime = parseInt(e.target.value);
            this.saveData('settings', this.settings);
        });

        document.getElementById('backupDataBtn').addEventListener('click', () => {
            this.backupData();
        });

        document.getElementById('restoreDataBtn').addEventListener('click', () => {
            document.getElementById('restoreDataInput').click();
        });

        document.getElementById('restoreDataInput').addEventListener('change', (e) => {
            this.restoreData(e.target.files[0]);
        });

        document.getElementById('clearDataBtn').addEventListener('click', () => {
            this.clearAllData();
        });

        // モーダル外クリックで閉じる
        document.getElementById('employeeModal').addEventListener('click', (e) => {
            if (e.target.id === 'employeeModal') {
                this.hideEmployeeModal();
            }
        });
    }

    // セクション表示
    showSection(sectionName) {
        // ナビゲーションの更新
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // セクションの表示
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // ページタイトルの更新
        const titles = {
            dashboard: 'ダッシュボード',
            employees: '従業員管理',
            attendance: '勤怠管理',
            timesheet: 'タイムシート',
            reports: 'レポート',
            settings: '設定'
        };
        document.querySelector('.page-title').textContent = titles[sectionName];

        // セクション固有の処理
        switch (sectionName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'employees':
                this.loadEmployees();
                break;
            case 'attendance':
                this.loadAttendance();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    // 現在時刻の更新
    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    // ダッシュボードの読み込み
    loadDashboard() {
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = this.attendance.filter(record => record.date === today);
        
        // 統計の更新
        document.getElementById('totalEmployees').textContent = this.employees.length;
        document.getElementById('presentEmployees').textContent = 
            todayAttendance.filter(record => record.clockIn && !record.clockOut).length;
        document.getElementById('absentEmployees').textContent = 
            this.employees.length - todayAttendance.length;

        // 平均労働時間の計算
        const avgHours = this.calculateAverageWorkHours();
        document.getElementById('avgWorkHours').textContent = avgHours.toFixed(1);

        // 今日の勤怠状況
        this.loadAttendanceSummary();

        // 最近の活動
        this.loadRecentActivities();
    }

    // 勤怠状況サマリー
    loadAttendanceSummary() {
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = this.attendance.filter(record => record.date === today);
        
        const summaryHtml = todayAttendance.map(record => {
            const employee = this.employees.find(emp => emp.id === record.employeeId);
            const status = record.clockOut ? 'status-absent' : 'status-present';
            const statusText = record.clockOut ? '退勤済み' : '出勤中';
            
            return `
                <div class="attendance-item">
                    <div class="employee-info">
                        <strong>${employee ? employee.name : '不明'}</strong>
                        <span class="status-badge ${status}">${statusText}</span>
                    </div>
                    <div class="time-info">
                        <span>出勤: ${record.clockIn || '-'}</span>
                        <span>退勤: ${record.clockOut || '-'}</span>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('attendanceSummary').innerHTML = summaryHtml || '<p>今日の勤怠記録はありません</p>';
    }

    // 最近の活動
    loadRecentActivities() {
        const recentRecords = this.attendance
            .sort((a, b) => new Date(b.date + ' ' + (b.clockOut || b.clockIn)) - new Date(a.date + ' ' + (a.clockOut || a.clockIn)))
            .slice(0, 5);

        const activitiesHtml = recentRecords.map(record => {
            const employee = this.employees.find(emp => emp.id === record.employeeId);
            const action = record.clockOut ? '退勤' : '出勤';
            const time = record.clockOut || record.clockIn;
            
            return `
                <div class="activity-item">
                    <div class="activity-content">
                        <strong>${employee ? employee.name : '不明'}</strong>が${action}しました
                        <div class="activity-time">${record.date} ${time}</div>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('recentActivities').innerHTML = activitiesHtml || '<p>最近の活動はありません</p>';
    }

    // 平均労働時間の計算
    calculateAverageWorkHours() {
        const completedRecords = this.attendance.filter(record => record.clockIn && record.clockOut);
        if (completedRecords.length === 0) return 0;

        const totalHours = completedRecords.reduce((sum, record) => {
            const workHours = this.calculateWorkHours(record.clockIn, record.clockOut);
            return sum + workHours;
        }, 0);

        return totalHours / completedRecords.length;
    }

    // 労働時間の計算
    calculateWorkHours(clockIn, clockOut) {
        const start = new Date(`2000-01-01 ${clockIn}`);
        const end = new Date(`2000-01-01 ${clockOut}`);
        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);
        return Math.max(0, diffHours - (this.settings.breakTime / 60));
    }

    // 従業員一覧の読み込み
    loadEmployees() {
        const tbody = document.getElementById('employeeTableBody');
        
        if (this.employees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">従業員が登録されていません</td></tr>';
            return;
        }

        const employeesHtml = this.employees.map(employee => `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>${employee.hireDate}</td>
                <td><span class="status-badge status-active">アクティブ</span></td>
                <td>
                    <button class="btn btn-info" onclick="hrSystem.editEmployee(${employee.id})" style="margin-right: 0.5rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="hrSystem.deleteEmployee(${employee.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = employeesHtml;
    }

    // 従業員モーダルの表示
    showEmployeeModal(employee = null) {
        const modal = document.getElementById('employeeModal');
        const form = document.getElementById('employeeForm');
        
        if (employee) {
            // 編集モード
            this.editingEmployeeId = employee.id;
            document.getElementById('modalTitle').textContent = '従業員編集';
            document.getElementById('employeeName').value = employee.name;
            document.getElementById('employeeDepartment').value = employee.department;
            document.getElementById('employeePosition').value = employee.position;
            document.getElementById('employeeHireDate').value = employee.hireDate;
            document.getElementById('employeeEmail').value = employee.email || '';
            document.getElementById('employeePhone').value = employee.phone || '';
        } else {
            // 新規追加モード
            this.editingEmployeeId = null;
            document.getElementById('modalTitle').textContent = '従業員追加';
            form.reset();
        }

        modal.classList.add('active');
    }

    // 従業員モーダルの非表示
    hideEmployeeModal() {
        document.getElementById('employeeModal').classList.remove('active');
        this.editingEmployeeId = null;
    }

    // 従業員の保存
    saveEmployee() {
        const formData = {
            name: document.getElementById('employeeName').value.trim(),
            department: document.getElementById('employeeDepartment').value.trim(),
            position: document.getElementById('employeePosition').value.trim(),
            hireDate: document.getElementById('employeeHireDate').value,
            email: document.getElementById('employeeEmail').value.trim(),
            phone: document.getElementById('employeePhone').value.trim()
        };

        // バリデーション
        if (!formData.name || !formData.department || !formData.position || !formData.hireDate) {
            this.showNotification('必須項目を入力してください', 'error');
            return;
        }

        if (this.editingEmployeeId) {
            // 編集
            const index = this.employees.findIndex(emp => emp.id === this.editingEmployeeId);
            if (index !== -1) {
                this.employees[index] = { ...this.employees[index], ...formData };
                this.showNotification('従業員情報を更新しました', 'success');
            }
        } else {
            // 新規追加
            const newEmployee = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString()
            };
            this.employees.push(newEmployee);
            this.showNotification('従業員を追加しました', 'success');
        }

        this.saveData('employees', this.employees);
        this.loadEmployees();
        this.populateEmployeeSelects();
        this.hideEmployeeModal();
    }

    // 従業員の編集
    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            this.showEmployeeModal(employee);
        }
    }

    // 従業員の削除
    deleteEmployee(id) {
        if (confirm('この従業員を削除しますか？関連する勤怠記録も削除されます。')) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.attendance = this.attendance.filter(record => record.employeeId !== id);
            
            this.saveData('employees', this.employees);
            this.saveData('attendance', this.attendance);
            
            this.loadEmployees();
            this.populateEmployeeSelects();
            this.showNotification('従業員を削除しました', 'success');
        }
    }

    // 従業員選択肢の更新
    populateEmployeeSelects() {
        const selects = [
            document.getElementById('attendanceEmployeeSelect'),
            document.getElementById('timesheetEmployee')
        ];

        selects.forEach(select => {
            const currentValue = select.value;
            const options = this.employees.map(emp => 
                `<option value="${emp.id}">${emp.name} (${emp.department})</option>`
            ).join('');
            
            if (select.id === 'attendanceEmployeeSelect') {
                select.innerHTML = '<option value="">従業員を選択</option>' + options;
            } else {
                select.innerHTML = '<option value="">全従業員</option>' + options;
            }
            
            select.value = currentValue;
        });
    }

    // 出勤
    clockIn() {
        const employeeId = parseInt(document.getElementById('attendanceEmployeeSelect').value);
        if (!employeeId) {
            this.showNotification('従業員を選択してください', 'error');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toTimeString().split(' ')[0].substring(0, 5);

        // 既に出勤記録があるかチェック
        const existingRecord = this.attendance.find(record => 
            record.employeeId === employeeId && record.date === today
        );

        if (existingRecord && existingRecord.clockIn) {
            this.showNotification('既に出勤記録があります', 'warning');
            return;
        }

        const attendanceRecord = {
            id: Date.now(),
            employeeId: employeeId,
            date: today,
            clockIn: now,
            clockOut: null,
            createdAt: new Date().toISOString()
        };

        this.attendance.push(attendanceRecord);
        this.saveData('attendance', this.attendance);
        this.loadAttendance();
        this.loadDashboard();

        const employee = this.employees.find(emp => emp.id === employeeId);
        this.showNotification(`${employee.name}さんが出勤しました`, 'success');
    }

    // 退勤
    clockOut() {
        const employeeId = parseInt(document.getElementById('attendanceEmployeeSelect').value);
        if (!employeeId) {
            this.showNotification('従業員を選択してください', 'error');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toTimeString().split(' ')[0].substring(0, 5);

        // 出勤記録を探す
        const recordIndex = this.attendance.findIndex(record => 
            record.employeeId === employeeId && record.date === today && record.clockIn && !record.clockOut
        );

        if (recordIndex === -1) {
            this.showNotification('出勤記録が見つかりません', 'error');
            return;
        }

        this.attendance[recordIndex].clockOut = now;
        this.saveData('attendance', this.attendance);
        this.loadAttendance();
        this.loadDashboard();

        const employee = this.employees.find(emp => emp.id === employeeId);
        this.showNotification(`${employee.name}さんが退勤しました`, 'success');
    }

    // 勤怠記録の読み込み
    loadAttendance() {
        const tbody = document.getElementById('attendanceTableBody');
        
        if (this.attendance.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">勤怠記録がありません</td></tr>';
            return;
        }

        const sortedAttendance = this.attendance
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 50); // 最新50件

        const attendanceHtml = sortedAttendance.map(record => {
            const employee = this.employees.find(emp => emp.id === record.employeeId);
            const workHours = record.clockOut ? 
                this.calculateWorkHours(record.clockIn, record.clockOut).toFixed(1) : '-';
            const status = record.clockOut ? 'status-absent' : 'status-present';
            const statusText = record.clockOut ? '退勤済み' : '出勤中';

            return `
                <tr>
                    <td>${employee ? employee.name : '不明'}</td>
                    <td>${record.date}</td>
                    <td>${record.clockIn || '-'}</td>
                    <td>${record.clockOut || '-'}</td>
                    <td>${workHours}時間</td>
                    <td><span class="status-badge ${status}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-danger" onclick="hrSystem.deleteAttendance(${record.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        tbody.innerHTML = attendanceHtml;
    }

    // 勤怠記録の削除
    deleteAttendance(id) {
        if (confirm('この勤怠記録を削除しますか？')) {
            this.attendance = this.attendance.filter(record => record.id !== id);
            this.saveData('attendance', this.attendance);
            this.loadAttendance();
            this.loadDashboard();
            this.showNotification('勤怠記録を削除しました', 'success');
        }
    }

    // タイムシートの生成
    generateTimesheet() {
        const month = document.getElementById('timesheetMonth').value;
        const employeeId = document.getElementById('timesheetEmployee').value;

        if (!month) {
            this.showNotification('月を選択してください', 'error');
            return;
        }

        const [year, monthNum] = month.split('-');
        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);

        let employees = employeeId ? 
            [this.employees.find(emp => emp.id === parseInt(employeeId))] : 
            this.employees;

        const container = document.getElementById('timesheetContainer');
        
        if (employees.length === 0) {
            container.innerHTML = '<p>従業員が見つかりません</p>';
            return;
        }

        const timesheetHtml = employees.map(employee => {
            const employeeRecords = this.attendance.filter(record => 
                record.employeeId === employee.id &&
                record.date >= `${year}-${monthNum.padStart(2, '0')}-01` &&
                record.date <= `${year}-${monthNum.padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`
            );

            let tableHtml = `
                <div class="timesheet-employee">
                    <h4>${employee.name} (${employee.department})</h4>
                    <table class="timesheet-table">
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>曜日</th>
                                <th>出勤</th>
                                <th>退勤</th>
                                <th>労働時間</th>
                                <th>備考</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            for (let day = 1; day <= endDate.getDate(); day++) {
                const date = new Date(year, monthNum - 1, day);
                const dateStr = `${year}-${monthNum.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                const record = employeeRecords.find(r => r.date === dateStr);
                const clockIn = record ? record.clockIn : '-';
                const clockOut = record ? record.clockOut : '-';
                const workHours = record && record.clockOut ? 
                    this.calculateWorkHours(record.clockIn, record.clockOut).toFixed(1) : '-';

                tableHtml += `
                    <tr class="${isWeekend ? 'timesheet-weekend' : ''}">
                        <td class="timesheet-day">${day}</td>
                        <td>${dayOfWeek}</td>
                        <td>${clockIn}</td>
                        <td>${clockOut}</td>
                        <td>${workHours}${workHours !== '-' ? '時間' : ''}</td>
                        <td></td>
                    </tr>
                `;
            }

            // 合計時間の計算
            const totalHours = employeeRecords
                .filter(record => record.clockOut)
                .reduce((sum, record) => sum + this.calculateWorkHours(record.clockIn, record.clockOut), 0);

            tableHtml += `
                        </tbody>
                        <tfoot>
                            <tr style="font-weight: bold; background-color: var(--gray-100);">
                                <td colspan="4">合計</td>
                                <td>${totalHours.toFixed(1)}時間</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `;

            return tableHtml;
        }).join('');

        container.innerHTML = timesheetHtml;
    }

    // レポートの生成
    generateReport() {
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;

        if (!startDate || !endDate) {
            this.showNotification('開始日と終了日を選択してください', 'error');
            return;
        }

        const filteredAttendance = this.attendance.filter(record => 
            record.date >= startDate && record.date <= endDate
        );

        const container = document.getElementById('reportContainer');

        // サマリー統計
        const totalRecords = filteredAttendance.length;
        const completedRecords = filteredAttendance.filter(record => record.clockOut);
        const totalWorkHours = completedRecords.reduce((sum, record) => 
            sum + this.calculateWorkHours(record.clockIn, record.clockOut), 0
        );
        const avgWorkHours = completedRecords.length > 0 ? totalWorkHours / completedRecords.length : 0;

        // 従業員別統計
        const employeeStats = this.employees.map(employee => {
            const employeeRecords = filteredAttendance.filter(record => record.employeeId === employee.id);
            const employeeCompleted = employeeRecords.filter(record => record.clockOut);
            const employeeHours = employeeCompleted.reduce((sum, record) => 
                sum + this.calculateWorkHours(record.clockIn, record.clockOut), 0
            );

            return {
                employee,
                totalDays: employeeRecords.length,
                completedDays: employeeCompleted.length,
                totalHours: employeeHours,
                avgHours: employeeCompleted.length > 0 ? employeeHours / employeeCompleted.length : 0
            };
        });

        const reportHtml = `
            <div class="report-summary">
                <div class="report-item">
                    <h4>${totalRecords}</h4>
                    <p>総出勤日数</p>
                </div>
                <div class="report-item">
                    <h4>${completedRecords.length}</h4>
                    <p>完了日数</p>
                </div>
                <div class="report-item">
                    <h4>${totalWorkHours.toFixed(1)}</h4>
                    <p>総労働時間</p>
                </div>
                <div class="report-item">
                    <h4>${avgWorkHours.toFixed(1)}</h4>
                    <p>平均労働時間</p>
                </div>
            </div>

            <h4>従業員別統計</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>従業員名</th>
                        <th>部署</th>
                        <th>出勤日数</th>
                        <th>完了日数</th>
                        <th>総労働時間</th>
                        <th>平均労働時間</th>
                    </tr>
                </thead>
                <tbody>
                    ${employeeStats.map(stat => `
                        <tr>
                            <td>${stat.employee.name}</td>
                            <td>${stat.employee.department}</td>
                            <td>${stat.totalDays}</td>
                            <td>${stat.completedDays}</td>
                            <td>${stat.totalHours.toFixed(1)}時間</td>
                            <td>${stat.avgHours.toFixed(1)}時間</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = reportHtml;
    }

    // レポートのエクスポート
    exportReport() {
        const reportData = {
            exportDate: new Date().toISOString(),
            employees: this.employees,
            attendance: this.attendance,
            settings: this.settings
        };

        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `hr_report_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showNotification('レポートをエクスポートしました', 'success');
    }

    // 設定の読み込み
    loadSettings() {
        document.getElementById('workStartTime').value = this.settings.workStartTime;
        document.getElementById('workEndTime').value = this.settings.workEndTime;
        document.getElementById('breakTime').value = this.settings.breakTime;
    }

    // データのバックアップ
    backupData() {
        const backupData = {
            employees: this.employees,
            attendance: this.attendance,
            settings: this.settings,
            backupDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `hr_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showNotification('データをバックアップしました', 'success');
    }

    // データの復元
    restoreData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.employees && data.attendance && data.settings) {
                    this.employees = data.employees;
                    this.attendance = data.attendance;
                    this.settings = data.settings;
                    
                    this.saveData('employees', this.employees);
                    this.saveData('attendance', this.attendance);
                    this.saveData('settings', this.settings);
                    
                    this.loadEmployees();
                    this.loadAttendance();
                    this.loadSettings();
                    this.populateEmployeeSelects();
                    this.loadDashboard();
                    
                    this.showNotification('データを復元しました', 'success');
                } else {
                    this.showNotification('無効なバックアップファイルです', 'error');
                }
            } catch (error) {
                this.showNotification('ファイルの読み込みに失敗しました', 'error');
            }
        };
        reader.readAsText(file);
    }

    // 全データのクリア
    clearAllData() {
        if (confirm('全てのデータを削除しますか？この操作は取り消せません。')) {
            localStorage.removeItem('hr_system_employees');
            localStorage.removeItem('hr_system_attendance');
            localStorage.removeItem('hr_system_settings');
            
            this.employees = [];
            this.attendance = [];
            this.settings = this.getDefaultSettings();
            
            this.loadEmployees();
            this.loadAttendance();
            this.loadSettings();
            this.populateEmployeeSelects();
            this.loadDashboard();
            
            this.showNotification('全データを削除しました', 'success');
        }
    }

    // デフォルト日付の設定
    setDefaultDates() {
        const today = new Date();
        const currentMonth = today.toISOString().substring(0, 7);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

        document.getElementById('timesheetMonth').value = currentMonth;
        document.getElementById('reportStartDate').value = startOfMonth;
        document.getElementById('reportEndDate').value = endOfMonth;
    }

    // 通知の表示
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const icon = notification.querySelector('.notification-icon');
        const messageEl = notification.querySelector('.notification-message');

        // アイコンの設定
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        icon.className = `notification-icon ${icons[type]}`;
        messageEl.textContent = message;
        
        // クラスの設定
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        // 3秒後に非表示
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// アプリケーションの初期化
let hrSystem;
document.addEventListener('DOMContentLoaded', () => {
    hrSystem = new HRSystem();
    
    // サンプルデータの追加（初回起動時のみ）
    if (hrSystem.employees.length === 0) {
        hrSystem.addSampleData();
    }
});

// HRSystemクラスにサンプルデータ追加メソッドを追加
HRSystem.prototype.addSampleData = function() {
    const sampleEmployees = [
        {
            id: 1,
            name: '田中 太郎',
            department: '営業部',
            position: '営業課長',
            hireDate: '2020-04-01',
            email: 'tanaka@example.com',
            phone: '090-1234-5678',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: '佐藤 花子',
            department: '開発部',
            position: 'エンジニア',
            hireDate: '2021-07-15',
            email: 'sato@example.com',
            phone: '090-2345-6789',
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            name: '鈴木 一郎',
            department: '総務部',
            position: '総務主任',
            hireDate: '2019-10-01',
            email: 'suzuki@example.com',
            phone: '090-3456-7890',
            createdAt: new Date().toISOString()
        }
    ];

    // サンプル勤怠データ
    const today = new Date();
    const sampleAttendance = [];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        sampleEmployees.forEach(emp => {
            if (Math.random() > 0.2) { // 80%の確率で出勤
                const clockIn = `${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
                const clockOut = i === 0 && Math.random() > 0.5 ? null : // 今日は50%の確率で退勤済み
                    `${17 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
                
                sampleAttendance.push({
                    id: Date.now() + Math.random(),
                    employeeId: emp.id,
                    date: dateStr,
                    clockIn: clockIn,
                    clockOut: clockOut,
                    createdAt: new Date().toISOString()
                });
            }
        });
    }

    this.employees = sampleEmployees;
    this.attendance = sampleAttendance;
    
    this.saveData('employees', this.employees);
    this.saveData('attendance', this.attendance);
    
    this.loadEmployees();
    this.loadAttendance();
    this.populateEmployeeSelects();
    this.loadDashboard();
}; 