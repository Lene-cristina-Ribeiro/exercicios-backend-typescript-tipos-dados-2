const fs = require('fs');

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escreverArquivos = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];

    bd.push(dados);

    escreverArquivos(bd);

    return dados;
}

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];
    const usuarios = bd.filter(usuario => {
        if(filtro) {
            return usuario.profissao === filtro;
        }
        return usuario;
    })

    return usuarios;
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if(!usuario){
        throw new Error("Usuario não encontrado.");
        
    }

    return usuario;
}

const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if(!usuario){
        throw new Error("Usuario não encontrado.");
        
    }

    Object.assign(usuario, dados);

    console.log(bd);
    
}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if(!usuario){
        throw new Error("Usuario não encontrado.");
        
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf != cpf
    })

    escreverArquivos(exclusao);

    return usuario;
}

// cadastrarUsuario({
//     nome: "Lene",
//     email: "lene@gmail.com",
//     cpf: '12345678944',
//     profissao: 'full-stack',
//     endereco: {
//         cep: '12345-678',
//         rua: 'rua B',
//         bairro: 'centro',
//         cidade: 'ludo'
//     }
// })

const bd = listarUsuarios();
console.log( bd);

