import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const UsuarioEmpresa = conSequelize.define(
  "UsuarioEmpresa",
  {
    cdUsuario: {
      type: DataTypes.CHAR(8),
      primaryKey: true,
      field: "CD_USUARIO",
    },
    cdEmpresa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "CD_EMPRESA",
    },
    dtValid: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "DT_VALID",
    },
    cdPerfil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CD_PERFIL",
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
    tableName: "USUARIO_EMPRESA",
    timestamps: false,
  }
);

export default UsuarioEmpresa;
