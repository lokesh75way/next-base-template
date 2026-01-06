export default function ForbiddenPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h1 style={{ fontSize: 48 }}>403</h1>
      <p>You don’t have permission to access this page.</p>
    </div>
  );
}
