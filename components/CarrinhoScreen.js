import { FlatList, ScrollView, View, Image  } from 'react-native';
import { Card, Paragraph, Button, List, Text, TextInput } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import { styles, valorFormatado } from './Utils';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';
import firebase from '../Firebase'

const CarrinhoScreen = ({ navigation }) => {
  let { produtos, setProdutos, total, setTotal, quantidade, setQuantidade } =
    useContext(DataContext);

  const excluirProduto = (index) => {
    let produto = produtos;
    if (produto[index].qtd <= 1) {
      produto[index].qtd = produto[index].qtd - 1;
      setTotal(total - produto[index].valor);
      produto = produto.filter((item) => item !== produto[index]);
      setProdutos(produto);
    } else {
      produto[index].qtd = produto[index].qtd - 1;
      setTotal(total - produto[index].valor);
    }
  };

  const adicionarProduto = (index) => {
    let produto = produtos;
    produto[index].qtd = produto[index].qtd + 1;
    setTotal(total + produto[index].valor);
  };

  const [email, setEmail] = useState('');

const finalizarCompra  = () => {

    if(Object.values(produtos).length == 0 || !produtos){
      alert('Não há pedidos para cadastrar')
      return
    }

    if(email == '' || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      alert('Insira um e-mail válido para cadastrar o pedido.')
      return 
    }

     try{
      firebase.database().ref('pedidos').push({
          "email_usuario": email,
          "pedido": JSON.stringify(produtos),
        });
        setEmail('');
        setProdutos([]);
        setTotal(0);
        setQuantidade(0);
        alert('Pedido cadastrado com sucesso')
    }catch(e){
      alert("Erro ao cadastrar pedido: "+e)
    }
  }


  return (
    <ScrollView>
      <Card>
        <Card.Title title="Meu Carrinho" />
        <Card.Content>
          {produtos.length ? (
            <FlatList
              style={styles.flatlist}
              data={produtos}
              renderItem={({ item, index }) => {
                return (
                  <List.Accordion title={item.nome}>
                    <List.Item title={'Valor: ' + valorFormatado(item.valor)} />
                    <Image source={item.imagem} style={styles.smallImage} />
                    <List.Item
                      left={(props) => (
                        <Button
                          mode="contained"
                          onPress={() => excluirProduto(index)}>
                          -
                        </Button>
                      )}
                      description={
                        <View>
                          <Text style={{ textAlign: 'center' }}>
                            {item.qtd}
                          </Text>
                        </View>
                      }
                      right={(props) => (
                        <Button
                          mode="contained"
                          onPress={() => adicionarProduto(index)}>
                          +
                        </Button>
                      )}
                    />
                  </List.Accordion>
                );
              }}
            />
          ) : (
            <Paragraph>Nenhum item no carrinho!</Paragraph>
          )}
          {total != 0 ? (
            <Paragraph style={styles.paragraph}>
              Valor total:
              {valorFormatado(total)}
            </Paragraph>
          ) : (
            <></>
          )}
          <Card.Actions>
            <Button
              icon="arrow-left"
              mode="outlined"
              onPress={() => navigation.navigate('Cardápio')}
              style={styles.button}>
              Voltar
            </Button>
          </Card.Actions>
          <TextInput
          label="Email"
          Placeholder="Insira seu e-mail"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Button
        onPress={() => finalizarCompra()}>
          Finalizar compra
        </Button>
        </Card.Content>

      </Card>
    </ScrollView>
  );
};

export default CarrinhoScreen;
