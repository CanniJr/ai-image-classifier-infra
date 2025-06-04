import { useState } from "react";

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
      setPrediction(null); // Clear previous prediction on new image
    }
  };

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
      setPrediction(`${data.label} (class ID: ${data.id})`);
    } catch (err) {
      console.error("Error:", err);
      setPrediction("Error making prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>AI Image Classifier</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Classifying..." : "Upload & Classify"}
      </button>

      {prediction && (
        <p style={{ marginTop: "1rem" }}>Prediction Result: {prediction}</p>
      )}
    </div>
  );
}

export default App;
