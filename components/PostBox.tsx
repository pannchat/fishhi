import React from 'react';
import { CSSProperties } from 'styled-components';
// merge
interface IPostBoxProps extends IPostBoxInfoProps {
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
  image?: string;
}

const PostBox = (props: IPostBoxProps) => {
  const { width, height, style, image, ...info } = props;
  return (
    <div className="post-box__wrapper">
      <div className="post-thumbnail">
        {image && (
          <img
            src={image}
            width={'100%'}
            height={190}
            style={{
              objectFit: 'cover',
            }}
          />
        )}
      </div>

      <div className="post-bottom">
        <PostBoxInfo {...info} />
      </div>

      <style jsx>{`
        .post-box__wrapper {
          border: 1px solid rgb(236, 236, 236);
          border-radius: 10px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PostBox;

interface IPostBoxInfoProps {
  profileImage?: string;
  nickname: string;
  title: string;
}

const PostBoxInfo = (props: IPostBoxInfoProps) => {
  const { profileImage, nickname, title } = props;

  return (
    <div className="post-box__info__wrapper">
      {profileImage ? (
        <div className="profile-image__wrapper">
          <img src={profileImage} width={35} height={35} />
        </div>
      ) : (
        <div className="default__image"></div>
      )}

      <div className="post-title__wrapper">
        <p className="post-title">{title}</p>
      </div>

      <div className="writer__wrapper">
        <p className="writer"> post by {nickname}</p>
      </div>

      <style jsx>{`
        .default__image {
          width: 35px;
          height: 35px;
          background-color: grey;
          border-radius: 100%;
        }

        .post-box__info__wrapper {
          display: flex;
          align-items: center;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
        }

        .post-title__wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .post-title {
          padding-left: 10px;
          padding-right: 10px;
        }
      `}</style>
    </div>
  );
};
