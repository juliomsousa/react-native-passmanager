import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage,
} from './styles';
import { useStorageData } from '../../hooks/storage';
import { Alert } from 'react-native';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  const { getItem } = useStorageData();

  async function loadData() {
    try {
      const response = await getItem();

      setSearchListData(response);
      setData(response);
    } catch (error) {
      console.log(error);
      Alert.alert('Atenção', 'Ocorreu um erro ao carregar :(');
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  function handleFilterLoginData(search: string) {
    if (search) {
      const foundResut = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchListData(foundResut);
    }
  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        }
        renderItem={({ item: loginData }) => {
          return (
            <LoginDataItem
              title={loginData.title}
              email={loginData.email}
              password={loginData.password}
            />
          );
        }}
      />
    </Container>
  );
}
