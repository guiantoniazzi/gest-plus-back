import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const HistPerfisAcesso = conSequelize.define(
  "HistPerfisAcesso",
  {
    cdPerfil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_PERFIL",
    },
    dtHrAlteracao: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: "DT_HR_ALTERACAO",
    },
    nomePerfil: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "NOME_PERFIL",
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: "ATIVO",
    },
  },
  {
    tableName: "HIST_PERFIL_ACESSO",
    timestamps: false,
  }
);

export default HistPerfisAcesso;