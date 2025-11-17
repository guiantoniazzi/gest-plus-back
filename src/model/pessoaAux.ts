import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';

const PessoaAux = conSequelize.define(
  'PessoaAux',
  {
    cdPessoa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'CD_PESSOA', // Mapeia para a coluna no banco
    },
    cdEmpresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'CD_EMPRESA',
    },
    nome: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: 'NOME',
    },
    dtNasc: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_NASC',
      set(value) {
        this.setDataValue("dtNasc", value === "" ? null : value);
      }
    },
    rg: {
      type: DataTypes.CHAR(12),
      allowNull: true,
      field: 'RG',
      set(value) {
        this.setDataValue("rg", value === "" ? null : value);
      }
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: 'EMAIL',
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: '(S / N)',
      field: 'ATIVO',
    },
    cliente: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: '(S / N)',
      field: 'CLIENTE',
    },
    empresa: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: '(S / N)',
      field: 'EMPRESA',
    },
    imagem: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'IMAGEM',
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
    tableName: 'PESSOA_AUX', // Nome da tabela no banco de dados
    timestamps: false, // Desativa os campos automáticos createdAt e updatedAt
  }
);

export default PessoaAux;