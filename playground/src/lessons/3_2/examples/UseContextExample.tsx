// @ts-nocheck
import { useContext } from 'react';

function DeepComponent() {
  // Access context value anywhere!
  const user = useContext(UserContext);

  return <div>{user.name}</div>;
}
