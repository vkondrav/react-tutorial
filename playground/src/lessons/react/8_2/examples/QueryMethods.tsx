// @ts-nocheck
// Testing Library query methods - from most to least preferred

// ✅ Best: Accessible queries (users can find these too)
canvas.getByRole('button', { name: 'Submit' });
canvas.getByLabelText('Email address');
canvas.getByPlaceholderText('Enter your name');
canvas.getByText('Welcome back!');

// ⚠️ OK: Semantic queries (for elements without roles)
canvas.getByAltText('Profile picture');
canvas.getByTitle('Close dialog');

// ⚠️ Last resort: Test IDs (when nothing else works)
canvas.getByTestId('custom-dropdown');
