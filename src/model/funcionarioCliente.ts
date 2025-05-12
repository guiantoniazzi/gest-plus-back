import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const FuncionarioCliente = conSequelize.define(
  "FuncionarioCliente",
  {
    cdFuncionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_FUNCIONARIO",
    },
    cdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CD_CLIENTE",
    },
    dtInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "DT_INICIO",
    },
    cargoFuncionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CARGO_FUNCIONARIO",
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
    tableName: "FUNCIONARIO_CLIENTE",
    timestamps: false,
  }
);

export default FuncionarioCliente;