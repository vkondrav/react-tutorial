// @ts-nocheck
const dropdownRef = useRef(null);

const handleClickOutside = (e) => {
  if (!dropdownRef.current.contains(e.target)) {
    setIsOpen(false);
  }
};
