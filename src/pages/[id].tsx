import Main from "@/components/Main";
import { Circle, Divider, Flex, Image, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "../services/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementInfo } from "@/store/pokemons";
import { RootState } from "@/store";
import {GiBodyHeight} from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import {CgReorder} from "react-icons/cg";

export default function Item(){

    const router = useRouter();
    const dispatch = useDispatch();
    const data = useSelector((state: RootState)=> state.pokemons.pokemonInfo);

    const fetchData = async() => {
        const response = await axios.get(`/pokemon/${router.query.id}`);
        dispatch(incrementInfo(response?.data));
    }

    useEffect(()=>{
        if(router.query.id){
            fetchData();
        }
    }, [router.query.id])

    return(
        <Main cardItem >
            <Flex w="100%" pt="8" flexDirection={["column", "row", "row"]} >
            <Circle size="350px" bg="gray.200" margin="0 auto" >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${router?.query?.id}.png`}
                borderRadius='lg'
                width="72"
                height="72"
                
              />
            </Circle>
                <Flex w="50%" flexDirection="column" >
                    <Text fontSize="3xl" mb="3" >{data?.name}</Text>
                    <Divider mb={["7","20","20"]} />
                    <List spacing={3}>
                        <ListItem display="flex" >
                            <ListIcon as={GiBodyHeight} />
                                <Text fontWeight="bold" mr="2" >Height:</Text>
                                {data?.height}
                        </ListItem>
                        <ListItem display="flex" >
                            <ListIcon as={FaWeight} />
                                <Text fontWeight="bold" mr="2" >Weight:</Text>
                                {data?.weight}
                        </ListItem>
                        <ListItem display="flex" >
                            <ListIcon as={CgReorder} />
                                <Text fontWeight="bold" mr="2" >Order:</Text>
                                {data?.order}
                        </ListItem>
                    </List>
                </Flex>
            </Flex>
        </Main>
    )
}