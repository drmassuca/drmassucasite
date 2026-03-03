// scripts/seed-faq.js
// Popula a tabela faq_items com os 47 itens do data.js
// Uso: node scripts/seed-faq.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL         = 'https://auvyolzrjoyzsribmapa.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dnlvbHpyam95enNyaWJtYXBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU4MzkwMSwiZXhwIjoyMDg0MTU5OTAxfQ.pGogefEKilEouyBYkxH5aMAMFa7SCANMV-doVgmuYR0';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const FAQ_ITEMS = [
  { section: '1. Função do Ultrassom', question: 'Qual é a função do ultrassom?', slug: 'qual-e-a-funcao-do-ultrassom', short_answer: 'Entenda a função do ultrassom: exame por ondas sonoras que cria imagens em tempo real para diagnóstico, acompanhamento de gestação e guiar procedimentos, sem radiação ionizante' },
  { section: '1. Função do Ultrassom', question: 'Quais doenças o ultrassom detecta?', slug: 'quais-doencas-o-ultrassom-detecta', short_answer: 'Veja exemplos de doenças detectáveis no ultrassom: cálculos, inflamações, nódulos, cistos, tromboses e alterações gestacionais, conforme a região estudada' },
  { section: '1. Função do Ultrassom', question: 'Em quais partes do corpo se faz ultrassonografia?', slug: 'em-quais-partes-do-corpo-se-faz-ultrassonografia', short_answer: 'Ultrassonografia pode avaliar abdome, pelve, mamas, tireoide, articulações, músculos, vasos (Doppler) e gestação, conforme a indicação clínica' },
  { section: '1. Função do Ultrassom', question: 'O que o ultrassom total pode mostrar?', slug: 'o-que-o-ultrassom-total-pode-mostrar', short_answer: 'Entenda o que costuma ser chamado de "ultrassom total": avaliações amplas por regiões (como abdome total), com limites e indicações bem definidos' },
  { section: '1. Função do Ultrassom', question: 'Pode ter relação antes de fazer ultrassonografia?', slug: 'pode-ter-relacao-antes-de-fazer-ultrassonografia', short_answer: 'Relação sexual raramente interfere no ultrassom; exceções podem existir em exames pélvicos específicos' },
  { section: '1. Função do Ultrassom', question: 'Qual o nome do médico que faz ultrassonografia?', slug: 'qual-o-nome-do-medico-que-faz-ultrassonografia', short_answer: 'O exame é realizado e laudado por médico com formação em ultrassonografia, frequentemente radiologista, gineco-obstetra ou especialista da área clínica' },
  { section: '1. Função do Ultrassom', question: 'O resultado da ultrassonografia sai na hora?', slug: 'o-resultado-da-ultrassonografia-sai-na-hora', short_answer: 'Em muitos serviços o laudo sai no mesmo dia; o tempo varia conforme a complexidade do exame e o fluxo do serviço' },
  { section: '1. Função do Ultrassom', question: 'Como mexer no ultrassom?', slug: 'como-mexer-no-ultrassom', short_answer: 'Operação do aparelho é atividade médica/técnica; para pacientes, o importante é o preparo e entender como o exame é realizado e interpretado' },
  { section: '1. Função do Ultrassom', question: 'Como é feito um ultrassom abdominal?', slug: 'como-e-feito-um-ultrassom-abdominal', short_answer: 'Entenda como é feito o ultrassom abdominal: transdutor com gel, avaliação de órgãos abdominais, preparo com jejum e, às vezes, bexiga cheia' },
  { section: '1. Função do Ultrassom', question: 'O que o ultrassom avalia?', slug: 'o-que-o-ultrassom-avalia', short_answer: 'O ultrassom avalia estruturas e funções de órgãos, vasos e tecidos em tempo real; identifica cistos, nódulos, inflamações e fluxo sanguíneo (Doppler)' },
  { section: '1. Função do Ultrassom', question: 'Quais são os riscos da ultrassonografia?', slug: 'quais-sao-os-riscos-da-ultrassonografia', short_answer: 'Ultrassonografia diagnóstica é considerada segura; não usa radiação ionizante' },
  { section: '1. Função do Ultrassom', question: 'Quais são as contraindicações do ultrassom?', slug: 'quais-sao-as-contraindicacoes-do-ultrassom', short_answer: 'Não há contraindicações absolutas para o ultrassom diagnóstico; situações locais podem limitar o exame e exigir adaptações' },
  { section: '1. Função do Ultrassom', question: 'Quais são as vantagens do ultrassom?', slug: 'quais-sao-as-vantagens-do-ultrassom', short_answer: 'Vantagens do ultrassom: segurança, ausência de radiação, avaliação dinâmica, custo acessível e uso amplo em diagnóstico e procedimentos' },
  { section: '2. Tipos de Ultrassom', question: 'Qual o ultrassom mais completo?', slug: 'ultrassom-mais-completo', short_answer: 'Entenda por que não existe um "ultrassom mais completo" para tudo e como a escolha depende da indicação clínica, região estudada e modos usados' },
  { section: '2. Tipos de Ultrassom', question: 'Quais são os modos do ultrassom?', slug: 'modos-ultrassom-b-m-doppler', short_answer: 'Conheça os principais modos do ultrassom: modo B, M, Doppler (color, power, espectral) e 3D/4D, e quando cada um é utilizado' },
  { section: '2. Tipos de Ultrassom', question: 'O que a ultrassonografia identifica?', slug: 'o-que-a-ultrassonografia-identifica', short_answer: 'Saiba o que a ultrassonografia pode identificar: cistos, nódulos, inflamações, cálculos, coleções e alterações de fluxo sanguíneo com Doppler' },
  { section: '2. Tipos de Ultrassom', question: 'Quais são os 4 tipos de ecogenicidade na ultrassonografia?', slug: 'quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia', short_answer: 'Entenda a ecogenicidade: anecoico, hipoecoico, isoecoico e hiperecoico — o que significam na prática e por que variam conforme o tecido' },
  { section: '2. Tipos de Ultrassom', question: 'Qual ultrassom é mais importante?', slug: 'qual-ultrassom-e-mais-importante', short_answer: 'Não existe um ultrassom "mais importante" universalmente; a prioridade depende da queixa, do órgão-alvo e do momento clínico' },
  { section: '2. Tipos de Ultrassom', question: 'Qual o tipo de ultrassom que vê todos os órgãos?', slug: 'qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos', short_answer: 'Não existe ultrassom único que avalie todos os órgãos com detalhe; usam-se exames por região (abdome, pelve, mamas, tireoide, doppler, etc)' },
  { section: '2. Tipos de Ultrassom', question: 'Quais são os tipos de aparelhos de ultrassom?', slug: 'quais-sao-os-tipos-de-aparelhos-de-ultrassom', short_answer: 'Conheça categorias de aparelhos de ultrassom: portáteis, de console e de alta performance, além dos principais transdutores utilizados' },
  { section: '2. Tipos de Ultrassom', question: 'O que o ultrassom abdominal total detecta?', slug: 'o-que-o-ultrassom-abdominal-total-detecta', short_answer: 'Veja o que o ultrassom abdominal total pode detectar: fígado, vesícula, vias biliares, pâncreas, baço, rins, bexiga e aorta, entre outros' },
  { section: '2. Tipos de Ultrassom', question: 'Como se chama um ultrassom normal?', slug: 'como-se-chama-um-ultrassom-normal', short_answer: '"Ultrassom normal" geralmente refere-se a exame sem achados patológicos relevantes para a indicação clínica' },
  { section: '2. Tipos de Ultrassom', question: 'Qual o preparo para fazer ultrassonografia abdominal total?', slug: 'qual-o-preparo-para-fazer-ultrassonografia-abdominal-total', short_answer: 'Preparo típico inclui jejum e, em alguns casos, bexiga cheia; confirme as orientações do serviço antes do exame' },
  { section: '2. Tipos de Ultrassom', question: 'Qual ultrassom indica gravidez?', slug: 'qual-ultrassom-indica-gravidez', short_answer: 'A confirmação é feita pelo ultrassom obstétrico inicial, que pode mostrar saco gestacional, vesícula vitelínica e, depois, batimentos cardíacos' },
  { section: '3. Valor e Acesso', question: 'Qual ultrassom é feito pelo SUS?', slug: 'qual-ultrassom-e-feito-pelo-sus', short_answer: 'Entenda como o SUS oferta ultrassonografias: depende da indicação clínica e regulação local, com prioridade para exames com impacto assistencial' },
  { section: '3. Valor e Acesso', question: 'Qual ultrassom é mais caro?', slug: 'qual-ultrassom-e-mais-caro', short_answer: 'Entenda por que exames com protocolos longos e recursos avançados (morfológico, Doppler, 3D/4D) tendem a custar mais; valores variam por região e serviço' },
  { section: '3. Valor e Acesso', question: 'É possível fazer um ultrassom sem pedido médico?', slug: 'e-possivel-fazer-ultrassom-sem-pedido-medico', short_answer: 'No privado, alguns exames podem ser feitos sem pedido, mas é recomendável avaliação médica' },
  { section: '3. Valor e Acesso', question: 'Quando fazer a primeira ultrassonografia?', slug: 'quando-fazer-a-primeira-ultrassonografia', short_answer: 'Na gestação, a primeira eco costuma ser entre 5–8 semanas para confirmar localização, vitalidade e datar' },
  { section: '3. Valor e Acesso', question: 'O resultado da ultrassonografia sai na hora?', slug: 'o-resultado-da-ultrassonografia-sai-na-hora-3', short_answer: 'Em muitos serviços, o laudo sai no mesmo dia. O tempo depende da complexidade do exame e do fluxo de trabalho' },
  { section: '3. Valor e Acesso', question: 'Qual o nome do ultrassonografista para ver o bebê?', slug: 'qual-o-nome-do-ultrassonografista-para-ver-o-bebe', short_answer: 'O ultrassom obstétrico é realizado por médico ultrassonografista, frequentemente gineco-obstetra com formação em imagem fetal' },
  { section: '3. Valor e Acesso', question: 'Qual ultrassom fazer com 6 semanas?', slug: 'qual-ultrassom-fazer-com-6-semanas', short_answer: 'Em torno de 6 semanas, o ultrassom transvaginal costuma mostrar saco gestacional, vesícula vitelínica e, muitas vezes, embrião com batimentos' },
  { section: '3. Valor e Acesso', question: 'Quantos dias vale um ultrassom?', slug: 'quantos-dias-vale-um-ultrassom', short_answer: 'O laudo não tem "validade legal" universal; a utilidade clínica depende do objetivo (pré-operatório, gestação, dor aguda) e de exigências de convênios' },
  { section: '3. Valor e Acesso', question: 'Quais exames de ultrassonografia na gravidez?', slug: 'quais-exames-de-ultrassonografia-na-gravidez', short_answer: 'Linha do tempo usual: ultrassom inicial (5–8s), morfológico do 1º tri (11–14s), morfológico do 2º tri (20–24s) e dopplers/crescimento no 3º tri' },
  { section: '3. Valor e Acesso', question: 'Qual a melhor semana para fazer ultrassonografia 3D?', slug: 'qual-a-melhor-semana-para-fazer-ultrassonografia-3d', short_answer: 'Em geral, 26–30 semanas oferecem bom equilíbrio entre volume fetal, líquido amniótico e posição; pode variar conforme cada gestação' },
  { section: '3. Valor e Acesso', question: 'O que é um ultrassom obstétrico normal?', slug: 'o-que-e-um-ultrassom-obstetrico-normal', short_answer: 'Exame compatível com a idade gestacional, com localização intrauterina, batimentos, biometria esperada e ausência de achados patológicos relevantes' },
  { section: '3. Valor e Acesso', question: 'Precisa de pedido médico para fazer ultrassom morfológico?', slug: 'precisa-de-pedido-medico-para-fazer-ultrassom-morfologico', short_answer: 'Em regra, sim: serviços e convênios normalmente exigem solicitação médica para o morfológico; no SUS, é obrigatório via regulação' },
  { section: '4. Indicações do Ultrassom', question: 'Qual o momento certo para fazer ultrassonografia?', slug: 'qual-o-momento-certo-para-fazer-ultrassonografia', short_answer: 'O momento depende da indicação clínica. Em gestação, janelas típicas são 5–8s (inicial), 11–14s (1º tri) e 20–24s (2º tri)' },
  { section: '4. Indicações do Ultrassom', question: 'O ultrassom é 100% confiável?', slug: 'o-ultrassom-e-100-confiavel', short_answer: 'Acurácia é alta para muitas indicações, mas depende do biotipo, preparo, técnica e experiência do operador' },
  { section: '4. Indicações do Ultrassom', question: 'O que é necessário para se preparar para um ultrassom abdominal?', slug: 'o-que-e-necessario-para-se-preparar-para-um-ultrassom-abdominal', short_answer: 'Preparo habitual inclui jejum e controle de gases; alguns serviços pedem bexiga cheia' },
  { section: '4. Indicações do Ultrassom', question: 'Quanto tempo o ultrassom faz efeito?', slug: 'quanto-tempo-o-ultrassom-faz-efeito', short_answer: 'O ultrassom diagnóstico não tem "efeito" farmacológico; é uma avaliação por imagem no momento do exame, sem ação residual no corpo' },
  { section: '4. Indicações do Ultrassom', question: 'Qual o primeiro ultrassom que deve ser feito?', slug: 'qual-o-primeiro-ultrassom-que-deve-ser-feito', short_answer: 'Em gestação, o primeiro costuma ser o ultrassom obstétrico inicial (5–8s). Para outras queixas, o médico direciona o exame adequado' },
  { section: '4. Indicações do Ultrassom', question: 'Precisa de jejum para fazer ultrassonografia?', slug: 'precisa-de-jejum-para-fazer-ultrassonografia', short_answer: 'Em muitas avaliações abdominais, sim: jejum de 6–8h. Outros exames não exigem jejum; siga o preparo do pedido' },
  { section: '4. Indicações do Ultrassom', question: 'Como o ultrassom age no corpo?', slug: 'como-o-ultrassom-age-no-corpo', short_answer: 'O ultrassom diagnóstico usa ondas sonoras refletidas pelos tecidos para formar imagens; não utiliza radiação ionizante' },
];

async function seed() {
  console.log(`Inserindo ${FAQ_ITEMS.length} itens no Supabase do drmassuca...`);

  const items = FAQ_ITEMS.map(item => ({
    question:     item.question,
    short_answer: item.short_answer,
    slug:         item.slug,
    section:      item.section,
    ai_generated: false,
    approved:     true,
  }));

  const { data, error } = await supabase
    .from('faq_items')
    .upsert(items, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Erro:', error.message);
    process.exit(1);
  }

  console.log(`✅ ${data.length} itens inseridos com sucesso!`);
}

seed();
