// @ts-nocheck

// Toggle boolean
setIsOpen((prev) => !prev);

// Add to array
setItems((prev) => [...prev, newItem]);

// Update object
setUser((prev) => ({ ...prev, name: 'New' }));
