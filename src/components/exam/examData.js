/**
 * Dados centralizados dos exames — relacionados, FAQs, mensagens WhatsApp e legendas.
 * Importado pelos componentes reutilizáveis de exame.
 */

/* ─── Mapeamento de exames relacionados ─────────────────────────────────── */
export const relatedExams = {
  /* Obstétricos */
  'obstetrico-de-rotina': [
    {
      slug: 'morfologico-segundo-trimestre',
      icon: '🔬',
      label: 'Morfológico 2º Tri',
      desc: 'Avaliação anatômica detalhada do bebê',
    },
    {
      slug: 'doppler-obstetrico',
      icon: '🩸',
      label: 'Doppler Obstétrico',
      desc: 'Avalia fluxo sanguíneo mãe-placenta-bebê',
    },
    {
      slug: 'ecocardiografia-fetal',
      icon: '🫀',
      label: 'Ecocardiografia Fetal',
      desc: 'Avaliação detalhada do coração fetal',
    },
  ],
  'morfologico-primeiro-trimestre': [
    {
      slug: 'morfologico-segundo-trimestre',
      icon: '🔬',
      label: 'Morfológico 2º Tri',
      desc: 'Avaliação anatômica entre 20–24 semanas',
    },
    {
      slug: 'obstetrico-de-rotina',
      icon: '👶',
      label: 'Obstétrico de Rotina',
      desc: 'Acompanhamento do crescimento fetal',
    },
    {
      slug: 'ecocardiografia-fetal',
      icon: '🫀',
      label: 'Ecocardiografia Fetal',
      desc: 'Avaliação do coração do bebê',
    },
  ],
  'morfologico-segundo-trimestre': [
    {
      slug: 'ecocardiografia-fetal',
      icon: '🫀',
      label: 'Ecocardiografia Fetal',
      desc: 'Avaliação detalhada do coração fetal',
    },
    {
      slug: 'doppler-obstetrico',
      icon: '🩸',
      label: 'Doppler Obstétrico',
      desc: 'Avalia fluxo sanguíneo mãe-placenta-bebê',
    },
    {
      slug: 'obstetrico-de-rotina',
      icon: '👶',
      label: 'Obstétrico de Rotina',
      desc: 'Acompanhamento do crescimento fetal',
    },
  ],
  'doppler-obstetrico': [
    {
      slug: 'morfologico-segundo-trimestre',
      icon: '🔬',
      label: 'Morfológico 2º Tri',
      desc: 'Avaliação anatômica detalhada do bebê',
    },
    {
      slug: 'ecocardiografia-fetal',
      icon: '🫀',
      label: 'Ecocardiografia Fetal',
      desc: 'Avaliação do coração do bebê',
    },
    {
      slug: 'obstetrico-de-rotina',
      icon: '👶',
      label: 'Obstétrico de Rotina',
      desc: 'Acompanhamento do crescimento fetal',
    },
  ],
  'ecocardiografia-fetal': [
    {
      slug: 'morfologico-segundo-trimestre',
      icon: '🔬',
      label: 'Morfológico 2º Tri',
      desc: 'Avaliação anatômica detalhada do bebê',
    },
    {
      slug: 'doppler-obstetrico',
      icon: '🩸',
      label: 'Doppler Obstétrico',
      desc: 'Avalia fluxo sanguíneo mãe-placenta-bebê',
    },
    {
      slug: 'obstetrico-de-rotina',
      icon: '👶',
      label: 'Obstétrico de Rotina',
      desc: 'Acompanhamento do crescimento fetal',
    },
  ],

  /* Ginecológicos */
  endovaginal: [
    {
      slug: 'pesquisa-de-endometriose-com-preparo',
      icon: '🔎',
      label: 'Pesquisa de Endometriose',
      desc: 'Mapeamento com preparo intestinal',
    },
    {
      slug: 'monitorizacao-da-ovulacao',
      icon: '📊',
      label: 'Monitorização da Ovulação',
      desc: 'Acompanhamento folicular seriado',
    },
    {
      slug: 'pelvico-via-abdominal',
      icon: '🩺',
      label: 'Pélvico Via Abdominal',
      desc: 'Avaliação pélvica não invasiva',
    },
  ],
  mamas: [
    {
      slug: 'ultrassonografia-de-tireoide-com-ou-sem-doppler',
      icon: '🦋',
      label: 'Tireoide',
      desc: 'Avaliação de nódulos e alterações',
    },
    {
      slug: 'ultrassonografia-cervical-com-ou-sem-doppler',
      icon: '🔍',
      label: 'Cervical',
      desc: 'Linfonodos e glândulas do pescoço',
    },
    {
      slug: 'endovaginal',
      icon: '🩺',
      label: 'Endovaginal',
      desc: 'Avaliação ginecológica detalhada',
    },
  ],
  'pelvico-via-abdominal': [
    {
      slug: 'endovaginal',
      icon: '🩺',
      label: 'Endovaginal',
      desc: 'Avaliação interna mais detalhada',
    },
    {
      slug: 'pesquisa-de-endometriose-com-preparo',
      icon: '🔎',
      label: 'Pesquisa de Endometriose',
      desc: 'Mapeamento com preparo intestinal',
    },
    {
      slug: 'monitorizacao-da-ovulacao',
      icon: '📊',
      label: 'Monitorização da Ovulação',
      desc: 'Acompanhamento folicular seriado',
    },
  ],
  'pesquisa-de-endometriose-com-preparo': [
    {
      slug: 'endovaginal',
      icon: '🩺',
      label: 'Endovaginal',
      desc: 'Avaliação ginecológica detalhada',
    },
    {
      slug: 'pelvico-via-abdominal',
      icon: '🩺',
      label: 'Pélvico Via Abdominal',
      desc: 'Avaliação pélvica não invasiva',
    },
    {
      slug: 'monitorizacao-da-ovulacao',
      icon: '📊',
      label: 'Monitorização da Ovulação',
      desc: 'Acompanhamento folicular seriado',
    },
  ],
  'monitorizacao-da-ovulacao': [
    {
      slug: 'endovaginal',
      icon: '🩺',
      label: 'Endovaginal',
      desc: 'Avaliação ginecológica detalhada',
    },
    {
      slug: 'pelvico-via-abdominal',
      icon: '🩺',
      label: 'Pélvico Via Abdominal',
      desc: 'Avaliação pélvica não invasiva',
    },
    {
      slug: 'pesquisa-de-endometriose-com-preparo',
      icon: '🔎',
      label: 'Pesquisa de Endometriose',
      desc: 'Mapeamento com preparo intestinal',
    },
  ],

  /* Abdominais */
  total: [
    {
      slug: 'superior',
      icon: '⬆️',
      label: 'Abdome Superior',
      desc: 'Fígado, vesícula, pâncreas e baço',
    },
    {
      slug: 'inferior',
      icon: '⬇️',
      label: 'Abdome Inferior',
      desc: 'Pelve, bexiga e vias urinárias',
    },
    {
      slug: 'ultrassonografia-rins-e-vias-urinarias',
      icon: '🫘',
      label: 'Rins e Vias Urinárias',
      desc: 'Cálculos, hidronefrose e bexiga',
    },
  ],
  superior: [
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
    {
      slug: 'inferior',
      icon: '⬇️',
      label: 'Abdome Inferior',
      desc: 'Pelve, bexiga e vias urinárias',
    },
    {
      slug: 'parede-abdominal',
      icon: '🧱',
      label: 'Parede Abdominal',
      desc: 'Hérnias, músculos e fáscias',
    },
  ],
  inferior: [
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
    {
      slug: 'superior',
      icon: '⬆️',
      label: 'Abdome Superior',
      desc: 'Fígado, vesícula, pâncreas e baço',
    },
    {
      slug: 'ultrassonografia-rins-e-vias-urinarias',
      icon: '🫘',
      label: 'Rins e Vias Urinárias',
      desc: 'Cálculos, hidronefrose e bexiga',
    },
  ],
  'parede-abdominal': [
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
    {
      slug: 'ultrassonografia-partes-moles',
      icon: '🔍',
      label: 'Partes Moles',
      desc: 'Nódulos, hérnias e glândulas',
    },
    {
      slug: 'ultrassonografia-avaliacao-pre-cirurgia-plastica',
      icon: '✨',
      label: 'Pré Cirurgia Plástica',
      desc: 'Mapeamento para procedimento estético',
    },
  ],

  /* Hepático Avançado */
  'elastografia-hepatica': [
    {
      slug: 'avaliacao-multiparametrica-figado',
      icon: '🔬',
      label: 'Avaliação Multiparamétrica do Fígado',
      desc: 'Exame hepático integrado com interpretação clínica',
    },
    {
      slug: 'superior',
      icon: '⬆️',
      label: 'Abdome Superior',
      desc: 'Fígado, vesícula, pâncreas e baço',
    },
    {
      slug: 'total',
      icon: '📋',
      label: 'Abdome Total',
      desc: 'Avaliação abdominal completa',
    },
  ],
  'avaliacao-multiparametrica-figado': [
    {
      slug: 'elastografia-hepatica',
      icon: '🩺',
      label: 'Elastografia Hepática',
      desc: 'Rigidez hepática e quantificação de esteatose',
    },
    {
      slug: 'superior',
      icon: '⬆️',
      label: 'Abdome Superior',
      desc: 'Fígado, vesícula, pâncreas e baço',
    },
    {
      slug: 'total',
      icon: '📋',
      label: 'Abdome Total',
      desc: 'Avaliação abdominal completa',
    },
  ],

  /* Próstata */
  'via-abdominal': [
    {
      slug: 'via-transretal',
      icon: '🔬',
      label: 'Próstata Transretal',
      desc: 'Avaliação com alta resolução',
    },
    {
      slug: 'ultrassonografia-rins-e-vias-urinarias',
      icon: '🫘',
      label: 'Rins e Vias Urinárias',
      desc: 'Cálculos, hidronefrose e bexiga',
    },
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
  ],
  'via-transretal': [
    {
      slug: 'via-abdominal',
      icon: '🩺',
      label: 'Próstata Via Abdominal',
      desc: 'Avaliação não invasiva',
    },
    {
      slug: 'ultrassonografia-rins-e-vias-urinarias',
      icon: '🫘',
      label: 'Rins e Vias Urinárias',
      desc: 'Cálculos, hidronefrose e bexiga',
    },
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
  ],

  /* Avulsos */
  'ultrassonografia-bolsa-escrotal-e-testiculos': [
    {
      slug: 'ultrassonografia-rins-e-vias-urinarias',
      icon: '🫘',
      label: 'Rins e Vias Urinárias',
      desc: 'Cálculos, hidronefrose e bexiga',
    },
    {
      slug: 'via-abdominal',
      icon: '🩺',
      label: 'Próstata Via Abdominal',
      desc: 'Avaliação não invasiva',
    },
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
  ],
  'ultrassonografia-rins-e-vias-urinarias': [
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
    {
      slug: 'via-abdominal',
      icon: '🩺',
      label: 'Próstata Via Abdominal',
      desc: 'Avaliação prostática',
    },
    {
      slug: 'inferior',
      icon: '⬇️',
      label: 'Abdome Inferior',
      desc: 'Pelve, bexiga e vias urinárias',
    },
  ],
  'ultrassonografia-partes-moles': [
    {
      slug: 'parede-abdominal',
      icon: '🧱',
      label: 'Parede Abdominal',
      desc: 'Hérnias, músculos e fáscias',
    },
    {
      slug: 'ultrassonografia-cervical-com-ou-sem-doppler',
      icon: '🔍',
      label: 'Cervical',
      desc: 'Linfonodos e glândulas do pescoço',
    },
    {
      slug: 'ultrassonografia-de-tireoide-com-ou-sem-doppler',
      icon: '🦋',
      label: 'Tireoide',
      desc: 'Avaliação de nódulos e alterações',
    },
  ],
  'ultrassonografia-avaliacao-pre-cirurgia-plastica': [
    {
      slug: 'parede-abdominal',
      icon: '🧱',
      label: 'Parede Abdominal',
      desc: 'Hérnias, músculos e fáscias',
    },
    {
      slug: 'ultrassonografia-partes-moles',
      icon: '🔍',
      label: 'Partes Moles',
      desc: 'Nódulos, hérnias e glândulas',
    },
    { slug: 'total', icon: '📋', label: 'Abdome Total', desc: 'Avaliação abdominal completa' },
  ],

  /* Tireoide e Cervical */
  'ultrassonografia-de-tireoide-com-ou-sem-doppler': [
    {
      slug: 'ultrassonografia-cervical-com-ou-sem-doppler',
      icon: '🔍',
      label: 'Cervical',
      desc: 'Linfonodos e glândulas do pescoço',
    },
    {
      slug: 'ultrassonografia-partes-moles',
      icon: '🔍',
      label: 'Partes Moles',
      desc: 'Nódulos, hérnias e glândulas',
    },
    { slug: 'mamas', icon: '🩺', label: 'Mamas', desc: 'Nódulos, cistos e tecido mamário' },
  ],
  'ultrassonografia-cervical-com-ou-sem-doppler': [
    {
      slug: 'ultrassonografia-de-tireoide-com-ou-sem-doppler',
      icon: '🦋',
      label: 'Tireoide',
      desc: 'Avaliação de nódulos e alterações',
    },
    {
      slug: 'ultrassonografia-partes-moles',
      icon: '🔍',
      label: 'Partes Moles',
      desc: 'Nódulos, hérnias e glândulas',
    },
    { slug: 'mamas', icon: '🩺', label: 'Mamas', desc: 'Nódulos, cistos e tecido mamário' },
  ],

  /* Pediátrico */
  'pesquisa-de-puberdade-precoce': [
    {
      slug: 'endovaginal',
      icon: '🩺',
      label: 'Endovaginal',
      desc: 'Avaliação ginecológica detalhada',
    },
    {
      slug: 'pelvico-via-abdominal',
      icon: '🩺',
      label: 'Pélvico Via Abdominal',
      desc: 'Avaliação pélvica não invasiva',
    },
    {
      slug: 'transfontanela',
      icon: '🧒',
      label: 'Transfontanela',
      desc: 'Avaliação cerebral neonatal',
    },
  ],
  transfontanela: [
    {
      slug: 'pesquisa-de-puberdade-precoce',
      icon: '🧒',
      label: 'Puberdade Precoce',
      desc: 'Avaliação hormonal em meninas',
    },
    {
      slug: 'obstetrico-de-rotina',
      icon: '👶',
      label: 'Obstétrico de Rotina',
      desc: 'Acompanhamento do crescimento fetal',
    },
    {
      slug: 'ultrassonografia-rins-e-vias-urinarias',
      icon: '🫘',
      label: 'Rins e Vias Urinárias',
      desc: 'Cálculos, hidronefrose e bexiga',
    },
  ],
};

