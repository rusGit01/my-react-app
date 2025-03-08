import React, { useState } from "react";
import styles from "./DeletedFiles.module.css";

const DeletedFiles = () => {
  // Sample data for demonstration
  const [deletedFiles, setDeletedFiles] = useState([
    { id: 1, fileName: "Document3.pdf", dateDeleted: "2025-03-01" },
    { id: 2, fileName: "Image3.png", dateDeleted: "2025-03-03" },
    { id: 3, fileName: "Spreadsheet3.xlsx", dateDeleted: "2025-03-05" },
    { id: 4, fileName: "Report3.docx", dateDeleted: "2025-03-07" },
    { id: 5, fileName: "Photo3.jpg", dateDeleted: "2025-03-08" },
  ]);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Calculate days left for each file (capped at 7)
  const calculateDaysLeft = (dateDeleted) => {
    const deletedDate = new Date(dateDeleted);
    const currentDate = new Date();
    const timeDifference = currentDate - deletedDate;
    const daysLeft = Math.ceil((7 * 24 * 60 * 60 * 1000 - timeDifference) / (24 * 60 * 60 * 1000));

    // Ensure daysLeft is between 0 and 7
    return Math.max(0, Math.min(7, daysLeft));
  };

  // Filter out files with daysLeft <= 0 and sort by dateDeleted (newest first)
  const sortedFiles = deletedFiles
    .map((file) => ({
      ...file,
      daysLeft: calculateDaysLeft(file.dateDeleted),
    }))
    .filter((file) => file.daysLeft > 0) // Exclude files with daysLeft <= 0
    .sort((a, b) => new Date(b.dateDeleted) - new Date(a.dateDeleted));

  // Toggle checkboxes
  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    setSelectedFiles([]); // Reset selected files when toggling checkboxes
  };

  // Handle file selection
  const handleFileSelect = (id) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  // Restore selected files
  const handleRestoreSelected = () => {
    const restoredFiles = sortedFiles.filter((file) => selectedFiles.includes(file.id));
    setDeletedFiles(deletedFiles.filter((file) => !selectedFiles.includes(file.id)));
    alert(`Restored files: ${restoredFiles.map((file) => file.fileName).join(", ")}`);
    setShowCheckboxes(false);
    setSelectedFiles([]);
  };

  // Permanently delete selected files
  const handleDeleteSelected = () => {
    const deletedFilesList = sortedFiles.filter((file) => selectedFiles.includes(file.id));
    setDeletedFiles(deletedFiles.filter((file) => !selectedFiles.includes(file.id)));
    alert(`Permanently deleted files: ${deletedFilesList.map((file) => file.fileName).join(", ")}`);
    setShowCheckboxes(false);
    setSelectedFiles([]);
  };

  return (
    <div className={styles.deletedFilesContainer}>
      <h1>Deleted Files</h1>
      <div className={styles.actions}>
        <button onClick={toggleCheckboxes}>Restore Selected</button>
        <button onClick={toggleCheckboxes}>Delete Selected</button>
      </div>
      <table className={styles.fileTable}>
        <thead>
          <tr>
            {showCheckboxes && <th></th>}
            <th>File Name</th>
            <th>Date Deleted</th>
            <th>Days Left</th>
            {!showCheckboxes && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr key={file.id}>
              {showCheckboxes && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleFileSelect(file.id)}
                  />
                </td>
              )}
              <td className={styles.fileNameCell}>{file.fileName}</td>
              <td>{file.dateDeleted}</td>
              <td>{file.daysLeft}</td>
              {!showCheckboxes && (
                <td>
                  <button onClick={() => handleRestoreSelected(file.id)}>Restore</button>
                  <button onClick={() => handleDeleteSelected(file.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedFiles;