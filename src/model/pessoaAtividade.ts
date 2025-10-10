import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const PessoaAtividade = conSequelize.define(
  "PessoaAtividade",
  {
    cdPessoa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "CD_PESSOA",
    },
    cdAtiv: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "CD_ATIV",
    },
    dtInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "DT_INICIO",
    },
    dtFim: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_FIM",
    },
    qtdHr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "QTD_HR",
    },
    usuInclusao: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      field: "USU_INCLUSAO",
    },
    dtHrInclusao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "DT_HR_INCLUSAO",
    },
    usuAlteracao: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      field: "USU_ALTERACAO",
    },
    dtHrAlteracao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_HR_ALTERACAO",
    },
  },
  {
    tableName: "PESSOA_ATIVIDADE",
    timestamps: false,
  }
);

export default PessoaAtividade;