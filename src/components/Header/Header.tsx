import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Badge, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Switch, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { useCardContext } from "../../context/CardContext";

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

const StyledBadge = styled(Badge)<{ online: boolean }>(({ theme, online }) => ({
  zIndex: 0,
  '& .MuiBadge-badge': {
    backgroundColor: online ? '#44b700' : 'red',
    color: online ? '#44b700': 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { isPublicCard, setPublicCard } = useCardContext();

  const openMenu = () => {
    if (user) {
      setOpen(true);
    }
    else {
      navigate('/?login=true')
    }
  }

  return (
    <header className="flex items-center justify-center bg-blue-500 text-white p-2 h-[5%] w-full">
      <h1 className="text-3xl">MATRACA</h1>
      <Box sx={{ position: 'absolute', right: 9 }}>
        <Tooltip title="Logar">
          <IconButton onClick={openMenu} sx={{ p: 0, color: 'white' }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              online={!!user}
            >
              <Icon icon="solar:user-bold" width="32px" height="32px" ref={ref} />
            </StyledBadge>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 6,
              marginTop: 1,
              minWidth: 200,
              '& .MuiMenu-list': {
                padding: '5px 0',
                justifyItems: "center"
              },
              '& .MuiMenuItem-root': {
                gap: 2,
                fontSize: 25,
                textAlign: 'center',
                width: '100%',
                '&:active': {
                },
              },
            }
          }}
          id="menu-appbar"
          anchorEl={ref.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <MenuItem>
            <ListItemIcon>
              <Icon icon="solar:user-bold" width="32px" height="32px" />
            </ListItemIcon>
            {user?.fullname}
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Icon icon="solar:user-bold" width="32px" height="32px" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          {user?.credentials.role == 'ADMIN' ? 
          <MenuItem>
            <ListItemIcon>
              <Icon icon="solar:user-bold" width="32px" height="32px" />
            </ListItemIcon>
            Botões Públicos
            <Switch 
            checked={isPublicCard}
            onChange={(_, checked) => setPublicCard(checked)}
            />
          </MenuItem> : null }
          <Divider sx={{ my: 0.5 }} />
          <MenuItem>
            <ListItemIcon>
              <Icon icon="solar:settings-bold" width="32px" height="32px" />
            </ListItemIcon>
            Layout
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Icon icon="solar:volume-loud-bold" width="32px" height="32px" />
            </ListItemIcon>
            Voz
          </MenuItem>
        </Menu>
      </Box>
    </header>
  );
}

export default Header;