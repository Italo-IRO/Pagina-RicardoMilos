Como executar
1. Descompacte o conteúdo (ou coloque os arquivos em uma pasta).
2. Abra `index.html` no navegador (funciona localmente sem servidor).
3. Substitua o valor do input `#waNumber` pelo seu número no formato DDI+DDD+NUM (apenas dígitos), ex.: `63999999999`.

Conceitos aplicados
- **Flexbox**: navegação e header usam Flexbox; em mobile a navegação vira off-canvas controlada por JS.
- **CSS Grid**: cards e galeria usam `repeat(auto-fit, minmax(...))` para layout fluido.
- **RWD**: imagens fluidas (`max-width:100%`), Column Drop (article+aside colapsam), Off-Canvas Navigation, Tiny Tweaks e Content Hiding.
- **Acessibilidade**: foco visível, `aria-` atributos mínimos e `alt` em imagens.
- **JavaScript (Eventos)**: `click`, `mouseover`, `keydown` (Esc), `scroll`, `submit` — validação e montagem da URL do WhatsApp.
- **Formulário**: validação HTML5 (required, minlength, type=email) e mensagens de erro/sucesso exibidas dinamicamente.