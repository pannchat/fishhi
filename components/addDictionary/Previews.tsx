import React, { CSSProperties, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const baseStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle: CSSProperties = {
  borderColor: '#2196f3',
};

const acceptStyle: CSSProperties = {
  borderColor: '#00e676',
};

const rejectStyle: CSSProperties = {
  borderColor: '#ff1744',
};
const thumbsContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px',
  justifyContent:'space-between',
};

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative',
};
const thumbClose: CSSProperties = {
  position: 'absolute',
  right: '5px',
  width: '20px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.3)',
  color: 'white',
};
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};
interface Ifile {
  name: React.Key | null | undefined;
  preview: string | undefined;
}
function Previews(props: any) {
  const [files, setFiles]: any = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/gif, image/jpg, image/jpeg',
    onDrop: acceptedFiles => {
      setFiles([
        ...acceptedFiles.map(file => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        }),
      ]);
    },
    maxFiles: 5,
    maxSize: 15728640,
    onDropRejected: () => {
      alert('지원하지 않는 타입의 확장자입니다.');
    },
  });
  function removeFile(targetFileName: React.Key | null | undefined) {
    setFiles(
      files.filter((fItem: Ifile) => {
        console.log(fItem.name, targetFileName, fItem.name === targetFileName)
        return fItem.name !== targetFileName;
      }),
    );
    console.log(files)
  }
  const thumbs = files.map((file: Ifile) => (
    <div style={thumb} key={file.name}>
      <div style={thumbClose} onClick={() => removeFile(file.name)}>
        x
      </div>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: { preview: string }) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );
  const { isDragActive, isDragAccept, isDragReject } = useDropzone({ accept: 'image/*' });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );
  const containerStyle = {
    width: '100%',
    margin: '15px',
  };

  return (
    <section style={{ padding: '10px' }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>여기에 파일을 끌어놓거나 클릭해주세요.</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default Previews;