/* ─── Mensagens WhatsApp pré-preenchidas por exame ──────────────────────── */
export const whatsappMessages = {
  'obstetrico-de-rotina': 'Olá, gostaria de agendar um ultrassom obstétrico de rotina.',
  'morfologico-primeiro-trimestre':
    'Olá, gostaria de agendar um ultrassom morfológico do 1º trimestre.',
  'morfologico-segundo-trimestre':
    'Olá, gostaria de agendar um ultrassom morfológico do 2º trimestre.',
  'doppler-obstetrico': 'Olá, gostaria de agendar um Doppler obstétrico.',
  'ecocardiografia-fetal': 'Olá, gostaria de agendar uma ecocardiografia fetal.',
  endovaginal: 'Olá, gostaria de agendar um ultrassom endovaginal.',
  mamas: 'Olá, gostaria de agendar um ultrassom de mamas.',
  'pelvico-via-abdominal': 'Olá, gostaria de agendar um ultrassom pélvico via abdominal.',
  'pesquisa-de-endometriose-com-preparo':
    'Olá, gostaria de agendar a pesquisa de endometriose com preparo.',
  'monitorizacao-da-ovulacao': 'Olá, gostaria de agendar a monitorização da ovulação.',
  total: 'Olá, gostaria de agendar um ultrassom de abdome total.',
  superior: 'Olá, gostaria de agendar um ultrassom de abdome superior.',
  inferior: 'Olá, gostaria de agendar um ultrassom de abdome inferior.',
  'parede-abdominal': 'Olá, gostaria de agendar um ultrassom de parede abdominal.',
  'via-abdominal': 'Olá, gostaria de agendar um ultrassom de próstata via abdominal.',
  'via-transretal': 'Olá, gostaria de agendar um ultrassom de próstata transretal.',
  'ultrassonografia-bolsa-escrotal-e-testiculos':
    'Olá, gostaria de agendar um ultrassom de bolsa escrotal.',
  'ultrassonografia-rins-e-vias-urinarias':
    'Olá, gostaria de agendar um ultrassom de rins e vias urinárias.',
  'pesquisa-de-puberdade-precoce': 'Olá, gostaria de agendar a pesquisa de puberdade precoce.',
  transfontanela: 'Olá, gostaria de agendar um ultrassom transfontanelar.',
  'ultrassonografia-partes-moles': 'Olá, gostaria de agendar um ultrassom de partes moles.',
  'ultrassonografia-avaliacao-pre-cirurgia-plastica':
    'Olá, gostaria de agendar o ultrassom pré-cirurgia plástica.',
  'ultrassonografia-de-tireoide-com-ou-sem-doppler':
    'Olá, gostaria de agendar um ultrassom de tireoide.',
  'ultrassonografia-cervical-com-ou-sem-doppler': 'Olá, gostaria de agendar um ultrassom cervical.',
  'elastografia-hepatica':
    'Olá, gostaria de agendar uma elastografia hepática com quantificação de esteatose.',
  'avaliacao-multiparametrica-figado':
    'Olá, gostaria de agendar uma avaliação multiparamétrica do fígado.',
};

