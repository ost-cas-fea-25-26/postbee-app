'use client';

import { useState } from 'react';

import { Dialog, Upload } from '@postbee/postbee-ui-lib';

type UploadFile = {
  file: File;
};

type UploadDialogProps = {
  open: boolean;
  multiple?: boolean;
  onClose: () => void;
  onSubmit: (files: File[]) => void;
};

export const UploadDialog = ({ open, multiple = false, onClose, onSubmit }: UploadDialogProps) => {
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);

  const handleClose = () => {
    // Reset files and close dialog
    setSelectedFiles([]);
    onClose();
  };

  const handleSubmit = () => {
    // Emit files to parent and close
    const files = selectedFiles.map((item) => item.file);
    onSubmit(files);

    // Reset and close
    setSelectedFiles([]);
  };

  return (
    <Dialog title="Upload" open={open} onClose={handleClose} onSubmit={handleSubmit}>
      <Upload multiple={multiple} files={selectedFiles} onChange={setSelectedFiles} />
    </Dialog>
  );
};
