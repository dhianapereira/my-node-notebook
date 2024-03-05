# Brainstorming
Brainstorming é apenas um nome de uma aplicação que desenvolvi nas aulas do NLW Heat.

## Ambiente de Desenvolvimento
Para evitar problemas é legal que seu ambiente de desenvolvimento esteja com
as seguintes versões:

| Ferramenta | Versão         |
| ---------- | -------------- |
| Git        | A mais recente |
| NodeJS     | v18.17.1       |

## Guia de Instalação
> Com as ferramentas devidamente instaladas, execute os comandos abaixo

### **1. Clonar repositório**
```bash
git clone https://github.com/dhianapereira/my-node-notebook.git
```

### **2. Entrar na pasta do projeto**
```bash
cd my-node-notebook/brainstorming
```

### **3. Instalar as dependências**
```bash
npm install
```

### **4. Criar arquivo de variáveis de ambiente**
Crie uma cópia do arquivo [`.env.example`](./.env.example) na raiz do projeto com o nome `.env` e preencha com os devidos valores.

#### Para gerar as credenciais, siga esse passo a passo:

1. Acesse a página de OAuthApps da sua conta do Github [aqui](https://github.com/settings/developers) e crie um novo app.

2. Preencha os campos obrigatórios para a criação de uma nova aplicação. Nos campos `Homepage URL` e `Authorization callback URL` adicione os seguintes valores:

| Campo                      | Valor                                 |
| -------------------------- | ------------------------------------- |
| Homepage URL               | http://localhost:4000                 |
| Authorization callback URL | http://localhost:4000/signin/callback |

3. Após a criação do novo app, basta copiar o `Client ID` disponível e gerar uma `Client Secret`.

### **5. Executar a aplicação**
```bash
npm run dev
```