import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import useGameQueryStore from '../store'

// interface Props {
//     onSelectSortOrder: (sortOrder: string) => void,
//     sortOrder?: string,
// }

const SortSelector = () => {
    const sortOrders = [
        { value: '', label: 'Relevance' },
        { value: '-added', label: 'Date added' },
        { value: 'name', label: 'Name' },
        { value: '-released', label: 'Release date' },
        { value: '-matacritic', label: 'Popularity' },
        { value: '-rating', label: 'Average rating' },
    ]

    const selectedSortOrder = useGameQueryStore(s => s.gameQuery.sortOrder);
    const setSelectedSortOrder = useGameQueryStore(s => s.setSortOrder);

    const currentSortOrder = sortOrders.find(order => order.value === selectedSortOrder);

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                Order by: {currentSortOrder?.label || 'Relevance'}
            </MenuButton>
            <MenuList>
                {sortOrders.map(order =>
                    <MenuItem onClick={() => setSelectedSortOrder(order.value)} key={order.value} value={order.value}>
                        {order.label}
                    </MenuItem>)}
            </MenuList>
        </Menu>

    )
}

export default SortSelector