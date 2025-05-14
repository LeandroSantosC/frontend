import { motion, easeInOut, LayoutGroup } from 'framer-motion';
import './Card.css';
import { useCardContext } from '../../../context/CardContext';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Autocomplete, Button, CircularProgress, FormControl, IconButton, styled, TextField } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';
import { ApiResponse } from '../../../services/api/request';
import { BoardData, NewBoardData } from './Board';
import { useBoardContext } from '../../../context/BoardContext';

interface CardEditorProps {
  board: NewBoardData;
  boardRect: DOMRect;
  closeEditor: () => void;
}

function CardEditor({ board, boardRect, closeEditor }: CardEditorProps) {
  const [boardtoUpdate, setBoardtoUpdate] = useState<NewBoardData>(board);
  const { id, name, cards } = boardtoUpdate;
  const [isFocused, setIsFocused] = useState(false);
  const { updateBoard, createBoard, BoardSnack } = useBoardContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUpdate, setIsUpdate] = useState<{ response?: ApiResponse<unknown>; loading: boolean } | null | undefined>(null);

  useEffect(() => {
    if (!isUpdate || isUpdate.loading) return;
    console.log("isUpdate tem algo: " + " response: " + isUpdate.response?.response + " error: " + isUpdate.response?.error + " success: " + isUpdate.response?.success + " Loading: " + isUpdate.loading)
    const timeoutId = setTimeout(() => {

      if (isUpdate.response?.success) {
        closeEditor();
      }
      setIsUpdate(null);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [isUpdate, closeEditor]);

  async function attCard(id: string | undefined, boardAtt: NewBoardData) {
    console.log(boardAtt);
    if (boardAtt === board) return closeEditor()

    setIsUpdate({ loading: true });
    const response = id ? await updateBoard(id, boardAtt) : await createBoard(boardAtt);
    console.log("passou o await, response:" + response.response + ", success: " + response.success + ", error: " + response.error)

    setIsUpdate({ response, loading: false })
  }

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <LayoutGroup>
      <>
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center z-50"
          style={{backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
          backgroundRepeat: 'no-repeat',}}
          onClick={() => isUpdate?.loading ? null : closeEditor()}
          layout
          layoutId={`board-${id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.5 }
          }}
        />
        <Box component="form" onSubmit={(event) => {
          event.preventDefault()
          attCard(id, boardtoUpdate)
        }} >
          <FormControl
            disabled={isUpdate?.loading}
            variant="outlined" sx={{ display: 'contents' }}>
            <motion.div
              style={{ opacity: 1, zIndex: 100 }}
              className="flex flex-col items-center justify-around"
              initial={{
                top: boardRect.top,
                left: boardRect.left,
                width: boardRect.width,
                height: boardRect.height,
                position: 'absolute',
              }}
              animate={{
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                width: '40vh',
                height: '100vh',
                zIndex: 100,
              }}
              exit={{
                top: boardRect.top,
                left: boardRect.left,
                width: boardRect.width,
                height: boardRect.height,
                transform: 'translate(0, 0)',
                position: 'absolute',
                transition: { delay: 0.5 }
              }}
              transition={{
                duration: 0.5,
                ease: easeInOut
              }}
            >
              <motion.div className='flex h-[7%] w-full bg-blue-500 rounded-4xl items-center justify-center'
                layout
                initial={{
                  top: '50%',
                  opacity: 0,
                  scaleX: 0,
                  position: 'absolute',
                }}
                animate={{
                  top: 0,
                  opacity: 1,
                  scaleX: 1,
                  position: 'relative',
                }}
                exit={{
                  top: '20%',
                  opacity: 0,
                  scaleX: 0,
                  position: 'relative',
                }}
                transition={{
                  duration: 0.7,
                  ease: easeInOut
                }}>
                <span className="flex text-white text-[4vh] top-0">{id ? "Editar" : "Nova Prancha"}</span>
              </motion.div>
              <motion.div
                layout
                className="editCard"
                initial={{
                  top: '0',
                  width: boardRect.width,
                  height: boardRect.height,
                  position: 'absolute',
                }}
                animate={{
                  top: '0',
                  width: '40vh',
                  height: '50vh',
                  position: 'relative',
                }}
                exit={{
                  width: boardRect.width,
                  height: boardRect.height,
                  position: 'absolute',
                  transform: 'translate(0, 0)',
                  transition: { delay: 0.5 }
                }}
                transition={{
                  duration: 0.5,
                  ease: easeInOut
                }}
              >
                <div className="flex flex-col items-center h-full w-full">
                  <div className='flex h-[15%] items-center w-full relative'>
                    <input
                      required
                      disabled={isUpdate?.loading}
                      ref={inputRef}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.toLowerCase();
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="flex justify-center w-full items-center h-[90%] self-start text-center text-[200%] font-bold outline-none"
                      defaultValue={name}
                      onChange={(event) => {
                        setBoardtoUpdate(prev => ({ ...prev, name: event.target.value }))
                      }}
                    />
                    <IconButton
                      disabled={isUpdate?.loading}
                      onClick={handleIconClick}
                      sx={{
                        display: 'flex',
                        height: '100%',
                        width: 'auto',
                        position: 'absolute',
                        right: '5px',
                        color: isFocused ? 'primary.main' : 'grey.400',
                        transform: isFocused ? 'rotate(-45deg)' : 'rotate(0deg)',
                        transition: 'ease-in-out 0.3s',
                        borderRadius: 5,
                        aspectRatio: '1 / 1',
                        '&:hover': {
                          backgroundColor: isFocused ? 'transparent' : 'grey.500',
                        },
                      }}
                    ><Icon icon="solar:pen-bold" width="100%" height="80%" /></IconButton>
                  </div>
                </div>
              </motion.div>
              <motion.div className='flex h-[7%] w-full rounded-4xl items-center'
                layout
                initial={{
                  top: "-50%",
                  opacity: 0,
                  scaleX: 0,
                  position: 'absolute',
                }}
                animate={{
                  top: 0,
                  opacity: 1,
                  scaleX: 1,
                  position: 'relative',
                }}
                exit={{
                  top: "-30%",
                  opacity: 0,
                  scaleX: 0,
                  position: 'relative',
                  transition: { delay: 0.2 }
                }}
                transition={{
                  duration: 0.7,
                  ease: easeInOut
                }}>
                <motion.button className='flex absolute h-full rounded-4xl bg-blue-600 aspect-square'></motion.button>
              </motion.div>
              <motion.div className="flex h-[7%] w-full bg-transparent rounded-4xl items-center"
                layout
                initial={{
                  top: '-50%',
                  opacity: 0,
                  scaleX: 0,
                  position: 'absolute',
                }}
                animate={{
                  top: '0',
                  opacity: 1,
                  scaleX: 1,
                  position: 'relative',
                }}
                exit={{
                  top: '-50%',
                  opacity: 0,
                  scaleX: 0,
                  position: 'relative',
                  transition: { duration: 0.7 }
                }}
                transition={{
                  duration: 1.1,
                  ease: easeInOut
                }}>
                <Box position="relative" width="45%" height="100%">
                  <Button
                    type='submit'
                    variant="contained"
                    disabled={isUpdate?.loading ?? false}
                    color={isUpdate ? (isUpdate.response?.success ? "success" : "error") : "primary"}
                    fullWidth
                    sx={{
                      position: 'absolute',
                      height: '100%',
                      borderRadius: '32px',
                      justifyContent: 'center',
                      padding: 0,
                      minWidth: 0,
                      '&.Mui-disabled': {
                        backgroundColor: isUpdate?.loading ? '#6a7282' : '#e02c30',
                        color: 'transparent',
                      },
                      '& .MuiCircularProgress-root': {
                        scale: 1.5,
                        color: 'white', // muda a cor do spinner
                      }
                    }}
                  >
                    {isUpdate?.loading ? <CircularProgress color="inherit" size="20px" /> :
                    <Icon icon={isUpdate ? (isUpdate.response?.success ? "solar:like-bold" : "solar:dislike-bold") : "solar:diskette-bold"} width="100%" height="70%" />}
                  </Button>
                </Box>
                <Button
                  disabled={isUpdate?.loading}
                  variant="contained"
                  color="error"
                  onClick={closeEditor}
                  sx={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    width: '45%',
                    borderRadius: '32px',
                    justifyContent: 'center',
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <Icon icon="solar:close-circle-bold" width="100%" height="70%" />
                </Button>
              </motion.div>
              <div className="flex h-[7%] w-full bg-transparent rounded-4xl items-center pointer-events-none"></div>
            </motion.div>
          </FormControl>
        </Box>
        {BoardSnack()}
      </>
    </LayoutGroup >
  );
}

export default CardEditor;
