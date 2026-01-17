import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { formatSize } from "~/lib/utils";
import clsx from "clsx";

interface FileUploaderProps {
  onSelectFile?: (file: File | null) => void;
}

export default function FileUploader({ onSelectFile }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    onSelectFile?.(file);
  }, [onSelectFile]);

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    onSelectFile?.(null);
  }

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className={clsx("w-full transition-all", isDragActive ? "ring-4 ring-blue-100" : "")}>
      <div
        {...getRootProps()}
        className={clsx(
          "uplader-drag-area transition-all duration-300",
          isDragActive && "border-blue-400 bg-blue-50/50"
        )}
        role="button"
        aria-label="Upload resume"
        tabIndex={0}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          {file ? (
            <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <img src="/images/pdf.png" alt="pdf" className="size-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-700 truncate max-w-[200px] md:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-brand-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group"
                onClick={handleRemoveFile}
                aria-label="Remove file"
              >
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4 opacity-50 group-hover:opacity-100"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4 bg-blue-50 rounded-2xl">
                <img src="/icons/info.svg" alt="upload icon" className="size-10 opacity-60" />
              </div>
              <p className="text-lg text-brand-700 font-medium">
                Drag & drop your resume here
              </p>
              <p className="text-sm text-brand-500 mt-1">
                or click to select files (PDF max 20 MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}