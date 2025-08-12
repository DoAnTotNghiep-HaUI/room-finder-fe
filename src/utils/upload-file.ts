// // src/services/directus-upload.ts
// import { createDirectus, rest, uploadFiles } from "@directus/sdk";
// import directus from "@/utils/directus";
// import { IFile } from "@/types/file";

// export const uploadFile = async (files: IFile) => {
//   try {
//     const uploadedFileIds: string[] = [];

//     for (const file of Array.from(files)) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("title", file.name); // Optional: Set a title for the file

//       // You can also add other metadata like 'folder' if needed
//       // formData.append('folder', 'YOUR_FOLDER_ID');

//       const uploadedFile = await directus.request(uploadFiles(formData));
//       uploadedFileIds.push(uploadedFile.id);
//       console.log(`Uploaded file: ${uploadedFile.filename_download}`);
//     }

//     console.log("All files uploaded successfully. IDs:", uploadedFileIds);
//     return uploadedFileIds;
//   } catch (error) {
//     console.error("Error uploading files:", error);
//     throw error;
//   }
// }
