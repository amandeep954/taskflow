const email = process.argv[2];
const pass = process.argv[3];
if (!email || !pass) {
  console.error("Usage: node testLogin.js <email> <password>");
  process.exit(1);
}

(async () => {
  try {
    const res = await fetch(
      "https://taskflow-api-ep1v.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
        credentials: "include",
      },
    );
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (e) {
    console.error("Request error:", e.message);
  }
})();
