import FuncionarioCliente from "./funcionarioCliente";
import Pessoa from "./pessoa";
import PessoaAux from "./pessoaAux";
import Projeto from "./projeto";
import SituacaoProj from "./situacaoProj";

// Pessoa <-> PessoaAux
Pessoa.hasOne(PessoaAux, {
  foreignKey: 'cdPessoa',
  sourceKey: 'cdPessoa',
  as: 'pessoaAux',
});
PessoaAux.belongsTo(Pessoa, {
  foreignKey: 'cdPessoa',
  targetKey: 'cdPessoa',
  as: 'pessoa',
});

// Pessoa <-> FuncionarioCliente
Pessoa.hasOne(FuncionarioCliente, {
  foreignKey: 'cdFuncionario',
  sourceKey: 'cdPessoa',
  as: 'funcionarioCliente',
});
FuncionarioCliente.belongsTo(Pessoa, {
  foreignKey: 'cdFuncionario',
  targetKey: 'cdPessoa',
  as: 'pessoa',
});

// Projeto <-> SituacaoProj
Projeto.belongsTo(SituacaoProj, {
  foreignKey: "idSituacaoProj",
  targetKey: "cdSituacao",
  as: "situacaoProj",
});
SituacaoProj.hasMany(Projeto, {
  foreignKey: "idSituacaoProj",
  sourceKey: "cdSituacao",
  as: "projetos",
});