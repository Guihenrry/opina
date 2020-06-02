import React, { useCallback, DragEvent, ChangeEvent, useState } from 'react';

import { FiUploadCloud } from 'react-icons/fi';
import * as S from './styles';
import newId from '../../utils/newId';

interface UploadDropzoneProps {
  onFileAdded(file: File): void;
  small?: boolean;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFileAdded,
  small,
}) => {
  const [draging, setDraging] = useState(0);
  const [preview, setPreview] = useState('');
  const [id] = useState(newId);

  const handleInputFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        onFileAdded(file);

        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
      } else {
        setPreview('');
      }
    },
    [onFileAdded],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDraging(1);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDraging(0);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDraging(0);
      const file = event.dataTransfer.files?.[0];

      if (file) {
        onFileAdded(file);

        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
      } else {
        setPreview('');
      }
    },
    [onFileAdded],
  );

  return (
    <S.Container
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      htmlFor={id}
      draging={draging}
      preview={preview}
      small={small ? 1 : 0}
    >
      <input
        type="file"
        id={id}
        onChange={handleInputFileChange}
        accept="image/x-png,image/gif,image/jpeg"
      />
      <div>
        <FiUploadCloud />
        <p>Selecione ou arraste o arquivo aqui</p>
      </div>
    </S.Container>
  );
};

export default UploadDropzone;
