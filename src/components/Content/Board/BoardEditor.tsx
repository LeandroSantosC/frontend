import { motion, easeInOut, LayoutGroup } from 'framer-motion';
import { v4 as uuidv4 } from "uuid";
import '../Card/Card.css';
import './Board.css';
import Box from '@mui/material/Box';
import { Button, CircularProgress, FormControl, IconButton, useMediaQuery } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';
import { ApiResponse } from '../../../services/api/request';
import { NewBoardData } from './Board';
import { useBoardContext } from '../../../context/BoardContext';
import { useCardContext } from '../../../context/CardContext';

interface CardEditorProps {
  board: NewBoardData;
  boardRect: DOMRect;
  closeEditor: () => void;
}

function BoardEditor({ board, boardRect, closeEditor }: CardEditorProps) {
  const { cards } = useCardContext();
  const [boardtoUpdate, setBoardtoUpdate] = useState<NewBoardData>(board);
  const { id, name, button: boardCards } = boardtoUpdate;
  const [isFocused, setIsFocused] = useState(false);
  const { updateBoard, createBoard } = useBoardContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUpdate, setIsUpdate] = useState<{ response?: ApiResponse<unknown>; loading: boolean } | null | undefined>(null);
  const isSmall = useMediaQuery('(max-width: 600px)');
  const isMedium = useMediaQuery('(min-width: 601px) and (max-width: 900px)');

  const qntCards = isSmall ? 3 :
    isMedium ? 6 : 7

  useEffect(() => {
    if (!isUpdate || isUpdate.loading) return;
    console.log("isUpdate tem algo: " + " response: " + isUpdate.response?.response + " error: " + isUpdate.response?.error + " success: " + isUpdate.response?.success + " Loading: " + isUpdate.loading)
    const timeoutId = setTimeout(() => {

      if (isUpdate.response?.success) {
        closeEditor();
      }
      setIsUpdate(null);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [isUpdate, closeEditor]);

  async function attBoard(id: string | undefined, boardAtt: NewBoardData) {
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

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <LayoutGroup>
      <>
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center z-50"
          style={{
            backgroundImage:
              'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            backgroundRepeat: 'no-repeat',
          }}
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
          attBoard(id, boardtoUpdate)
        }}
          sx={{ overflow: 'hidden', height: '100vh' }}
        >
          <FormControl
            disabled={isUpdate?.loading}
            variant="outlined" sx={{ display: 'contents', overflow: 'hidden' }}>
            <motion.div
              style={{ opacity: 1, zIndex: 100 }}
              className="flex flex-col items-center justify-around gap-4 my-0 h-full overflow-hidden"
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
                width: isMobile ? '90vw' : '70vw',
                height: '95vh',
                overflow: 'hidden',
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
                  top: '50%',
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
              <div className="flex flex-col h-[80%] w-full bg-transparent items-center justify-center grow-0 shrink-0">
                <motion.div
                  layout
                  initial={{
                    width: '100%',
                    height: '30vh',
                    opacity: 0,
                    position: 'absolute',
                    top: '0',
                  }}
                  animate={{
                    height: '70%',
                    opacity: 1,
                    position: 'relative',
                  }}
                  exit={{
                    width: '100%',
                    height: '30vh',
                    opacity: 0,
                    position: 'absolute',
                    top: "50%",
                  }}
                  transition={{
                    duration: 0.7,
                    ease: easeInOut
                  }}
                  className="flex w-full h-full grow-0 overflow-x-visible scrollbar-hide p-2 overflow-y-auto flex-row justify-start items-start gap-2 flex-wrap">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="card"
                      style={{width: `calc((100% - ${(qntCards - 1) * 8}px) / ${qntCards})`}}
                      onClick={() => setBoardtoUpdate(prev => ({ ...prev, button: [...prev.button, { ...card, tempId: uuidv4() }] }))}
                    >
                      <div
                        className="flex flex-col items-center h-full w-full m-0 p-0"
                      >
                        <img src={card.image} alt={card.name} className="flex relative h-full w-full rounded-inherit pointer-events-none" />
                        <div className="flex justify-center items-center h-[15%] w-fit">
                          <span className="pointer-events-none overflow-hidden text-center text-nowrap whitespace-nowrap font-bold text-[110%]">{card.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  layout
                  initial={{
                    top: '0',
                    width: boardRect.width,
                    height: boardRect.height,
                    position: 'absolute',
                  }}
                  animate={{
                    bottom: '0',
                    width: '100%',
                    height: '30%',
                    position: 'relative',
                    flexGrow: 0,
                    zIndex: 100,
                  }}
                  exit={{
                    top: '0',
                    width: boardRect.width,
                    height: boardRect.height,
                    position: 'absolute',
                    transition: { delay: 0.5 }
                  }}
                  transition={{
                    duration: 0.5,
                    ease: easeInOut
                  }}
                  className="bg-[#f0f0f0] shadow-[0px_0.15rem_1rem_1px] flex flex-col grow-0 items-center h-[30%] w-full m-0 p-0 rounded-xl overflow-clip">
                  <div className="flex flex-row items-center justify-evenly w-full h-[80%] m-0 p-1 overflow-y-auto scrollbar-hide gap-1">
                    {boardCards.map((card) => (
                      <div className="card"
                        key={card.tempId}
                        style={{ height: '100%', width: 'auto' }}
                        onClick={() => setBoardtoUpdate(prev => ({ ...prev, button: prev.button.filter((c) => c.tempId !== card.tempId) }))}
                      >
                        <img src={card.image} alt={card.name} className="flex relative h-[80%] w-full aspect-square pointer-events-none" />
                        <div className="flex justify-center">
                          <span className="pointer-events-none">{card.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='flex h-[20%] items-center w-full relative'>
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
                      className="flex justify-center w-full items-center h-[90%] self-start text-center text-[170%] font-bold outline-none"
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
                    ><Icon icon="solar:pen-bold" width="100%" height="100%" /></IconButton>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="flex h-[7%] w-full bg-transparent rounded-4xl items-center justify-center gap-[10%]"
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
                <Box position="relative" width={isMobile ? '45%' : '300px'} height="100%">
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
                    position: 'relative',
                    right: 0,
                    height: '100%',
                    width: isMobile ? '45%' : '300px',
                    borderRadius: '32px',
                    justifyContent: 'center',
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <Icon icon="solar:close-circle-bold" width="100%" height="70%" />
                </Button>
              </motion.div>
              {/* <div className="flex h-[5%] w-full bg-transparent rounded-4xl items-center pointer-events-none"></div> */}
            </motion.div>
          </FormControl>
        </Box>
      </>
    </LayoutGroup >
  );
}

export default BoardEditor;
