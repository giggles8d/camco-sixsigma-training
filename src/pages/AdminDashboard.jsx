import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import modules from '../data/modules.json';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [allProgress, setAllProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const [empRes, progRes] = await Promise.all([
      supabase.from('employees').select('*').order('name'),
      supabase.from('progress').select('*')
    ]);

    if (empRes.error) console.error('Error loading employees:', empRes.error);
    if (progRes.error) console.error('Error loading progress:', progRes.error);

    setEmployees(empRes.data || []);
    setAllProgress(progRes.data || []);
    setLoading(false);
  }

  function getModuleStatus(employeeName, moduleId) {
    return allProgress.find(p => p.employee_name === employeeName && p.module_id === moduleId);
  }

  function getCompletionPercentage(employeeName) {
    const completed = allProgress.filter(p => p.employee_name === employeeName && p.completed_at).length;
    return Math.round((completed / modules.length) * 100);
  }

  function exportCSV() {
    const headers = [
      'Employee Name',
      'Overall Completion %',
      ...modules.flatMap(m => [
        `Module ${m.id}: Status`,
        `Module ${m.id}: Quiz Score`,
        `Module ${m.id}: Pass/Fail`,
        `Module ${m.id}: Date Completed`
      ])
    ];

    const rows = employees.map(emp => {
      const pct = getCompletionPercentage(emp.name);
      const moduleData = modules.flatMap(m => {
        const s = getModuleStatus(emp.name, m.id);
        let status = 'Not Started';
        if (s?.completed_at) status = 'Complete';
        else if (s?.quiz_passed) status = 'Quiz Passed';
        else if (s?.quiz_score != null) status = 'Quiz Attempted';
        else if (s?.lesson_completed) status = 'Lesson Complete';

        return [
          status,
          s?.quiz_score != null ? s.quiz_score : '',
          s?.quiz_score != null ? (s.quiz_passed ? 'Pass' : 'Fail') : '',
          s?.completed_at ? new Date(s.completed_at).toLocaleDateString() : ''
        ];
      });
      return [emp.name, `${pct}%`, ...moduleData];
    });

    const csv = [headers, ...rows].map(row =>
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `camco-training-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <header className="app-header">
          <div className="header-left"><h1>Admin Dashboard</h1></div>
        </header>
        <main className="admin-content">
          <p className="loading-text">Loading employee data...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="app-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <span className="subtitle">CAMCO Quality Training</span>
        </div>
        <div className="header-right">
          <button onClick={loadData} className="btn btn-sm btn-outline">Refresh</button>
          <button onClick={exportCSV} className="btn btn-sm btn-primary">Export CSV</button>
          <button onClick={logout} className="btn btn-sm btn-outline">Sign Out</button>
        </div>
      </header>

      <main className="admin-content">
        <section className="admin-summary">
          <div className="summary-card">
            <div className="summary-number">{employees.length}</div>
            <div className="summary-label">Total Employees</div>
          </div>
          <div className="summary-card">
            <div className="summary-number">{modules.length}</div>
            <div className="summary-label">Training Modules</div>
          </div>
          <div className="summary-card">
            <div className="summary-number">
              {employees.length > 0
                ? Math.round(employees.reduce((sum, e) => sum + getCompletionPercentage(e.name), 0) / employees.length)
                : 0}%
            </div>
            <div className="summary-label">Avg Completion</div>
          </div>
        </section>

        {employees.length === 0 ? (
          <div className="empty-state">
            <h3>No employees have logged in yet</h3>
            <p>Employee data will appear here once they sign in to the training portal.</p>
          </div>
        ) : (
          <section className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="sticky-col">Employee</th>
                  <th>Overall</th>
                  {modules.map(m => (
                    <th key={m.id} title={m.title}>M{m.id}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => {
                  const pct = getCompletionPercentage(emp.name);
                  return (
                    <tr key={emp.id}>
                      <td className="sticky-col emp-name">{emp.name}</td>
                      <td>
                        <div className="mini-progress">
                          <div className="mini-bar" style={{ width: `${pct}%` }}></div>
                          <span>{pct}%</span>
                        </div>
                      </td>
                      {modules.map(m => {
                        const s = getModuleStatus(emp.name, m.id);
                        return (
                          <td key={m.id} className="module-cell">
                            {!s ? (
                              <span className="cell-status cell-none" title="Not started">-</span>
                            ) : s.completed_at ? (
                              <span className="cell-status cell-complete" title={`Complete ${new Date(s.completed_at).toLocaleDateString()}`}>
                                {s.quiz_score != null ? s.quiz_score : 'â'}
                              </span>
                            ) : s.quiz_passed ? (
                              <span className="cell-status cell-passed" title="Quiz passed">
                                {s.quiz_score}
                              </span>
                            ) : s.quiz_score != null ? (
                              <span className="cell-status cell-failed" title="Quiz not passed">
                                {s.quiz_score}
                              </span>
                            ) : s.lesson_completed ? (
                              <span className="cell-status cell-lesson" title="Lesson complete">L</span>
                            ) : (
                              <span className="cell-status cell-none" title="In progress">...</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        <section className="admin-legend">
          <h4>Legend</h4>
          <div className="legend-items">
            <span><span className="cell-status cell-none">-</span> Not Started</span>
            <span><span className="cell-status cell-lesson">L</span> Lesson Complete</span>
            <span><span className="cell-status cell-failed">5</span> Quiz Failed</span>
            <span><span className="cell-status cell-passed">9</span> Quiz Passed</span>
            <span><span className="cell-status cell-complete">9</span> Module Complete</span>
          </div>
        </section>
      </main>
    </div>
  );
}
