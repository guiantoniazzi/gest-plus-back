import Atividade from "./atividade";
import FuncionarioCliente from "./funcionarioCliente";
import Pessoa from "./pessoa";
import PessoaAtividade from "./pessoaAtividade";
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

// Projeto <-> Atividade
Projeto.hasMany(Atividade, {
  foreignKey: "cdProj",
  sourceKey: "cdProj",
  as: "atividades",
});
Atividade.belongsTo(Projeto, {
  foreignKey: "cdProj",
  targetKey: "cdProj",
  as: "projeto",
});

// SituaçãoProj <-> Atividade
SituacaoProj.hasMany(Atividade, {
  foreignKey: "situacaoAtiv",
  sourceKey: "cdSituacao",
  as: "atividades",
});
Atividade.belongsTo(SituacaoProj, {
  foreignKey: "situacaoAtiv",
  targetKey: "cdSituacao",
  as: "situacaoProj",
});

// Pessoa <-> PessoaAtividade
Pessoa.hasMany(PessoaAtividade, {
  foreignKey: "cdPessoa",
  sourceKey: "cdPessoa",
  as: "atividadesPessoa",
});
PessoaAtividade.belongsTo(Pessoa, {
  foreignKey: "cdPessoa",
  targetKey: "cdPessoa",
  as: "pessoa",
});

// Atividade <-> PessoaAtividade
Atividade.hasMany(PessoaAtividade, {
  foreignKey: "cdAtiv",
  sourceKey: "cdAtiv",
  as: "pessoasAtividade",
});
PessoaAtividade.belongsTo(Atividade, {
  foreignKey: "cdAtiv",
  targetKey: "cdAtiv",
  as: "atividade",
});

// PessoaAtividade <-> PessoaAux
PessoaAtividade.belongsTo(PessoaAux, {
  foreignKey: 'cdPessoa',
  targetKey: 'cdPessoa',
  as: 'pessoaAux',
});
PessoaAux.hasMany(PessoaAtividade, {
  foreignKey: 'cdPessoa',
  sourceKey: 'cdPessoa',
  as: 'atividadesPessoaAux',
});