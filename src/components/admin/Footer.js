export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        color: "#fff",
        padding: "15px 0",
        textAlign: "center",
        fontSize: "14px",
        marginTop: "40px",
      }}
    >
      © {new Date().getFullYear()} Dandes Academy
    </footer>
  );
}
