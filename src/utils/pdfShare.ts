import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const generateSharePdf = async (pdfHTML: string, fileName: string) => {
  try {
    const optionsPDF = {
      html: pdfHTML,
      fileName: 'orcamento',
      directory: 'Documents',
      base64: true,
    };

    const file = await RNHTMLtoPDF.convert(optionsPDF);

    if (file.base64) {
      const base64Data = 'data:application/pdf;base64,' + file.base64;
      await Share.open({
        filename: fileName,
        url: base64Data,
        title: 'orcamento.pdf',
      });
    } else {
      console.log('### => error - not base64 file');
    }
  } catch (error) {
    console.error('### =>', error);
  }
};

export {generateSharePdf};
