# Mobile App using React-Native Environment
### The app will consume GitHub API and save the data into the localStorage.

## Main page
----
- [x] A field to the user insert the GibHub user/login.
- [x] A button to trigger a Request to the API and select data to be renderer into the List component.
- [x] Each list component should have, name, login, bio, avatar and a button for more details and access the second route.

## User page
- [x] Navigation header should inform 'user login'
- [x] Header - User avatar / user name / user bio
- [x] Render a list with all user starred repositories (repo title/ owner name/ owner avatar)
---


## Libraries
> "[react-native-CLI].(https://github.com/react-native-community/cli)"

> react-native-navigation

> react-navigation-stack

> react-native-gesture-handler

> react-native-reanimated

> react-native-vector-icons - responsive icons

> styled-components - define comps style using CSS

> reactotron-react-native - DebugCode

> axios - API Requests

> prop-types

### Code STD
> Eslist (AIRBNB)

>Prettier

>EditorConfig

## Tool apps
### Emulation
>Genymotions

>USB Android

### Code/ Debug
> VScode

> Reactotron


# Desafio 06. Aplicação com React Native

Nesse desafio você adicionará novas funcionalidades na aplicação que desenvolvemos ao longo desse módulo.

## Funcionalidades

### Loading de repositórios

Adicione um indicator de loading utilizando `<ActivityIndicator />` antes de carregar a lista de repositórios favoritados na tela de detalhes do Usuário.

### Scroll infinito

Adicione uma funcionalidade de scroll infinito na lista de repositórios favoritados. Assim que o usuário chegar nos **20%** do final de lista, busque pelos items na próxima página e adicione na lista. Seu código ficará da seguinte forma:

```js
<Stars
  onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
  onEndReached={this.loadMore} // Função que carrega mais itens
  // Restante das props
>
```

Para requisitar uma nova página no Github utilize um parâmetro `page` no fim da URL:

```
https://api.github.com/users/diego3g/starred?page=2
```

### Pull to Refresh

Adicione uma funcionalidade para quando o usuário arrastar a listagem de repositórios favoritados pra baixo atualize a lista resetando o estado, ou seja, volte o estado da paginação para a página 1 exibindo apenas os 30 primeiros itens.

A funcionalidade "Pull to Refresh" existe por padrão na FlatList e pode ser implementada através do seguinte código:

```js
<Stars
  onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
  refreshing={this.state.refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
  // Restante das props
>
```

### WebView

Crie uma nova página na aplicação que vai ser acessada quando o usuário clicar em um repositório favoritado, essa página deve conter apenas o Header da aplicação. O conteúdo da página será uma WebView, ou seja, um browser integrado que exibe o atributo `html_url` presente no objeto do repositório que vem da API do Github.

Documentação de utilização da WebView: https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md

Exemplo de código:

```js
<WebView
  source={{ uri: repository.html_url }}
  style={{ flex: 1 }}
/>
```

Resultado:

![WebView](assets-desafio/exemplo-web-view.png)
