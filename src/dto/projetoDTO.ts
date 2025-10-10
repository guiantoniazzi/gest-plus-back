export default class ProjetoDTO {
  cdProj?: number;
  cdEmpresa!: number;
  cdCliente!: number;
  idProjInterno!: string;
  idProjCliente?: string;
  tpProj!: string;
  nomeProj!: string;
  cdRespProj!: number;
  dtInicioAvaliacao!: Date;
  dtInicioNegociacao?: Date;
  dtInicioPrevista!: Date;
  dtFimPrevista?: Date;
  qtdHrProj!: number;
  vlrHrProj!: number;
  vlrBaseProj!: number;
  vlrDescontoComercial!: number;
  vlrAcrescimoProjeto!: number;
  vlrFinalProjeto!: number;
  dtInicioProj!: Date;
  dtFimProj?: Date;
  vlrFaturado!: number;
  situacaoProj!: number;
  usuInclusao!: string;
  dtHrInclusao?: Date;
  usuAlteracao?: string;
  dtHrAlteracao?: Date;
}