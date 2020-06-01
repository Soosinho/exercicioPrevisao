import React, { useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Button, Keyboard, Text, Image } from 'react-native';
import Cartao from './components/Cartao'

export default function App() {

  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q="
  const apiKey = "a45b380903de1054a9f18515a08712ff"

  const [cidade, setCidade] = useState('')
  const [dados, setDados] = useState({"city": {"sunrise": 0, "sunset": 0}, "list": [{"main": {"feels_like": 0}, "weather": [{"icon": ''}]}]})

  const obterPrevisoes = () => {
    const target = endPoint + cidade + "&appid=" + apiKey
    fetch(target).then((dados) => dados.json()).then((dados) => { setDados(dados) })
    Keyboard.dismiss()
  }

  const capturarCidade = (cidade) => {
    setCidade(cidade)
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button
          title="Ok"
          onPress={obterPrevisoes}
        />
      </View>
      <Cartao styles={styles.cartao}>
        <View style={styles.tela}>
          <Image
            style={styles.imagem}
            source={{ uri: "https://openweathermap.org/img/wn/" + dados.list[0].weather[0].icon + ".png" }}
          />
          <View >
            <View style={styles.primeiraLinha}>
              <Text style={styles.valor}>Sunrise: {new Date(dados.city.sunrise * 1000).toLocaleTimeString()}</Text>
              <Text style={styles.valor}>Sunset: {new Date(dados.city.sunset * 1000).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.segundaLinha}>
              <Text style={styles.valor}>Sensação térmica: {dados.list[0].main.feels_like}</Text>
            </View>
          </View>
        </View>
      </Cartao>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 40,
    backgroundColor: '#fff',
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#CCC',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  tela: {
    flexDirection: 'row'
  },
  cartao: {
    marginBottom: 5,
  },
  imagem: {
    width: 50,
    height: 50
  },
  valor: {
    marginHorizontal: 2
  },
  primeiraLinha: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  segundaLinha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#DDD'
  }
});
