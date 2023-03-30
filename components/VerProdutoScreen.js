import { Image, Dimensions } from 'react-native';
import { Card, Button, Title, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { styles, valorFormatado } from './Utils';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';

const VerProdutoScreen = ({ navigation }) => {
  let {
    nomeProduto,
    setNomeProduto,
    descricaoProduto,
    setDescricaoProduto,
    valorProduto,
    setValorProduto,
    imagemProduto,
    setImagemProduto,
    produtos,
    setProdutos,
    total,
    setTotal,
    quantidade,
    setQuantidade,
  } = useContext(DataContext);

  const addCarrinho = () => {
    let produto = produtos;
    const busca = produto.find((p) => p.nome === nomeProduto);

    if (busca) {
      const indice = produto.findIndex((p) => p.nome === nomeProduto);
      produto[indice].qtd = produto[indice].qtd + 1;
      setTotal(total + produto[indice].valor);
    } else {
      produto.push({
        nome: nomeProduto,
        descricao: descricaoProduto,
        valor: valorProduto,
        qtd: 1,
      });
      setProdutos(produto);
      setTotal(Number(total) + Number(valorProduto));
      setNomeProduto(null);
      setValorProduto(0);
      setImagemProduto(null);
    }

    navigation.navigate('Carrinho');
  };

  return (
    <Card style={styles.card}>
      <Card.Title title={nomeProduto} subtitle={descricaoProduto} />
      <Card.Content>
        <Image source={imagemProduto} style={styles.image} />
        <Title style={styles.title}>{valorFormatado(valorProduto)}</Title>
      </Card.Content>
      <Card.Actions>
        <Button
          icon="arrow-left"
          mode="outlined"
          onPress={() => navigation.navigate('Cardápio')}
          style={styles.button}>
          Voltar
        </Button>
      </Card.Actions>
      <Card.Actions>
        <Button
          icon="check"
          mode="contained"
          onPress={() => addCarrinho()}
          style={styles.button}>
          Adicionar ao Carrinho
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default VerProdutoScreen;