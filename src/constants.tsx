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
  prefiltro: {
    questionType: 'Quantos kilos de pre filtro? ',
    qtyType: 'kgs',
    question: 'Qual o tipo de pre filtro?',
    items: ['Grosso', 'Fino', 'Esquisito'],
  },
};

export {presetItems};
