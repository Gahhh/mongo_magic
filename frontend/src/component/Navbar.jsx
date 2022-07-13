import { React, useRef, useEffect, useState } from "react";
import styled from 'styled-components';
import { Layout, Menu, Image, Space } from 'antd';
import logo from '../assets/logo.png';
import dashboardLogo from '../assets/dashboardLogo.png';
import dashboardLogoSelected from '../assets/dashboardLogoSelected.png';
import resultsLogo from '../assets/resultsLogo.png';
import resultsLogoSelected from '../assets/resultsLogoSelected.png';
import analyticsLogo from '../assets/analyticsLogo.png';
import analyticsLogoSelected from '../assets/analyticsLogoSelected.png';
import rankingLogo from '../assets/rankingLogo.png';
import rankingLogoSelected from '../assets/rankingLogoSelected.png';
import profileLogo from '../assets/profileLogo.png';
import profileLogoSelected from '../assets/profileLogoSelected.png';
import settingsLogo from '../assets/settingsLogo.png';
import settingsLogoSelected from '../assets/settingsLogoSelected.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const { Sider }  = Layout;

const HeaderLogo = styled.div`
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 120px;
    order: 1;
    cursor: pointer;
`;

const TopLogo = styled.img`
    position: relative;
    width: 56px;
    height: auto;
    align-items: center;
    min-width: 20px;
`
const LogoText = styled.a`
    position:relative;
    left: 5%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 40px;
    letter-spacing: 0.04em;
    color: #126D62;
`

const MainMenuContainer = styled.div`
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
`

const MenuLogo = styled.img`
    width: 28px;
    height: 28px;
    position: relative; 
`

/**
 * 
 * @param {*} e 
 * @returns Logo with correct offset
 */
const DashboardLogo = (e) => {
    const marRight = e.size;
    return (
        <MenuLogo src={e.src} style={{ marginRight: `${marRight}px` }} >
        </MenuLogo>
    )
}
/**
 * decode the url parameters
 */
const pageKeys = {
    'Dashboard': '1',
    'Results': '2',
    'Analytics': '3',
    'Ranking': '4',
    'Profile': '5',
    'Settings': '6',
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

/**
 * If loading page from dashboard url there is no props
 * so we need to set default props
 */
// Dashboard.defaultProps = {
//     page: 'Dashboard'
// }

export default function NavBar(props) {
    const imgRef = useRef();
    const textRef = useRef();
    const [logoOffsetLeft, setLogoOffsetLeft] = useState(null);
    const [textOffsetLeft, setTextOffsetLeft] = useState(null);
    const [itemSelected, setItemSelected] = useState(pageKeys[props.page]);
    let navigate = useNavigate();

    
    useEffect(() => {
        window.addEventListener("resize", getPosition);
        getPosition();
    }, []);
    /**
     * Find and apply logo offset and text offset
     */
    const getPosition = () => {
        setLogoOffsetLeft(imgRef.current.offsetLeft);
        setTextOffsetLeft(textRef.current.offsetLeft);
    }

    let menuItemStyle = {
        marginTop: '20px',
        marginLeft: logoOffsetLeft + 14,
        padding: '0 15px',
    };

    let menuItemLast = {
        marginTop: '20px',
        marginLeft: logoOffsetLeft + 14,
        padding: '0 15px',
        marginBottom: '40px',
    }

    /**
     * navigation and set item selected
     * @param {*} e 
     */
    const itemSelect = (e) =>{
        setItemSelected(e.key);
        const pageName = getKeyByValue(pageKeys, e.key);
        navigate(`/users/${pageName}`);
    }
    

    return (
    <>
            <Sider id="Dashboard_sider">
                <HeaderLogo id="Header_container" onClick={() => (navigate('/'))}>
                    <TopLogo src={logo} alt="logo" ref={imgRef}/>
                    <LogoText ref={textRef}>G'Tracker</LogoText>
                </HeaderLogo>
                {
                    (textOffsetLeft&& logoOffsetLeft)?
                (<MainMenuContainer>
                    <Menu id = "menu" defaultSelectedKeys={itemSelected} onSelect={(e) => itemSelect(e)} style={{left:'-40px', width:'100%', position:'relative', display: 'block', marginBottom: '20px', padding: '5px 25px'}}>
                    <Menu.Item style={{ marginLeft:`${logoOffsetLeft}px`, fontWeight: 'bolder', pointerEvents: 'none'}} key="200"  >
                            <b style={{ fontWeight: '700', fontSize:'16px'}}>Main Menu</b>
                    </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='1' src={(itemSelected === '1') ? (dashboardLogoSelected): (dashboardLogo) } size={textOffsetLeft - logoOffsetLeft - 42} />} style={menuItemStyle} key="1">
                            Dashboard
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='2' src={(itemSelected === '2') ? (resultsLogoSelected): (resultsLogo) } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemStyle} key="2">
                            Results
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='3' src={(itemSelected === '3') ? (analyticsLogoSelected): (analyticsLogo) } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemStyle} key="3">
                            Analytics
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='4' src={(itemSelected === '4') ? (rankingLogoSelected): (rankingLogo) } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemLast} key="4">
                            Ranking
                        </Menu.Item>
                        <Menu.Item style={{ marginLeft:`${logoOffsetLeft}px`, fontWeight: 'bolder', pointerEvents: 'none'}} key="100">
                            <b style={{ fontWeight: '700', fontSize:'16px'}}>Others</b>
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='5' src={(itemSelected === '5') ? (profileLogoSelected): (profileLogo) } size={textOffsetLeft - logoOffsetLeft - 42} />} style={menuItemStyle} key="5">
                            Profile
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='6' src={(itemSelected === '6') ? (settingsLogoSelected): (settingsLogo) } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemStyle} key="6">
                            Settings
                        </Menu.Item>
                    </Menu>
                </MainMenuContainer>) : (<></>)
            }
            </Sider>
    </>
  );

}