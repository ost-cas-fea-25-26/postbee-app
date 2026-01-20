'use client';

import { useState } from 'react';

import { Button, Dialog, Upload } from '@postbee/postbee-ui-lib';

import { ImageView } from '../core/ImageView';

type UploadFile = {
  file: File;
};

type AvatarUploadDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (files: File[]) => void;
  loading?: boolean;
  maxSize?: number;
};

export function AvatarUploadDialog({ open, onClose, onSubmit, loading = false, maxSize }: AvatarUploadDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string>('');

  const handleClose = () => {
    setSelectedFiles([]);
    setError('');
    onClose();
  };

  const handleSubmit = () => {
    if (maxSize && selectedFiles.length > 0 && selectedFiles[0].file.size > maxSize) {
      setError(`File size exceeds the maximum allowed size of ${maxSize} bytes.`);

      return;
    }
    const files = selectedFiles.map((item) => item.file);
    onSubmit(files);
    setError('');
  };

  return (
    <>
      <Dialog
        title="Update your avatar"
        open={open}
        onClose={handleClose}
        actions={
          <>
            <Button text="Cancel" icon="cancel" variant="secondary" onClick={handleClose} size="md" />
            <Button text="Apply" loading={loading} icon="checkmark" onClick={handleSubmit} size="md" />
          </>
        }
      >
        {selectedFiles.length === 0 && <Upload multiple={false} files={selectedFiles} onChange={setSelectedFiles} />}
        {selectedFiles.length > 0 && (
          <div>
            <p style={{ textAlign: 'center' }}>
              {selectedFiles[0].file.name} ({(selectedFiles[0].file.size / 1024).toFixed(2)} KB)
            </p>
            {selectedFiles[0].file.type.startsWith('image/') && (
              <>
                <ImageView sources={[URL.createObjectURL(selectedFiles[0].file)]} alt="Preview" />
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <Button
                    text="Remove"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedFiles([]);
                      setError('');
                    }}
                  />
                </div>
              </>
            )}
            {!selectedFiles[0].file.type.startsWith('image/') && (
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <Button
                  text="Remove"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedFiles([]);
                    setError('');
                  }}
                />
              </div>
            )}
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Dialog>
    </>
  );
}
