import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const Atividade = conSequelize.define(
  "Atividade",
  {
    cdAtiv: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "CD_ATIV",
    },
    cdProj: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CD_PROJ",
    },
    nomeAtiv: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: "NOME_ATIV",
    },
    dtInicioPrevista: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "DT_INICIO_PREVISTA",
    },
    dtFimPrevista: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_FIM_PREVISTA",
    },
    qtdHrPrevista: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "QTD_HR_PREVISTA",
    },
    qtdHr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "QTD_HR",
    },
    vlrAtiv: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: "VLR_ATIV",
    },
    dtInicioAtiv: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_INICIO_ATIV",
    },
    dtFimAtiv: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_FIM_ATIV",
    },
    situacaoAtiv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "SITUACAO_ATIV",
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
    tableName: "ATIVIDADE",
    timestamps: false,
  }
);

export default Atividade;