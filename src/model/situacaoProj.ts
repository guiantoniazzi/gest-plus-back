import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const SituacaoProj = conSequelize.define(
  "SituacaoProj",
  {
    cdSituacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "CD_SITUACAO",
    },
    descSituacao: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "DESC_SITUACAO",
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: "ATIVO",
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
    tableName: "SITUACAO_PROJ",
    timestamps: false,
  }
);

export default SituacaoProj;