import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Error:", err);
      setPrediction("Error making prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Classifier</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Classifying..." : "Upload & Classify"}
      </button>
      {prediction && (
        <p style={{ marginTop: "1rem" }}>
          Prediction Result: {prediction.label}
        </p>
      )}
    </div>
  );
}

export default App;
