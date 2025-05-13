import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Slider, styled, Switch, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { useCardContext } from "../../context/CardContext";
import { Collapse } from "@mui/material";
import VoiceSelector from "./VoiceSelector";

const StyledBadge = styled(Badge)<{ online: boolean }>(({ theme, online }) => ({
  zIndex: 0,
  '& .MuiBadge-badge': {
    backgroundColor: online ? '#44b700' : 'red',
    color: online ? '#44b700' : 'red',
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
  const { user, logout, setUser } = useAuth();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { isPublicCard, setPublicCard } = useCardContext();
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

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
          <Typography
            variant="h5"
            component="div"
            sx={{
              position: 'relative',
            }}
          >
            {user?.fullname}
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem>
            <ListItemIcon>
              <Icon icon="solar:user-bold" width="32px" height="32px" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          {user?.credentials?.role == 'ADMIN' ?
            <MenuItem
              onClick={() => {
                setPublicCard(!isPublicCard)
              }}
            >
              <ListItemIcon>
                <Icon icon="solar:pen-new-square-bold" width="32px" height="32px" />
              </ListItemIcon>
              Botões Públicos
              <Switch
                checked={isPublicCard}
                onChange={(_, checked) => setPublicCard(checked)}
              />
            </MenuItem> : null}
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => setLayoutOpen(!layoutOpen)}
          >
            <ListItemIcon>
              <Icon icon="solar:settings-bold" width="32px" height="32px" />
            </ListItemIcon>
            Layout
            <Icon icon={ layoutOpen ? "solar:alt-arrow-down-bold" : "solar:alt-arrow-left-bold"} style={{position: 'absolute', right: 30}} width="28" height="28" />
          </MenuItem>
          <Collapse in={layoutOpen} timeout="auto" unmountOnExit sx={{ width: '100%',
            alignItems: 'center',
            justifyContent: 'center' }}>
            <Box px={2} py={1}>
              <Slider
              sx={{ width: '100%' }}
                aria-label="layout-slider"
                value={user?.layoutScale || 0}
                onChange={(_, value) =>
                  setUser(prev => prev ? { ...prev, layoutScale: value as number } : prev)
                }
                valueLabelDisplay="auto"
                marks
                min={0.5}
                max={6}
                step={0.5}
              />
            </Box>
          </Collapse>
          <MenuItem
          onClick={() => setVoiceOpen(true)}
          >
            <ListItemIcon>
              <Icon icon="solar:volume-loud-bold" width="32px" height="32px" />
            </ListItemIcon>
            Voz
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon icon="solar:logout-3-bold" width="32px" height="32px" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Box>
      <VoiceSelector voiceOpen={voiceOpen} setVoiceOpen={setVoiceOpen} />
    </header>
  );
}

export default Header;