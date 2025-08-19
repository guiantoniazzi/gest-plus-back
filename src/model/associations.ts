import Pessoa from "./pessoa";
import PessoaAux from "./pessoaAux";

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
