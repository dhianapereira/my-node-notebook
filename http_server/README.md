# Http Server
Um projeto simples de um CRUD para fins de estudos de node.

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
cd my-node-notebook/http_server
```

### **3. Instalar as dependências**
```bash
npm install
```

### **4. Criar arquivo de variáveis de ambiente**
Crie uma cópia do arquivo [`.env.example`](./.env.example) na raiz do projeto com o nome `.env` e preencha com os devidos valores.

#### Para gerar as variáveis de ambiente, siga esse passo a passo:

1. Acesse o site Neon Tech [aqui](https://neon.tech/) e crie um novo projeto.

2. Preencha os campos de nome do projeto e nome do banco de dados. Os demais campos você pode deixar o valor default.

Com o projeto criado, basta copiar as variáveis de ambiente disponíveis. 

### **5. Executar a aplicação**
```bash
npm run dev
```