import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';

const Projeto = conSequelize.define(
  'Projeto',
  {
    cdProj: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CD_PROJ',
      set(value) {
        this.setDataValue("cdProj", value === "" ? 0 : value);
      }
    },
    cdEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CD_EMPRESA',
    },
    cdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CD_CLIENTE',
    },
    idProjInterno: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'ID_PROJ_INTERNO',
    },
    idProjCliente: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'ID_PROJ_CLIENTE',
    },
    tpProj: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'TP_PROJ',
      comment: '(A / P)',
    },
    nomeProj: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: 'NOME_PROJ',
    },
    cdRespProj: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CD_RESP_PROJ',
    },
    dtInicioAvaliacao: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'DT_INICIO_AVALIACAO',
    },
    dtInicioNegociacao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_INICIO_NEGOCIACAO',
      set(value) {
        this.setDataValue("dtInicioNegociacao", value === "" ? null : value);
      }
    },
    dtInicioPrevista: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'DT_INICIO_PREVISTA',
    },
    dtFimPrevista: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_FIM_PREVISTA',
      set(value) {
        this.setDataValue("dtFimPrevista", value === "" ? null : value);
      }
    },
    qtdHrProj: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'QTD_HR_PROJ',
    },
    vlrHrProj: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'VLR_HR_PROJ',
    },
    vlrBaseProj: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'VLR_BASE_PROJ',
    },
    vlrDescontoComercial: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'VLR_DESCONTO_COMERCIAL',
      set(value) {
        this.setDataValue("vlrDescontoComercial", value === "" ? 0 : value);
      }
    },
    vlrAcrescimoProjeto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'VLR_ACRESCIMO_PROJETO',
      set(value) {
        this.setDataValue("vlrAcrescimoProjeto", value === "" ? 0 : value);
      }
    },
    vlrFinalProjeto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'VLR_FINAL_PROJETO',
      set(value) {
        this.setDataValue("vlrFinalProjeto", value === "" ? 0 : value);
      }
    },
    dtInicioProj: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'DT_INICIO_PROJ',
    },
    dtFimProj: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_FIM_PROJ',
      set(value) {
        this.setDataValue("dtFimProj", value === "" ? null : value);
      }
    },
    vlrFaturado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'VLR_FATURADO',
      set(value) {
        this.setDataValue("vlrFaturado", value === "" ? 0 : value);
      }
    },
    idSituacaoProj: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'SITUACAO_PROJ',
    },
    usuInclusao: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      field: 'USU_INCLUSAO',
    },
    dtHrInclusao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'DT_HR_INCLUSAO',
    },
    usuAlteracao: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      field: 'USU_ALTERACAO',
    },
    dtHrAlteracao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DT_HR_ALTERACAO',
    },
  },
  {
    tableName: 'PROJETO',
    timestamps: false,
  }
);

export default Projeto;