export function mapProductError(error) {
  if (!error.status) {
    console.log(error);
    
    return "Servidor indisponível";
  }

  switch (error.status) {
    case 400:
      return "Dados inválidos inválidos";
    case 409:
      return "Código já cadastrado";
    case 404:
      return "Não consta no estoque";
    case 500:
      return "Erro interno do servidor";
    default:
      return "Erro inesperado";
  }
}