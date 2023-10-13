import type { FileEntry } from "@tauri-apps/api/fs";

import {
  Button,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@typethings/ui";

import { toast } from "sonner";
import { deleteFile } from "@/functions/deleteFile";
import { useFilesStore } from "@/store/filesStore";
import { useNavigate } from "react-router-dom";

const DeleteFile = (props: FileEntry) => {
  const removeFileStore = useFilesStore((state) => state.removeFile);
  const router = useNavigate();
  // Delete function:
  const handleDeleteFile = async () => {
    try {
      router("/");
      await deleteFile({
        path: props.path,
      });
      removeFileStore(props.name!);
      toast("Deleted file");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete file</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete "{props.name}"? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="cursor-default border border-red-900"
            onClick={() => {
              handleDeleteFile();
            }}
          >
            Confirm
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteFile;
