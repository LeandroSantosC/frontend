import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useMainBoardContext, VerbalTimeEnum } from "../../context/MainboardContext";
import { useRef, useState } from "react";


function TimeButton() {
  const { setVerbalTime, verbalTime } = useMainBoardContext();
  const [ openMenu, setOpenMenu ] = useState(false);
  const ref = useRef(null);


  return (
    <Box sx={{ position: 'relative',
        height:'100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        aspectRatio: '1/1',
        width: 'auto',
        display: 'flex',
        borderRadius: '50%',
        minWidth: 0,
        padding: 0,
        minHeight: 0,
        transition: 'ease-in-out 0.5s',
        color: 'white',
    }}>
        <Tooltip title={"Tempo Verbal "} placement="top">
          <IconButton onClick={() => setOpenMenu(!openMenu)} sx={{ p: 0, color: 'white', justifyContent:'center',
            height: '100%', width: '100%',
            alignItems: 'center'
            }}>
            <img
            src={verbalTime == VerbalTimeEnum.FUTURO_DO_PRESENTE ? "/future.png" : verbalTime == VerbalTimeEnum.PRETERITO_PERFEITO ? "/past.png" : "/present.png"}
            ref={ref}
            />
          </IconButton>
        </Tooltip>
    <Menu 
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
          open={openMenu}
          onClose={() => setOpenMenu(false)}>
        <MenuItem onClick={() => {
            setVerbalTime(VerbalTimeEnum.PRETERITO_PERFEITO)
            setOpenMenu(false)
            }}>Passado</MenuItem>
        <MenuItem onClick={() => {
            setVerbalTime(VerbalTimeEnum.PRESENTE)
            setOpenMenu(false)
            }}>Presente</MenuItem>
        <MenuItem onClick={() => {
            setVerbalTime(VerbalTimeEnum.FUTURO_DO_PRESENTE)
            setOpenMenu(false)
            }}>Futuro</MenuItem>
    </Menu>
    </Box>
  );
}

export default TimeButton;