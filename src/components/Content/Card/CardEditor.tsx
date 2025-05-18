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
import ImageSearchDialog from './imageSearchDialog';

export interface EditCardData {
  id?: string;
  name: string;
  image: string;
  sound?: string;
  category: string;
}

interface CardEditorProps {
  card: EditCardData;
  cardRect: DOMRect;
  closeEditor: () => void;
}

function CardEditor({ card, cardRect, closeEditor }: CardEditorProps) {
  const [cardtoUpdate, setCardtoUpdate] = useState<EditCardData>(card);
  const { id, name, image } = cardtoUpdate;
  const { categories } = useCardContext();
  const [isFocused, setIsFocused] = useState(false);
  const { updateCard, createCard, CardSnack } = useCardContext();
  const inputImgRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUpdate, setIsUpdate] = useState<{ response?: ApiResponse<unknown>; loading: boolean } | null | undefined>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (openDialog) {
      return
    }
  }, [openDialog]);

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

  async function attCard(id: string | undefined, cardAtt: EditCardData) {
    console.log(cardAtt);
    if (cardAtt === card) return closeEditor()

    setIsUpdate({ loading: true });
    const response = id ? await updateCard(id, cardAtt) : await createCard(cardAtt);
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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
          layoutId={`card-${id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.5 }
          }}
        />
        <Box component="form" onSubmit={(event) => {
          event.preventDefault()
          attCard(id, cardtoUpdate)
        }} >
          <FormControl
            disabled={isUpdate?.loading}
            variant="outlined" sx={{ display: 'contents' }}>
            <motion.div
              style={{ opacity: 1, zIndex: 100 }}
              className="flex flex-col items-center justify-around"
              initial={{
                top: cardRect.top,
                left: cardRect.left,
                width: cardRect.width,
                height: cardRect.height,
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
                top: cardRect.top,
                left: cardRect.left,
                width: cardRect.width,
                height: cardRect.height,
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
                <span className="flex text-white text-[4vh] top-0">{id ? "Editar" : "Novo Card"}</span>
              </motion.div>
              <motion.div
                layout
                className="editCard"
                initial={{
                  top: '0',
                  width: cardRect.width,
                  height: cardRect.height,
                  position: 'absolute',
                }}
                animate={{
                  top: '0',
                  width: '40vh',
                  height: '50vh',
                  position: 'relative',
                }}
                exit={{
                  width: cardRect.width,
                  height: cardRect.height,
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
                  <SpeedDial
                    FabProps={{ disabled: isUpdate?.loading }}
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                    icon={<SpeedDialIcon />}
                    direction='down'
                  >
                    <SpeedDialAction
                      key={"URL"}
                      tooltipTitle={"URL"}
                      icon={<Icon icon="solar:link-bold" width="100%" height="70%" />}
                      onClick={() => setOpenDialog(true)}
                    >
                    </SpeedDialAction>
                    <SpeedDialAction
                      key={"Arquivos"}
                      onClick={() => inputImgRef.current?.click()}
                      tooltipTitle={"Arquivos"}
                      icon={<Icon icon="solar:archive-bold" width="100%" height="70%" />}
                    />
                    <VisuallyHiddenInput
                      ref={inputImgRef}
                      type="file"
                      // onChange={(event) => setCardtoUpdate(prev => ({...prev, image: event.target.files}))}
                      multiple
                    />
                  </SpeedDial>
                  <div className="flex relative h-full w-full rounded-inherit pointer-events-none">
                    {image && (
                      <img src={image} alt={name} className="flex relative h-full w-full rounded-inherit pointer-events-none" />
                    )}
                  </div>
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
                        setCardtoUpdate(prev => ({ ...prev, name: event.target.value }))
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
                <Autocomplete
                  disabled={isUpdate?.loading}
                  sx={{ width: '100%', justifyContent: 'center' }}
                  freeSolo
                  disableCloseOnSelect={false}
                  options={categories.map((category) => category)}
                  value={cardtoUpdate?.category || ''}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      const valueTrimmed = newValue.trim();
                      setCardtoUpdate(prev => ({ ...prev, category: valueTrimmed }))
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Categoria"
                      variant="outlined"
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.toLowerCase();
                      }}
                      onBlur={(e) => {
                        const typedValue = e.target.value.trim();
                        if (typedValue) {
                          setCardtoUpdate(prev => ({
                            ...prev,
                            category:typedValue
                          }));
                        }
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: '2.5vh',
                          top: '-3px',
                          '&.Mui-focused': {
                            color: 'white',
                            backgroundColor: '#155dfc',
                            top: '5px',
                            left: '-3px',
                            borderRadius: '32px',
                            paddingX: '15px',
                            fontSize: '2.2vh',
                          },
                          '&.MuiInputLabel-shrink:not(.Mui-focused)': {
                            color: 'white',
                            backgroundColor: 'gray',
                            top: '5px',
                            left: '-3px',
                            borderRadius: '32px',
                            paddingX: '15px',
                            fontSize: '2.2vh',
                          },
                          '&.MuiInputLabel-shrink:hover': {
                            color: 'white',
                            backgroundColor: '#155dfc',
                          },
                        },
                        '& .MuiOutlinedInput-root': {
                          fontWeight: 'bold',
                          backgroundColor: 'white',
                          borderRadius: '32px',
                          '& fieldset': {
                            border: '1px solid gray',
                          },
                          '&:hover fieldset': {
                            border: '1px solid #155dfc',
                          },
                          '&.Mui-focused fieldset': {
                            border: '1px solid #155dfc',
                          },
                        },
                      }}
                    />
                  )}
                />
              </motion.div>
              <motion.div className="flex h-[7%] w-full bg-gray-100 rounded-4xl items-center"
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
                  top: "-50%",
                  opacity: 0,
                  scaleX: 0,
                  position: 'relative',
                  transition: { delay: 0.1 }
                }}
                transition={{
                  duration: 0.9,
                  ease: easeInOut
                }}>
                <Button
                  disabled={isUpdate?.loading}
                  variant="contained"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    height: '110%',
                    aspectRatio: '1 / 1',
                    borderRadius: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <Icon icon="solar:microphone-large-bold" width="100%" height="70%" />
                </Button>
                <div className='flex w-full justify-center text-sm'>Nenhum audio selecionado</div>
                <SpeedDial
                  FabProps={{ disabled: isUpdate?.loading }}
                  ariaLabel="Menu de adicionar som"
                  sx={{ position: 'absolute', right: 0 }}
                  icon={<SpeedDialIcon />}
                  direction='left'
                >
                  <SpeedDialAction
                    key={"URL"}
                    tooltipTitle={"URL"}
                    icon={<Icon icon="solar:link-bold" width="100%" height="70%" />}
                  />
                  <SpeedDialAction
                    key={"Arquivos"}
                    tooltipTitle={"Arquivos"}
                    icon={<Icon icon="solar:archive-bold" width="100%" height="70%" />}
                  />
                </SpeedDial>
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
        <ImageSearchDialog open={openDialog} onClose={() => setOpenDialog(false)} onSelect={(img) => setCardtoUpdate(prev => ({ ...prev, image: img }))} />
        {CardSnack()}
      </>
    </LayoutGroup >
  );
}

export default CardEditor;
