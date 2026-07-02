'use client'

import { motion } from 'framer-motion'

const photos = [
  '/images/belaisa-photo-back1.png',
  '/images/belaisa-photo-back2.png',
  '/images/belaisa-photo-back3.png',
  '/images/belaisa-photo-back4.png',
  '/images/belaisa-photo-back5.png',
  '/images/belaisa-photo-back6.png',
  '/images/belaisa-photo-back7.png',
  '/images/belaisa-photo-back8.png',
  '/images/belaisa-photo-back9.png',
  '/images/belaisa-photo-back10.png',
  '/images/belaisa-photo-back11.png',
  '/images/belaisa-photo-back12.png',
  '/images/belaisa-photo-back13.png',
  '/images/belaisa-photo-back14.png',
]

  const positions = [
    { top: '1%',   left: '-5%',  size: 170, delay: 0,   duration: 8  }, //1
    { top: '3%',   left: '80%',  size: 140, delay: 1,   duration: 7  }, //2
    { top: '14%',  left: '-2%',  size: 105, delay: 3,   duration: 9  }, //3
    { top: '9%',  left: '72%',  size: 400, delay: 1.5, duration: 11 }, //4
    { top: '28%',  left: '-6%',  size: 160, delay: 4,   duration: 8  }, //5
    { top: '26%',  left: '75%',  size: 220, delay: 0.5, duration: 9  }, //6
    { top: '41%',  left: '-3%',  size: 175, delay: 2.5, duration: 7  }, //7
    { top: '42%',  left: '85%',  size: 155, delay: 3.5, duration: 10 }, //8
    { top: '55%',  left: '14%',  size: 110, delay: 1,   duration: 8  }, //9
    { top: '53%',  left: '72%',  size: 220, delay: 2,   duration: 9  }, //10
    { top: '61%',  left: '-4%',  size: 165, delay: 0,   duration: 10 }, //11
    { top: '70%',  left: '57%',  size: 145, delay: 3,   duration: 7  }, //12
    { top: '78%',  left: '-1%',  size: 155, delay: 1.5, duration: 9  }, //13
    { top: '88%',  left: '70%',  size: 110, delay: 2.5, duration: 8  }, //14
  ]

export default function FloatingPhotos() {
  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-0"
          style={{ top: pos.top, left: pos.left }}
          animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: pos.duration, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
        >
          <img
            src={photos[i % photos.length]}
            alt=""
            style={{ width: pos.size, height: pos.size, opacity: 0.22 }}
            className="object-contain rounded-xl"
          />
        </motion.div>
      ))}
    </>
  )
}