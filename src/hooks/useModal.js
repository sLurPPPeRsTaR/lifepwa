import { useState } from 'react';

export const useModal = (defaultValue = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  const set = (value) => setIsOpen(value);
  return { isOpen, open, close, toggle, set };
};
