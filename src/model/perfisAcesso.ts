import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';
import FuncoesSistema from './funcoesSistema';
import FuncoesPerfil from './funcoesPerfil';

const PerfisAcesso = conSequelize.define(
  'PerfisAcesso',
  {
    cdPerfil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CD_PERFIL',
    },
    nomePerfil: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'NOME_PERFIL',
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'ATIVO',
    },
    usuInclusao: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      field: 'USU_INCLUSAO',
    },
    dtHrInclusao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'DT_HR_INCLUSAO',
    },
    usuAlteracao: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      field: 'USU_ALTERACAO',
    },
    dtHrAlteracao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_HR_ALTERACAO',
    },
  },
  {
    tableName: 'PERFIL_ACESSO',
    timestamps: false,
  }
);

// Associações
PerfisAcesso.belongsToMany(FuncoesSistema, {
  through: FuncoesPerfil,
  foreignKey: 'cdPerfil',
  otherKey: 'cdFuncao',
  as: 'funcoes',
});

export default PerfisAcesso;