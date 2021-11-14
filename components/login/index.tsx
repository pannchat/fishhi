import React from 'react'
import { CSSProperties } from 'styled-components';
import styles from './Login.module.css';
const Form = () =>{
    return(
        <div className={styles['login-form']}>
        <div className={styles['login-form__box']}>
            <input className={styles['login-form__input']} type="text" name="username" placeholder="아이디"/>
            <label className={styles['login-form__label']}>아이디</label>
        </div>
        <div className={styles['login-form__box']}>
            <input className={styles['login-form__input']} type="password" name="password" placeholder="비밀번호"/>
            <label className={styles['login-form__label']}>비밀번호</label>
        </div>
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
            <input className={styles['login-btn']} type="submit" value="로그인"/>
            </div>
        </>
    )
}

export default Login;