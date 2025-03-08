import React from "react";
import styles from "./RecentlyAdded.module.css";

const RecentlyAdded = () => {
  // Sample data for demonstration (updated to match March 8, 2025)
  const files = [
    { id: 1, fileName: "Document2.pdf", dateUploaded: "2025-03-08" }, // Today
    { id: 2, fileName: "Image2.png", dateUploaded: "2025-03-07" },   // 1 day ago
    { id: 3, fileName: "Spreadsheet2.xlsx", dateUploaded: "2025-03-06" }, // 2 days ago
    { id: 4, fileName: "Report.docx", dateUploaded: "2025-03-05" }, // 3 days ago
    { id: 5, fileName: "Photo.jpg", dateUploaded: "2025-03-04" }, // 4 days ago
  ];

  // Calculate the date 7 days ago
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate); // Create a new Date object
  sevenDaysAgo.setDate(currentDate.getDate() - 7); // Subtract 7 days
  const sevenDaysAgoFormatted = sevenDaysAgo.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // Filter files uploaded within the last 7 days
  const recentlyAddedFiles = files.filter((file) => {
    const fileDate = new Date(file.dateUploaded).toISOString().split("T")[0];
    return fileDate >= sevenDaysAgoFormatted;
  });

  // Sort files by dateUploaded (newest first)
  const sortedFiles = recentlyAddedFiles.sort((a, b) => {
    return new Date(b.dateUploaded) - new Date(a.dateUploaded);
  });

  // Debugging logs
  console.log("Current Date:", currentDate.toISOString().split("T")[0]);
  console.log("Seven Days Ago:", sevenDaysAgoFormatted);
  console.log("Recently Added Files (Sorted):", sortedFiles);

  return (
    <div className={styles.recentlyAddedContainer}>
      <h1>Recently Added Files</h1>
      <table className={styles.fileTable}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Date Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>{file.dateUploaded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyAdded;