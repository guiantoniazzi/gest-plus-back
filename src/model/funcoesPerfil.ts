import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';

const FuncoesPerfil = conSequelize.define(
  'FuncoesPerfil',
  {
    cdPerfil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CD_PERFIL',
    },
    cdFuncao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CD_FUNCAO',
    },
    dtHrAlteracao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_HR_ALTERACAO',
    },
  },
  {
    tableName: 'FUNCOES_PERFIL',
    timestamps: false,
  }
);

export default FuncoesPerfil;