const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const gender = getSelectedValue('gender');
  const age = getInputNumberValue('age');
  const weight = getInputNumberValue('weight');
  const height = getInputNumberValue('height');
  const activityLevel = getSelectedValue('activity_level');

  const basalMetabolicRate = Math.round(
    gender === 'female'
      ? 655 + 9.6 * weight + 1.8 * height - 4.7 * age
      : 66 + 13.7 * weight + 5 * height - 6.8 * age
  );

  const maintenance = Math.round(basalMetabolicRate * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  const result = getResult(
    basalMetabolicRate,
    maintenance,
    loseWeight,
    gainWeight
  );

  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = result;
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}

function getSelectedValue(id) {
  const select = document.getElementById(id);

  const options = select.options;
  const selectedOption = options[select.selectedIndex];

  return selectedOption.value;
}

function getResult(basalMetabolicRate, maintenance, loseWeight, gainWeight) {
  return `\
  <h2>Aqui está o resultado:</h2>

  <div class="result-content">
    <ul>
      <li>
        Seu metabolismo basal é de <strong>${basalMetabolicRate} calorias</strong>.
      </li>
      <li>
        Para manter o seu peso você precisa consumir em média
        <strong>${maintenance} calorias</strong>.
      </li>
      <li>
        Para perder peso você precisa consumir em média
        <strong>${loseWeight} calorias</strong>.
      </li>
      <li>
        Para ganhar peso você precisa consumir em média
        <strong>${gainWeight} calorias</strong>.
      </li>
    </ul>
  </div>`;
}
