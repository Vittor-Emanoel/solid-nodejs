# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizer check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [x] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario nao pode fazer dois check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-ins se nao estiver perto(100m) da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por adminstradores;
- [ ] A academia so pode ser cadastrada por adminstradores;

## RNFs (Requisitos nao funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
- [x] Todas listas de dados precisam estar paginas com 20 itens por paginas;
- [ ] O usuario deve ser identificado po um JWT (Json web token);

SOLID

- D - Dependency Inversion Principle
