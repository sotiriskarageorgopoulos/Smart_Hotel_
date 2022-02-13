/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link, useNavigate} from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { customerChoices } from './customerChoices';
import { adminChoices } from './adminChoices';
import { receptionistChoices } from './receptionistChoices';
import { settingsChoices } from './settingsChoices';
import { ChatText } from 'react-bootstrap-icons';
import './navbar.css';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const login = JSON.parse(localStorage.getItem('login'))
  let pages = []


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const doLogout = () => {
    setAnchorElUser(null);
    localStorage.clear()
    navigate('/')
  };
  
  if(login?.category !== undefined) {
    if(login.category === 'customer') {
      pages = customerChoices
    }else if(login.category === 'administrator') {
      pages = adminChoices
    }else if(login.category === 'receptionist') {
      pages = receptionistChoices
    }

    return(
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
              <Link to={pages[0].path} className="nav-link">
                {pages[0].name}
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) =>{
                  if(page.name !== 'Message' && page.name !== 'Smart Hotel') {
                    return (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link to={page.path} className="nav-link"><Typography textAlign="center">{page.name}</Typography></Link>
                      </MenuItem>
                    )
                  }else if(page.name !== 'Smart Hotel') {
                    return (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link to={page.path} className="nav-link"><Typography textAlign="center"><ChatText size={20} /></Typography></Link>
                      </MenuItem>
                    )
                  }
                })}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Smart Hotel
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) =>{
                  if(page.name !== 'Message' && page.name !== 'Smart Hotel') {
                    return (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link to={page.path} className="nav-link"><Typography textAlign="center">{page.name}</Typography></Link>
                      </MenuItem>
                    )
                  }else if(page.name !== 'Smart Hotel'){
                    return (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link to={page.path} className="nav-link"><Typography textAlign="center"><ChatText size={20} /></Typography></Link>
                      </MenuItem>
                    )
                  }
              })}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={login.name+" "+login.surname} src={login.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settingsChoices.map((setting) => {
                  if(setting.name === 'Profile'){
                    return(
                      <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                        <Link to={setting.path} className="settings"><Typography textAlign="center">{setting.name}</Typography></Link>
                      </MenuItem>
                    )
                  }else {
                    return(
                      <MenuItem key={setting.name} onClick={doLogout}>
                        <Typography textAlign="center" className="settings">{setting.name}</Typography>
                      </MenuItem>
                    )
                  }
                  })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  } else {
    return (
      <Box>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="menu"
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="nav-link">
                Smart Hotel
              </Link>
            </Typography>
            <Link className="nav-link" to="/register"><Button color="inherit">Register</Button></Link>
          </Toolbar>
        </AppBar>
      </Box>
      )
  }
}

export default Navbar