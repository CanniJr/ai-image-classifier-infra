import { useState } from "react";
import { ClassifyButton } from "../classifyButton";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setPrediction(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Prediction:", data);
      setPrediction(`${data.label} (class ID: ${data.id})`);
    } catch (err) {
      console.error("Error:", err);
      setPrediction("Error making prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>🧠 AI Image Classifier</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "1rem" }}
      />

      {preview && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              marginBottom: "1rem",
            }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#4f46e5",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Classifying..." : "Upload & Classify"}
      </button>

      {prediction && (
        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          🧾 Prediction Result:{" "}
          <span style={{ color: "#4f46e5" }}>{prediction}</span>
        </div>
      )}
    </div>
  );
}

export default App;
