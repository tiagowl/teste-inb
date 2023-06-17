import { CardPokemonProps } from "@/types/Pokemon";
import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Image, Text, Icon, Circle } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {ImLeaf} from "react-icons/im";

export default function PokeCard({data}: CardPokemonProps){

    const router = useRouter();

    console.log(data.url);

    const id = data?.url?.slice(33,35);
    
    return(
        <Card w='xs' cursor="pointer" onClick={()=>router.push(`/${id}`)} _hover={{shadow: "xl", transform: "scale(1.1)"}} mr="2.5" shadow="lg" mb="5" borderRadius="12px" borderColor="rgba(0,0,0,0.13)" >
          <CardBody pb="0" >
            <Circle size="170px" bg="gray.200" margin="0 auto" >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                borderRadius='lg'
                width="48"
                height="48"
                
              />
            </Circle>
            <Text color="gray.500" >#{id}</Text>
          </CardBody>
          <CardFooter alignItems="center" display="flex" justifyContent="space-between" >
            <Heading  size='md'>{data.name}</Heading>
            <Icon as={ImLeaf} color="green.300" />
          </CardFooter>
        </Card>
    )
}