/* ─── FAQs por exame (schema FAQ markup) ────────────────────────────────── */
export const examFAQs = {
  'obstetrico-de-rotina': [
    {
      q: 'Preciso de pedido médico?',
      a: 'Sim, é necessário pedido médico com a indicação do exame.',
    },
    { q: 'Preciso estar em jejum?', a: 'Não. Venha alimentada e com roupas confortáveis.' },
    {
      q: 'Posso levar acompanhante?',
      a: 'Sim, um acompanhante adulto pode entrar. Crianças devem aguardar na recepção.',
    },
    { q: 'O exame dói?', a: 'Não. O exame é indolor e não invasivo.' },
  ],
  'morfologico-primeiro-trimestre': [
    {
      q: 'Preciso beber água antes?',
      a: 'Sim, bexiga moderadamente cheia é recomendada para este exame.',
    },
    {
      q: 'Qual a diferença para o morfológico do 2º trimestre?',
      a: 'O 1º trimestre foca em marcadores de cromossomopatias (translucência nucal, osso nasal). O 2º avalia a anatomia fetal de forma mais detalhada.',
    },
    {
      q: 'Posso saber o sexo do bebê neste exame?',
      a: 'Normalmente não. O sexo é mais confiável a partir do morfológico do 2º trimestre.',
    },
    { q: 'O exame dói?', a: 'Não. O exame é indolor e não invasivo.' },
  ],
  'morfologico-segundo-trimestre': [
    { q: 'Preciso estar em jejum?', a: 'Não. Venha alimentada e com roupas confortáveis.' },
    {
      q: 'Posso filmar o exame?',
      a: 'Não é permitido filmar com celular. Se desejar imagens ou vídeos, avise a secretária e solicite ao médico durante o exame.',
    },
    {
      q: 'Dá para saber o sexo do bebê?',
      a: 'Sim. Se estiver planejando uma revelação, avise na recepção para que os cuidados sejam tomados durante o exame.',
    },
    {
      q: 'E se o bebê não colaborar para o 3D?',
      a: 'O 3D é uma cortesia que depende de diversos fatores técnicos. O foco principal é a avaliação da saúde do bebê.',
    },
  ],
  'doppler-obstetrico': [
    { q: 'Preciso de preparo?', a: 'Não há preparo específico.' },
    {
      q: 'Qual a diferença para o obstétrico de rotina?',
      a: 'O Doppler avalia o fluxo sanguíneo nas artérias uterinas, umbilicais e fetais, além das medidas habituais.',
    },
    { q: 'O exame dói?', a: 'Não. É indolor e não invasivo.' },
  ],
  'ecocardiografia-fetal': [
    {
      q: 'Toda gestante precisa fazer?',
      a: 'É indicado quando há suspeita de alteração cardíaca, histórico familiar ou condições maternas específicas. Pode ser solicitado de rotina também.',
    },
    {
      q: 'É o mesmo que o morfológico?',
      a: 'Não. A ecocardiografia é um exame especializado focado exclusivamente no coração do bebê.',
    },
    { q: 'Preciso de preparo?', a: 'Não há preparo. Venha alimentada e confortável.' },
  ],
  endovaginal: [
    {
      q: 'O exame dói?',
      a: 'Pode causar leve desconforto, mas não é doloroso. A sonda é fina e lubrificada.',
    },
    { q: 'Posso fazer menstruada?', a: 'Sim, a menstruação não impede a realização do exame.' },
    { q: 'Preciso de bexiga cheia?', a: 'Não. Para o endovaginal, a bexiga deve estar vazia.' },
  ],
  mamas: [
    {
      q: 'Substitui a mamografia?',
      a: 'Não. O ultrassom é complementar à mamografia, não substitui.',
    },
    {
      q: 'Posso usar desodorante no dia?',
      a: 'Recomenda-se pele limpa, sem cremes ou desodorantes na região.',
    },
    { q: 'O exame dói?', a: 'Não. É indolor e sem radiação.' },
  ],
  'pelvico-via-abdominal': [
    { q: 'Preciso beber água?', a: 'Sim, 500 ml a 1 litro de água 1–2 horas antes, sem urinar.' },
    {
      q: 'Qual a diferença para o endovaginal?',
      a: 'O pélvico é feito pela barriga (externo). O endovaginal usa sonda interna e tem mais detalhe.',
    },
    { q: 'O exame dói?', a: 'Não. A pressão da bexiga cheia pode causar leve desconforto.' },
  ],
  'pesquisa-de-endometriose-com-preparo': [
    {
      q: 'Qual o preparo necessário?',
      a: 'Dieta pobre em resíduos na véspera, laxativo conforme orientação e jejum de 4–6 horas. Entre em contato para o protocolo individualizado.',
    },
    {
      q: 'O exame demora?',
      a: 'Sim, pode durar de 40 minutos a 2 horas dependendo da complexidade.',
    },
    { q: 'Posso fazer menstruada?', a: 'Sim, a menstruação não impede a realização.' },
  ],
  'monitorizacao-da-ovulacao': [
    {
      q: 'Quantas sessões são necessárias?',
      a: 'Geralmente 3 a 4 exames em dias alternados durante o mesmo ciclo.',
    },
    { q: 'Quando começa?', a: 'Normalmente entre o 10º e 12º dia do ciclo menstrual.' },
    { q: 'Preciso de bexiga cheia?', a: 'Não. Bexiga vazia para maior conforto.' },
  ],
  total: [
    {
      q: 'Preciso estar em jejum?',
      a: 'Sim, jejum de 6 a 8 horas. Se houver avaliação pélvica, beber 1 litro de água 1 hora antes.',
    },
    {
      q: 'Pode tomar água durante o jejum?',
      a: 'Sim, pequenas quantidades de água são permitidas.',
    },
    {
      q: 'O exame avalia tudo?',
      a: 'Avalia os principais órgãos abdominais (fígado, vesícula, rins, pâncreas, baço, bexiga), mas não substitui exames específicos.',
    },
  ],
  superior: [
    {
      q: 'Preciso estar em jejum?',
      a: 'Sim, jejum de 6 a 8 horas. Evitar alimentos gordurosos e bebidas gaseificadas na véspera.',
    },
    {
      q: 'Qual a diferença para o abdome total?',
      a: 'O superior foca em fígado, vesícula, pâncreas e baço. O total inclui também pelve e vias urinárias.',
    },
    { q: 'O exame dói?', a: 'Não. É indolor.' },
  ],
  inferior: [
    { q: 'Preciso beber água?', a: 'Sim, 1 litro de água 1 hora antes e não urinar.' },
    { q: 'O exame dói?', a: 'Não. É indolor.' },
  ],
  'parede-abdominal': [
    {
      q: 'Preciso de preparo?',
      a: 'Não há preparo específico. Use roupas que facilitem exposição do abdome.',
    },
    {
      q: 'Serve para ver hérnia?',
      a: 'Sim, é um dos principais exames para diagnóstico de hérnias abdominais.',
    },
  ],
  'via-abdominal': [
    { q: 'Preciso beber água?', a: 'Sim, cerca de 1 litro de água 1 hora antes e não urinar.' },
    {
      q: 'Qual a diferença para a transretal?',
      a: 'A via abdominal é externa e menos detalhada. A transretal tem maior resolução para nódulos.',
    },
  ],
  'via-transretal': [
    { q: 'O exame dói?', a: 'Pode causar desconforto leve, mas é tolerável e rápido.' },
    {
      q: 'Qual o preparo?',
      a: 'Lavagem intestinal (enema) no dia do exame conforme orientação médica.',
    },
  ],
  'ultrassonografia-bolsa-escrotal-e-testiculos': [
    { q: 'Preciso de preparo?', a: 'Não. Recomenda-se higiene íntima adequada no dia.' },
    { q: 'O exame dói?', a: 'Não. É indolor e não invasivo.' },
  ],
  'ultrassonografia-rins-e-vias-urinarias': [
    { q: 'Preciso beber água?', a: 'Sim, cerca de 1 litro de água 1 hora antes e não urinar.' },
    {
      q: 'O exame detecta pedra nos rins?',
      a: 'Sim, a litíase renal é uma das principais indicações.',
    },
  ],
  'pesquisa-de-puberdade-precoce': [
    { q: 'Preciso beber água?', a: 'Sim, 500 ml a 1 litro de água 1–2 horas antes e não urinar.' },
    { q: 'O exame dói?', a: 'Não. É feito pela barriga, indolor.' },
  ],
  transfontanela: [
    {
      q: 'Até que idade pode ser feito?',
      a: 'Enquanto a fontanela anterior estiver aberta, geralmente até 12–18 meses.',
    },
    { q: 'Precisa sedar o bebê?', a: 'Não. O bebê pode estar acordado, dormindo ou amamentando.' },
  ],
  'ultrassonografia-partes-moles': [
    { q: 'Preciso de preparo?', a: 'Não. Leve o encaminhamento com a descrição da região.' },
    {
      q: 'Serve para qualquer parte do corpo?',
      a: 'Sim, avalia tecidos superficiais em diversas regiões.',
    },
  ],
  'ultrassonografia-avaliacao-pre-cirurgia-plastica': [
    {
      q: 'Preciso de preparo?',
      a: 'Geralmente não. Se o cirurgião solicitar algo específico, orientaremos previamente.',
    },
    {
      q: 'Preciso de pedido do cirurgião?',
      a: 'Sim, o exame é personalizado conforme solicitação do cirurgião plástico.',
    },
  ],
  'ultrassonografia-de-tireoide-com-ou-sem-doppler': [
    { q: 'Preciso de preparo?', a: 'Não. Traga exames anteriores da região, se houver.' },
    {
      q: 'Quando o Doppler é necessário?',
      a: 'Em nódulos suspeitos, tireoidites ou para diferenciar padrões benignos e malignos.',
    },
  ],
  'ultrassonografia-cervical-com-ou-sem-doppler': [
    { q: 'Preciso de preparo?', a: 'Não. Traga exames anteriores da região, se houver.' },
    {
      q: 'O que é avaliado?',
      a: 'Linfonodos, glândulas salivares, massas cervicais e fluxo sanguíneo quando indicado.',
    },
  ],
  'elastografia-hepatica': [
    {
      q: 'O exame substitui a biópsia hepática?',
      a: 'Na grande maioria dos casos, sim. A elastografia hepática quantitativa é hoje o método de escolha para estadiamento de fibrose em diversas etiologias, com correspondência validada contra biópsia.',
    },
    {
      q: 'Preciso estar em jejum?',
      a: 'Sim, jejum mínimo de 4 horas. Água permitida. Não consumir álcool nas 24 horas anteriores.',
    },
    {
      q: 'O exame dói?',
      a: 'Não. É indolor e não invasivo, sem contraste, radiação ou agulhas.',
    },
    {
      q: 'Por que trazer exames laboratoriais?',
      a: 'A interpretação dos valores de rigidez e de gordura hepática é mais precisa quando feita junto com transaminases, plaquetas, INR e albumina.',
    },
    {
      q: 'Quanto tempo demora o exame?',
      a: 'Aproximadamente 20 a 30 minutos.',
    },
  ],
  'avaliacao-multiparametrica-figado': [
    {
      q: 'Qual a diferença para a elastografia simples?',
      a: 'A avaliação multiparamétrica integra rigidez hepática, esteatose, elastografia esplênica, Doppler portal completo e índice hepato-renal em uma única sessão, com interpretação clínica direcionada, e não apenas números isolados.',
    },
    {
      q: 'Quando este exame é indicado?',
      a: 'Em casos complexos: suspeita de cirrose compensada, investigação de hipertensão portal, monitoramento sob terapia hepatológica, avaliação pré-cirúrgica ou pré-transplante, ou doença hepática de múltiplas etiologias.',
    },
    {
      q: 'Preciso estar em jejum?',
      a: 'Sim, jejum de 4 a 6 horas. Água permitida. Não consumir álcool nas 24 horas anteriores.',
    },
    {
      q: 'Quanto tempo demora o exame?',
      a: 'Aproximadamente 40 a 60 minutos, dependendo da complexidade do caso.',
    },
    {
      q: 'O médico solicitante pode discutir o resultado?',
      a: 'Sim. Em casos selecionados, o médico solicitante pode entrar em contato direto para discussão conjunta da interpretação do laudo.',
    },
  ],
};

