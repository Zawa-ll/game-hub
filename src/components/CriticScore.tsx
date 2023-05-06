import { Badge } from '@chakra-ui/react';
import React from 'react'

interface Props {
    score: number;
}

const CriticScore = ({ score }: Props) => {
    let color = score > 90 ? 'green' : score > 60 ? "pink" : "";

    return (
        <Badge colorScheme={color} fontSize='14px' paddingX={3} borderRadius={4}>
            {score}
        </Badge >
    )
}

export default CriticScore