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
      set(value) {
        this.setDataValue("cdAtiv", value === "" ? 0 : value);
      }
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
      set(value) {
        this.setDataValue("dtFimPrevista", value === "" ? null : value);
      }
    },
    qtdHrPrevista: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "QTD_HR_PREVISTA",
      set(value) {
        this.setDataValue("qtdHrPrevista", value === "" ? null : value);
      }
    },
    qtdHr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "QTD_HR",
      set(value) {
        this.setDataValue("qtdHr", value === "" ? null : value);
      }
    },
    vlrAtiv: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: "VLR_ATIV",
      set(value) {
        this.setDataValue("vlrAtiv", value === "" ? null : value);
      }
    },
    dtInicioAtiv: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_INICIO_ATIV",
      set(value) {
        this.setDataValue("dtInicioAtiv", value === "" ? null : value);
      }
    },
    dtFimAtiv: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "DT_FIM_ATIV",
      set(value) {
        this.setDataValue("dtFimAtiv", value === "" ? null : value);
      }
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