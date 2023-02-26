import { Button, Link, Navbar, Text } from "@nextui-org/react";
import Image from 'next/image';

type Props = {
  logo?: string;
}

export const BcNavbar = ({logo}: Props) => {
  return (
    <Navbar>
      <Navbar.Brand as={Link} href='/'>
        {
          logo && (
            <Image 
              src={logo}
              alt="icono de la app"
              width={70}
              height={70}
            />
          )
        }
        <Text b color='white' hideIn="xs">
          POKEMON
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs"></Navbar.Content>
      <Navbar.Content hideIn="xs">
        <Button auto flat as={Link} href={'/favorites'}>
          Favorites
        </Button>
      </Navbar.Content>
    </Navbar>
  );
}
