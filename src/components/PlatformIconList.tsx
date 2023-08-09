import { FaWindows, FaPlaystation, FaApple, FaLinux, FaAndroid, FaXbox } from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';
import { SiNintendo } from 'react-icons/si';
import { BsGlobe } from 'react-icons/bs'

import { HStack, Icon } from "@chakra-ui/react"
import { Platform } from "../entities/Platform";
import { IconType } from 'react-icons';

interface Props {
    platforms: Platform[],
}

const PlatformIconList = ({ platforms }: Props) => {
    const iconMap: { [key: string]: IconType } = {
        pc: FaWindows,
        playstation: FaPlaystation,
        xbox: FaXbox,
        nintendo: SiNintendo,
        mac: FaApple,
        linux: FaLinux,
        android: FaAndroid,
        ios: MdPhoneIphone,
        web: BsGlobe,
    };
    return (
        <HStack marginY={1}>
            {platforms.map(platform =>
                <Icon key={platform.id} color='pink.300' as={iconMap[platform.slug]} />
            )}
        </HStack>
    )
}

export default PlatformIconList