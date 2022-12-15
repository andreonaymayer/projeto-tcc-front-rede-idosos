import React from 'react';
import '../../../assets/help_styles.scss'
import leftMouse from '../../../../src/tutoriais/img/left-mouse.png'
import rightMouse from '../../../../src/tutoriais/img/right-mouse.png'
import scroolMouse from '../../../../src/tutoriais/img/scrool-mouse.png'
import touchPad from '../../../../src/tutoriais/img/touchpad.png'
import normal from '../../../../src/assets/cursores/CursorNormal'
import ajuda from '../../../../src/assets/cursores/Ajuda'
import link from '../../../../src/assets/cursores/Link'
import proibido from '../../../../src/assets/cursores/Proibido.cur'
import digitando from '../../../../src/assets/cursores/Digitando'
import {Link} from "react-router-dom";

export function HelpInitial() {
  return (
    <>

      <div className="help-container">
        <div className="help-container__info">
          <div className="andreo">
            <Link className='voltar' to='/'>
              <span>Voltar</span>
            </Link>
            <h1 id="preciso-de-ajuda">Preciso de ajuda</h1>
            <p>Como podemos te ajudar?</p>
            <p>Abaixo temos os assuntos que abordamos nesse menu.</p>
            <p>Aqui você vai aprender ou relembrar pequenas dicas e informações de como usar o seu computador.</p>
            <p>E lembre-se, sempre que precisar de ajuda, clique no botão azul <strong><em>Ajuda</em></strong> e
              encontre
              o que precisa saber.</p>
            <h2 id="conte-do">Conteúdo</h2>
            <ul>
              <li><a href="#preciso-de-ajuda">Preciso de ajuda</a>
                <ul>
                  <li><a href="#contedo">Conteúdo</a></li>
                  <li><a href="#o-que-faz-o-mouse">O que faz o mouse?</a>
                    <ul>
                      <li><a href="#ponteiros-do-mouse">Ponteiros do mouse</a></li>
                    </ul>
                  </li>
                  <li><a href="#o-que-faz-o-teclado">O que faz o teclado?</a>
                    <ul>
                      <li><a href="#funes-bsicas-do-teclado">Funções básicas do teclado</a></li>
                      <li><a href="#acentos">Acentos</a></li>
                    </ul>
                  </li>
                  <li><a href="#como-usar-os-campos">Como usar os campos?</a>
                    <ul>
                      <li><a href="#campos-do-tipo-data">Campos do tipo data</a>
                        <ul>
                          <li><a href="#importante-">Importante:</a></li>
                        </ul>
                      </li>
                      <li><a href="#campos-do-tipo-lista-ou-seleo">Campos do tipo lista ou seleção</a></li>
                      <li><a href="#campos-de-texto">Campos de texto</a>

                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <h2 id="o-que-faz-o-mouse">O que faz o mouse?</h2>
            <p>O mouse é a setinha que utilizamos para apontar, como se fosse com o dedo o que queremos fazer no
              computador. Os mouses
              geralmente tem
              2 botões e uma rodinha.</p>
            <table>
              <thead>
              <tr>
                <th>Botão</th>
                <th>Função</th>
                <th>Exemplo</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Esquerdo</td>
                <td>É o que faz uma ação, se clicar com o botão esquerdo do mouse em um botão o computador fará a ação
                  que
                  o botão informa.
                </td>
                <td><img className="img" alt="" src={leftMouse}/></td>
              </tr>
              <tr>
                <td>Direito</td>
                <td>Quando clicado, geralmente mostra todas as opções de ações que o usuário pode ter.</td>
                <td><img className="img" alt="" src={rightMouse}/></td>
              </tr>
              <tr>
                <td>Rodinha</td>
                <td>Pode ser utilizada para descer ou subir a tela</td>
                <td><img className="img" alt="" src={scroolMouse}/></td>
              </tr>
              </tbody>
            </table>
            <p>Observações sobre o mouse:</p>
            <ol>
              <li><p>Para rolar a tela, pode se usar também o gesto de arrastar na barra de rolagem, como no exemplo
                abaixo:</p>
                <p>Para arrastar, clique e segure no botão esquerdo e movimente o mouse.</p>
              </li>
            </ol>
            <ol>
              <li>Se você estiver em um notebook, deve usar o touchpad. Onde voce vai arrastar o dedo em cima para mover
                o
                mouse.
                <p><img className="img" alt="" src={touchPad}/></p>
              </li>
            </ol>
            <h3 id="ponteiros-do-mouse">Ponteiros do mouse</h3>
            <p>Em algumas situações o ponteiro do mouse pode mudar conforme o contexto do elemento que ele está passando
              em cima.</p>
            <table>
              <thead>
              <tr>
                <th>Imagem</th>
                <th>Contexto</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><img className="img" alt="" src={normal}/></td>
                <td>O Cursor normal, visível maior parte do tempo.</td>
              </tr>
              <tr>
                <td><img className="img" alt="" src={ajuda}/></td>
                <td>Indica que é um botão para obter ajuda.</td>
              </tr>
              <tr>
                <td><img className="img" alt="" src={link}/></td>
                <td>Indica que ao clicar, vai executar uma função de um botão ou redirecionar para outra página.</td>
              </tr>
              <tr>
                <td><img className="img" alt="" src={proibido}/></td>
                <td>Indica que o item não está disponível e que nenhuma ação acontecerá.</td>
              </tr>
              <tr>
                <td><img className="img" alt="" src={digitando}/></td>
                <td>Indica que o campo onde está o mouse é uma entrada de textos.</td>
              </tr>
              </tbody>
            </table>
            <h2 id="o-que-faz-o-teclado">O que faz o teclado?</h2>
            <p>O teclado é o responsável por escrever dentro do computador, ele tem muitas semelhanças com a máquina de
              escrever.</p>
            <h3 id="fun-es-b-sicas-do-teclado">Funções básicas do teclado</h3>
            <ol>
              <li>Apagar</li>
              <li>Espaço</li>
              <li>Maiusculo e minusculo / caixa baixa e caixa alta</li>
            </ol>
            <p>Para escrever corretamente precisamos alterar entre letras minusculas e maiúsculas.
              Existem duas formas para fazer esta alteração.</p>
            <table>
              <thead>
              <tr>
                <th>Botão</th>
                <th>Como funciona</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Shift</td>
                <td>Enquanto está pressionado altera todas letras do alfabeto de minúscula para maiúscula e vice-versa.
                  Pressione Shift junto com outra tecla para digitar o símbolo mostrado na parte superior da chave.
                </td>
              </tr>
              <tr>
                <td>Caps lock / Fixa</td>
                <td>Funciona como um interruptor. Um clique deixa todas letras maiúscula e com outro clique deixa todas
                  minúsculas e vice-versa. O teclado pode ter uma luz que indica se Caps Lock está ativada.
                </td>
              </tr>
              <tr>
                <td>Tab / Aba</td>
                <td>Pressione Tab para mover o cursor vários espaços para a frente. Você também pode pressionar Tab para
                  mover-se para a próxima caixa de texto em um formulário.
                </td>
              </tr>
              <tr>
                <td>Barra de espaço</td>
                <td>Pressione a barra de espaços para digitar um espaço para a frente.</td>
              </tr>
              <tr>
                <td>Backspace</td>
                <td>Pressione Backspace para excluir o caractere anterior ao cursor ou o texto selecionado.</td>
              </tr>
              </tbody>
            </table>
            <h3 id="acentos">Acentos</h3>
            <p>Para digitar acentos, procure o botão que tem seu acento no teclado. São duas opções o acento primário e
              o
              secundário.</p>
            <p>Para colocar o acento em uma letra, clique primeiramente no botão do acento e depois na letra em que
              deseja
              coloca-la.</p>
            <p>Caso tenha dúvidas, assista o video abaixo.</p>
            <p>!!! video aqui</p>
            <h2 id="como-usar-os-campos">Como usar os campos?</h2>
            <h3 id="campos-do-tipo-data">Campos do tipo data</h3>
            <p>Os campos do tipo data tem dia, mes e ano com números.</p>
            <ul>
              <li><strong>dd</strong> representa os dias do mês, de 1 ao 31.</li>
              <li><strong>mm</strong> representa os meses do ano, de 1 ao 12.</li>
              <li><strong>aaaa</strong> representa o ano com 4 digitos.</li>
            </ul>
            <p>Ao clicar no campo, as letras <strong>dd</strong> ficam azuladas, nesse momento se você digitar um
              numero,
              irá alterar o valor do dia.
              para dias menores que 10, utilize o 0, ficando 01 para o primeiro dia, 02 para o segundo e assim em
              diante.
            </p>
            <p>Da mesma forma que para o dia (dd), ao clicar no mm ou aaaa, as letras ficarão azuladas demonstrano que a
              edição é possivel. Então basta digitar e substituir.</p>
            <p>Também é possível selecionar a data navegando pelo icone do calendário.</p>
            <ol>
              <li>Clique no icone do calendario.</li>
              <li>Clique no mes e ano atual. Ex: dezembro de 2022</li>
              <li>Suba pela lista com a rodinha do mouse até o ano que deseja.</li>
              <li>Clique no ano que deseja.</li>
              <li>Clique no mês que deseja.</li>
              <li>Clique no dia que deseja.</li>
            </ol>
            <p>Certo, você conseguiu.</p>
            <p>Dica: preencha o campo digitando e selecionando com o mouse. É bem mais fácil.</p>
            <h4 id="importante">Importante:</h4>
            <blockquote>
              <p>Para datas, a tecla Backspace do teclado apaga todo valor inserido de maneira errada, ficando apenas as
                letras do campo.</p>
              <p>Quando precisar corrigir, selecione o que deseja alterar clicando com o mouse, clique em Backspace e
                digite novamente o valor que deseja.</p>
            </blockquote>
            <h3 id="campos-do-tipo-lista-ou-sele-o">Campos do tipo lista ou seleção</h3>
            <p>Os campos de lista e seleção são opções que o site dá para você escolher.
              Na Melhor Rede, utilizamos esse tipo de capo quando você informa seu estado ou cidade.</p>
            <p>Como usar?</p>
            <ol>
              <li>Clique no campo, suba ou desça com a rodinha do mouse ou as setinhas do teclado para cima ou para
                baixo.
              </li>
              <li>Escolha clicando com o mouse (botão esquerdo).</li>
            </ol>
            <p>Dica: Para procurar coisas nas listas, após clicar você pode digitar parte do qnome que procura e o
              seletor
              vai diretamente para a opção, caso ela exista.</p>
            <h3 id="campos-de-texto">Campos de texto</h3>
            <p>É o tipo de campo mais usado na Melhor Rede.
              E também o mais simples.</p>
            <p>Ao clicar em cima, o cursor vai começar a piscar. E já pode ser digitada a informação.</p>
            <p>Dica: Para saber se o campo é do tipo texto, passe o mouse em cima e verifique se o mouse mudou o ícone
              para tipo cursor como mostrado na seção <strong>Ponteiros do mouse</strong></p>
            <div className="fim"></div>
          </div>
        </div>
      </div>
    </>
);
}
