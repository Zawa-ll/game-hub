import { Button, GridItem, Heading, HStack, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CriticScore from '../components/CriticScore';
import DefinitionItem from '../components/DefinitionItem';
import ExpandableText from '../components/ExpandableText';
import GameAttributes from '../components/GameAttributes';
import GameScreenshots from '../components/GameScreenshots';
import GameTrailer from '../components/GameTrailer';
import genres from '../data/genres';
import useGame from '../hooks/useGame';
import { AiFillHeart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'
import useGameQueryStore from '../store';
import useLikes from '../hooks/useLikes';
import APIClientUser from '../services/api-client-user';
import LikedGame from '../entities/LikedGame';

const GameDetailPage = () => {
    const { slug } = useParams();
    // const { data: game, isLoading, error } = useGame(slug!);
    const { data: game, isLoading, error } = useGame(slug || '');
    const [liked, setLiked] = useState(false);

    // const apiClientUser = new APIClientUser<LikedGame>('/liked_games');
    const apiClientUser = new APIClientUser<LikedGame>('/games');

    // useEffect(() => {
    //     const storedLikedState = localStorage.getItem('likedState');
    //     if (storedLikedState) {
    //         setLiked(JSON.parse(storedLikedState));
    //     }
    // }, []);

    useEffect(() => {
        const fetchLikedGame = async () => {
            try {
                const likedGame = await apiClientUser.getOne(String(game?.id));
                console.log('fetchlikedGame Successfully', likedGame);
                // if (likedGame.data == null) console.log('LikedGame is Null');
                setLiked(likedGame.data && Object.keys(likedGame.data).length !== 0);
                // setLiked(likedGame.data && Object.keys(likedGame.data).length !== 0);
            } catch (error) {
                console.error('Error fetching liked game:', error);
            }
        };

        if (game?.id) {
            fetchLikedGame();
        }
    }, [game?.id]);

    // useEffect(() => {
    //     localStorage.setItem('likedState', JSON.stringify(liked));
    // }, [liked]);


    if (isLoading) return <Spinner />
    if (error || !game) throw error;

    const handleLikes = async () => {
        const cur = liked;
        setLiked(!cur);

        try {
            const requestData = {
                id: String(game.id),
                name: game.name,
                slug: game.slug,
                liked: !cur,
                createdBy: localStorage.getItem('token')
            };

            if (!cur) {
                // Like the game
                const postResult = await apiClientUser.postOne(requestData as LikedGame);
                console.log('Liked game successfully:', postResult);
            } else {
                // Unlike the game
                const deleteResult = await apiClientUser.deleteOne(requestData);
                console.log('Unliked game successfully:', deleteResult);
            }
        } catch (ex) {
            console.log('Some error happened in handleLikes function:', ex);
        }
    };


    // const handleLikes = async () => {
    //     const cur = liked;
    //     setLiked(!cur);
    //     try {
    //         if (!cur) {
    //             const postResult = await apiClientUser.postOne({
    //                 id: game.id.toString(),
    //                 name: game.name,
    //                 slug: game.slug,
    //                 liked: !cur,
    //                 createdBy: localStorage.getItem('token'),
    //             } as LikedGame);
    //             console.log('testCreatedBy', postResult);
    //             console.log('Liked game successfully!');
    //         } else {
    //             const deleteResult = await apiClientUser.deleteOne({ id: String(game.id), createdBy: localStorage.getItem('token') });
    //             console.log('Unliked game successfully!');
    //         }
    //     } catch (ex) {
    //         console.log('Some error happened in handleLikes function', ex);
    //     }
    // }

    // const handleHeart = async () => {
    //     try {
    //         const inLikeResult = await inLike;
    //         // console.log(inLikeResult.data);

    //         // Check if inLikeResult.data is an empty object
    //         const isEmptyObject = Object.keys(inLikeResult.data).length === 0;
    //         console.log(!isEmptyObject);
    //         return (!isEmptyObject);
    //     } catch (error) {
    //         // Handle the error
    //         console.error(error);
    //     }
    // };

    // const handleLike = async () => {
    //     // try {
    //     //     const isLiked = await handleHeart(); // Wait for the handleHeart promise to resolve
    //     //     setLiked(isLiked ? isLiked : false);
    //     // } catch (error: any) {
    //     //     console.log(error.message)
    //     // }

    //     setLiked(!liked);

    //     console.log('clicked');

    //     const putResult = apiClientUser.updateOne({
    //         name: game.name,
    //         id: String(game.id),
    //         slug: game.slug,
    //         liked: liked,
    //     } as LikedGame);

    //     console.log(putResult);


    //     // const postResult = await apiClientUser.postOne({
    //     //     id: game.id.toString(),
    //     //     name: game.name,
    //     //     slug: game.slug,
    //     //     liked: liked,
    //     // } as LikedGame)

    //     // console.log(postResult.data);
    // }

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <GridItem>
                    <HStack justifyContent='spacing'>
                        <Heading>{game?.name}</Heading>
                        {!liked ? <AiOutlineHeart size={25} color={'pink'} onClick={handleLikes} /> : <AiFillHeart size={25} color={'pink'} onClick={handleLikes} />}
                    </HStack>
                    <ExpandableText>{game?.description_raw}</ExpandableText>
                    <GameAttributes game={game}></GameAttributes>

                </GridItem>
                <GridItem>
                    <GameTrailer gameId={game.id} />
                    <GameScreenshots gameId={game.id} />
                </GridItem>
            </SimpleGrid>
        </>
    )
}

export default GameDetailPage