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
  marginTop: '16',
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

function Previews(props: any) {
  const [files, setFiles]: any = useState([]);
  const [test, setTest] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/gif, image/jpg, image/jpeg',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>{
        console.log(file)
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
          
        }
        ),
      );
      console.log(acceptedFiles);
    
    },
    maxFiles: 5,
    maxSize: 15728640,
    onDropRejected: () => {
      alert('에러');
    },
  });
  //   (function test(){
  //     setFiles([{
  //         name:'test',
  //         preview:'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile4.uf.tistory.com%2Fimage%2F24611E4853FDAE0B148760'
  //       }]);

  //   })();
//   const thumbs = files.map((file: { name: React.Key | null | undefined; preview: string | undefined }) => (
//     <div style={thumb} key={file.name}>
//       <div style={{position:'absolute'}}>x</div>
//       <div style={thumbInner}>
//         <img src={file.preview} style={img} />
//       </div>
//     </div>
//   ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: { preview: string }) => URL.revokeObjectURL(file.preview));
      setTest([])
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
      <aside style={thumbsContainer}>{test}</aside>
    </section>
  );
}

export default Previews;
