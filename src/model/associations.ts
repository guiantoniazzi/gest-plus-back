import Atividade from "./atividade";
import FuncionarioCliente from "./funcionarioCliente";
import PerfisAcesso from "./perfisAcesso";
import HistoricoProjeto from "./historico/historicoProjeto";
import Pessoa from "./pessoa";
import PessoaAtividade from "./pessoaAtividade";
import PessoaAux from "./pessoaAux";
import Projeto from "./projeto";
import SituacaoProj from "./situacaoProj";
import Usuario from "./usuario";
import UsuarioEmpresa from "./usuarioEmpresa";

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

// HistoricoProjeto <-> SituacaoProj
HistoricoProjeto.belongsTo(SituacaoProj, {
  foreignKey: "idSituacaoProj",
  targetKey: "cdSituacao",
  as: "situacaoProj",
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

// 🔹 Usuário pertence a uma pessoa (1:1)
Usuario.belongsTo(Pessoa, {
  foreignKey: "cdPessoa",
  targetKey: "cdPessoa",
  as: "pessoa",
});
Pessoa.hasOne(Usuario, {
  foreignKey: "cdPessoa",
  sourceKey: "cdPessoa",
  as: "usuario",
});

// 🔹 Usuário ↔ Empresa (N:N via UsuarioEmpresa)
// Empresa também é Pessoa
Usuario.belongsToMany(Pessoa, {
  through: UsuarioEmpresa,
  foreignKey: "cdUsuario",   // campo em USUARIO_EMPRESA
  otherKey: "cdEmpresa",     // empresa é um pessoa
  as: "empresas",
});

Pessoa.belongsToMany(Usuario, {
  through: UsuarioEmpresa,
  foreignKey: "cdEmpresa",   // empresa é pessoa
  otherKey: "cdUsuario",     // usuário
  as: "usuarios",
});

// 🔹 UsuarioEmpresa pertence a Usuario e Pessoa (empresa)
UsuarioEmpresa.belongsTo(Usuario, {
  foreignKey: "cdUsuario",
  targetKey: "cdUsuario",
  as: "usuario",
});

UsuarioEmpresa.belongsTo(Pessoa, {
  foreignKey: "cdEmpresa",
  targetKey: "cdPessoa",
  as: "empresa", // empresa também é pessoa
});

// 🔹 UsuarioEmpresa tem Perfil de Acesso
UsuarioEmpresa.belongsTo(PerfisAcesso, {
  foreignKey: "cdPerfil",
  targetKey: "cdPerfil",
  as: "perfil",
});

// (Opcional, se precisar do lado do perfil)
PerfisAcesso.hasMany(UsuarioEmpresa, {
  foreignKey: "cdPerfil",
  sourceKey: "cdPerfil",
  as: "usuariosEmpresa",
});
