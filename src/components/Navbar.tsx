import { NavbarItemProps } from "@/types/Navbar";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Flex, InputGroup, InputLeftElement, Input, Text, Icon, Square, useDisclosure, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Divider, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsLinkedin } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";
import axios from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementTypes, setLoading } from "@/store/pokemons";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

const NavbarItem = ({name, icon, link}: NavbarItemProps) => {

    const router = useRouter();

    return(
      <Flex flexDirection="column" cursor="pointer" onClick={()=>router.push(link)} ml="6" alignItems="center" >
        <Icon as={icon} color="white" fontSize="2xl" />
        <Text color="white" mt="1" >{name}</Text>
      </Flex>
    )
}

export default function Navbar(){

    const router = useRouter();
    const dispatch = useDispatch();
    const types = useSelector((state: RootState)=>state.pokemons.types);
    const [search,setSearch] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const fetchTypes = async() =>{
        const response = await axios.get("/type?limit=15");
        dispatch(incrementTypes(response?.data));
    }

    const fetchPokemons = async() => {
        const response = await axios.get("/pokemon?limit=6");
        dispatch(increment(response?.data));
    }

    const fetchPokemonByType = async(url: string) => {

        dispatch(setLoading(true));

        const response = await axios.get(url);

        const pokemons = response?.data?.pokemon?.map((pokemon: {slot: number; pokemon:{name: string, url: string}})=>{
            return pokemon?.pokemon;
        })

        let data = {
            count: response?.data?.pokemon?.length,
            next: null,
            previous: null,
            results: pokemons
        }

        dispatch(increment(data));
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        fetchTypes();
    }, [])

    const fetchPokemonByName = async(name: string) => {
        if(search !== ""){
            const response = await axios.get("/pokemon");
            let pokemons = response?.data?.results;
            let pokemonByName = pokemons?.find((pokemon: {name: string, url: string})=> pokemon?.name === name);
            const data = {
                count: pokemonByName.length,
                next: null,
                previous: null,
                results: [{name: pokemonByName.name, url: pokemonByName.url}]
            }
            dispatch(increment(data));
        }else{
            return;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter'){
            fetchPokemonByName(search)
        }
    }

    useEffect(()=>{
        if(search === ""){
            fetchPokemons();
        }
    }, [search])

    return(
        <>
            <Flex w="100%" h="20" pl={["4","24","24"]} pr={["4","36","36"]} bg="red.600" alignItems="center" justifyContent={["space-between","space-evenly","space-evenly"]} >
                <Flex onClick={()=>router.push("/")} cursor="pointer">
                    <MdCatchingPokemon color='white' onClick={()=>router.push("/")} size={40}  />
                    <Text color="white" fontWeight="bold" fontSize="2xl" >PokeApi</Text>
                </Flex>
                <Square size={10} display={["flex", "none", "none"]} cursor="pointer" onClick={onOpen} borderRadius="lg" border="1px solid" borderColor="gray.400" >
                    <HamburgerIcon fontSize="xl" color="gray.300" />
                </Square>
                <InputGroup w="40%" display={["none", "flex", "flex"]} >
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='tel' value={search} onKeyDown={handleKeyDown} onChange={(e)=>setSearch(e.target.value)} size="lg" bg="white" placeholder='Search by name (Press Enter)' />
                </InputGroup>
                <Flex display={["none", "flex", "flex"]} >
                    <NavbarItem name="Linkedin" icon={BsLinkedin} link="https://www.linkedin.com/in/tiagowl/" />
                    <NavbarItem name="Profile" icon={FaUserTie} link="https://profile-next-alpha.vercel.app/" />
                </Flex>
            </Flex>
            <Flex display={["none", "flex", "flex"]} h="14" bg="gray.200" alignItems="center" justifyContent="center" >
                {types?.results?.map((type)=>(
                    <Text color="gray.500" fontSize="lg" mr="6" cursor="pointer" onClick={()=>fetchPokemonByType(type?.url)} fontWeight="bold" >{type?.name}</Text>
                ))}
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent bg="red.600" >
                <DrawerCloseButton />

                <DrawerBody pt="12" >
                    <Input value={search} mb="4" onKeyDown={handleKeyDown} onChange={(e)=>setSearch(e.target.value)} size="lg" bg="white" placeholder='Search by name (Press Enter)' />
                    <Divider/>
                    <Flex mt="4" mb="4" >
                        <NavbarItem name="Linkedin" icon={BsLinkedin} link="https://www.linkedin.com/in/tiagowl/" />
                        <NavbarItem name="Profile" icon={FaUserTie} link="https://profile-next-alpha.vercel.app/" />
                    </Flex>
                    <Divider mb="48" />
                    <Flex h="14" flexDirection="column" alignItems="flex-start" justifyContent="center" >
                        {types?.results?.map((type)=>(
                            <Text color="white" fontSize="lg" mr="6" cursor="pointer" onClick={()=>fetchPokemonByType(type?.url)} fontWeight="bold" >{type?.name}</Text>
                        ))}
                    </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}