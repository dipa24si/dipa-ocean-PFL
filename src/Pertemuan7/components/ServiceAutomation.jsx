import React, { useState, useEffect } from 'react';
import { Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Service Automation Component
 * Menampilkan automation processes yang sedang berjalan
 * HOOKS YANG DIGUNAKAN:
 * - useState: automationTasks, isRunning
 * - useEffect: Simulasi automation workflow
 */
export default function ServiceAutomation() {
  const [automationTasks, setAutomationTasks] = useState([
    {
      id: 1,
      name: 'Email Campaign',
      status: 'pending', // pending, running, completed, failed
      progress: 0,
      message: 'Menunggu penjadwalan...',
      nextRun: '10:00 AM'
    },
    {
      id: 2,
      name: 'Inventory Update',
      status: 'idle',
      progress: 0,
      message: 'Sistem siap',
      nextRun: 'Realtime'
    },
    {
      id: 3,
      name: 'Order Processing',
      status: 'idle',
      progress: 0,
      message: 'Menunggu pesanan masuk...',
      nextRun: 'Automatic'
    },
    {
      id: 4,
      name: 'Loyalty Points Sync',
      status: 'idle',
      progress: 0,
      message: 'Sinkronisasi member points',
      nextRun: 'Daily 11:59 PM'
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  // useEffect: Simulasi automation workflow
  useEffect(() => {
    if (!isRunning) return;

    console.log('[ServiceAutomation] Automation workflow started');

    const tasks = [];

    // Task 1: Email Campaign
    tasks.push(
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 1
              ? { ...t, status: 'running', message: 'Sedang mengirim email ke 245 pelanggan...' }
              : t
          )
        );
      }, 500),
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 1
              ? { ...t, progress: 50, message: 'Progress: 50%' }
              : t
          )
        );
      }, 1500),
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 1
              ? { ...t, status: 'completed', progress: 100, message: '✓ Email terkirim ke 245 pelanggan' }
              : t
          )
        );
        setCompletedCount(prev => prev + 1);
      }, 3000)
    );

    // Task 2: Inventory Update
    tasks.push(
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 2
              ? { ...t, status: 'running', message: 'Mengupdate stok real-time...' }
              : t
          )
        );
      }, 1500),
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 2
              ? { ...t, status: 'completed', progress: 100, message: '✓ Stok terupdate' }
              : t
          )
        );
        setCompletedCount(prev => prev + 1);
      }, 4000)
    );

    // Task 3: Order Processing
    tasks.push(
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 3
              ? { ...t, status: 'running', message: 'Memproses 12 pesanan baru...' }
              : t
          )
        );
      }, 2000),
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 3
              ? { ...t, status: 'completed', progress: 100, message: '✓ 12 pesanan diproses' }
              : t
          )
        );
        setCompletedCount(prev => prev + 1);
      }, 5000)
    );

    // Task 4: Loyalty Points
    tasks.push(
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 4
              ? { ...t, status: 'running', message: 'Sinkronisasi 189 member...' }
              : t
          )
        );
      }, 2500),
      setTimeout(() => {
        setAutomationTasks(prev =>
          prev.map(t =>
            t.id === 4
              ? { ...t, status: 'completed', progress: 100, message: '✓ 189 member points updated' }
              : t
          )
        );
        setCompletedCount(prev => prev + 1);
      }, 5500)
    );

    // Auto-stop setelah semua task selesai
    tasks.push(
      setTimeout(() => {
        setIsRunning(false);
        console.log('[ServiceAutomation] All automation tasks completed');
      }, 6000)
    );

    return () => {
      tasks.forEach(t => clearTimeout(t));
    };
  }, [isRunning]);

  const handleRunAutomation = () => {
    setIsRunning(true);
    setCompletedCount(0);
    setAutomationTasks(tasks =>
      tasks.map(t => ({ ...t, status: 'pending', progress: 0, message: 'Menunggu penjadwalan...' }))
    );
    console.log('[ServiceAutomation] Manual automation trigger');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'running':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#D4A574]/20 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="text-[#D4A574]" size={28} />
          <div>
            <h3 className="text-xl font-bold text-[#3E2C1C]">Service Automation</h3>
            <p className="text-sm text-[#78675C]">Automated processes yang berjalan di background</p>
          </div>
        </div>
        <button
          onClick={handleRunAutomation}
          disabled={isRunning}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            isRunning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#8B6F47] text-white hover:bg-[#6B5636]'
          }`}
        >
          {isRunning ? '⏳ Running...' : '▶️ Jalankan Automation'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">{automationTasks.length}</div>
          <div className="text-xs text-blue-600">Total Tasks</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-700">{completedCount}</div>
          <div className="text-xs text-green-600">Completed</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">
            {automationTasks.filter(t => t.status === 'running').length}
          </div>
          <div className="text-xs text-purple-600">Running</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-orange-700">
            {automationTasks.filter(t => t.status === 'pending').length}
          </div>
          <div className="text-xs text-orange-600">Pending</div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {automationTasks.map((task) => (
          <div
            key={task.id}
            className={`border rounded-lg p-4 ${getStatusColor(task.status)} transition-all`}
          >
            <div className="flex items-center gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {getStatusIcon(task.status)}
              </div>

              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#3E2C1C]">{task.name}</h4>
                <p className="text-sm text-[#78675C]">{task.message}</p>

                {/* Progress Bar */}
                {task.status === 'running' && (
                  <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0 text-right">
                <div className="text-xs font-bold text-[#78675C] uppercase">
                  {task.status === 'running' ? `${task.progress}%` : task.status}
                </div>
                <div className="text-xs text-[#78675C] mt-1">{task.nextRun}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Debug Info */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
        <strong>📊 useState Tracking:</strong>
        <div className="mt-1">
          Automation Running: {isRunning ? '✓ Yes' : '✗ No'} | Completed: {completedCount}/{automationTasks.length}
        </div>
      </div>
    </div>
  );
}

/**
 * Automation Event Logger - untuk menampilkan log automation
 */
export function AutomationLogger() {
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '10:00:00 AM', event: 'Email campaign started', type: 'info' },
    { id: 2, timestamp: '10:02:30 AM', event: '245 emails sent successfully', type: 'success' },
    { id: 3, timestamp: '10:03:15 AM', event: 'Inventory update completed', type: 'success' },
    { id: 4, timestamp: '10:05:00 AM', event: '12 orders processed', type: 'success' },
    { id: 5, timestamp: '10:06:45 AM', event: 'Member loyalty points synced', type: 'success' }
  ]);

  const getLogColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-700 bg-green-50';
      case 'error':
        return 'text-red-700 bg-red-50';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50';
      default:
        return 'text-blue-700 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#D4A574]/20 shadow-sm p-6 mt-6">
      <h3 className="text-lg font-bold text-[#3E2C1C] mb-4">Automation Logs</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className={`p-3 rounded-lg ${getLogColor(log.type)} text-sm`}>
            <span className="font-bold">[{log.timestamp}]</span> {log.event}
          </div>
        ))}
      </div>
    </div>
  );
}
