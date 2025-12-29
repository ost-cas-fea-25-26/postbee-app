'use client';

import { useState } from 'react';

import { Button, Dialog, Upload } from '@postbee/postbee-ui-lib';

type UploadFile = {
  file: File;
};

type UploadDialogProps = {
  open: boolean;
  multiple?: boolean;
  onClose: () => void;
  onSubmit: (files: File[]) => void;
};

export function UploadDialog({ open, multiple = false, onClose, onSubmit }: UploadDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);

  const handleClose = () => {
    setSelectedFiles([]);
    onClose();
  };

  const handleSubmit = () => {
    const files = selectedFiles.map((item) => item.file);
    onSubmit(files);
    setSelectedFiles([]);
  };

  return (
    <Dialog
      title="Upload"
      open={open}
      onClose={handleClose}
      actions={
        <>
          <Button text="Cancel" icon="cancel" variant="secondary" onClick={handleClose} size="md" />
          <Button text="Apply" icon="checkmark" onClick={handleSubmit} size="md" />
        </>
      }
    >
      <Upload multiple={multiple} files={selectedFiles} onChange={setSelectedFiles} />
    </Dialog>
  );
}
