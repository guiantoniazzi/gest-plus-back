import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';

const FuncoesSistema = conSequelize.define(
  'FuncoesSistema',
  {
    cdFuncao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CD_FUNCAO',
    },
    nomeFuncao: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'NOME_FUNCAO',
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
    tableName: 'FUNCOES_SISTEMA',
    timestamps: false,
  }
);

export default FuncoesSistema;