import { createGlobalStyle } from 'styled-components';
import BGImage from './images/bg.jpg';

export const GlobalStyle = createGlobalStyle`
    html{ 
        height: 100%;
    }

    body{ 
        background-image: url(${BGImage});
        background-size:cover;
        margin:0;
        padding 0 20px;
        display: flex;
        justify-content: center;
        color: #ffffff;
    }

    * {
        box-siziing: border-box;
        font-family: sans-serif;
    }
`

