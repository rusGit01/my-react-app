import React, { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "Photos.png", size: "7.5 MB", progress: 37 },
    { id: 2, name: "Task.doc", size: "2 MB", progress: 63 },
    { id: 3, name: "Database.dpng", size: "1.4 MB", progress: 100 },
  ]);

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles.length > 0) {
      const newFiles = Array.from(uploadedFiles).map((file, index) => ({
        id: files.length + index + 1,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        progress: 0,
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1>File Upload</h1>
      <div className={styles.mainBox}>
        {/* Left Section: Drag and Drop / Upload Area */}
        <div className={styles.leftSection}>
          <div className={styles.uploadArea}>
            <p>Drag and drop files here</p>
            <p>OR</p>
            <input
              type="file"
              id="fileInput"
              className={styles.fileInput}
              onChange={handleFileUpload}
              multiple
            />
            <label htmlFor="fileInput" className={styles.browseButton}>
              Browse Files
            </label>
          </div>
        </div>

        {/* Right Section: Uploading Files List */}
        <div className={styles.rightSection}>
          <h2>Uploading Files</h2>
          <div className={styles.uploadList}>
            {files.map((file) => (
              <div key={file.id} className={styles.uploadItem}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>{file.size}</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
                <span className={styles.progressText}>{file.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;