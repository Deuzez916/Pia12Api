import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, } from 'react-native';

export default function App() {

  const [isloading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("Search");
  const [myText, setMyText] = useState("Hello");
  const [categories, setCategories] = useState(['Orange', 'Banana']);

  function ChuckNorris() {
    setIsLoading(true);
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(json => {
      console.log(json.value);
      setMyText(json.value);
    })
    .catch(error => {
      console.log("Now we have an error")
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  function loadCategories() {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setCategories(json);
    })
    .catch(error => {
      console.log("Now we have an error")
    });
  }

  function loadJokeForCategories(jokecat){
    setIsLoading(true);
    fetch('https://api.chucknorris.io/jokes/random?categories=' + jokecat)
    .then(response => response.json())
    .then(json => {
      console.log(json.value);
      setMyText(json.value);
    })
    .catch(error => {
      console.log("Now we have an error")
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  function searchJoke() {
    fetch('https://api.chucknorris.io/jokes/search?query=' + searchText)
    .then(response => response.json())
    .then(json => {
      
      if(json.total == 0) {
        setMyText("No Jokes Found");
      } else {
        var randomjoke = Math.floor(Math.random() * json.total);
        console.log(json.result[randomjoke].value);
        setMyText(json.result[randomjoke].value);
      }
    })
    .catch(error => {
      console.log("Now we have an error")
    });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {isloading ? (<ActivityIndicator/>
      ) : (
        <Text>Is Not Loading</Text>
      )}

      <Text style={styles.joketext}>{myText}</Text>

      <TextInput value={searchText} onChangeText={setSearchText}/>

      <Button title='Search' onPress={() => {
        searchJoke();
      }}/>
      
      <Button title='New Random ChuckNorris joke' onPress={() => {
        ChuckNorris();
      }}/>

      <FlatList
        data={categories}
        renderItem={(item) => (
          <TouchableOpacity onPress={() => {
            loadJokeForCategories(item.item); 
          }}>
            <Text>{item.item}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joketext: {
    margin: 50,
    backgroundColor: '#ff53f4',
  },
});
