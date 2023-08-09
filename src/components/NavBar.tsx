import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { MdShoppingCart } from 'react-icons/md';

const NavBar = () => {
    return (
        <HStack padding='10px'>
            <Link to='/'>
                <Image src={logo} boxSize='60px' objectFit='cover' />
            </Link>
            <SearchInput />
            <ColorModeSwitch />
            <Link to='/registerform'>
                <Button title="Register">Reg</Button>
            </Link>
            <Link to='/loginform'>
                <Button title="Login">Log</Button>
            </Link>
            <Link to='/cart'>
                <MdShoppingCart size='30px'></MdShoppingCart>
            </Link>
        </HStack>
    )
}

export default NavBar