import React, { useState, useEffect } from "react";
import { setRootPath } from "../SearchComponents/ResultUtil";

function FilePathButton({ onFilePathSelected }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [selectedOption, setSelectedOption] = useState("select"); // Default to a non-existing option

  useEffect(() => {
    // Load the saved file path from localStorage on component mount
    const savedFilePath = localStorage.getItem("selectedFilePath");
    if (savedFilePath) {
      setRootPath(savedFilePath);
      setSelectedDirectory(savedFilePath);
    }
  }, []); // Empty dependency array ensures this effect runs only on mount

  const handleFileOpenClick = async () => {
    try {
      // Trigger the file dialog
      const selectedFilePath = await window.electron.openFileDialog();

      // Check if a file was selected
      if (typeof selectedFilePath !== 'undefined') {
        // Replace backslashes with forward slashes
        const filePathWithForwardSlash = selectedFilePath.replace(/\\/g, '/');

        // Check if the path ends with a forward slash, if not, append one
        const filePathWithTrailingSlash = filePathWithForwardSlash.endsWith("/")
          ? filePathWithForwardSlash
          : filePathWithForwardSlash + "/";

        // Save the selected file path in localStorage
        localStorage.setItem("selectedFilePath", filePathWithTrailingSlash);

        // Update the rootPath value in ResultUtil
        setRootPath(filePathWithTrailingSlash);

        // Update the state with the selected directory
        setSelectedDirectory(filePathWithTrailingSlash);

        // Reset the selected option to the default
        setSelectedOption("select");

        // Reload after selecting a new file path
        window.location.reload();
      } else {
        // Handle the case where the user canceled or no file was selected
        console.log("User canceled or no file selected");
        // You can customize this part to perform a different action
      }
    } catch (error) {
      console.error("Error during file dialog:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionChange = (value) => {
    // If the user selects the third option, open a new file path
    if (value === "open") {
      handleFileOpenClick();
    } else {
      // If "Option 1" or "Option 2" is selected, treat it as a file path
      const selectedPathWithForwardSlash = value.replace(/\\/g, '/');

      // Save the selected file path in localStorage
      localStorage.setItem("selectedFilePath", selectedPathWithForwardSlash);

      // Update the rootPath value in ResultUtil with forward slashes
      setRootPath(selectedPathWithForwardSlash);

      // Update the state with the selected directory using forward slashes
      setSelectedDirectory(selectedPathWithForwardSlash);

      // Reset the selected option to the default
      setSelectedOption("select");

      // Reload after selecting a new file path
      window.location.reload();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
  {/* Custom dropdown button */}
  <button
    data-testid="dropdownInformationButton" // Added this line for testing
    id="dropdownInformationButton"
    data-dropdown-toggle="dropdownInformation"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
    onClick={toggleDropdown}
  >
    Select a Path
    <svg
      className="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  {/* Custom dropdown menu */}
  {isDropdownVisible && (
    <div
      id="dropdownInformation"
      data-testid="dropdownInformation"
      className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-43.5 dark:bg-gray-700 dark:divide-gray-600 text-left"
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOptionChange("C:\\")}>
            Disk C:
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOptionChange("D:\\")}>
            Disk D:
          </a>
        </li>
        <li>
          <hr className="my-2" />
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleFileOpenClick}>
            Open New File Path
          </a>
        </li>
      </ul>
    </div>
  )}
</div>
  );
}

export default FilePathButton;
