package com.api.backend.servico;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.api.backend.modelo.ReceitaModelo;
import com.api.backend.repositorio.ReceitaRepositorio;

@DataJpaTest
@ActiveProfiles("test")
public class ReceitaServicoTest {
    @Mock
    private ReceitaRepositorio mockReceitaRepositorio;
    @InjectMocks
    private ReceitaServico receitaServico;

    @Test
    void testAddReceita() {
        // Cria uma instância do ReceitaRepositorio mock
        ReceitaRepositorio mockReceitaRepositorio = Mockito.mock(ReceitaRepositorio.class);

        // Cria uma instância do ReceitaServico injetando o mockReceitaRepositorio
        ReceitaServico receitaServico = new ReceitaServico(mockReceitaRepositorio);

        // Cria uma instância de ReceitaModelo para adicionar
        ReceitaModelo novaReceita = new ReceitaModelo();
        novaReceita.setDescricao("Receita Teste");

        // Configura o comportamento esperado do mockReceitaRepositorio
        Mockito.when(mockReceitaRepositorio.save(Mockito.any(ReceitaModelo.class))).thenReturn(novaReceita);

        // Chama o método addReceita do ReceitaServico
        ReceitaModelo receitaAdicionada = receitaServico.addReceita(novaReceita);

        // Verifica se o método save foi chamado no mockReceitaRepositorio
        Mockito.verify(mockReceitaRepositorio, Mockito.times(1)).save(Mockito.any(ReceitaModelo.class));

        // Verifica se a receita retornada não é nula
        assertNotNull(receitaAdicionada);

        /*PARA SIMULAR CONDICAO DE ERRO
         * Salvar receita como null 
         * Mockito.when(mockReceitaRepositorio.save(Mockito.any(ReceitaModelo.class))).thenReturn(null);
        */
        
    }

    @Test
    void testDeleteReceita() {
        // Cria uma instância de ReceitaModelo para adicionar
        ReceitaModelo novaReceita = new ReceitaModelo();
        novaReceita.setId(1L);
        novaReceita.setDescricao("Receita Teste");

        // Configura o comportamento esperado do mockReceitaRepositorio para adicionar a receita
        when(mockReceitaRepositorio.save(any(ReceitaModelo.class))).thenReturn(novaReceita);

        // Adiciona a receita usando o serviço
        receitaServico.addReceita(novaReceita);

        // Verifica se o método save foi chamado no mockReceitaRepositorio
        verify(mockReceitaRepositorio, times(1)).save(any(ReceitaModelo.class));

        // Configura o comportamento esperado do mockReceitaRepositorio para deletar a receita
        doNothing().when(mockReceitaRepositorio).deleteById(1L);

        // Deleta a receita usando o serviço
        receitaServico.deleteReceita(1L);

        // Verifica se o método deleteById foi chamado no mockReceitaRepositorio
        verify(mockReceitaRepositorio, times(1)).deleteById(1L);

        // Configura o comportamento esperado do mockReceitaRepositorio para retornar uma lista vazia
        when(mockReceitaRepositorio.findAll()).thenReturn(new ArrayList<>());

        // Obtém a lista de receitas usando o serviço após a exclusão
        List<ReceitaModelo> listaDeReceitas = receitaServico.getAllReceitas();

        // Verifica se a lista de receitas está vazia
        assertTrue(listaDeReceitas.isEmpty());

        /*PARA SIMULAR CONDICAO DE ERRO
         * tentar deletar receita com ID diferente de 1
         * receitaServico.deleteReceita(2L);
        */
    }

    @Test
    void testGetAllReceitas() {
        // Cria uma instância do ReceitaRepositorio mock
        ReceitaRepositorio mockReceitaRepositorio = Mockito.mock(ReceitaRepositorio.class);

        // Cria uma instância do ReceitaServico injetando o mockReceitaRepositorio
        ReceitaServico receitaServico = new ReceitaServico(mockReceitaRepositorio);

        // Configura o comportamento esperado do mockReceitaRepositorio
        List<ReceitaModelo> listaDeReceitas = List.of(new ReceitaModelo(), new ReceitaModelo()); //criou 2 receitas
        Mockito.when(mockReceitaRepositorio.findAll()).thenReturn(listaDeReceitas);

        // Chama o método getAllReceitas do ReceitaServico
        List<ReceitaModelo> receitasEncontradas = receitaServico.getAllReceitas();

        // Verifica se o método findAll foi chamado no mockReceitaRepositorio
        Mockito.verify(mockReceitaRepositorio, Mockito.times(1)).findAll();

        // Verifica se a lista de receitas retornada não é nula e contém os itens esperados
        assertNotNull(receitasEncontradas);
        assertEquals(2, receitasEncontradas.size());

        /*PARA SIMULAR CONDICAO DE ERRO
         * modifica a quantidade de receitas esperadas
         * assertEquals(5, receitasEncontradas.size());
        */
    }

}

/*O Mockito é uma biblioteca de mocking em Java que ajuda a criar objetos simulados (ou mocks) para testes unitários. 
 *Quando você usa o Mockito para criar mocks para seus repositórios, você está substituindo a necessidade de uma conexão real com o banco de dados. Em vez de acessar o banco de dados real durante o teste, o Mockito intercepta chamadas ao repositório e retorna resultados simulados.
 */