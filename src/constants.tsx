interface IPresetItems {
  [key: string]: {
    questionType: string;
    qtyType: string;
    question: string;
    items: string[];
  };
}

const presetItems: IPresetItems = {
  bomba: {
    questionType: 'Quantas bombas?',
    qtyType: 'und',
    question: 'Qual o tipo de bomba?',
    items: ['Bomba leao 12"', 'Bomba geomecanica 6"'],
  },
  painel: {
    questionType: 'Quantos paineis? ',
    qtyType: 'und',
    question: 'Qual o tipo de painel?',
    items: ['painel 1', 'painel 2', 'painel 3'],
  },
  tubo: {
    questionType: 'Quantos metros de tubo? ',
    qtyType: 'mts',
    question: 'Qual o tipo de tubo?',
    items: ['tubo 1', 'tubo 2', 'tubo 3', 'tubo 4'],
  },
  flange: {
    questionType: 'Quantas flanges? ',
    qtyType: 'und',
    question: 'Qual flange?',
    items: ['flange 1', 'flange 2', 'flange 3'],
  },
  cabo: {
    questionType: 'Quantos metros de cabo? ',
    qtyType: 'mts',
    question: 'Qual o tipo de cabo?',
    items: ['cabo 1', 'cabo 2', 'cabo 3', 'cabo 4'],
  },
  role: {
    questionType: 'Quantos metros de ',
    qtyType: 'ABC',
    question: 'xxxxxxxx?',
    items: ['role 1', 'role 2', 'role 3', 'role 4'],
  },
  teste: {
    questionType: 'Quantos metros de ',
    qtyType: 'ABC',
    question: 'yyyyyyyyyyy?',
    items: ['teste 1', 'teste 2', 'teste 3', 'teste 4'],
  },
  blabla: {
    questionType: 'Quantos metros de ',
    qtyType: 'ABC',
    question: 'zzzzzzzzzzzz?',
    items: ['blabla 1', 'blabla 2', 'blabla 3'],
  },
  'outro teste': {
    questionType: 'Quantos metros de ',
    qtyType: 'CBA',
    question: 'aaaaaaaaaaa?',
    items: [
      'outro teste 1',
      'outro teste 2',
      'outro teste 3',
      'outro teste 4 asdf',
    ],
  },
};

export {presetItems};
