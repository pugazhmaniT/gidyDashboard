/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import catLogo from "./assets/cat.png";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [role, setRole] = useState("");
  const [action, setAction] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [region, setRegion] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fileInputRef = useRef(null);

  const fetchLogs = async (
    customPage = page,
    customSearch = appliedSearch,
    customRole = role,
    customAction = action,
    customResourceType = resourceType,
    customRegion = region,
    customSeverity = severity,
    customStatus = status,
    customSortBy = sortBy,
    customOrder = order
  ) => {
    try {
      const url =
        `${API_URL}/api/logs/read?page=${customPage}` +
        `&search=${customSearch}` +
        `&role=${customRole}` +
        `&action=${customAction}` +
        `&resourceType=${customResourceType}` +
        `&region=${customRegion}` +
        `&severity=${customSeverity}` +
        `&status=${customStatus}` +
        `&sortBy=${customSortBy}` +
        `&order=${customOrder}`;

      const response = await axios.get(url);
      setLogs(response.data.logs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilters = async () => {
    setSearch("");
    setAppliedSearch("");
    setRole("");
    setAction("");
    setResourceType("");
    setRegion("");
    setSeverity("");
    setStatus("");
    setSortBy("");
    setOrder("asc");
    setFile(null);
    setMessage("");
    setMessageType("");
    setPage(1);

    if (fileInputRef.current) fileInputRef.current.value = "";

    await fetchLogs(1, "", "", "", "", "", "", "", "", "asc");
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please choose a file");
      setMessageType("warning");
      return;
    }

    if (!file.name.endsWith(".json")) {
      setMessage("File not supported. Please upload JSON only");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/api/logs/upload-file`,
        formData
      );

      setMessage(response.data.message || "Upload successful");
      setMessageType("success");

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchLogs();

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Upload failed");
      setMessageType("error");
    }
  };

  const applySearch = () => {
    setAppliedSearch(search);
    setPage(1);
    fetchLogs(1, search);
  };

  useEffect(() => {
    fetchLogs();
  }, [
    page,
    role,
    action,
    resourceType,
    region,
    severity,
    status,
    sortBy,
    order
  ]);

  return (
    <div className="container">
      <div className="header">
        <img src={catLogo} alt="Cat Logo" className="logo" />
        <h1 className="title">Gidy Audit Logs Dashboard</h1>
        <p className="subtitle">
          Security Monitoring • Threat Detection • Audit Analytics
        </p>
      </div>

      {message && (
        <div className={`message-box ${messageType}`}>
          {message}
        </div>
      )}

      <div className="control-box">
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search Logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="apply-btn" onClick={applySearch}>
            Search
          </button>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filter
          </button>
        </div>

        <div className="filters-row">
          <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }}>
            <option value="">Role</option>
            <option>admin</option>
            <option>developer</option>
            <option>analyst</option>
            <option>manager</option>
          </select>

          <select value={action} onChange={(e) => { setAction(e.target.value); setPage(1); }}>
            <option value="">Action</option>
            <option>DELETE_USER</option>
            <option>CREATE_USER</option>
            <option>UPDATE_PROFILE</option>
            <option>LOGIN</option>
          </select>

          <select value={resourceType} onChange={(e) => { setResourceType(e.target.value); setPage(1); }}>
            <option value="">Resource Type</option>
            <option>USER</option>
            <option>PROFILE</option>
            <option>AUTH</option>
          </select>

          <select value={region} onChange={(e) => { setRegion(e.target.value); setPage(1); }}>
            <option value="">Region</option>
            <option>ap-south-1</option>
            <option>us-east-1</option>
            <option>eu-west-1</option>
          </select>

          <select value={severity} onChange={(e) => { setSeverity(e.target.value); setPage(1); }}>
            <option value="">Severity</option>
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>

          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">Status</option>
            <option>Resolved</option>
            <option>Unresolved</option>
          </select>
        </div>
      </div>

      <div className="control-box">
        <div className="action-row">
          <div className="left-actions">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="upload-btn" onClick={uploadFile}>
              Upload File
            </button>
          </div>

          <div className="right-actions">
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
              <option value="">Sort By</option>
              <option value="timestamp">Timestamp</option>
              <option value="severity">Severity</option>
              <option value="status">Status</option>
            </select>

            <select value={order} onChange={(e) => { setOrder(e.target.value); setPage(1); }}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Actor</th>
              <th>Role</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Resource Type</th>
              <th>IP Address</th>
              <th>Region</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.actor}</td>
                <td>{log.role}</td>
                <td>{log.action}</td>
                <td>{log.resource}</td>
                <td>{log.resourceType}</td>
                <td>{log.ipAddress}</td>
                <td>{log.region}</td>
                <td>{log.severity}</td>
                <td>{log.status}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>Page {page} / {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;