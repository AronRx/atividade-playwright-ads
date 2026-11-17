// Gera dados fictícios e únicos a cada execução, evitando conflito entre
// execuções e entre integrantes do grupo (e-mail com timestamp + número aleatório).
function gerarUsuario() {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    nome: `Aluno${id}`,
    email: `aluno.${id}@example.com`,
    senha: 'Senha@12345',
    primeiroNome: 'Maria',
    sobrenome: 'Silva',
    empresa: 'Empresa Ficticia LTDA',
    endereco: 'Rua das Flores, 100',
    endereco2: 'Apartamento 10',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: '10001',
    celular: '5555555555',
    diaNasc: '10',
    mesNasc: 'May',
    anoNasc: '1995',
  };
}

module.exports = { gerarUsuario };
