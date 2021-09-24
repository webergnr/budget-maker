interface IPresetItems {
  [key: string]: {
    qtyType: string;
    question: string;
    items: string[];
  };
}

const presetItems: IPresetItems = {
  bomba: {
    qtyType: 'UND',
    question: 'Qual o tipo de bomba?',
    items: ['Bomba leao 12"', 'Bomba geomecanica 6"'],
  },
  painel: {
    qtyType: 'UND',
    question: 'Qual o tipo de painel?',
    items: ['painel 1', 'painel 2', 'painel 3'],
  },
  tubo: {
    qtyType: 'Metros',
    question: 'Qual o tipo de tubo?',
    items: ['tubo 1', 'tubo 2', 'tubo 3', 'tubo 4'],
  },
  flange: {
    qtyType: 'UND',
    question: 'Qual flange?',
    items: ['flange 1', 'flange 2', 'flange 3'],
  },
  cabo: {
    qtyType: 'Metros',
    question: 'Qual o tipo de cabo?',
    items: ['cabo 1', 'cabo 2', 'cabo 3', 'cabo 4'],
  },
  role: {
    qtyType: 'ABC',
    question: 'xxxxxxxx?',
    items: ['role 1', 'role 2', 'role 3', 'role 4'],
  },
  teste: {
    qtyType: 'ABC',
    question: 'yyyyyyyyyyy?',
    items: ['teste 1', 'teste 2', 'teste 3', 'teste 4'],
  },
  blabla: {
    qtyType: 'ABC',
    question: 'zzzzzzzzzzzz?',
    items: ['blabla 1', 'blabla 2', 'blabla 3'],
  },
  'outro teste': {
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