/* ─── Legendas das imagens por exame ────────────────────────────────────── */
export const imageCaptions = {
  'obstetrico-de-rotina':
    'Imagem ilustrativa — ultrassom obstétrico realizado na clínica do Dr. Massuca',
  'morfologico-primeiro-trimestre': 'Imagem ilustrativa — ultrassom morfológico do 1º trimestre',
  'morfologico-segundo-trimestre': 'Imagem ilustrativa — ultrassom morfológico do 2º trimestre',
  'doppler-obstetrico': 'Imagem ilustrativa — Doppler obstétrico com análise de fluxo',
  'ecocardiografia-fetal': 'Imagem ilustrativa — ecocardiografia fetal com Doppler colorido',
  endovaginal: 'Imagem ilustrativa — ultrassom endovaginal',
  mamas: 'Imagem ilustrativa — ultrassom mamário',
  'pelvico-via-abdominal': 'Imagem ilustrativa — ultrassom pélvico via abdominal',
  'pesquisa-de-endometriose-com-preparo':
    'Imagem ilustrativa — pesquisa de endometriose com preparo',
  'monitorizacao-da-ovulacao': 'Imagem ilustrativa — monitorização folicular por ultrassom',
  total: 'Imagem ilustrativa — ultrassom de abdome total',
  superior: 'Imagem ilustrativa — ultrassom de abdome superior',
  inferior: 'Imagem ilustrativa — ultrassom de abdome inferior',
  'parede-abdominal': 'Imagem ilustrativa — ultrassom de parede abdominal',
  'via-abdominal': 'Imagem ilustrativa — ultrassom de próstata via abdominal',
  'via-transretal': 'Imagem ilustrativa — ultrassom de próstata transretal',
  'ultrassonografia-bolsa-escrotal-e-testiculos':
    'Imagem ilustrativa — ultrassom de bolsa escrotal',
  'ultrassonografia-rins-e-vias-urinarias':
    'Imagem ilustrativa — ultrassom de rins e vias urinárias',
  'pesquisa-de-puberdade-precoce': 'Imagem ilustrativa — pesquisa de puberdade precoce',
  transfontanela: 'Imagem ilustrativa — ultrassom transfontanelar',
  'ultrassonografia-partes-moles': 'Imagem ilustrativa — ultrassom de partes moles',
  'ultrassonografia-avaliacao-pre-cirurgia-plastica':
    'Imagem ilustrativa — avaliação pré-cirurgia plástica',
  'ultrassonografia-de-tireoide-com-ou-sem-doppler': 'Imagem ilustrativa — ultrassom de tireoide',
  'ultrassonografia-cervical-com-ou-sem-doppler': 'Imagem ilustrativa — ultrassom cervical',
  'elastografia-hepatica':
    'Imagem ilustrativa — elastografia hepática e quantificação de esteatose',
  'avaliacao-multiparametrica-figado': 'Imagem ilustrativa — avaliação multiparamétrica do fígado',
};

