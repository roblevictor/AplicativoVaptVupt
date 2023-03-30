import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Title } from 'react-native-paper';
import { styles } from './Utils';
import { useContext } from 'react';
import { DataContext } from '../Context';


function CardapioScreen({ navigation }) {
  const { setNomeProduto, setValorProduto, setImagemProduto } =
    useContext(DataContext);

  const verProduto = (nomeProduto, valorProduto, imagemProduto) => {
    setNomeProduto(nomeProduto);
    setValorProduto(valorProduto);
    setImagemProduto(require(imagemProduto));
    navigation.navigate('VerProduto');
  };

  return (
    <ScrollView style={styles.scrolview}>
      <TouchableOpacity
        onPress={() =>
          verProduto('Salmão Grelhado', 50, '../assets/Salmao-grelhado.jpg')
        }>
        <Card style={styles.card}>
          <Card.Title
            title="Salmão Grelhado"
            subtitle="Salmão, Arroz, Legumes, Acompanha Feijão"
          />
          <Card.Content>
            <Image
              source={require('../assets/Salmao-grelhado.jpg')}
              style={styles.image}
            />
            <Title style={styles.title}>R$50,00</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          verProduto(
            'Filét mignon c/Risoto de Palmito',
            55,
            '../assets/file-mignon.jpg'
          )
        }>
        <Card style={styles.card}>
          <Card.Title
            title="Filét mignon c/Risoto de Palmito"
            subtitle="Filet Mignom, Arroz, Palmito, Creme De Leite"
          />
          <Card.Content>
            <Image
              source={require('../assets/file-mignon.jpg')}
              style={styles.image}
            />
            <Title style={styles.title}>R$55,00</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          verProduto('Abobrinha Recheada', 45, '../assets/Abobrinha-recheada.jpg')
        }>
        <Card style={styles.card}>
          <Card.Title
            title="Abobrinha Recheada"
            subtitle="Abobrinha, Patinho, Cebola, Tomate, Alho, Hortelã, Limão, Arroz"
          />
          <Card.Content>
            <Image
              source={require('../assets/Abobrinha-recheada.jpg')}
              style={styles.image}
            />
            <Title style={styles.title}>R$45,00</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => verProduto('Tabule', 40, '../assets/tabule.jpg')}>
        <Card style={styles.card}>
          <Card.Title
            title="Tabule"
            subtitle="Trigo Kibe, Tomate, Salsinha, Hortelã, Pepino Japonês, Cebola, Azeite, Pimenta Síria"
          />
          <Card.Content>
            <Image
              source={require('../assets/tabule.jpg')}
              style={styles.image}
            />
            <Title style={styles.title}>R$40,00</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default CardapioScreen;
