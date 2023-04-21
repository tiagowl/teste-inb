import PokeCard from '@/components/Card'
import Main from '@/components/Main'
import { Button, ButtonGroup, Flex, IconButton, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../services/api";
import { increment, setLoading } from '@/store/pokemons';
import { RootState } from '@/store';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';


export default function Home() {

  const dispatch = useDispatch();
  const data = useSelector((state: RootState)=> state);
  const [url, setUrl] = useState("/pokemon?limit=6");
  const [page, setPage] = useState(1);

  const fetchData = async (url: string) => {
    dispatch(setLoading(true));
    const response = await axios.get(url);
    if(response?.status === 200){
      dispatch(increment(response.data));
      dispatch(setLoading(false));
    }
  }

  const nextPage = async(url: string) => {
    dispatch(setLoading(true));

    setPage(state => state + 1);

    fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(increment(data));
      dispatch(setLoading(false));
    })
  }

  const previousPage = async(url: string) => {
    if(page >= 1){
      dispatch(setLoading(true))

      setPage(state => state - 1);

      fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(increment(data));
        dispatch(setLoading(false));
      })
    }else{
      return;
    }
  }

  useEffect(()=>{
    fetchData(url);
  }, [])

  return (
    <Main>
      <Flex flexWrap="wrap" maxH="auto" >
        {data?.pokemons?.loading === true ? <Spinner margin="0 auto" mt="15rem" /> 
        : 
        data?.pokemons?.data?.results?.map((pokemon)=>(
          <PokeCard data={pokemon} />
        ))}
      </Flex>
      <Flex justifyContent="center" mb="3" >
        <ButtonGroup size='sm' isAttached variant='outline'>
          {data?.pokemons?.data?.previous != null && <IconButton aria-label='Add to friends' onClick={()=>previousPage(data?.pokemons?.data?.previous as string)} icon={<MinusIcon />} />}
          <Button>{page}</Button>
          {data?.pokemons?.data?.next != null && <IconButton aria-label='Add to friends' onClick={()=>nextPage(data?.pokemons?.data?.next as string)} icon={<AddIcon />} />}
        </ButtonGroup>
      </Flex>
    </Main>
  )
}
