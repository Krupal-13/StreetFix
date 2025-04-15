const API_BASE_AUTH = "http://localhost:5000/api/auth";
const API_BASE_ISSUES = "http://localhost:5000/api/issues";

export const signupUser = async (userData) => {
  const res = await fetch(`${API_BASE_AUTH}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const reportIssue = async (issueData) => {
  const res = await fetch(`${API_BASE_ISSUES}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(issueData),
  });
  return res.json();
};

export const fetchIssues = async () => {
  const res = await fetch(`${API_BASE_ISSUES}/`);
  return res.json();
};
