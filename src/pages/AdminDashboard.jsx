











import React, { useState, useEffect } from "react";
import { adminAPI } from "../utils/api";
import "../styles/Admin.css";

const AdminDashboard = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [tokenCounter, setTokenCounter] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  /* Load today's date at start */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  /* Fetch data when date changes */
  useEffect(() => {
    if (selectedDate) fetchAllData();
  }, [selectedDate]);

  /* Auto refresh every 30 seconds */
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchAllData(true), 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, selectedDate]);

  const fetchAllData = async (silent = false) => {
    if (!silent) {
      setLoading(true);
      setError("");
    }

    try {
      await Promise.all([fetchStats(), fetchBookings(), fetchTokenCounter()]);
    } catch {
      if (!silent) setError("Failed to load data");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await adminAPI.getDashboardStats();
      setStats(res.data);
    } catch {}
  };

  const fetchBookings = async () => {
    try {
      const res = await adminAPI.getAllBookings(selectedDate);
      setBookings(res.data);
    } catch {
      setError("Failed to fetch bookings");
    }
  };

  const fetchTokenCounter = async () => {
    try {
      const res = await adminAPI.getCurrentToken(selectedDate);
      setTokenCounter(res.data);
    } catch {}
  };

  const handleNextToken = async () => {
    try {
      setLoading(true);
      await adminAPI.updateCurrentToken({
        date: selectedDate,
        action: "next",
      });
      fetchAllData(true);
    } catch (err) {
      alert("Error updating token");
    } finally {
      setLoading(false);
    }
  };

  const handleResetToken = async () => {
    if (!window.confirm("Reset token counter to 0?")) return;

    try {
      setLoading(true);
      await adminAPI.updateCurrentToken({ date: selectedDate, action: "reset" });
      fetchAllData(true);
    } catch {
      alert("Error resetting token");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, oldStatus, newStatus) => {
    if (oldStatus === newStatus) return;

    try {
      await adminAPI.updateBookingStatus(id, newStatus);

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );

      fetchStats(true);
    } catch {
      alert("Failed updating status");
      fetchBookings(true);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f39c12",
      serving: "#3498db",
      completed: "#27ae60",
      skipped: "#95a5a6",
      cancelled: "#e74c3c",
    };
    return colors[status];
  };

  const getNextPendingToken = () => {
    const pending = bookings.find((b) => b.status === "pending");
    return pending ? pending.tokenNumber : null;
  };

  return (
    <div className="admin-container">
      {/* HEADER WITH IMAGE - Similar to Home Page */}
      <div className="admin-header-section">
        <div className="admin-header-image">
          <img 
            src="/admin1.png" 
            alt="Admin Dashboard" 
            className="admin-header-img"
          />
        </div>
        <div className="admin-header-content">
          <h2 className="admin-main-title">Admin Dashboard</h2>
          <p className="admin-main-subtitle">
            Manage bookings, track tokens, and monitor your system in real-time
          </p>
          
          {/* <div className="auto-refresh-box">
            <label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh (30s)
            </label>

            <button className="refresh-btn" onClick={() => fetchAllData()}>
              🔄 Refresh
            </button>
          </div> */}
        </div>
      </div>

      {/* STATS */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.todayBookings}</div>
            <div className="stat-label">Today's Bookings</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.pendingBookings}</div>
            <div className="stat-label">Pending</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.completedBookings}</div>
            <div className="stat-label">Completed</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
      )}

      {/* TOKEN MANAGEMENT */}
      <div className="token-box">
        <h3 className="section-title">Token Management</h3>

        <label className="date-label">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />

        {tokenCounter && (
          <>
            <div className="token-info-grid">
              <div className="token-card">
                <div className="token-card-title">Currently Serving</div>
                <div className="token-card-number">
                  {tokenCounter.currentToken || "-"}
                </div>
              </div>

              <div className="token-card">
                <div className="token-card-title">Total Tokens</div>
                <div className="token-card-number">{tokenCounter.lastToken}</div>
              </div>

              <div className="token-card">
                <div className="token-card-title">Next Pending</div>
                <div className="token-card-number">
                  {getNextPendingToken() || "-"}
                </div>
              </div>
            </div>

            <div className="token-btns">
              <button
                className="next-btn"
                onClick={handleNextToken}
                disabled={
                  loading ||
                  tokenCounter.currentToken >= tokenCounter.lastToken
                }
              >
                Call Next Token
              </button>

              <button
                className="reset-btn"
                onClick={handleResetToken}
                disabled={loading}
              >
                Reset Counter
              </button>
            </div>
          </>
        )}
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bookings-box">
        <h3 className="section-title">Bookings</h3>

        {error && <div className="error">{error}</div>}

        <div className="table-container">
          {bookings.length === 0 ? (
            <div className="empty-state">No bookings for this date.</div>
          ) : (
            <table className="book-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Slot</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="table-row">
                    <td>#{b.tokenNumber}</td>
                    <td>{b.userId?.name}</td>
                    <td>{b.userId?.email}</td>
                    <td>{b.userId?.phone}</td>
                    <td>{b.slot}</td>

                    <td>
                      <span
                        className="status-badge"
                        style={{ background: getStatusColor(b.status) }}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(b._id, b.status, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="serving">Serving</option>
                        <option value="completed">Completed</option>
                        <option value="skipped">Skipped</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
