import { CardPokemonProps } from "@/types/Pokemon";
import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PokeCard({data}: CardPokemonProps){

    const router = useRouter();

    console.log(data.url);

    const id = data?.url?.slice(33,35);
    
    return(
        <Card maxW='xs' mr="2.5" mb="5" border="1px solid" borderColor="rgba(0,0,0,0.13)" >
          <CardBody>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{data.name}</Heading>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' onClick={()=>router.push(`/${id}`)} colorScheme='blue'>
                Details
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
    )
}