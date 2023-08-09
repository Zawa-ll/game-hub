import { Box, Button, ListItem, SimpleGrid, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LikedGame from '../entities/LikedGame';
import useLikes from '../hooks/useLikes';
import APIClient from '../services/api-client';
import APIClientUser from '../services/api-client-user';

const ShoppingCart = () => {

    const [likedGameList, setLikedGameList] = useState<LikedGame[] | null>(null);
    // const result = useLikes();
    const apiClientUser = new APIClientUser<LikedGame>('/games');

    useEffect(() => {
        setTimeout(() =>
            handleTestingFetch(), 3000)
    }, []);

    async function handleTestingFetch() {
        try {
            const response = await apiClientUser.getAll();
            const gameList = response.data;
            console.log(gameList);
            setLikedGameList(gameList.games);
        } catch (error) {
            // Handle error if necessary
        }
    }


    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('token has been removed anyway1');
    };


    // async function handleTestingFetch2() {
    //     const result1 = await result;
    //     const data = result1.data?.data;
    //     if (data) {
    //         const likedGames = data.map((item: any) => ({
    //             id: item._id,
    //             name: item.name,
    //             slug: item.slug,
    //         }));
    //         setLikedGameList(likedGames);
    //         console.log(likedGames);
    //     }
    // }

    return (
        <Box>
            <SimpleGrid>
                <Text fontSize={50} fontWeight='bold'>My Game List</Text>

                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Id</Th>
                                <Th>Slug</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {likedGameList ? (
                                likedGameList.map((likedGame: LikedGame) => (
                                    <Tr key={String(likedGame.id)}>
                                        <Td>{likedGame.name}</Td>
                                        <Td>{likedGame.id}</Td>
                                        <Td>{likedGame.slug}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={3}>
                                        <Skeleton height="53px" width="100%" mb={2} />
                                        <Skeleton height="53px" width="100%" mb={2} />
                                        <Skeleton height="53px" width="100%" mb={2} />
                                        <Skeleton height="53px" width="100%" mb={2} />
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                    <Box paddingTop={5}>
                        <Button colorScheme="blue" onClick={handleLogout}>Log Out</Button>
                    </Box>
                </TableContainer>

            </SimpleGrid>
            {/* <Button onClick={handleTestingFetch}>Fetch For Testing</Button> */}
        </Box >
    )
}

export default ShoppingCart