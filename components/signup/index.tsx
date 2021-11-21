import React,{useEffect, useState} from 'react'
import { CSSProperties } from 'styled-components';
import styles from './Login.module.css';

interface checkPwState {
        pw : string,
        pwCheck : string,
}

const Form = () =>{
    const [checkPw, setcheckPw] = useState<checkPwState>({
        pw:'',
        pwCheck:'',
    })
    const handleChangePw = (targetName:string,targetValue:string) => {
        setcheckPw({
            ...checkPw,
            [targetName]:targetValue
        })
        
    }
    useEffect(()=>{

    },[checkPw])
    return(
        <div className={styles['login-form']}>
        <div className={styles['login-form__box']}>
            <input className={styles['login-form__input']} type="text" name="username" placeholder="아이디"/>
            <label className={styles['login-form__label']}>아이디</label>
        </div>
        <div className={styles['login-form__box']}>
            <input className={styles['login-form__input']} type="text" name="email" placeholder="이메일"/>
            <label className={styles['login-form__label']}>이메일</label>
        </div>
        <div className={styles['login-form__box']}>
            <input className={styles['login-form__input']} type="password" name="pw" placeholder="비밀번호"
            onChange={(e)=>handleChangePw(e.target.name, e.target.value)}
            />
            <label className={styles['login-form__label']}>비밀번호</label>
        </div>
        <div className={styles['login-form__box']}>
            <input className={styles['login-form__input']} type="password" name="pwCheck" placeholder="비밀번호"
            onChange={(e)=>handleChangePw(e.target.name, e.target.value)}
            />
            <label className={styles['login-form__label']}>비밀번호 확인</label>
        </div>
        {(checkPw.pwCheck && checkPw.pw)?(checkPw.pw === checkPw.pwCheck) ? '비밀번호가 일치합니다.':'비밀번호가 다릅니다.' :''}
    </div>
    )
}

const Login = () =>{
    const main :CSSProperties= {
        padding:'10px',
        boxSizing : 'border-box'
        
    }
    return (
        <>
            {/* <NavBar/> */}
            <div style={main}>
            <header className={styles['header']}>
                <h2>Login</h2>
            </header>
            <Form/>
            <input className={styles['login-btn']} type="submit" value="회원가입"/>
            </div>
        </>
    )
}

export default Login;