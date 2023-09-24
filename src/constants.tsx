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
    items: [
      'Bomba Submersa 0.50 HP',
      'Bomba Submersa 0.75 HP',
      'Bomba Submersa 1.0 HP',
      'Bomba Submersa 1.5 HP',
      'Bomba Submersa 2.0 HP',
      'Bomba Submersa 2.5 HP',
      'Bomba Submersa 3.0 HP',
      'Bomba Submersa 3.5 HP',
      'Bomba Submersa 4.0 HP',
    ],
  },
  painel: {
    questionType: 'Quantos paineis? ',
    qtyType: 'und',
    question: 'Qual o tipo de painel?',
    items: [
      'Simples 0.50 HP',
      'Simples 0.75 HP',
      'Simples 1.0 HP',
      'Simples 1.5 HP',
      'Simples 2.0 HP',
      'Simples 2.5 HP',
      'Simples 3.0 HP',
      'Simples 3.5 HP',
      'Simples 4.0 HP',
      'Completo 0.50 HP',
      'Completo 0.75 HP',
      'Completo 1.0 HP',
      'Completo 1.5 HP',
      'Completo 2.0 HP',
      'Completo 2.5 HP',
      'Completo 3.0 HP',
      'Completo 3.5 HP',
      'Completo 4.0 HP',
      'Eletrônico 1.0 HP',
      'Eletrônico 1.5 HP',
      'Eletrônico 2.0 HP',
    ],
  },
  'tubo revestimento': {
    questionType: 'Quantos metros de tubo? ',
    qtyType: 'mts',
    question: 'Qual o tipo de tubo?',
    items: [
      'Liso 4"',
      'Liso 6"',
      'Nervurado 4" Leve',
      'Nervurado 4" Standard',
      'Nervurado 4" Pesado',
      'Nervurado 6" Leve',
      'Nervurado 6" Standard',
      'Nervurado 6" Pesado',
    ],
  },
  'tubo edutor': {
    questionType: 'Quantos tubos',
    qtyType: 'und',
    question: 'Qual o tipo de tubo',
    items: [
      'Tubo Edutor 1" Geomecânico',
      'Tubo Edutor 1 1/4" Geomecânico',
      'Tubo Edutor 1 1/2" Geomecânico',
      'Tubo Edutor 2" Geomecânico',
    ],
  },
  luva: {
    questionType: 'Quantas luvas',
    qtyType: 'und',
    question: 'Qual o tipo de luva',
    items: [
      'Luva PVC 1"',
      'Luva PVC 1 1/4"',
      'Luva PVC 1 1/2"',
      'Luva PVC 2"',
      'Luva Galvanizada 1"',
      'Luva Galvanizada 1 1/4"',
      'Luva Galvanizada 1 1/2"',
      'Luva Galvanizada 2"',
    ],
  },
  flange: {
    questionType: 'Quantas flanges? ',
    qtyType: 'und',
    question: 'Qual flange?',
    items: [
      'Flange 4X1"',
      'Flange 4X1 1/4"',
      'Flange 4X1 1/2"',
      'Flange 4X2"',
      'Flange 6X1"',
      'Flange 6X1 1/4"',
      'Flange 6X1 1/2"',
      'Flange 6X2"',
    ],
  },
  centralizador: {
    questionType: 'Quantos centralizadores ',
    qtyType: 'und',
    question: 'Qual centralizador?',
    items: ['Centralizador 4"', 'Centralizador 6"'],
  },
  cabo: {
    questionType: 'Quantos metros de cabo? ',
    qtyType: 'mts',
    question: 'Qual o tipo de cabo?',
    items: [
      'Cabo PP 2X1',
      'Cabo PP 2X2.5',
      'Cabo PP 3X1',
      'Cabo PP 3X2.5',
      'Cabo PP 3X4',
      'Cabo PP 3X6',
    ],
  },
  prefiltro: {
    questionType: 'Quantos sacos de pre filtro? ',
    qtyType: 'Saco 25k',
    question: 'Qual o tipo de pre filtro?',
    items: ['1 - 3 mm'],
  },
};

export {presetItems};
