import { DataTypes } from 'sequelize';
import { conSequelize } from '../repository/connection';

const Pessoas = conSequelize.define('pessoas', {
    cdPessoa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tpPessoa: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        comment: '(F / J)'
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    dtNasc: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cpfCnpj: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    rg: {
        type: DataTypes.CHAR(12),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    ativo: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '(S / N)'
    },
    cliente: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: '(S / N)'
    },
    empresa: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: '(S / N)'
    },
    imagem: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    usuInclusao: {
        type: DataTypes.CHAR(8),
        allowNull: false
    },
    dtHrInclusao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    usuAlteracao: {
        type: DataTypes.CHAR(8),
        allowNull: true
    },
    dtHrAlteracao: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'PESSOA',
    timestamps: false
});

export default Pessoas;