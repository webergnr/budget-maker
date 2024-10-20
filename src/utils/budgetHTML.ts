import currency from 'currency.js';
import {logoBase64} from '../imgs/logo';
import {IBudget, IItem} from '../screens/NewBudget';
import {dateToString} from './date';

const makeBudgetHTML = (budget: IBudget) => {
  const makeTr = (tr: IItem) => {
    const trHtml = `
    <tr>
      <td class="table-content bg-blue" style="text-align: center">
        ${tr.qty}
      </td>
      <td class="table-content bg-gray">
        <div style="display: flex; flex-direction: column">
          <span style="color: #3989c6; font-weight: 600">
            ${tr.name.toUpperCase()}
          </span>
          <span>
          ${tr.description}
          </span>
        </div>
      </td>
      <td class="table-content bg-dark-gray" style="text-align: right">
        R$ ${currency(tr.value)}
      </td>
      <td class="table-content bg-gray" style="text-align: right">
        R$ ${currency(tr.value * tr.qty)}
      </td>
    </tr>
    `;

    return trHtml;
  };

  const budgetItems = budget.items.map(item => makeTr(item)).join('\n');
  const fullValue = budget.items
    .map(i => i.qty * i.value)
    .reduce((a, b) => a + b, 0);

  const baseHtml = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          html {
            font-family: Arial, Helvetica, sans-serif;
          }
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body,
          h1,
          h2,
          h3,
          h4,
          p,
          figure,
          blockquote,
          dl,
          dd {
            margin: 0;
          }
          body {
            min-height: 100vh;
            text-rendering: optimizeSpeed;
            line-height: 1.5;
          }
          header,
          section {
            padding: 1rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          h3 {
            font-weight: 300;
          }
          table,
          .table {
            width: 100%;
            border: none;
          }
          thead,
          .bg-gray {
            background-color: #eeeeee;
          }
          .header-table {
            padding: 8px;
            font-weight: 400;
            color: #2f2f2f;
          }
          .bg-dark-gray {
            background-color: #dddddd;
          }
          .bg-blue {
            background-color: #3989c6;
            color: white;
          }
          .table-content {
            padding: 10px;
            border-top: 2px solid white;
          }
        </style>
      </head>
      <body>
        <header>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 300px; height: 120px;">
            <img
              src="${logoBase64}"
              alt=""
              width="300"
              height="auto"
            />
            <h3 style="padding-top: 12px; color: #010066; font-weight: bold;">www.jwperfuracoes.com.br</h3>
          </div>
          <div class="info">
            <h1>Ailton Weder</h1>
            <h3>Rua Anísio José Ioca, 482. SJRP, SP</h3>
            <div style="display: flex; align-items: flex-start; height: 26px">
              <div style="margin-right: 10px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                  <path
                    d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1"
                  ></path>
                </svg>
              </div>
              <h3>(17) 99776.0629</h3>
            </div>
            <h3>jwperfuracoes@yahoo.com.br</h3>
          </div>
        </header>
        <hr color="#3989c6" />
        <section>
          <div>
            <h1>${budget.name}</h1>
            <h3>
              ${budget.place}
            </h3>
          </div>
          <div class="info">
            <h1 style="color: #3989c6">ORÇAMENTO</h1>
            <h3>${dateToString(budget.date)}</h3>
          </div>
        </section>
        <section>
          <div class="table">
            <table cellspacing="0" cellpadding="0">
              <thead class="header-table">
                <tr class="header-table">
                  <th class="header-table" style="text-align: center; width: 10%">
                    QTDE
                  </th>
                  <th class="header-table" style="text-align: left; width: 55%">
                    DESCRIÇÃO
                  </th>
                  <th class="header-table" style="text-align: right; width: 15%">
                    UNIDADE
                  </th>
                  <th class="header-table" style="text-align: right; width: 20%">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody id="tbody-default">
                ${budgetItems}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td
                    colspan="2"
                    style="text-align: right; font-size: 14pt; color: #3989c6"
                  >
                    VALOR TOTAL
                  </td>
                  <td
                    style="
                      text-align: right;
                      color: #3989c6;
                      padding-right: 0.5rem;
                      font-size: 14pt;
                    "
                  >
                    R$ ${currency(fullValue)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <section>
          <div style="width: 10px; background-color: #3989c6"></div>
          <div style="width: 100%; margin-left: 10px">
            <span>Condições de pagamento: <strong>${
              budget.payment
            }</strong> </span>
            <br />
            <br />
            <span style="color: #888888; font-size: 10pt">
              Obs: Proposta preventiva para perfuração e instalação de poço artesiano com profundidade de <strong>0 à ${
                budget.size
              }</strong> metros ou até o Basalto. Água e energia por conta do cliente. A cotação dos materiais e serviços constados acima poderão variar conforme as condições geológicas do solo, sendo os excedentes cobrados a parte. A qualidade e/ou quantidade de água produzida pelo poço, dependem unicamente do sub-solo.
            </span>
          </div>
        </section>
        <section>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              flex-direction: column;
            "
          >
            <hr color="#3989c6" width="100%" />
            JW Perfurações - Comércio de Poços Artesianos e Assistência Técnica
          </div>
        </section>
      </body>
    </html>
    `;

  return baseHtml;
};

export {makeBudgetHTML};
