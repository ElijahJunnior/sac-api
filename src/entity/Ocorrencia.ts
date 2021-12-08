export type OcorrenciaGet = {
    id: string,
    data: string,
    hora: string,
    ultima_data: string,
    ultima_hora: string,
    nome_contato: string,
    telefone_contato: string,
    descricao: string,
    codigo_prioridade: string,
    status: string,
    ultimo_tipo_ocorrencia: string,
    em_atendimento: string,
    nome_sistema: string,
    descricao_tipo_atendimento: string,
    descricao_categoria: string,
    descricao_sub_categoria: string,
    usuario?: UsuarioOcorrencia,
    ultimo_usuario?: UsuarioOcorrencia,
    usuario_atendendo?: UsuarioOcorrencia,
    cliente?: ClienteOcorrencia,
}

export type UsuarioOcorrencia = {
    id: string,
    nome?: string
}

export type ClienteOcorrencia = {
    id: string,
    razao_social?: string,
    nome_fantasia?: string,
    cpf_cnpj?: string,
    perfil?: string
}

export type OcorrenciaPost = {
    id: string,
    data: string,
    hora: string,
    nome_contato: string,
    telefone_contato: string,
    descricao: string,
    codigo_prioridade: string,
    status: string,
    em_atendimento: string,
    id_cliente: string,
    id_usuario: string,
    id_sistema: string,
    id_categoria: string,
    id_subcategoria: string
}