import { useState, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function AccordionItem({ q, a, open, onToggle }) {
  const id = useId()

  return (
    <div className={`accordion__item ${open ? 'accordion__item--open' : ''}`}>
      <button
        type="button"
        className="accordion__trigger"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
      >
        <span>{q}</span>
        <motion.span
          className="accordion__chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            className="accordion__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <p className="accordion__answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          q={item.q}
          a={item.a}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
