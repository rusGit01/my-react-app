import React from "react";
import styles from "./AllFiles.module.css";

const AllFiles = () => {
  // Sample data for demonstration (8 files, 3 of which are older than 7 days)
  const files = [
    { id: 1, fileName: "Document1.pdf", dateUploaded: "2025-03-08" }, // Today
    { id: 2, fileName: "Image1.png", dateUploaded: "2025-03-07" },   // 1 day ago
    { id: 3, fileName: "Spreadsheet1.xlsx", dateUploaded: "2025-03-06" }, // 2 days ago
    { id: 4, fileName: "Report1.docx", dateUploaded: "2025-03-05" }, // 3 days ago
    { id: 5, fileName: "Photo1.jpg", dateUploaded: "2025-03-04" }, // 4 days ago
    { id: 6, fileName: "OldDocument.pdf", dateUploaded: "2025-02-28" }, // 8 days ago (excluded from recent)
    { id: 7, fileName: "OldImage.png", dateUploaded: "2025-02-27" }, // 9 days ago (excluded from recent)
    { id: 8, fileName: "OldSpreadsheet.xlsx", dateUploaded: "2025-02-26" }, // 10 days ago (excluded from recent)
  ];

  // Sort files by dateUploaded (newest first)
  const sortedFiles = files.sort((a, b) => {
    return new Date(b.dateUploaded) - new Date(a.dateUploaded);
  });

  // Debugging logs
  console.log("All Files (Sorted):", sortedFiles);

  return (
    <div className={styles.allFilesContainer}>
      <h1>All Files</h1>
      <table className={styles.fileTable}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Date Uploaded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>{file.dateUploaded}</td>
              <td>
                <button onClick={() => alert(`Downloading ${file.fileName}`)}>Download</button>
                <button onClick={() => alert(`Editing ${file.fileName}`)}>Edit</button>
                <button onClick={() => alert(`Deleting ${file.fileName}`)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllFiles;