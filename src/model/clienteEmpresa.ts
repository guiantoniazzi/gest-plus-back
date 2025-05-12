import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const ClienteEmpresa = conSequelize.define(
  "ClienteEmpresa",
  {
    cdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_CLIENTE",
    },
    cdEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_EMPRESA",
    },
    dtInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "DT_INICIO",
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
    tableName: "CLIENTE_EMPRESA",
    timestamps: false,
  }
);

export default ClienteEmpresa;