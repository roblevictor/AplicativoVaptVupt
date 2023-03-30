import { List, TextInput, Button, Card } from 'react-native-paper';
import { ScrollView, View, FlatList, Image, Snackbar } from 'react-native';
import { useEffect, useState } from 'react';

export default function GerenciarCategorias() {
  let [key, setKey] = useState('');
  let [nome, setNome] = useState('');
  let [descricao, setDescricao] = useState('');
  let [imagem, setImagem] = useState(null);
  let [categoria, setCategoria] = useState();
  let [categorias, setCategorias] = useState([]);
  let [botaoAlterarExcluir, setBotaoAlterarExcluir] = useState(false);

  const solicitarPermissao = async () => {
    const imagemPermissao = await ImagePicker.getMediaLibraryPermissionsAsync();
  };

  useEffect(() => {
    solicitarPermissao();
  }, []);

  const selecionarFoto = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });
    if (!resultado.cancelled) setImagem(resultado.uri);
  };

  const selecionar = (key, nome, descricao) => {
    setKey(key);
    setNome(nome);
    setDescricao(descricao);
    setCategoria({ key: key, nome: nome, descricao: descricao });
    setBotaoAlterarExcluir(true);
  };

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <Card.Title
          title="Gerenciar Categorias"
          subtitle="Dados das categorias de serviço"
        />
        <Card.Content>
          <TextInput
            onChangeText={setNome}
            value={nome}
            mode="outlined"
            label="Nome"
            placeholder="Digite o nome da categoria"
          />
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            mode="outlined"
            label="Descrição"
            placeholder="Digite a descrição da categoria"
          />
          <Button
            mode="outlined"
            icon="image"
            onPress={() => selecionarFoto()}
            style={{ marginTop: 10 }}>
            Selecionar foto
          </Button>
          {imagem ? (
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={{ uri: imagem }}
            />
          ) : (
            <></>
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            icon="plus"
            mode="contained"
            style={{ padding: 10, marginLeft: 10 }}
            onPress={() => inserir()}></Button>
          <Button
            icon="pencil"
            mode="contained"
            style={{ padding: 10, marginLeft: 10 }}
            disabled
            onPress={() => alterar()}></Button>
          <Button
            icon="delete"
            mode="contained"
            style={{ padding: 10, marginLeft: 10 }}
            disabled
            onPress={() => excluir()}></Button>
          <Button
            icon="cancel"
            mode="contained"
            style={{ padding: 10, marginLeft: 10 }}
            onPress={() => cancelar()}></Button>
        </Card.Actions>
      </Card>
      <FlatList
        data={categorias}
        renderItem={({ item }) => {
          return (
            <View>
              <List.Item
                title={item.value.nome}
                onPress={() =>
                  selecionar(item.key, item.value.nome, item.value.descricao)
                }
              />
            </View>
          );
        }}
      />
      <Snackbar
        visible={snack}
        onDismiss={setSnack(false)}
        action={{
          label: 'Fechar',
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar>
    </ScrollView>
  );
}
