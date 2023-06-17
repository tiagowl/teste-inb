import { MainProps } from "@/types/Main";
import { Container, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function Main({children, cardItem}: MainProps){
    return(
        <Flex w="100%" bg={cardItem ? "gray.300" : "white"}  minH="100vh" pb={cardItem ? "5": "0"} maxH="auto" flexDirection="column"  >
            <Navbar/>
            <Container minH="100vh" bg={cardItem ? "white" : "none"} mt="4" borderRadius={cardItem ? "lg" : "none"} maxH="auto" maxW="container.lg" >
                {children}
            </Container>
        </Flex>
    )
}