import { DataTypes } from "sequelize";
import { conSequelize } from "../repository/connection";

const Usuario = conSequelize.define(
  "Usuario",
  {
    cdUsuario: {
      type: DataTypes.CHAR(8),
      primaryKey: true,
      field: "CD_USUARIO",
      set(value) {
        this.setDataValue("cdUsuario", value === "" ? null : value);
      }
    },
    cdPessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CD_PESSOA",
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: "ATIVO",
    },
    senha: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      field: "SENHA",
    },
    // dtValid: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: true,
    //   field: "DT_VALID",
    // },
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
    tableName: "USUARIO",
    timestamps: false,
  }
);

export default Usuario;
