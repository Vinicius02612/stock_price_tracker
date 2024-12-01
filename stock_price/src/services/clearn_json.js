/* Função para limpar os dados arquivo response.json e gerar um data set limpo. */
const fs = require('fs');

const clearnJson = () => {
  const data = fs.readFileSync('response.json', 'utf8');
  const json = JSON.parse(data);
  const clearnData = json.map((item) => {
    const date = item.date;
    const open = item.open;
    const high = item.high;
    const low = item.low;
    const close = item.close;
    const volume = item.volume;
    return {
      date,
      open,
      high,
      low,
      close,
      volume,
    };
  });
  fs.writeFileSync('clearn_data.json', JSON.stringify(clearnData, null, 2));
}

export default clearnJson;