/* ─── Breadcrumb labels por slug ────────────────────────────────────────── */
export const breadcrumbLabels = {
  'obstetrico-de-rotina': 'Obstétrico de Rotina',
  'morfologico-primeiro-trimestre': 'Morfológico 1º Trimestre',
  'morfologico-segundo-trimestre': 'Morfológico 2º Trimestre',
  'doppler-obstetrico': 'Doppler Obstétrico',
  'ecocardiografia-fetal': 'Ecocardiografia Fetal',
  endovaginal: 'Endovaginal',
  mamas: 'Mamas',
  'pelvico-via-abdominal': 'Pélvico Via Abdominal',
  'pesquisa-de-endometriose-com-preparo': 'Endometriose (com preparo)',
  'monitorizacao-da-ovulacao': 'Monitorização da Ovulação',
  total: 'Abdome Total',
  superior: 'Abdome Superior',
  inferior: 'Abdome Inferior',
  'parede-abdominal': 'Parede Abdominal',
  'via-abdominal': 'Próstata Via Abdominal',
  'via-transretal': 'Próstata Transretal',
  'ultrassonografia-bolsa-escrotal-e-testiculos': 'Bolsa Escrotal e Testículos',
  'ultrassonografia-rins-e-vias-urinarias': 'Rins e Vias Urinárias',
  'pesquisa-de-puberdade-precoce': 'Puberdade Precoce',
  transfontanela: 'Transfontanela',
  'ultrassonografia-partes-moles': 'Partes Moles',
  'ultrassonografia-avaliacao-pre-cirurgia-plastica': 'Pré Cirurgia Plástica',
  'ultrassonografia-de-tireoide-com-ou-sem-doppler': 'Tireoide',
  'ultrassonografia-cervical-com-ou-sem-doppler': 'Cervical',
  'elastografia-hepatica': 'Elastografia Hepática',
  'avaliacao-multiparametrica-figado': 'Avaliação Multiparamétrica do Fígado',
};
