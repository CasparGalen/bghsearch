import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, } from "@testing-library/react";
import {
  setRootPath,
  getRootPath,
  openFile,
  openFolder,
  makeMacPath,
  makeWindowsPath,
  useRootPath,
} from "../ResultUtil.jsx"; // Import your module
import { renderHook, act } from '@testing-library/react';

describe("ResultUtil", () => {
  it("should set and get root path correctly", () => {
    setRootPath("new/test/path");
    expect(getRootPath()).toBe("new/test/path");
  });

  it("should open file using electron", () => {
    // Mock the electron function
    window.electron = {
      openFile: jest.fn(),
    };

    openFile("/path/to/file");
    expect(window.electron.openFile).toHaveBeenCalledWith("/path/to/file");
  });

  it("should open folder using electron", () => {
    // Mock the electron function
    window.electron = {
      openFolder: jest.fn(),
    };

    openFolder("/path/to/folder");
    expect(window.electron.openFolder).toHaveBeenCalledWith("/path/to/folder");
  });

  it("should make Mac path correctly", () => {
    setRootPath("C:/tester/"); // Reset root path for this test

    const macPath = makeMacPath("workspaceblobstore/some/file");
    expect(macPath).toBe("C:/tester/some/file");
  });

  it("should make Windows path correctly", () => {
    setRootPath("C:/tester/"); // Reset root path for this test

    const windowsPath = makeWindowsPath("workspaceblobstore/some/file");
    expect(windowsPath).toBe("C:\\tester\\some\\file");
  });

  it("should use dynamic root path with hook", () => {
    setRootPath("initial/root/path");

    const { result } = renderHook(() => useRootPath());
    const [currentRootPath, setDynamicRootPath] = result.current;

    expect(currentRootPath).toBe("initial/root/path");

    act(() => {
      setDynamicRootPath("new/dynamic/path");
    });

    expect(result.current[0]).toBe("new/dynamic/path");
  });
});
