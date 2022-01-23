import React from 'react';
import Button from '../shared/commonComponent/button';
import CustomImage from '../shared/commonComponent/image';
import Spacing from '../shared/commonComponent/spacing';
import ImagePath from '../shared/imagePath';

const ErrorView = () => {
  return (
    <div className="error-view__wrapper">
      <div className="error-view">
        <CustomImage src={ImagePath.warning} ratio={1 / 1} width={100} height={100} />
        <div className="error-content">
          <h3>알 수 없는 오류가 발생했습니다:(</h3>
        </div>
        <Spacing height={50} />
        <div className="error-footer">
          <Button
            width="45%"
            height={45}
            color="#5b4ab4"
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 10,
            }}
          >
            메인으로 이동
          </Button>

          <Button
            width="45%"
            height={45}
            color="#e5e5e5"
            style={{
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 10,
            }}
          >
            새로고침
          </Button>
        </div>
        <style>{`
      .error-view__wrapper {
        position: fixed;
        transform: translate(-50%, -50%);
        top: 30%;
        left: 50%;
      }
      .error-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .error-content {
        margin-top: 20px;
        text-align: center;
      }

      .error-footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
      }
      `}</style>
      </div>
    </div>
  );
};

export default ErrorView;
