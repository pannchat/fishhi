import React from 'react';
import styled from 'styled-components';
const ProfileContainer = styled.div`
    margin:20px 0;
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
    --ImgSize : 70px;
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
    --ImgSize : 70px;
    width:var(--ImgSize);
    height:var(--ImgSize);
    object-fit:cover;
`;
const ProfileInfo = styled.div`
    

    color:white;
`;
const MyPage = () => {
    return(
        <ProfileContainer>
            <ProfileInfoContainer>
                <ProfileImgContainer>
                    <ProfileImg src="https://media.vlpt.us/images/duplicareus/profile/28439011-32a8-4836-b945-3a25090992bf/%EC%82%AC%EC%A7%84.jpg?w=120"/>
                </ProfileImgContainer>
                <ProfileInfo>닉네임</ProfileInfo>
            </ProfileInfoContainer>
        </ProfileContainer>
    );
}

export default MyPage;