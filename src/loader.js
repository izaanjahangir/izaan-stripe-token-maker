const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.8)",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: "30px", color: "white", textAlign: "center" }}>
        Loading...
      </p>
    </div>
  );
};

export default Loader;
