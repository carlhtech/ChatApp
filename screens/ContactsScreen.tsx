import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
import { API, graphqlOperation } from "aws-amplify";

import { useEffect, useState } from 'react';
import { listUsers } from '../src/graphql/queries';

export default function ContactScreen() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(usersData.data.listUsers.items);
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
