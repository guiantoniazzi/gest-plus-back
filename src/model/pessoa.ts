import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';

const Pessoa = conSequelize.define(
  'Pessoa',
  {
    cdPessoa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CD_PESSOA', // Mapeia para a coluna no banco
    },
    tpPessoa: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: '(F / J)',
      field: 'TP_PESSOA',
    },
    cpfCnpj: {
      type: DataTypes.STRING(14),
      unique: true,
      allowNull: true,
      field: 'CPF_CNPJ',
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
    tableName: 'PESSOA', // Nome da tabela no banco de dados
    timestamps: false, // Desativa os campos automáticos createdAt e updatedAt
  }
);

export default Pessoa;