import React, { useState } from "react";

let rootPath = "C:/tester/";

export function setRootPath(newRootPath) {
  rootPath = newRootPath;
}

export function getRootPath() {
  return rootPath;
}

export function openFile(filePath) {
  window.electron.openFile(filePath);
}

export function openFolder(filePath) {
  window.electron.openFolder(filePath);
}

export function makeMacPath(path) {
  path = path.replace('workspaceblobstore/', rootPath);
  return path;
}

export function makeWindowsPath(path) {
  path = path.replace('workspaceblobstore/', rootPath);
  return path.replace(/\//g, '\\');
}

export function useRootPath() {
  const [currentRootPath, setCurrentRootPath] = useState(rootPath);

  const setDynamicRootPath = (newRootPath) => {
    setCurrentRootPath(newRootPath);
  };

  return [currentRootPath, setDynamicRootPath];
}
