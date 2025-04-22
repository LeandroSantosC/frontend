import { motion, easeInOut, AnimatePresence, LayoutGroup } from 'framer-motion';
import { CardData } from './Card';
import './Card.css';
import { useCardContext } from '../../../context/CardContext';
import Box from '@mui/material/Box';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

interface CardEditorProps {
  card: CardData;
  cardRect: DOMRect;
  closeEditor: () => void;
}

function CardEditor({ card, cardRect, closeEditor }: CardEditorProps) {
  const { id, name, image, category } = card;
  const { categories } = useCardContext();
  const actions = [
    { icon: "", name: 'Copy' },
    { icon: "", name: 'Save' },
  ];

  return (
    <LayoutGroup>
      <>
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center z-50"
          onClick={closeEditor}
          layout
          layoutId={`card-${id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.5 }
          }}
        />

        <motion.div
          style={{ opacity: 1, zIndex: 100 }}
          className="flex flex-col items-center justify-around"
          layout
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
            <span className="flex text-white text-[4vh] top-0">Editar</span>
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
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: 'absolute', top: 10 , right: 10 }}
                  icon={<SpeedDialIcon />}
                  direction='down'
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              <img src={image} alt={name} className="flex relative h-full w-full rounded-inherit pointer-events-none" />
              <input
                className="flex justify-center items-center h-[15%] text-center text-[200%] font-bold outline-none"
                defaultValue={name}
              />
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
            <select className="flex outline-none border-none h-full w-full bg-gray-100 rounded-4xl font-bold text-center text-[150%] " defaultValue={category.name}>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
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
            <button className='flex absolute h-[110%] rounded-4xl bg-blue-600 aspect-square'></button>
            <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: 'absolute', right: 0 }}
                  icon={<SpeedDialIcon />}
                  direction='left'
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
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
            <button className='flex absolute h-full rounded-4xl bg-blue-500 w-[45%]'></button>
            <button className='flex absolute h-full right-0 rounded-4xl bg-red-500 w-[45%]'></button>
          </motion.div>
          <div className="flex h-[7%] w-full bg-transparent rounded-4xl items-center pointer-events-none"></div>

          {/* Restante da UI de edição (selects, botões, etc) */}
        </motion.div>
      </>
    </LayoutGroup>
  );
}

export default CardEditor;
