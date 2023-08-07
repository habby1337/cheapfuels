export const selectors = {
  petrol: {
    avg: 'tr.bg-light:nth-child(2) > td:nth-child(2) > strong:nth-child(1)',
    accisa: 'tr.bg-light:nth-child(2) > td:nth-child(3)',
    iva: 'tr.bg-light:nth-child(2) > td:nth-child(4) > span:nth-child(1)',
    netto: 'tr.bg-light:nth-child(2) > td:nth-child(5)',
    variation_amount:
      'tr.bg-light:nth-child(2) > td:nth-child(6) > span:nth-child(1)',
    variation_percentage_path:
      'tr.bg-light:nth-child(2) > td:nth-child(6) > span:nth-child(1)',
    variation_percentage_attr: 'data-title',
  },
  diesel: {
    avg: '.table > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > strong:nth-child(1)',
    accisa: '.table > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(3)',
    iva: '.table > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(4) > span:nth-child(1)',
    netto: '.table > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(5)',
    variation_amount:
      '.table > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(6) > span:nth-child(1) > span:nth-child(1)',
    variation_percentage_path:
      '.table > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(6) > span:nth-child(1)',
    variation_percentage_attr: 'data-title',
  },
  gpl: {
    avg: '.table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > strong:nth-child(1)',
    accisa: '.table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(3)',
    iva: '.table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(4) > span:nth-child(1)',
    netto: '.table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(5)',
    variation_amount:
      'tr.bg-light:nth-child(4) > td:nth-child(6) > span:nth-child(1)',
    variation_percentage_path:
      '.table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(6) > span:nth-child(1)',
    variation_percentage_attr: 'data-title',
  },
};
