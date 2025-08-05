import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./file-upload";
import { HiPaperClip } from "react-icons/hi";
import { FaFileImage } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IFile } from "@/types/file";
interface FileUploadDropzoneProps {
  children: React.ReactNode;
}
const FileUploadDropzone = ({ children }: FileUploadDropzoneProps) => {
  const [files, setFiles] = useState<File[] | null>([]);
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 5,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <div
      className={`${files?.length == 0 && "flex gap-0"} relative mx-auto w-96 px-2`}
    >
      <FileUploader
        value={files}
        orientation="vertical"
        onValueChange={setFiles}
        className="w-fit pr-3"
        dropzoneOptions={dropzone}
      >
        {files?.length === 0 ? (
          // Layout when no files are present
          <div className="flex items-center">
            <FileInput
              className="w-fit rounded-md text-background text-blue-500 hover:text-blue-700"
              parentclass="w-fit"
            >
              <FaFileImage className="size-8 p-1" />
            </FileInput>
          </div>
        ) : (
          // Layout when files are present
          <div className="mb-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FileInput
                className="bg-primary-foreground w-fit rounded-md border border-primary/20 text-blue-500 hover:text-blue-700"
                parentclass="w-fit"
              >
                <FaFileCirclePlus className="size-12 p-3" />
                <span className="sr-only">Select your files</span>
              </FileInput>
              <FileUploaderContent className="flex flex-row items-start gap-1">
                {files?.map((file, i) => (
                  <FileUploaderItem
                    key={i}
                    index={i}
                    className="size-12 w-fit overflow-hidden rounded-md border p-0"
                    aria-roledescription={`file ${i + 1} containing ${
                      file.name
                    }`}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      height={80}
                      width={80}
                      className="size-12 rounded-md bg-primary object-cover"
                    />
                  </FileUploaderItem>
                ))}
              </FileUploaderContent>
            </div>
          </div>
        )}
      </FileUploader>
      {children}
    </div>
  );
};

export default FileUploadDropzone;
