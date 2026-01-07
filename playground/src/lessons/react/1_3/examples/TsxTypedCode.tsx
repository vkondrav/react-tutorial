// @ts-nocheck
// TSX (TypeScript)
interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps): React.ReactElement {
  return <h1>Hello, {name}!</h1>;
}
