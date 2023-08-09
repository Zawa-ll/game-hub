import { Heading } from '@chakra-ui/react';
import useGenre from '../hooks/useGenre';
import usePlatform from '../hooks/usePlatform';
import useGameQueryStore from '../store';

// interface Props {
//     gameQuery: GameQuery;
// }

const GameHeading = () => {

    const genreId = useGameQueryStore(s => s.gameQuery.genreId);
    const platformId = useGameQueryStore(s => s.gameQuery.platformId);

    const genre = useGenre(genreId);
    const platform = usePlatform(platformId);

    const heading = `${platform?.name || ''} ${genre?.name || ''} Games`

    return (
        <Heading as='h1' >
            {heading}
        </Heading>
    )
}

export default GameHeading;