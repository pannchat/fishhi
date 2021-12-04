import React from 'react';
import styled from 'styled-components';
import styles from './Index.module.scss';
import ImagePath from "../../shared/imagePath";
const ProfileContainer = styled.div`
    margin:20px;
    width:100%;
    height:150px;
    border-radius:5px;
    box-sizing: border-box;
    background-color:#8AA1A1;
    display:flex;
    flex-direction:column;
    justify-content:center;
`;
const ProfileInfoContainer = styled.div`
    display:flex;
    padding:10px;
    
`;
const ProfileImgContainer = styled.div`
    --ImgSize : 80px;
    width:var(--ImgSize);
    height:var(--ImgSize);
    overflow:hidden;
    border-radius:50%;
    color:white;
    &+div{ // ProfileInfo
        margin-left:10px;
        box-sizing:border-box;
    }
`;
const ProfileImg = styled.img`
    --ImgSize : 80px;
    width:var(--ImgSize);
    height:var(--ImgSize);
    object-fit:cover;
`;
const ProfileInfo = styled.div`
    color:white;
`;
const MyPage = () => {
    return(
        <div className={styles['main']}>
            <div className={styles['profile']}>
                <div className={styles['profile__info']}>
                    <div className={styles['profile__img-container']}>
                        <img className={styles['profile__img']} src="https://media.vlpt.us/images/duplicareus/profile/28439011-32a8-4836-b945-3a25090992bf/%EC%82%AC%EC%A7%84.jpg?w=120"/>
                    </div>
                    <div className={styles['profile__text']}>이름</div>
                    <div className={styles['profile__text']}>이메일</div>
                </div>
                <div className={styles['profile__info']}>
                    <div className={styles['profile__modified']}>
                        프로필수정
                    </div>
                </div>
            </div>

            <div className={styles['fishtank']}>
                <div className={styles['fishtank__my-fishtank']}>
                    <div className={styles['fishtank__my-thumb-container']}>
                        <div className={styles['fishtank__lock']}>
                            ㅇ    
                        </div>
                        <img className={styles['fishtank__my-thumb']}src={ImagePath.thumb}/>
                    </div>
                    <div className={styles['fishtank__my-tank-info']}>
                        <div className={styles['fishtank__my-tank-title']}>
                            ewfwefnewlkfnwlekfnlakmlfkmwlkfmawelkfmlakmewlkfmlkmlwkemf
                        </div>
                        <div className={styles['fishtank__my-tank-icon']}>
                            ㅇ
                        </div>
                        <div className={styles['fishtank__my-tank-icon']}>
                            ㅇ
                        </div>
                    </div>
                </div>
                <div className={styles['fishtank__my-fishtank']}>
                    <div className={styles['fishtank__my-thumb-container']}>
                        <div className={styles['fishtank__lock']}>
                            ㅇ    
                        </div>
                        <img className={styles['fishtank__my-thumb']}src={ImagePath.thumb2}/>

                    </div>
                    <div className={styles['fishtank__my-tank-info']}>
                        <div className={styles['fishtank__my-tank-title']}>
                            ewfwefnewlkfnwlekfnlakmlfkmwlkfmawelkfmlakmewlkfmlkmlwkemf
                        </div>
                        <div className={styles['fishtank__my-tank-icon']}>
                            ㅇ
                        </div>
                        <div className={styles['fishtank__my-tank-icon']}>
                            ㅇ
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <ProfileContainer>
        //     <ProfileInfoContainer>
        //         <ProfileImgContainer>
        //             <ProfileImg src="https://media.vlpt.us/images/duplicareus/profile/28439011-32a8-4836-b945-3a25090992bf/%EC%82%AC%EC%A7%84.jpg?w=120"/>
        //         </ProfileImgContainer>
        //         <ProfileInfo>닉네임</ProfileInfo>
        //         <ProfileInfo>닉네임</ProfileInfo>
        //     </ProfileInfoContainer>
        // </ProfileContainer>
    );
}

export default MyPage;