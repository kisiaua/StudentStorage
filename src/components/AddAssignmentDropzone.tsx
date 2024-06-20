import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../icons/UploadIcon.tsx";
import DropIcon from "../icons/DropIcon.tsx";

interface AddAssignmentDropzoneProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

function AddAssignmentDropzone({
  files,
  setFiles,
}: AddAssignmentDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    [setFiles],
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-500");
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-500");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-full"
      >
        <label
          htmlFor="dropzone-file"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {!isDragActive ? (
              <>
                <UploadIcon strokeWidth={1.5} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Przyciśnij tutaj</span> lub
                  przeciągnij pliki, aby je dodać.
                </p>
              </>
            ) : (
              <>
                <DropIcon strokeWidth={1.5} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Upuść</span> pliki tutaj.
                </p>
              </>
            )}
          </div>
        </label>
      </div>
      <aside>
        <h5 className="mt-3 text-lg font-medium">Dodane pliki:</h5>
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default AddAssignmentDropzone;
