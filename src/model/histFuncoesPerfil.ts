import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const HistFuncoesPerfil = conSequelize.define(
  "HistFuncoesPerfil",
  {
    cdPerfil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_PERFIL",
    },
    cdFuncao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_FUNCAO",
    },
    dtHrAlteracao: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: "DT_HR_ALTERACAO",
    },
  },
  {
    tableName: "HIST_FUNCOES_PERFIL",
    timestamps: false,
  }
);

export default HistFuncoesPerfil;